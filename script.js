let beers = [];

document.addEventListener("DOMContentLoaded", () => {
    // Ensure beers.json loads correctly
    fetch('beers.json')
        .then(response => {
            if (!response.ok) throw new Error("Failed to load beers.json");
            return response.json();
        })
        .then(data => {
            beers = data;
            console.log("Beers loaded successfully:", beers); // Debugging
        })
        .catch(error => console.error("Error loading beers.json:", error));

    // Attach event listener to button
    document.getElementById('searchForm').addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent form from reloading page
        searchBeer();
    });
});

// Function to search for beers
function searchBeer() {
    const query = document.getElementById('searchBar').value.trim().toLowerCase();

    if (!query) {
        displayResults([]); // Clear results if input is empty
        return;
    }

    const results = beers.filter(beer => 
        beer.name.toLowerCase().includes(query) || 
        beer.style.toLowerCase().includes(query) || 
        beer.brand.toLowerCase().includes(query)
    );

    displayResults(results);
}

// Function to display search results
function displayResults(results) {
    const beerList = document.getElementById('beerList');
    beerList.innerHTML = '';

    if (results.length === 0) {
        beerList.innerHTML = '<p>No beers found. Try another search!</p>';
        return;
    }

    results.forEach(beer => {
        const beerCard = document.createElement('div');
        beerCard.classList.add('beer-card');
        beerCard.innerHTML = `
            <h3>${beer.name}</h3>
            <p><strong>Brand:</strong> ${beer.brand}</p>
            <p><strong>Style:</strong> ${beer.style}</p>
            <p><strong>ABV:</strong> ${beer.abv}%</p>
            <p><strong>IBU:</strong> ${beer.ibu}</p>
            <p>${beer.description}</p>
        `;
        beerList.appendChild(beerCard);
    });
}

// Google Maps API Initialization
function initMap() {
    const breweryMapElement = document.getElementById("breweryMap");
    if (!breweryMapElement) return;
    
    const map = new google.maps.Map(breweryMapElement, {
        center: { lat: 51.5074, lng: -0.1278 }, // London Default
        zoom: 10
    });
}
