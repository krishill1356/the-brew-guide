let beers = [];

document.addEventListener("DOMContentLoaded", () => {
    fetch('beers.json')
        .then(response => response.json())
        .then(data => {
            beers = data;
            console.log("Beers loaded successfully:", beers);
        })
        .catch(error => console.error("Error loading beers.json:", error));
    
    document.getElementById('searchForm').addEventListener('submit', function (event) {
        event.preventDefault();
        searchBeer();
    });
});

function searchBeer() {
    const query = document.getElementById('searchBar').value.trim().toLowerCase();
    if (!query) {
        displayResults([]);
        return;
    }
    
    const results = beers.filter(beer => 
        beer.name.toLowerCase().includes(query) || 
        beer.style.toLowerCase().includes(query) || 
        beer.tags.some(tag => tag.toLowerCase().includes(query))
    );

    displayResults(results);
}

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
            <button onclick="findInPubs('${beer.location}')">Find in Pubs</button>
            <button onclick="buyOnline('${beer.name}')">Buy Online</button>
        `;
        beerList.appendChild(beerCard);
    });
}

function findInPubs(location) {
    const encodedLocation = encodeURIComponent(location);
    window.open(`https://www.google.com/maps/search/pubs+serving+${encodedLocation}`);
}

function buyOnline(beerName) {
    const encodedBeer = encodeURIComponent(beerName);
    window.open(`https://www.google.com/search?q=buy+${encodedBeer}+beer+online`);
}

// Google Maps API
function initMap() {
    const breweryMapElement = document.getElementById("breweryMap");
    if (!breweryMapElement) return;
    
    const map = new google.maps.Map(breweryMapElement, {
        center: { lat: 51.5074, lng: -0.1278 }, // London Default
        zoom: 10
    });
}
