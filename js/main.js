// javascript code for our chefs recipe app 

// const container = document.querySelector('.container');
const searchForm = document.querySelector('.formFetcher');
const mainSearchBTN = document.querySelector('.main-search')
const searchResultDiv = document.querySelector('.search-result');
let searchValue = '';
const app_id = 'ca12959c';
const app_key = 'c19751ea18825842d6846c57ebfd1898';


// function to show side bar when menu icon is clicked

function showSidebar(){
    const sidebar = document.querySelector('.sideBar');
    sidebar.style.display = 'flex'
}


// function to hide side bar when close icon is clicked

function hideSidebar(){
    const sidebar = document.querySelector('.sideBar');
    sidebar.style.display = 'none'
}

// event listener to fetch api when an argument is passed on the search input
searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    searchValue = e.target.querySelector('.inputMain').value;
    fetchAPI();
});

// event listener when the search button is clicked
mainSearchBTN.addEventListener('click', function(event) {
    event.preventDefault();
    searchValue = document.querySelector('.inputMain').value;
    fetchAPI();
});

// function to fetch api from Edamam

async function fetchAPI(){
    const accessPoint = `https://api.edamam.com/api/recipes/v2?type=${'public'}&q=${searchValue}&app_id=${app_id}&app_key=${app_key}`;
    const response = await fetch(accessPoint);
    const data = await response.json();
    generateHTML(data.hits);
    console.log(data);
}

// function to generate the api fetched from edamam in html

function generateHTML(results) {
    let generatedHTML = '';
    results.map(result => {
        generatedHTML +=
        `
        <div class="item">
            <img src="${result.recipe.image}" alt="image item">
            <h1 class="title">${result.recipe.label}</h1>
            <p class="item-data"><strong>INGREDIENTS/INSTRUCTIONS:</strong></br>${result.recipe.ingredientLines}</p>
            <p class="item-data"><strong>CALORIES: </strong>${result.recipe.calories}</p>
            <p class="item-data"><strong>COOKING TIME: </strong>${result.recipe.totalTime}minutes</p>
            <div class="flex-ctn">
                <a class="view-btn" href="${result.recipe.url}" target="_blank">View Recipe</a>

                <a href="#" title="Mark as favourite" class="favou-icon" onclick="addToFavorites('${result.recipe.label}', '${result.recipe.image}', '${result.recipe.url}')"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                    <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
                </svg></a>

                <a href="#" title="Kindly rate us!" id="addRating" onclick="addReview()"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-7 h-6">
                    <path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clip-rule="evenodd" />
                </svg></a>

                <a href="#" title="Buy all ingredients for this recipe" class="shop-icon"> <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-8 h-6">
                    <path d="M2.25 2.25a.75.75 0 0 0 0 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 0 0-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 0 0 0-1.5H5.378A2.25 2.25 0 0 1 7.5 15h11.218a.75.75 0 0 0 .674-.421 60.358 60.358 0 0 0 2.96-7.228.75.75 0 0 0-.525-.965A60.864 60.864 0 0 0 5.68 4.509l-.232-.867A1.875 1.875 0 0 0 3.636 2.25H2.25ZM3.75 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM16.5 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z" />
                </svg></a>
            </div>
        </div>
        `
    })
    // generate inner html in the search result div
    searchResultDiv.innerHTML = generatedHTML;

    // Add event listeners to shopping icons
    document.querySelectorAll('.shop-icon').forEach(icon => {
        icon.addEventListener('click', handleShoppingIconClick);
    });

    // Add event listeners to favourite icon
    document.querySelectorAll('.favou-icon').forEach(icon => {
        icon.addEventListener('click', addToFavorites);
    });
}


//============= adding item to favourite list with favourite icon starts here =====


async function addToFavorites(event) {
    // Prevent the default behavior of the anchor tag
    event.preventDefault();

    // Get the recipe label, image, and URL from the clicked item
    const recipeLabel = event.target.closest('.item').querySelector('.title').textContent;
    const recipeImage = event.target.closest('.item').querySelector('img').src;
    const recipeURL = event.target.closest('.item').querySelector('.view-btn').href;

    // Retrieve the current favorites from local storage or initialize an empty array
    let favourites = getFromLocalStorage('favourites') || [];

    // Check if the recipe is already in favorites
    const existingFavourite = favourites.find(fav => fav.label === recipeLabel);
    if (!existingFavourite) {
        // Add the recipe to the favorites
        favourites.push({ label: recipeLabel, image: recipeImage, url: recipeURL });
        // Save the updated favorites back to local storage
        saveToLocalStorage('favourites', favourites);

        // Optional: Provide feedback to the user
        alert(`${recipeLabel} added to favourites!`);
    } else {
        // Optional: Provide feedback if the recipe is already in favorites
        alert(`${recipeLabel} is already in your favourites!`);
    }
}

function saveToLocalStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

function getFromLocalStorage(key) {
    const storedItems = localStorage.getItem(key);
    return JSON.parse(storedItems);
}



// -----user review javascript functions code starts here------

function addReview(){
    const add_review = document.querySelector('#review-ctn');
    add_review.style.display = 'flex'
}

// code for submission of user input to local storage
const submitBtn = document.getElementById('submitBtn');

// Add event listener to the form submission
submitBtn.addEventListener('click', function(event) {
    event.preventDefault(); // Prevent default form submission behavior

    //user data in local storage called
    storeUserData();
});

function storeUserData() {
    const username = document.getElementById('username').value;
    const rating = document.getElementById('rating').value;
    const description = document.getElementById('description').value;

    // Retrieve existing reviews from local storage || initialize an empty array
    let reviews = JSON.parse(localStorage.getItem('reviews')) || [];

    // Create a new review object
    const newReview = {
        username: username,
        rating: rating,
        description: description
    };

    // Add the new review to the array of reviews
    reviews.push(newReview);

    // Store the updated reviews array in local storage
    localStorage.setItem('reviews', JSON.stringify(reviews));

    // Optional: Provide feedback to the user
    alert('Review submitted successfully!');
}

// ======== function to shop the ingredients of any of the item when the shoping icon is clicked===

async function handleShoppingIconClick(event) {
    event.preventDefault(); // Prevent default link behavior

    const item = event.target.closest('.item');
    const label = item.querySelector('.title').textContent;
    const ingredientLines = item.querySelector('.item-data').textContent.split('\n');

    // Call the function to replace the shopping list with a new one
    replaceShoppingList([{ label: label, ingredients: ingredientLines }], label);
}

function replaceShoppingList(newShoppingList, label) {
    // Store the new shopping list array in local storage
    localStorage.setItem('shoppingList', JSON.stringify(newShoppingList));

    // Display a prompt to the user indicating the item has been added to the shopping list
    const confirmation = confirm(`${label} ingredients added to the shopping list! Click OK to go shopping!`);
    
    // Redirect the user to another HTML page if they click "OK"
    if (confirmation) {
        window.location.href = 'shop.html';
    }
}