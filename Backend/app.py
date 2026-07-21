from flask import Flask, jsonify, request, send_file
from flask_cors import CORS
import pandas as pd
import numpy as np
import os
import io
from datetime import datetime

app = Flask(__name__)
CORS(app)

# ============================================================
# SAMPLE DATA (Real Pakistan Tourism Data)
# ============================================================

def get_tourism_data():
    """Return Pakistan tourism dataset"""
    data = {
        'Year': [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024],
        'Domestic_Tourists_M': [12.5, 13.2, 14.1, 15.0, 16.2, 3.5, 4.2, 8.5, 10.2, 13.5],
        'International_Tourists_M': [1.8, 1.9, 2.1, 2.2, 2.0, 0.4, 0.6, 1.2, 1.6, 2.3],
        'Revenue_B': [0.85, 0.89, 0.95, 1.02, 1.10, 0.22, 0.31, 0.58, 0.78, 1.05],
        'Growth_Percent': [5.6, 5.2, 6.8, 6.4, 8.0, -78.4, 20.0, 102.4, 20.0, 32.4]
    }
    return pd.DataFrame(data)

def get_destinations_data():
    """Return destination data"""
    data = {
        'City': ['Hunza', 'Skardu', 'Swat', 'Naran', 'Murree', 'Karachi', 'Lahore', 'Islamabad', 'Fairy Meadows', 'Deosai'],
        'Province': ['GB', 'GB', 'KPK', 'KPK', 'Punjab', 'Sindh', 'Punjab', 'ICT', 'GB', 'GB'],
        'Domestic_Visitors_M': [1.2, 0.9, 2.8, 3.7, 4.5, 5.2, 6.1, 2.3, 0.4, 0.2],
        'International_Visitors_K': [320, 250, 280, 180, 150, 280, 350, 410, 95, 40],
        'Popularity_Score': [9.2, 8.8, 8.7, 8.5, 7.8, 8.0, 8.9, 8.4, 9.0, 8.9],
        'Safety_Rating': [5, 4, 4, 4, 4, 3, 4, 5, 5, 5],
        'Best_Season': ['Summer', 'Summer', 'Spring', 'Summer', 'Winter', 'Winter', 'Winter', 'Spring', 'Summer', 'Summer']
    }
    return pd.DataFrame(data)

# ============================================================
# API ENDPOINTS
# ============================================================

@app.route('/')
def home():
    return jsonify({
        'status': 'success',
        'message': 'Pakistan Tourism Analytics API',
        'version': '2.0',
        'endpoints': [
            '/api/dashboard',
            '/api/trends',
            '/api/provinces',
            '/api/destinations',
            '/api/forecast'
        ]
    })

# ---- 1. DASHBOARD API ----
@app.route('/api/dashboard')
def get_dashboard():
    df = get_tourism_data()
    latest = df.iloc[-1]
    prev = df.iloc[-2]
    
    return jsonify({
        'status': 'success',
        'data': {
            'total_tourists': round(latest['Domestic_Tourists_M'] + latest['International_Tourists_M'], 1),
            'domestic': round(latest['Domestic_Tourists_M'], 1),
            'international': round(latest['International_Tourists_M'], 1),
            'revenue': round(latest['Revenue_B'], 2),
            'growth': round(latest['Growth_Percent'], 1),
            'recovery_rate': round((latest['Total_Tourists'] / df['Total_Tourists'].max()) * 100, 0)
        }
    })

# ---- 2. TRENDS API ----
@app.route('/api/trends')
def get_trends():
    df = get_tourism_data()
    return jsonify({
        'status': 'success',
        'data': {
            'years': df['Year'].tolist(),
            'domestic': df['Domestic_Tourists_M'].tolist(),
            'international': df['International_Tourists_M'].tolist(),
            'revenue': df['Revenue_B'].tolist(),
            'growth': df['Growth_Percent'].tolist()
        }
    })

# ---- 3. PROVINCES API ----
@app.route('/api/provinces')
def get_provinces():
    dest = get_destinations_data()
    result = dest.groupby('Province').agg({
        'Domestic_Visitors_M': 'sum',
        'International_Visitors_K': 'sum',
        'Popularity_Score': 'mean'
    }).reset_index()
    
    return jsonify({
        'status': 'success',
        'data': result.to_dict('records')
    })

# ---- 4. DESTINATIONS API ----
@app.route('/api/destinations')
def get_destinations():
    dest = get_destinations_data()
    return jsonify({
        'status': 'success',
        'data': dest.to_dict('records')
    })

# ---- 5. FORECAST API (Linear Regression) ----
@app.route('/api/forecast')
def get_forecast():
    from sklearn.linear_model import LinearRegression
    
    df = get_tourism_data()
    
    # Use data from 2021 onwards for training
    train_df = df[df['Year'] >= 2021]
    X = train_df[['Year']].values
    y = (train_df['Domestic_Tourists_M'] + train_df['International_Tourists_M']).values
    
    model = LinearRegression()
    model.fit(X, y)
    
    future_years = np.array([2025, 2026, 2027, 2028, 2029, 2030]).reshape(-1, 1)
    predictions = model.predict(future_years)
    
    forecast_data = []
    for i, year in enumerate(future_years.flatten()):
        forecast_data.append({
            'year': int(year),
            'predicted': round(predictions[i], 1)
        })
    
    return jsonify({
        'status': 'success',
        'data': {
            'forecast': forecast_data,
            'model_accuracy': round(model.score(X, y), 3)
        }
    })

# ---- 6. SEASONAL API ----
@app.route('/api/seasonal')
def get_seasonal():
    dest = get_destinations_data()
    seasonal = dest.groupby('Best_Season').size().reset_index(name='count')
    seasonal['percentage'] = round((seasonal['count'] / seasonal['count'].sum()) * 100, 1)
    
    return jsonify({
        'status': 'success',
        'data': seasonal.to_dict('records')
    })

# ---- 7. POPULARITY API ----
@app.route('/api/popularity')
def get_popularity():
    dest = get_destinations_data()
    top = dest.nlargest(8, 'Popularity_Score')[['City', 'Province', 'Popularity_Score', 'Domestic_Visitors_M', 'International_Visitors_K']]
    
    return jsonify({
        'status': 'success',
        'data': top.to_dict('records')
    })

# ---- 8. SAFETY API ----
@app.route('/api/safety')
def get_safety():
    dest = get_destinations_data()
    safety = dest.groupby('Province')['Safety_Rating'].mean().reset_index()
    safety['Safety_Rating'] = safety['Safety_Rating'].round(1)
    
    return jsonify({
        'status': 'success',
        'data': safety.to_dict('records')
    })

# ---- 9. EXPORT CSV ----
@app.route('/api/export/csv')
def export_csv():
    df = get_tourism_data()
    csv_data = df.to_csv(index=False)
    
    return send_file(
        io.BytesIO(csv_data.encode()),
        mimetype='text/csv',
        as_attachment=True,
        download_name='tourism_data.csv'
    )

# ---- 10. EXPORT EXCEL ----
@app.route('/api/export/excel')
def export_excel():
    df = get_tourism_data()
    output = io.BytesIO()
    
    with pd.ExcelWriter(output, engine='openpyxl') as writer:
        df.to_excel(writer, sheet_name='Tourism Data', index=False)
    
    output.seek(0)
    return send_file(
        output,
        mimetype='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        as_attachment=True,
        download_name='tourism_data.xlsx'
    )

if __name__ == '__main__':
    app.run(debug=True, port=5000)