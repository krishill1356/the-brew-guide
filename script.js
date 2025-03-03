let beers = [];

fetch('beers.json')
    .then(response => response.json())
    .then(data => beers = data);

function searchBeer() {
    const query = document.getElementById('searchBar').value.toLowerCase();
    const results = beers.filter(beer => 
        beer.name.toLowerCase().includes(query) || 
        beer.style.toLowerCase().includes(query) || 
        beer.brand.toLowerCase().includes(query)
    );

    displayResults(results);
}

function displayResults(results) {
    const beerList = document.getElementById('beerList');
    beerList.innerHTML = '';

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

// Google Maps API
function initMap() {
    const map = new google.maps.Map(document.getElementById("breweryMap"), {
        center: { lat: 40.7128, lng: -74.0060 },
        zoom: 12
    });
}
