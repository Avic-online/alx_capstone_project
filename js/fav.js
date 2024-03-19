// this is the javascript for the favourite page 

document.addEventListener('DOMContentLoaded', displayFavorites);

// function to output the favourites recipes from local storage in favourite html page
function displayFavorites() {
    const favoritesContainer = document.getElementById('displayFav');
    const favorites = getFromLocalStorage('favourites') || [];
    
    // condition if there are no favourite recipes in local storage
    if (favorites.length === 0) {
        favoritesContainer.innerHTML = '<p>No favorite recipes found.</p>';
        return;
    }

    // method to get each recipe in html format
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

    // to output the favourites in the display div of the favourite homepage
    favoritesContainer.innerHTML = favoritesHTML;
}

// function to remove from local storage whenever the close icon is clicked
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