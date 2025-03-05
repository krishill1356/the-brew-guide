
// User authentication (mockup for now)
let currentUser = null;

// Simulated user database (this should be connected to a backend in production)
let users = JSON.parse(localStorage.getItem("users")) || {};

// Sign-up function
function signUp(username) {
    if (users[username]) {
        alert("Username already exists. Please choose another one.");
        return;
    }
    users[username] = { savedBeers: [] };
    localStorage.setItem("users", JSON.stringify(users));
    alert("Account created! You can now log in.");
}

// Login function
function logIn(username) {
    if (!users[username]) {
        alert("No account found with this username. Please sign up.");
        return;
    }
    currentUser = username;
    localStorage.setItem("currentUser", username);
    alert(`Welcome, ${username}!`);
    loadUserProfile();
}

// Logout function
function logOut() {
    currentUser = null;
    localStorage.removeItem("currentUser");
    alert("Logged out successfully.");
    document.getElementById("userProfile").innerHTML = "";
}

// Save a beer to profile
function saveBeer(beerName) {
    if (!currentUser) {
        alert("Please log in to save beers!");
        return;
    }

    if (!users[currentUser].savedBeers.includes(beerName)) {
        users[currentUser].savedBeers.push(beerName);
        localStorage.setItem("users", JSON.stringify(users));
        alert(`${beerName} has been added to your saved beers!`);
    } else {
        alert("You have already saved this beer.");
    }
}

// Load user profile
function loadUserProfile() {
    if (!currentUser) return;
    
    const profileContainer = document.getElementById("userProfile");
    profileContainer.innerHTML = `<h3>${currentUser}'s Saved Beers</h3>`;

    const savedBeers = users[currentUser].savedBeers;
    if (savedBeers.length === 0) {
        profileContainer.innerHTML += "<p>No beers saved yet.</p>";
        return;
    }

    savedBeers.forEach(beer => {
        profileContainer.innerHTML += `<p>${beer}</p>`;
    });
}

// Auto-login user if previously logged in
document.addEventListener("DOMContentLoaded", function() {
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) {
        currentUser = storedUser;
        loadUserProfile();
    }
});
