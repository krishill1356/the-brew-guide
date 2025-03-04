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
    
    // Filter beers based on name, style, tags, brand
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

        // Use the beer's image if available, otherwise use a default image
        const beerImage