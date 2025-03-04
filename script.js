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

        // Use the beer's image if available, otherwise use a default image
        const beerImage = beer.image_url 
            ? beer.image_url 
            : "https://via.placeholder.com/300x200?text=No+Image+Available";

        beerCard.innerHTML = `
            <img src="${beerImage}" alt="${beer.name}" class="beer-image">
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
