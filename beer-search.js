
// Load beers from JSON
let allBeers = [];

fetch('beers.json')
    .then(response => response.json())
    .then(data => {
        allBeers = data;
    });

// Event listener for search form
document.getElementById('searchForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const searchTerm = document.getElementById('searchBar').value.toLowerCase();

    // Filter beers based on name, style, tags, or brand
    const results = allBeers.filter(beer => 
        beer.name.toLowerCase().includes(searchTerm) ||
        beer.style.toLowerCase().includes(searchTerm) ||
        beer.brand.toLowerCase().includes(searchTerm) ||
        beer.tags.some(tag => tag.toLowerCase().includes(searchTerm))
    );

    displayResults(results);
});

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

        // Use beer's image or a fallback image
        const beerImage = beer.image_url ? beer.image_url : 'https://via.placeholder.com/150?text=No+Image';

        beerCard.innerHTML = `
            <img src="${beerImage}" alt="${beer.name}">
            <h3>${beer.name}</h3>
            <p><strong>Style:</strong> ${beer.style}</p>
            <p><strong>ABV:</strong> ${beer.abv}% | <strong>IBU:</strong> ${beer.ibu}</p>
            <p>${beer.description}</p>
            <p><strong>Brewery:</strong> <a href="${beer.brewery_homepage}" target="_blank">${beer.brand}</a></p>
            <p><a href="${beer.purchase_link}" target="_blank">Buy Here</a></p>
        `;

        beerList.appendChild(beerCard);
    });
}
