// this is the javascript for the favourite page 

document.addEventListener('DOMContentLoaded', displayFavorites);

function displayFavorites() {
    const favoritesContainer = document.getElementById('displayFav');
    const favorites = getFromLocalStorage('favourites') || [];

    if (favorites.length === 0) {
        favoritesContainer.innerHTML = '<p>No favorite recipes found.</p>';
        return;
    }

    let favoritesHTML = '';
    favorites.forEach(recipe => {
        favoritesHTML +=
        `
        <div class="fav-card">
            <img src="${recipe.image}" alt="image of favourite recipe">
            <h2 class="title">${recipe.label}</h2>
            <a class="view-btn" href="${recipe.url}" target="_blank">View Recipe</a>
            <a href="#" title="Remove from favorites" onclick="removeFromFavorites(event, '${recipe.label}')">
                <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
                    <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/>
                </svg>
            </a>
        </div>
        `;
    });

    favoritesContainer.innerHTML = favoritesHTML;
}

function removeFromFavorites(event, recipeLabel) {
    event.preventDefault();

    let favorites = getFromLocalStorage('favourites') || [];

    favorites = favorites.filter(recipe => recipe.label !== recipeLabel);

    saveToLocalStorage('favourites', favorites);

    displayFavorites();
}

function saveToLocalStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

function getFromLocalStorage(key) {
    const storedItems = localStorage.getItem(key);
    return JSON.parse(storedItems);
}