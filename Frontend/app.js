// ============================================================
// 🔥 FIREBASE CONFIGURATION - REPLACE WITH YOUR CREDENTIALS
// ============================================================
const firebaseConfig = {
    apiKey: "AIzaSyBE7K-nlYCJZnsfBuAFW4oTwGpFv3D8DUo",
    authDomain: "paktourintel.firebaseapp.com",
    projectId: "paktourintel",
    storageBucket: "paktourintel.firebasestorage.app",
    messagingSenderId: "1027520239647",
    appId: "1:1027520239647:web:16a73a389b610333f19d2a"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

// Enable offline persistence
db.enablePersistence()
    .then(() => {
        console.log('✅ Firebase offline persistence enabled');
        document.getElementById('dbStatus').className = 'db-status';
        document.getElementById('dbStatus').innerHTML = '<i class="fas fa-circle"></i> Database: Connected (Firebase)';
    })
    .catch((err) => {
        console.warn('⚠️ Offline persistence error:', err);
        document.getElementById('dbStatus').className = 'db-status offline';
        document.getElementById('dbStatus').innerHTML = '<i class="fas fa-circle"></i> Database: Offline Mode (Local Storage)';
    });

// ============================================================
// DESTINATION DATA
// ============================================================
const destinations = [{
    id: 1,
    name: "Hunza Valley",
    province: "Gilgit-Baltistan",
    type: "Mountain",
    season: "Summer",
    temp: "10-18°C",
    cost: 400,
    safety: 5,
    rating: 4.9,
    attraction: "Karimabad Fort, Attabad Lake, Eagle's Nest",
    activities: "Trekking, Cultural Tours, Photography",
    bestTime: "May to October",
    description: "Breathtaking mountain valley with stunning landscapes and rich culture.",
    image: "images/hunza.jpg"
}, {
    id: 2,
    name: "Skardu",
    province: "Gilgit-Baltistan",
    type: "Mountain",
    season: "Summer",
    temp: "7-15°C",
    cost: 450,
    safety: 5,
    rating: 5.0,
    attraction: "Shangrila Lake, Deosai Plains, Katpana Desert",
    activities: "Lake Sightseeing, Camping, Trekking",
    bestTime: "June to September",
    description:" Gateway to world's highest peaks with beautiful lakes.",
    image: "../images/skardu.jpg"
}, {
    id: 3,
    name: "Swat Valley",
    province: "KPK",
    type: "Nature",
    season: "Summer",
    temp: "12-22°C",
    cost: 250,
    safety: 4,
    rating: 4.6,
    attraction: "Malam Jabba, Mahodand Lake, Mingora",
    activities: "Skiing, Hiking, Boating",
    bestTime: "April to October",
    description: "Known as 'Switzerland of the East' with lush green mountains.",
    image: "images/swat.jpg"
}, {
    id: 4,
    name: "Naran Kaghan",
    province: "KPK",
    type: "Nature",
    season: "Summer",
    temp: "8-18°C",
    cost: 280,
    safety: 4,
    rating: 4.7,
    attraction: "Saif-ul-Malook Lake, Ansoo Lake",
    activities: "Boating, Horse Riding, Photography",
    bestTime: "June to September",
    description: "Famous for stunning Saif-ul-Malook Lake.",
    image: "images/naran.jpg"
}, {
    id: 5,
    name: "Fairy Meadows",
    province: "Gilgit-Baltistan",
    type: "Mountain",
    season: "Summer",
    temp: "5-12°C",
    cost: 500,
    safety: 5,
    rating: 5.0,
    attraction: "Nanga Parbat Base Camp, Beyal Camp",
    activities: "Trekking, Camping, Stargazing",
    bestTime: "June to August",
    description: "Breathtaking meadow at the base of Nanga Parbat.",
    image: "images/fairy_meadows.jpg"
}, {
    id: 6,
    name: "Murree",
    province: "Punjab",
    type: "Hill Station",
    season: "Summer",
    temp: "10-20°C",
    cost: 260,
    safety: 4,
    rating: 4.5,
    attraction: "Mall Road, Kashmir Point, Pindi Point",
    activities: "Walking, Shopping, Horse Riding",
    bestTime: "March to October",
    description: "Pakistan's most popular hill station.",
    image: "images/murree.jpg"
}, {
    id: 7,
    name: "Lahore",
    province: "Punjab",
    type: "Historical",
    season: "Winter",
    temp: "10-22°C",
    cost: 300,
    safety: 4,
    rating: 4.8,
    attraction: "Badshahi Mosque, Lahore Fort, Food Street",
    activities: "Historical Tours, Food Exploration",
    bestTime: "October to March",
    description: "Cultural heart of Pakistan with magnificent Mughal architecture.",
    image: "images/lahore.jpg"
}, {
    id: 8,
    name: "Islamabad",
    province: "Punjab",
    type: "Urban",
    season: "Spring",
    temp: "15-25°C",
    cost: 320,
    safety: 5,
    rating: 4.7,
    attraction: "Faisal Mosque, Daman-e-Koh, Lake View",
    activities: "Sightseeing, Hiking, Shopping",
    bestTime: "March to May",
    description: "Modern capital city known for greenery.",
    image: "images/islamabad.jpg"
}, {
    id: 9,
    name: "Neelum Valley",
    province: "AJK",
    type: "Valley",
    season: "Summer",
    temp: "10-20°C",
    cost: 270,
    safety: 5,
    rating: 4.9,
    attraction: "Ratti Gali Lake, Keran, Kutton",
    activities: "Trekking, Boating, Sightseeing",
    bestTime: "May to September",
    description: "Stunning valley with crystal clear rivers.",
    image: "images/neelum.jpg"
}, {
    id: 10,
    name: "Chitral",
    province: "KPK",
    type: "Cultural",
    season: "Summer",
    temp: "10-22°C",
    cost: 280,
    safety: 4,
    rating: 4.6,
    attraction: "Kalash Valley, Shandur Polo",
    activities: "Cultural Tours, Hiking",
    bestTime: "May to September",
    description: "Home to unique Kalash people.",
    image: "images/chitral.jpg"
}, {
    id: 11,
    name: "Gwadar",
    province: "Balochistan",
    type: "Coastal",
    season: "Winter",
    temp: "20-28°C",
    cost: 300,
    safety: 4,
    rating: 4.3,
    attraction: "Hammerhead, Princess of Hope",
    activities: "Beach Walks, Photography",
    bestTime: "October to March",
    description: "Emerging coastal city with beautiful beaches.",
    image: "images/gwadar.jpg"
}, {
    id: 12,
    name: "Karachi",
    province: "Sindh",
    type: "Urban",
    season: "Winter",
    temp: "18-28°C",
    cost: 350,
    safety: 3,
    rating: 4.1,
    attraction: "Clifton Beach, Quaid's Mausoleum",
    activities: "Beach Visits, Food Tours",
    bestTime: "November to February",
    description: "Pakistan's largest city and economic hub.",
    image: "images/karachi.jpg"
}];

// ============================================================
// AUTH SYSTEM WITH FIREBASE
// ============================================================
let currentUser = null;
let authLoading = true;

auth.onAuthStateChanged(async (user) => {
    authLoading = false;
    if (user) {
        const userData = {
            uid: user.uid,
            name: user.displayName || user.email.split('@')[0],
            email: user.email,
            photoURL: user.photoURL
        };
        currentUser = userData;
        localStorage.setItem('pakTourUser', JSON.stringify(userData));
        try {
            const doc = await db.collection('users').doc(user.uid).get();
            if (!doc.exists) {
                await db.collection('users').doc(user.uid).set({
                    name: userData.name,
                    email: userData.email,
                    createdAt: firebase.firestore.FieldValue.serverTimestamp()
                });
            }
        } catch (e) {
            console.warn('⚠️ Firestore error:', e);
        }
    } else {
        currentUser = null;
        localStorage.removeItem('pakTourUser');
    }
    updateAuthUI();
    render();
    startTripCountdowns();
});

// ============================================================
// TRIP MANAGEMENT WITH FIRESTORE
// ============================================================
async function getTrips() {
    if (!currentUser) return [];
    try {
        const snapshot = await db.collection('trips')
            .where('userId', '==', currentUser.uid)
            .orderBy('startDate', 'asc')
            .get();
        const trips = [];
        snapshot.forEach(doc => {
            trips.push({ id: doc.id, ...doc.data() });
        });
        return trips;
    } catch (e) {
        console.warn('⚠️ Firestore read error, using local cache:', e);
        const cached = JSON.parse(localStorage.getItem('pakTourTrips_cache')) || [];
        return cached.filter(t => t.userId === currentUser.uid);
    }
}

async function addTrip(tripData) {
    if (!currentUser) throw new Error('User not logged in');
    const trip = {
        userId: currentUser.uid,
        userEmail: currentUser.email,
        ...tripData,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
        status: 'upcoming'
    };
    try {
        const docRef = await db.collection('trips').add(trip);
        const newTrip = { id: docRef.id, ...trip };
        const cached = JSON.parse(localStorage.getItem('pakTourTrips_cache')) || [];
        cached.push(newTrip);
        localStorage.setItem('pakTourTrips_cache', JSON.stringify(cached));
        return newTrip;
    } catch (e) {
        console.warn('⚠️ Firestore write error, saving locally:', e);
        const tripWithId = { id: 'local_' + Date.now().toString(36), ...trip };
        const cached = JSON.parse(localStorage.getItem('pakTourTrips_cache')) || [];
        cached.push(tripWithId);
        localStorage.setItem('pakTourTrips_cache', JSON.stringify(cached));
        return tripWithId;
    }
}

async function deleteTrip(id) {
    if (!currentUser) return;
    try {
        await db.collection('trips').doc(id).delete();
        const cached = JSON.parse(localStorage.getItem('pakTourTrips_cache')) || [];
        const updated = cached.filter(t => t.id !== id);
        localStorage.setItem('pakTourTrips_cache', JSON.stringify(updated));
    } catch (e) {
        console.warn('⚠️ Firestore delete error:', e);
        const cached = JSON.parse(localStorage.getItem('pakTourTrips_cache')) || [];
        const updated = cached.filter(t => t.id !== id);
        localStorage.setItem('pakTourTrips_cache', JSON.stringify(updated));
    }
}

async function updateTrip(id, data) {
    if (!currentUser) return null;
    try {
        await db.collection('trips').doc(id).update({
            ...data,
            updatedAt: firebase.firestore.FieldValue.serverTimestamp()
        });
        const cached = JSON.parse(localStorage.getItem('pakTourTrips_cache')) || [];
        const index = cached.findIndex(t => t.id === id);
        if (index !== -1) {
            cached[index] = { ...cached[index], ...data };
            localStorage.setItem('pakTourTrips_cache', JSON.stringify(cached));
        }
        return data;
    } catch (e) {
        console.warn('⚠️ Firestore update error:', e);
        const cached = JSON.parse(localStorage.getItem('pakTourTrips_cache')) || [];
        const index = cached.findIndex(t => t.id === id);
        if (index !== -1) {
            cached[index] = { ...cached[index], ...data };
            localStorage.setItem('pakTourTrips_cache', JSON.stringify(cached));
        }
        return data;
    }
}

// ============================================================
// HELPERS
// ============================================================
function showNotification(message, type = 'info') {
    const notif = document.createElement('div');
    notif.style.cssText = `
        position: fixed; bottom: 20px; right: 20px;
        background: ${type === 'error' ? 'linear-gradient(135deg, #EF4444, #DC2626)' : type === 'success' ? 'linear-gradient(135deg, #10B981, #059669)' : 'linear-gradient(135deg, #0B3B5C, #1A5A7A)'};
        color: white; padding: 14px 20px; border-radius: 14px;
        box-shadow: 0 10px 40px rgba(0,0,0,0.2); z-index: 9999;
        max-width: 380px; animation: slideUp 0.5s ease; font-weight: 500;
        display: flex; align-items: center; gap: 10px; font-size: 0.9rem;
        border: 1px solid rgba(255,255,255,0.1);
    `;
    notif.innerHTML =
        `<i class="fas ${type === 'error' ? 'fa-exclamation-circle' : type === 'success' ? 'fa-check-circle' : 'fa-bell'}"></i> ${message}`;
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideUp {
            from { opacity: 0; transform: translateY(30px) scale(0.95); }
            to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes slideDown {
            from { opacity: 1; transform: translateY(0) scale(1); }
            to { opacity: 0; transform: translateY(30px) scale(0.95); }
        }
    `;
    document.head.appendChild(style);
    document.body.appendChild(notif);
    setTimeout(() => {
        notif.style.animation = 'slideDown 0.4s ease';
        setTimeout(() => {
            if (notif.parentNode) notif.parentNode.removeChild(notif);
            if (style.parentNode) style.parentNode.removeChild(style);
        }, 400);
    }, 5000);
    notif.addEventListener('click', () => {
        notif.style.animation = 'slideDown 0.4s ease';
        setTimeout(() => {
            if (notif.parentNode) notif.parentNode.removeChild(notif);
            if (style.parentNode) style.parentNode.removeChild(style);
        }, 400);
    });
}

function getTripStatus(trip) {
    const now = new Date();
    const start = new Date(trip.startDate);
    const end = new Date(trip.endDate);
    if (now < start) return 'upcoming';
    if (now >= start && now <= end) return 'ongoing';
    return 'completed';
}

function getCountdown(trip) {
    const now = new Date();
    const start = new Date(trip.startDate);
    const diff = start - now;
    if (diff <= 0) {
        const end = new Date(trip.endDate);
        const endDiff = end - now;
        if (endDiff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true };
        return { days: Math.floor(endDiff / (1000 * 60 * 60 * 24)), hours: Math.floor((endDiff % (1000 * 60 * 60 *
                24)) / (1000 * 60 * 60)), minutes: Math.floor((endDiff % (1000 * 60 * 60)) / (1000 * 60)),
            seconds: Math.floor((endDiff % (1000 * 60)) / 1000), isPast: false, isOngoing: true };
    }
    return { days: Math.floor(diff / (1000 * 60 * 60 * 24)), hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (
            1000 * 60 * 60)), minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)), seconds: Math
            .floor((diff % (1000 * 60)) / 1000), isPast: false, isOngoing: false };
}

function formatCountdown(cd) {
    if (cd.isPast) return 'Trip Completed! 🎉';
    if (cd.isOngoing) {
        return `${String(cd.days).padStart(2,'0')}d ${String(cd.hours).padStart(2,'0')}h ${String(cd.minutes).padStart(2,'0')}m ${String(cd.seconds).padStart(2,'0')}s (Ongoing)`;
    }
    return `${String(cd.days).padStart(2,'0')}d ${String(cd.hours).padStart(2,'0')}h ${String(cd.minutes).padStart(2,'0')}m ${String(cd.seconds).padStart(2,'0')}s`;
}

let tripIntervals = {};
let reminderIntervals = {};

function sendReminder(trip) {
    const now = new Date();
    const start = new Date(trip.startDate);
    const diff = start - now;
    const daysLeft = Math.floor(diff / (1000 * 60 * 60 * 24));
    if (daysLeft <= 7 && daysLeft >= 0 && daysLeft % 1 === 0) {
        const message =
            `🔔 REMINDER: Your trip to ${trip.destination} starts in ${daysLeft} day${daysLeft !== 1 ? 's' : ''}!`;
        showNotification(message, 'info');
    }
}

function startTripReminders(trip) {
    if (reminderIntervals[trip.id]) clearInterval(reminderIntervals[trip.id]);
    reminderIntervals[trip.id] = setInterval(() => {
        getTrips().then(trips => {
            const updated = trips.find(t => t.id === trip.id);
            if (updated) sendReminder(updated);
        });
    }, 60000);
    setTimeout(() => sendReminder(trip), 2000);
}

function startTripCountdowns() {
    Object.values(tripIntervals).forEach(i => clearInterval(i));
    Object.values(reminderIntervals).forEach(i => clearInterval(i));
    tripIntervals = {};
    reminderIntervals = {};
    getTrips().then(trips => {
        trips.forEach(trip => {
            tripIntervals[trip.id] = setInterval(() => {
                if (currentPage === 'my-trips') renderMyTrips();
            }, 1000);
            startTripReminders(trip);
        });
    });
}

// ============================================================
// AUTH UI
// ============================================================
function updateAuthUI() {
    const authBtns = document.getElementById('authButtons');
    if (currentUser) {
        authBtns.innerHTML = `
            <div class="user-badge">
                <div class="avatar-sm">${currentUser.name.charAt(0).toUpperCase()}</div>
                <span style="font-weight:600;font-size:0.85rem;">${currentUser.name}</span>
            </div>
            <button class="btn-auth logout" onclick="logoutUser()"><i class="fas fa-sign-out-alt"></i> Logout</button>
        `;
    } else {
        authBtns.innerHTML = `
            <button class="btn-auth login" id="loginBtn"><i class="fas fa-sign-in-alt"></i> Login</button>
            <button class="btn-auth register" id="registerBtn"><i class="fas fa-user-plus"></i> Register</button>
        `;
        document.getElementById('loginBtn')?.addEventListener('click', () => openAuth('login'));
        document.getElementById('registerBtn')?.addEventListener('click', () => openAuth('register'));
    }
}

async function logoutUser() {
    try {
        await auth.signOut();
        showNotification('👋 Logged out successfully', 'info');
    } catch (e) {
        console.error('Logout error:', e);
    }
}

function openAuth(mode) {
    const overlay = document.getElementById('authOverlay');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
    const title = document.getElementById('authTitle');
    const sub = document.getElementById('authSub');
    const submitBtn = document.getElementById('authSubmitBtn');
    const switchText = document.getElementById('authSwitchText');
    const switchLink = document.getElementById('authSwitchLink');
    const nameGroup = document.getElementById('authNameGroup');
    if (mode === 'login') {
        title.textContent = 'Login';
        sub.textContent = 'Welcome back! Login to your account';
        submitBtn.innerHTML = '<i class="fas fa-sign-in-alt"></i> Login';
        switchText.textContent = "Don't have an account?";
        switchLink.textContent = 'Register';
        nameGroup.style.display = 'none';
        document.getElementById('authForm').dataset.mode = 'login';
    } else {
        title.textContent = 'Register';
        sub.textContent = 'Create your free account';
        submitBtn.innerHTML = '<i class="fas fa-user-plus"></i> Register';
        switchText.textContent = 'Already have an account?';
        switchLink.textContent = 'Login';
        nameGroup.style.display = 'block';
        document.getElementById('authForm').dataset.mode = 'register';
    }
    document.getElementById('authEmail').value = '';
    document.getElementById('authPassword').value = '';
    document.getElementById('authName').value = '';
}

function closeAuth() {
    document.getElementById('authOverlay').classList.remove('active');
    document.body.style.overflow = '';
}

async function handleAuth(e) {
    e.preventDefault();
    const mode = document.getElementById('authForm').dataset.mode;
    const email = document.getElementById('authEmail').value.trim();
    const password = document.getElementById('authPassword').value.trim();
    const name = document.getElementById('authName').value.trim();
    try {
        if (mode === 'login') {
            await auth.signInWithEmailAndPassword(email, password);
            closeAuth();
            showNotification('✅ Welcome back!', 'success');
        } else {
            if (!name) {
                showNotification('❌ Please enter your full name', 'error');
                return;
            }
            const userCredential = await auth.createUserWithEmailAndPassword(email, password);
            await userCredential.user.updateProfile({ displayName: name });
            closeAuth();
            showNotification('🎉 Account created successfully! Welcome ' + name, 'success');
        }
    } catch (err) {
        showNotification('❌ ' + err.message, 'error');
    }
}

// ============================================================
// HAMBURGER MENU
// ============================================================
function initMobileMenu() {
    const menuIcon = document.getElementById('menuIcon');
    const navLinks = document.getElementById('navLinks');
    const overlay = document.getElementById('mobileOverlay');
    const icon = menuIcon.querySelector('i');

    function toggleMenu() {
        const isOpen = navLinks.classList.toggle('open');
        overlay.classList.toggle('active');
        icon.className = isOpen ? 'fas fa-times' : 'fas fa-bars';
        document.body.style.overflow = isOpen ? 'hidden' : '';
    }

    function closeMenu() {
        navLinks.classList.remove('open');
        overlay.classList.remove('active');
        icon.className = 'fas fa-bars';
        document.body.style.overflow = '';
    }
    menuIcon.addEventListener('click', toggleMenu);
    overlay.addEventListener('click', closeMenu);
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 820) closeMenu();
        });
    });
    window.addEventListener('resize', () => {
        if (window.innerWidth > 820) closeMenu();
    });
}

// ============================================================
// RENDER ENGINE
// ============================================================
let currentPage = "home";
let charts = {};

function render() {
    const root = document.getElementById("app-root");
    if (currentPage === "home") root.innerHTML = renderHome();
    else if (currentPage === "planner") root.innerHTML = renderPlanner();
    else if (currentPage === "my-trips") root.innerHTML = renderMyTripsPage();
    else if (currentPage === "seasonal") root.innerHTML = renderSeasonal();
    else if (currentPage === "dashboard") root.innerHTML = renderDashboard();
    else if (currentPage === "contact") root.innerHTML = renderContact();
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.toggle('active', link.getAttribute('data-page') === currentPage);
    });
    if (currentPage === "home") {
        loadHomeDestinations();
        startCounters();
    }
    if (currentPage === "planner") {
        setTimeout(() => {
            attachLiveSuggestions();
            attachPlannerEvents();
            performSearch();
        }, 100);
    }
    if (currentPage === "my-trips") {
        setTimeout(() => {
            renderMyTrips();
            startTripCountdowns();
        }, 100);
    }
    if (currentPage === "seasonal") {
        setTimeout(initSeasonal, 100);
    }
    if (currentPage === "dashboard") {
        setTimeout(initDashboardCharts, 100);
    }
    document.getElementById('closeTripForm')?.addEventListener('click', closeTripForm);
    document.getElementById('tripFormOverlay')?.addEventListener('click', (e) => {
        if (e.target === e.currentTarget) closeTripForm();
    });
    document.getElementById('tripPlanForm')?.addEventListener('submit', async function(e) {
        e.preventDefault();
        if (!currentUser) {
            showNotification('⚠️ Please login or register first!', 'error');
            closeTripForm();
            setTimeout(() => openAuth('login'), 300);
            return;
        }
        const tripData = {
            destination: document.getElementById('tripDestination').value,
            startDate: document.getElementById('tripStartDate').value,
            endDate: document.getElementById('tripEndDate').value,
            travelers: parseInt(document.getElementById('tripTravelers').value),
            budget: parseInt(document.getElementById('tripBudget').value),
            notes: document.getElementById('tripNotes').value,
        };
        if (!tripData.destination || !tripData.startDate || !tripData.endDate) {
            showNotification('⚠️ Please fill in all required fields.', 'error');
            return;
        }
        const newTrip = await addTrip(tripData);
        closeTripForm();
        showNotification(`✅ Trip to ${tripData.destination} planned successfully!`, 'success');
        document.getElementById('tripPlanForm').reset();
        if (currentPage !== 'my-trips') {
            currentPage = 'my-trips';
            render();
        } else {
            renderMyTrips();
            startTripCountdowns();
        }
    });
    document.querySelectorAll('.footer-section a[data-page]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            currentPage = link.getAttribute('data-page');
            render();
        });
    });
    if (window.innerWidth <= 820) {
        const navLinks = document.getElementById('navLinks');
        const overlay = document.getElementById('mobileOverlay');
        const menuIcon = document.getElementById('menuIcon');
        if (navLinks) navLinks.classList.remove('open');
        if (overlay) overlay.classList.remove('active');
        if (menuIcon) {
            const icon = menuIcon.querySelector('i');
            if (icon) icon.className = 'fas fa-bars';
        }
        document.body.style.overflow = '';
    }
}

// ============================================================
// HERO BANNER
// ============================================================
function getHeroBanner(title, subtitle, buttons = '', bgImage = '') {
    const bg = bgImage ||
        'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2070&auto=format&fit=crop';
    return `
        <div class="hero-banner">
            <div class="hero-bg" style="background-image: url('${bg}');"></div>
            <div class="hero-overlay"></div>
            <div class="hero-content">
                <h1>${title}</h1>
                <p>${subtitle}</p>
                ${buttons}
            </div>
            <div class="image-credit"><i class="fas fa-camera"></i> Photo by <a href="https://unsplash.com" target="_blank">Unsplash</a></div>
        </div>
    `;
}

// ============================================================
// HOME PAGE
// ============================================================
function renderHome() {
    const heroBg = 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2070&auto=format&fit=crop';
    const heroButtons = `
        <div class="hero-buttons">
            <button class="btn-primary" onclick="openTripForm()"><i class="fas fa-map-marked-alt"></i> Plan Your Trip</button>
            <button class="btn-outline" onclick="document.querySelector('[data-page=\\'dashboard\\']').click()"><i class="fas fa-chart-line"></i> View Analytics</button>
        </div>
    `;
    return `
        <div class="container">
            ${getHeroBanner('<i class="fas fa-chart-line"></i> Pakistan Tourism Intelligence', 'Official PTDC Data • AI-Powered Trip Planning • Live Suggestions • Forecasting 2025-2030', heroButtons, heroBg)}
            <div class="section-header"><i class="fas fa-star"></i> Top Rated Destinations <span>(Click to plan a trip)</span></div>
            <div class="cards-grid" id="homeDestinations"></div>
            <div class="stats-grid">
                <div class="stat"><h3 class="counter" id="counter1" data-target="28.5">0</h3><p><i class="fas fa-users"></i> Million Visitors (2024)</p></div>
                <div class="stat"><h3 class="counter" id="counter2" data-target="12">0</h3><p><i class="fas fa-map-pin"></i> Destinations</p></div>
                <div class="stat"><h3 class="counter" id="counter3" data-target="6">0</h3><p><i class="fas fa-flag"></i> Regions</p></div>
                <div class="stat"><h3 class="counter" id="counter4" data-target="0">0</h3><p><i class="fas fa-suitcase"></i> My Trips Planned</p></div>
            </div>
            <div class="premium-features-section">
                <div class="section-header"><i class="fas fa-crown"></i> Premium Features</div>
                <div class="premium-features-grid">
                    <div class="premium-card" onclick="document.querySelector('[data-page=\\'planner\\']').click()">
                        <div class="icon-wrapper purple"><i class="fas fa-brain"></i></div>
                        <h3>AI Trip Planner</h3>
                        <p>Personalized recommendations with live search and smart filtering.</p>
                        <span class="feature-tag"><i class="fas fa-rocket"></i> AI Powered</span>
                        <div class="btn-explore">Explore <i class="fas fa-arrow-right"></i></div>
                    </div>
                    <div class="premium-card" onclick="document.querySelector('[data-page=\\'dashboard\\']').click()">
                        <div class="icon-wrapper blue"><i class="fas fa-chart-pie"></i></div>
                        <h3>Analytics Dashboard</h3>
                        <p>Real-time tourism data with interactive charts and detailed KPIs.</p>
                        <span class="feature-tag"><i class="fas fa-chart-line"></i> Data Driven</span>
                        <div class="btn-explore">View <i class="fas fa-arrow-right"></i></div>
                    </div>
                    <div class="premium-card" onclick="document.querySelector('[data-page=\\'my-trips\\']').click()">
                        <div class="icon-wrapper green"><i class="fas fa-clock"></i></div>
                        <h3>Trip Countdown & Reminders</h3>
                        <p>Live countdown timers and smart reminders for your upcoming trips.</p>
                        <span class="feature-tag"><i class="fas fa-bell"></i> Smart Reminders</span>
                        <div class="btn-explore">View Trips <i class="fas fa-arrow-right"></i></div>
                    </div>
                    <div class="premium-card" onclick="document.querySelector('[data-page=\\'seasonal\\']').click()">
                        <div class="icon-wrapper orange"><i class="fas fa-calendar-alt"></i></div>
                        <h3>Seasonal Guide</h3>
                        <p>Best times to visit each destination with detailed weather insights.</p>
                        <span class="feature-tag"><i class="fas fa-sun"></i> Weather Wise</span>
                        <div class="btn-explore">Explore <i class="fas fa-arrow-right"></i></div>
                    </div>
                </div>
            </div>
            <div class="section-header"><i class="fas fa-comment-dots"></i> Traveler Reviews</div>
            <div class="reviews-grid">
                <div class="review-card-new">
                    <div class="review-top">
                        <div class="reviewer-info">
                            <div class="reviewer-avatar">MA</div>
                            <div><div class="reviewer-name">Muhammad Ahmed</div><div class="reviewer-location"><i class="fas fa-map-pin"></i> Islamabad</div></div>
                        </div>
                        <div class="stars"><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i></div>
                    </div>
                    <div class="review-text">"Hunza Valley is paradise! The safety rating of 5/5 is absolutely accurate. The people are incredibly welcoming and the scenery is unmatched."</div>
                    <div class="review-footer"><span class="badge"><i class="fas fa-check-circle"></i> Verified</span><span class="date"><i class="fas fa-clock"></i> 2 weeks ago</span></div>
                </div>
                <div class="review-card-new">
                    <div class="review-top">
                        <div class="reviewer-info">
                            <div class="reviewer-avatar">SK</div>
                            <div><div class="reviewer-name">Sarah Khan</div><div class="reviewer-location"><i class="fas fa-map-pin"></i> Lahore</div></div>
                        </div>
                        <div class="stars"><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i></div>
                    </div>
                    <div class="review-text">"PTDC data helped us plan our Swat trip perfectly. The seasonal recommendations are spot on and saved us valuable time!"</div>
                    <div class="review-footer"><span class="badge"><i class="fas fa-check-circle"></i> Verified</span><span class="date"><i class="fas fa-clock"></i> 1 month ago</span></div>
                </div>
                <div class="review-card-new">
                    <div class="review-top">
                        <div class="reviewer-info">
                            <div class="reviewer-avatar">AR</div>
                            <div><div class="reviewer-name">Ali Raza</div><div class="reviewer-location"><i class="fas fa-map-pin"></i> Karachi</div></div>
                        </div>
                        <div class="stars"><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star-half-alt"></i></div>
                    </div>
                    <div class="review-text">"Skardu's Shangrila Lake is breathtaking. Best time to visit is summer (June-August). The forecasting tool is amazing!"</div>
                    <div class="review-footer"><span class="badge"><i class="fas fa-check-circle"></i> Verified</span><span class="date"><i class="fas fa-clock"></i> 3 months ago</span></div>
                </div>
            </div>
        </div>
    `;
}

function loadHomeDestinations() {
    const container = document.getElementById('homeDestinations');
    if (!container) return;
    const topDest = [...destinations].sort((a, b) => b.rating - a.rating).slice(0, 6);
    container.innerHTML = topDest.map(d => `
        <div class="flip-card" onclick="openTripForm('${d.name}')">
            <div class="flip-card-inner">
                <div class="flip-card-front">
                    <div class="card-image-area">
                        <img src="${d.image}" alt="${d.name}" class="dest-img" loading="lazy">
                        <div class="card-overlay-badge"><i class="fas fa-star"></i> ${d.rating}/5</div>
                    </div>
                    <div class="card-content-area">
                        <div class="card-title">${d.name}</div>
                        <div class="card-location"><i class="fas fa-map-pin"></i> ${d.province}</div>
                        <div class="card-stats">
                            <span class="stat-badge"><i class="fas fa-calendar"></i> ${d.season}</span>
                            <span class="stat-badge"><i class="fas fa-shield-alt"></i> Safety ${d.safety}/5</span>
                            <span class="stat-badge"><i class="fas fa-dollar-sign"></i> $${d.cost}/day</span>
                        </div>
                        <div class="card-desc">${d.description.substring(0, 60)}...</div>
                    </div>
                </div>
                <div class="flip-card-back">
                    <div class="back-icon"><i class="fas fa-gem"></i></div>
                    <h3>${d.name}</h3>
                    <div class="back-details">
                        <p><i class="fas fa-landmark"></i> <strong>Attractions:</strong> ${d.attraction}</p>
                        <p><i class="fas fa-hiking"></i> <strong>Activities:</strong> ${d.activities}</p>
                        <p><i class="fas fa-clock"></i> <strong>Best Time:</strong> ${d.bestTime}</p>
                        <p><i class="fas fa-temperature-high"></i> <strong>Temperature:</strong> ${d.temp}</p>
                    </div>
                    <div class="back-tags">
                        <span><i class="fas fa-star" style="color:gold;"></i> ${d.rating}/5</span>
                        <span><i class="fas fa-shield-alt"></i> Safety ${d.safety}/5</span>
                        <span><i class="fas fa-dollar-sign"></i> $${d.cost}/day</span>
                    </div>
                    <button class="book-btn-flip" onclick="event.stopPropagation(); openTripForm('${d.name}')"><i class="fas fa-calendar-check"></i> Plan This Trip</button>
                </div>
            </div>
        </div>
    `).join('');
}

async function startCounters() {
    const trips = await getTrips();
    const tripCount = trips.length;
    const counters = [
        { element: document.getElementById('counter1'), target: 28.5, isDecimal: true },
        { element: document.getElementById('counter2'), target: 12, isDecimal: false },
        { element: document.getElementById('counter3'), target: 6, isDecimal: false },
        { element: document.getElementById('counter4'), target: tripCount, isDecimal: false }
    ];
    counters.forEach(counter => {
        if (!counter.element) return;
        let current = 0;
        const target = counter.target;
        const duration = 2000;
        const steps = duration / 20;
        const increment = target / steps;
        const interval = setInterval(() => {
            current += increment;
            if (current >= target) {
                counter.element.innerText = counter.isDecimal ? target.toFixed(1) : target;
                clearInterval(interval);
            } else {
                counter.element.innerText = counter.isDecimal ? current.toFixed(1) : Math.floor(current);
            }
        }, 20);
    });
}

// ============================================================
// PLANNER PAGE
// ============================================================
function renderPlanner() {
    const heroBg = 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2070&auto=format&fit=crop';
    return `<div class="container">
        ${getHeroBanner('<i class="fas fa-map-marked-alt"></i> Smart Trip Planner', 'Find your perfect destination with live search suggestions', '', heroBg)}
        <div class="filter-bar">
            <i class="fas fa-sliders-h"></i>
            <div class="form-group" style="flex:2;min-width:200px;">
                <label><i class="fas fa-search"></i> Search <span style="color:var(--secondary);">(Live)</span></label>
                <input type="text" id="destSearchInput" placeholder="Type destination name..." autocomplete="off">
                <div id="liveSuggestions" class="suggestions-box"></div>
            </div>
            <div class="form-group"><label><i class="fas fa-calendar"></i> Season</label><select id="filterSeason"><option value="">All</option><option value="Summer">Summer</option><option value="Winter">Winter</option><option value="Spring">Spring</option></select></div>
            <div class="form-group"><label><i class="fas fa-tag"></i> Type</label><select id="filterType"><option value="">All</option><option value="Mountain">Mountain</option><option value="Nature">Nature</option><option value="Historical">Historical</option></select></div>
            <div class="form-group"><label><i class="fas fa-dollar-sign"></i> Budget</label><input type="number" id="filterBudget" value="400"></div>
            <button class="search-btn" id="searchBtn"><i class="fas fa-search"></i> Find</button>
        </div>
        <div id="plannerResults" class="cards-grid"></div>
    </div>`;
}

function attachLiveSuggestions() {
    const searchInput = document.getElementById('destSearchInput');
    const suggestionsBox = document.getElementById('liveSuggestions');
    if (!searchInput) return;
    searchInput.addEventListener('input', function(e) {
        const query = e.target.value.toLowerCase().trim();
        if (query.length < 2) { suggestionsBox.style.display = 'none'; return; }
        const matches = destinations.filter(d => d.name.toLowerCase().includes(query)).slice(0, 5);
        if (matches.length > 0) {
            suggestionsBox.innerHTML = matches.map(d =>
                `<div class="suggestion-item" onclick="selectDestination('${d.name}')"><i class="fas fa-map-marker-alt"></i> ${d.name} - ${d.province} <i class="fas fa-star" style="color:gold;"></i> ${d.rating}/5</div>`
            ).join('');
            suggestionsBox.style.display = 'block';
        } else { suggestionsBox.style.display = 'none'; }
    });
    document.addEventListener('click', (e) => { if (e.target !== searchInput) suggestionsBox.style.display = 'none'; });
}

window.selectDestination = function(name) {
    document.getElementById('destSearchInput').value = name;
    document.getElementById('liveSuggestions').style.display = 'none';
    performSearch();
};

function attachPlannerEvents() {
    document.getElementById('searchBtn')?.addEventListener('click', () => performSearch());
    document.getElementById('filterSeason')?.addEventListener('change', () => performSearch());
    document.getElementById('filterType')?.addEventListener('change', () => performSearch());
    document.getElementById('filterBudget')?.addEventListener('input', () => performSearch());
}

function performSearch() {
    const searchQuery = document.getElementById('destSearchInput')?.value.toLowerCase() || '';
    const season = document.getElementById('filterSeason')?.value || '';
    const type = document.getElementById('filterType')?.value || '';
    const budget = parseInt(document.getElementById('filterBudget')?.value || 400);
    let filtered = destinations.filter(d => d.cost <= budget + 50);
    if (season) filtered = filtered.filter(d => d.season === season);
    if (type) filtered = filtered.filter(d => d.type === type);
    if (searchQuery) filtered = filtered.filter(d => d.name.toLowerCase().includes(searchQuery));
    const grid = document.getElementById('plannerResults');
    if (!grid) return;
    if (filtered.length > 0) {
        grid.innerHTML = filtered.map(d =>
            `<div class="card" style="background:var(--white);border-radius:var(--radius);padding:1.2rem;box-shadow:var(--shadow);border:1px solid rgba(0,0,0,0.06);transition:var(--transition);"><div style="height:120px;border-radius:1rem;overflow:hidden;margin-bottom:0.8rem;"><img src="${d.image}" alt="${d.name}" style="width:100%;height:100%;object-fit:cover;"></div><h3>${d.name}</h3><div class="card-location"><i class="fas fa-map-pin"></i> ${d.province}</div><p style="font-size:0.8rem;color:var(--gray);">${d.description.substring(0,60)}...</p><div class="card-stats"><span class="stat-badge"><i class="fas fa-star" style="color:gold;"></i> ${d.rating}/5</span><span class="stat-badge"><i class="fas fa-dollar-sign"></i> $${d.cost}/day</span></div><button class="btn-primary" style="width:100%;margin-top:0.5rem;justify-content:center;padding:0.6rem;" onclick="openTripForm('${d.name}')"><i class="fas fa-calendar-check"></i> Plan Trip</button></div>`
        ).join('');
    } else {
        grid.innerHTML =
            '<div style="grid-column:1/-1;text-align:center;padding:2rem;background:var(--white);border-radius:var(--radius);"><i class="fas fa-exclamation-circle"></i> No destinations found. Try different filters.</div>';
    }
}

// ============================================================
// MY TRIPS PAGE
// ============================================================
function renderMyTripsPage() {
    const heroBg = 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=2070&auto=format&fit=crop';
    const heroButtons = `<button class="btn-primary" onclick="openTripForm()" style="margin-top:0.8rem;padding:0.6rem 1.5rem;font-size:0.9rem;"><i class="fas fa-plus-circle"></i> Plan New Trip</button>`;
    return `<div class="container">
        ${getHeroBanner('<i class="fas fa-suitcase"></i> My Trips', 'Manage all your planned trips, countdowns, and reminders', heroButtons, heroBg)}
        <div id="myTripsContainer"></div>
    </div>`;
}

async function renderMyTrips() {
    const container = document.getElementById('myTripsContainer');
    if (!container) return;
    const trips = await getTrips();
    if (trips.length === 0) {
        container.innerHTML = `
            <div class="my-trips-grid">
                <div class="empty-trips">
                    <i class="fas fa-suitcase"></i>
                    <h3>No trips planned yet</h3>
                    <p style="color:var(--gray);">Start planning your next adventure!</p>
                    <button class="btn-primary" onclick="openTripForm()" style="margin-top:0.8rem;"><i class="fas fa-plus-circle"></i> Plan Your First Trip</button>
                </div>
            </div>
        `;
        return;
    }
    const sortedTrips = [...trips].sort((a, b) => new Date(a.startDate) - new Date(b.startDate));
    container.innerHTML = `
        <div class="my-trips-grid">
            ${sortedTrips.map(trip => {
                const status = getTripStatus(trip);
                const countdown = getCountdown(trip);
                const statusLabels = { upcoming: 'Upcoming', ongoing: 'Ongoing 🚀', completed: 'Completed ✅' };
                const statusClasses = { upcoming: 'upcoming', ongoing: 'ongoing', completed: 'completed' };
                return `
                    <div class="trip-card" id="trip-${trip.id}">
                        <span class="trip-status ${statusClasses[status]}">${statusLabels[status]}</span>
                        <h3>${trip.destination}</h3>
                        <div class="trip-dest"><i class="fas fa-map-pin"></i> ${destinations.find(d => d.name === trip.destination)?.province || 'Pakistan'}</div>
                        <div class="trip-info">
                            <span class="info-item"><i class="fas fa-calendar"></i> ${new Date(trip.startDate).toLocaleDateString()}</span>
                            <span class="info-item"><i class="fas fa-calendar"></i> ${new Date(trip.endDate).toLocaleDateString()}</span>
                            <span class="info-item"><i class="fas fa-users"></i> ${trip.travelers}</span>
                            <span class="info-item"><i class="fas fa-dollar-sign"></i> $${trip.budget}</span>
                        </div>
                        ${trip.notes ? `<p style="font-size:0.8rem;color:var(--gray);margin:0.4rem 0;"><i class="fas fa-sticky-note"></i> ${trip.notes}</p>` : ''}
                        <div class="trip-countdown">
                            <div class="label">${status === 'upcoming' ? 'Time Until Trip' : status === 'ongoing' ? 'Trip in Progress' : 'Trip Completed'}</div>
                            <div class="timer">${formatCountdown(countdown)}</div>
                        </div>
                        <div class="trip-actions">
                            <button class="btn-edit" onclick="editTrip('${trip.id}')"><i class="fas fa-edit"></i> Edit</button>
                            <button class="btn-delete" onclick="deleteTripHandler('${trip.id}')"><i class="fas fa-trash"></i> Delete</button>
                        </div>
                    </div>
                `;
            }).join('')}
        </div>
    `;
    const counter4 = document.getElementById('counter4');
    if (counter4) counter4.innerText = trips.length;
}

window.deleteTripHandler = async function(id) {
    if (confirm('Are you sure you want to delete this trip?')) {
        await deleteTrip(id);
        renderMyTrips();
        showNotification('🗑️ Trip deleted successfully', 'info');
    }
};

window.editTrip = function(id) {
    getTrips().then(trips => {
        const trip = trips.find(t => t.id === id);
        if (!trip) return;
        openTripForm(trip.destination);
        document.getElementById('tripStartDate').value = trip.startDate;
        document.getElementById('tripEndDate').value = trip.endDate;
        document.getElementById('tripTravelers').value = trip.travelers;
        document.getElementById('tripBudget').value = trip.budget;
        document.getElementById('tripNotes').value = trip.notes || '';
        const form = document.getElementById('tripPlanForm');
        const originalSubmit = form.onsubmit;
        form.onsubmit = async function(e) {
            e.preventDefault();
            const updatedData = {
                destination: document.getElementById('tripDestination').value,
                startDate: document.getElementById('tripStartDate').value,
                endDate: document.getElementById('tripEndDate').value,
                travelers: parseInt(document.getElementById('tripTravelers').value),
                budget: parseInt(document.getElementById('tripBudget').value),
                notes: document.getElementById('tripNotes').value,
            };
            await updateTrip(id, updatedData);
            closeTripForm();
            showNotification(`✅ Trip updated successfully!`, 'success');
            form.onsubmit = originalSubmit;
            document.getElementById('tripPlanForm').reset();
            renderMyTrips();
            startTripCountdowns();
        };
        const originalClose = window.closeTripForm;
        window.closeTripForm = function() {
            form.onsubmit = originalSubmit;
            originalClose();
            window.closeTripForm = originalClose;
        };
    });
};

// ============================================================
// SEASONAL PAGE
// ============================================================
function renderSeasonal() {
    const heroBg = 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=2070&auto=format&fit=crop';
    return `<div class="container">
        ${getHeroBanner('<i class="fas fa-calendar-alt"></i> Seasonal Travel Guide', 'Discover the best destinations across Pakistan for every season', '', heroBg)}
        <div class="seasonal-tabs">
            <button class="seasonal-tab active" data-season="Summer"><i class="fas fa-sun"></i> Summer</button>
            <button class="seasonal-tab" data-season="Winter"><i class="fas fa-snowflake"></i> Winter</button>
            <button class="seasonal-tab" data-season="Spring"><i class="fas fa-seedling"></i> Spring</button>
        </div>
        <div id="seasonalResults" class="seasonal-grid"></div>
    </div>`;
}

function initSeasonal() {
    const tabs = document.querySelectorAll('.seasonal-tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            tabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            renderSeasonalCards(this.dataset.season);
        });
    });
    renderSeasonalCards('Summer');
}

function renderSeasonalCards(season) {
    const container = document.getElementById('seasonalResults');
    if (!container) return;
    const filtered = destinations.filter(d => d.season === season);
    const seasonIcon = { 'Summer': 'fa-sun', 'Winter': 'fa-snowflake', 'Spring': 'fa-seedling' };
    const seasonColor = { 'Summer': 'summer', 'Winter': 'winter', 'Spring': 'spring' };
    if (filtered.length === 0) {
        container.innerHTML =
            `<div style="grid-column:1/-1;text-align:center;padding:2.5rem;background:var(--white);border-radius:var(--radius);"><i class="fas fa-search" style="font-size:2.5rem;color:var(--gray);opacity:0.3;"></i><p style="margin-top:0.8rem;color:var(--gray);">No destinations found for ${season}</p></div>`;
        return;
    }
    container.innerHTML = filtered.map(d => `
        <div class="seasonal-card">
            <div class="card-img">
                <img src="${d.image}" alt="${d.name}" loading="lazy">
                <span class="season-badge ${seasonColor[season]}"><i class="fas ${seasonIcon[season]}"></i> ${season}</span>
            </div>
            <div class="card-body">
                <h3>${d.name}</h3>
                <div class="location"><i class="fas fa-map-pin"></i> ${d.province}</div>
                <div class="desc">${d.description.substring(0, 70)}...</div>
                <div class="meta-row">
                    <span class="tag"><i class="fas fa-temperature-high"></i> ${d.temp}</span>
                    <span class="tag"><i class="fas fa-dollar-sign"></i> $${d.cost}/day</span>
                    <span class="tag"><i class="fas fa-star" style="color:gold;"></i> ${d.rating}/5</span>
                </div>
                <button class="btn-sm" onclick="openTripForm('${d.name}')" style="width:100%;margin-top:0.6rem;padding:0.6rem;border:none;border-radius:50px;font-weight:700;cursor:pointer;transition:var(--transition);background:linear-gradient(135deg,var(--secondary),var(--secondary-light));color:white;display:flex;align-items:center;justify-content:center;gap:6px;font-size:0.85rem;">
                    <i class="fas fa-calendar-check"></i> Plan This Trip
                </button>
            </div>
        </div>
    `).join('');
}

// ============================================================
// DASHBOARD PAGE
// ============================================================
function renderDashboard() {
    const heroBg = 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop';
    return `<div class="container">
        ${getHeroBanner('<i class="fas fa-chart-pie"></i> Analytics Dashboard', 'Tourism statistics from PTDC', '', heroBg)}
        <div class="dashboard-kpi">
            <div class="kpi-card"><h3><i class="fas fa-users"></i> Visitors 2024</h3><p>28.5M</p></div>
            <div class="kpi-card"><h3><i class="fas fa-crown"></i> Top Destination</h3><p>Hunza Valley</p></div>
            <div class="kpi-card"><h3><i class="fas fa-shield-alt"></i> Avg Safety</h3><p>4.5/5</p></div>
            <div class="kpi-card"><h3><i class="fas fa-suitcase"></i> My Trips</h3><p id="tripCountDisplay">0</p></div>
        </div>
        <div class="charts-row">
            <div class="chart-box"><canvas id="arrivalsChart"></canvas></div>
            <div class="chart-box"><canvas id="revenueChart"></canvas></div>
        </div>
    </div>`;
}

async function initDashboardCharts() {
    const trips = await getTrips();
    document.getElementById('tripCountDisplay').textContent = trips.length;
    if (charts.arrivals) charts.arrivals.destroy();
    if (charts.revenue) charts.revenue.destroy();
    charts.arrivals = new Chart(document.getElementById('arrivalsChart'), {
        type: 'line',
        data: {
            labels: historicalData.map(d => d.year),
            datasets: [{ label: 'International Arrivals (Thousands)', data: historicalData.map(d => d
                    .arrivals), borderColor: '#E87A2A', fill: true, tension: 0.3 }]
        },
        options: { responsive: true, plugins: { legend: { position: 'top' } } }
    });
    charts.revenue = new Chart(document.getElementById('revenueChart'), {
        type: 'bar',
        data: {
            labels: historicalData.map(d => d.year),
            datasets: [{ label: 'Revenue (M USD)', data: historicalData.map(d => d.revenue),
                backgroundColor: '#0B3B5C', borderRadius: 6 }]
        },
        options: { responsive: true, plugins: { legend: { position: 'top' } } }
    });
}

// ============================================================
// CONTACT PAGE
// ============================================================
function renderContact() {
    const heroBg = 'https://images.unsplash.com/photo-1422228258301-ed83f3b4b124?q=80&w=2070&auto=format&fit=crop';
    return `<div class="container">
        ${getHeroBanner('<i class="fas fa-envelope"></i> Contact PTDC', 'Get in touch with us', '', heroBg)}
        <div class="contact-wrapper">
            <div style="flex:1;background:var(--white);border-radius:var(--radius);padding:2rem;box-shadow:var(--shadow);">
                <h3 style="font-size:1.2rem;font-weight:800;margin-bottom:0.5rem;"><i class="fas fa-paper-plane" style="color:var(--secondary);"></i> Send Message</h3>
                <form class="contact-form" onsubmit="event.preventDefault(); showNotification('✅ Thank you! Your message has been sent.','success');">
                    <input type="text" placeholder="Full Name" required>
                    <input type="email" placeholder="Email Address" required>
                    <input type="text" placeholder="Subject">
                    <textarea rows="4" placeholder="Your Message" required></textarea>
                    <button class="btn-primary" type="submit" style="width:100%;justify-content:center;padding:0.8rem;"><i class="fas fa-paper-plane"></i> Send Message</button>
                </form>
            </div>
            <div class="contact-info-card">
                <div class="icon-box"><i class="fas fa-building"></i></div>
                <h3>PTDC Head Office</h3>
                <p><i class="fas fa-map-marker-alt"></i> Hostel City, Islamabad</p>
                <p><i class="fas fa-phone"></i> +92 326 9147767</p>
                <p><i class="fas fa-envelope"></i> info@ptdc.gov.pk</p>
                <div class="divider"></div>
                <h4 style="color:var(--dark);margin-bottom:0.3rem;"><i class="fas fa-clock" style="color:var(--secondary);"></i> Office Hours</h4>
                <p style="font-size:0.9rem;">Monday - Friday: 9:00 AM - 5:00 PM</p>
                <p style="font-size:0.9rem;">Saturday - Sunday: Closed</p>
            </div>
        </div>
    </div>`;
}

// ============================================================
// TRIP FORM FUNCTIONS
// ============================================================
function openTripForm(destination = '') {
    if (!currentUser) {
        showNotification('⚠️ Please login or register first to plan a trip!', 'error');
        setTimeout(() => openAuth('login'), 300);
        return;
    }
    const overlay = document.getElementById('tripFormOverlay');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
    if (destination) document.getElementById('tripDestination').value = destination;
    const today = new Date();
    const startDate = new Date(today);
    startDate.setDate(today.getDate() + 7);
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + 3);
    document.getElementById('tripStartDate').value = startDate.toISOString().split('T')[0];
    document.getElementById('tripEndDate').value = endDate.toISOString().split('T')[0];
}

function closeTripForm() {
    document.getElementById('tripFormOverlay').classList.remove('active');
    document.body.style.overflow = '';
}

// ============================================================
// NAVIGATION
// ============================================================
function setupNavigation() {
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            currentPage = link.getAttribute('data-page');
            render();
        });
    });
    window.addEventListener('scroll', () => {
        document.getElementById('navbar')?.classList.toggle('scrolled', window.scrollY > 20);
    });
    document.getElementById('loginBtn')?.addEventListener('click', () => openAuth('login'));
    document.getElementById('registerBtn')?.addEventListener('click', () => openAuth('register'));
    document.getElementById('closeAuth')?.addEventListener('click', closeAuth);
    document.getElementById('authOverlay')?.addEventListener('click', (e) => {
        if (e.target === e.currentTarget) closeAuth();
    });
    document.getElementById('authSwitchLink')?.addEventListener('click', function() {
        const mode = document.getElementById('authForm').dataset.mode;
        closeAuth();
        setTimeout(() => openAuth(mode === 'login' ? 'register' : 'login'), 300);
    });
    document.getElementById('authForm')?.addEventListener('submit', handleAuth);
}

// ============================================================
// INIT
// ============================================================
initMobileMenu();

window.openTripForm = openTripForm;
window.closeTripForm = closeTripForm;
window.openAuth = openAuth;
window.closeAuth = closeAuth;
window.logoutUser = logoutUser;

const checkAuth = setInterval(() => {
    if (!authLoading) {
        clearInterval(checkAuth);
        render();
        setupNavigation();
        startTripCountdowns();
        console.log('✅ PakTourIntel loaded with Firebase!');
        console.log(`👤 User: ${currentUser ? currentUser.name : 'Not logged in'}`);
    }
}, 100);

setInterval(async () => {
    const trips = await getTrips();
    trips.forEach(trip => sendReminder(trip));
}, 3600000);