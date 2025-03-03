async function findBeer() {
    let input = document.getElementById("beerInput").value.toLowerCase();
    let resultsDiv = document.getElementById("results");
    resultsDiv.innerHTML = "<p>Searching...</p>";

    let response = await fetch("beers.json");
    let beers = await response.json();

    let matches = beers.filter(beer =>
        beer.style.toLowerCase().includes(input) || beer.brand.toLowerCase().includes(input)
    );

    resultsDiv.innerHTML = matches.length > 0
        ? matches.map(beer => `
            <div class="beer-card">
                <img src="${beer.image}" alt="${beer.name}">
                <p><strong>${beer.brand} - ${beer.name}</strong> (${beer.style})</p>
                <p>ABV: ${beer.abv}% | IBU: ${beer.ibu}</p>
                <button onclick='saveFavorite(${JSON.stringify(beer)})'>⭐ Favorite</button>
            </div>
        `).join("")
        : "<p>No beers found. Try another style or brand!</p>";
}

function saveFavorite(beer) {
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    favorites.push(beer);
    localStorage.setItem("favorites", JSON.stringify(favorites));
    alert(`${beer.name} added to favorites!`);
}
