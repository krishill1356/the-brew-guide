let beers = [];

document.addEventListener("DOMContentLoaded", () => {
    fetch('beers.json')
        .then(response => response.json())
        .then(data => {
            beers = data;
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
            <img src="https://source.unsplash.com/300x200/?${encodeURIComponent(beer.name + ' beer')}" alt="${beer.name}" class="beer-image">
            <h3>${beer.name}</h3>
            <p><strong>Brewery:</strong> ${beer.brand}</p>
            <p><strong>Style:</strong> ${beer.style}</p>
            <p><strong>ABV:</strong> ${beer.abv}%</p>
            <p>${beer.description}</p>
            <a href="https://www.google.com/search?q=buy+${encodeURIComponent(beer.name)}+beer+online" target="_blank">
                <button>Buy Online</button>
            </a>
            <a href="https://www.google.com/maps/search/${encodeURIComponent(beer.location)}" target="_blank">
                <button>Find Brewery</button>
            </a>
        `;
        beerList.appendChild(beerCard);
    });
}
