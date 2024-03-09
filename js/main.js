// javascript code for our chefs recipe app 

const container = document.querySelector('.container');
const searchForm = document.querySelector('form');
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

searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    searchValue = e.target.querySelector('input').value;
    fetchAPI();
});

async function fetchAPI(){
    const accessPoint = `https://api.edamam.com/api/recipes/v2?type=${'public'}&q=${searchValue}&app_id=${app_id}&app_key=${app_key}`;
    const response = await fetch(accessPoint);
    const data = await response.json();
    generateHTML(data.hits);
    console.log(data);
}

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

                <a href="#" title="Mark as favourite" onclick="addToFavourites()"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                    <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
                </svg></a>

                <a href="#" title="Kindly rate us!"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-7 h-6">
                    <path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clip-rule="evenodd" />
                </svg></a>

                <a href="#" title="Buy all ingredients for this recipe"> <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-8 h-6">
                    <path d="M2.25 2.25a.75.75 0 0 0 0 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 0 0-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 0 0 0-1.5H5.378A2.25 2.25 0 0 1 7.5 15h11.218a.75.75 0 0 0 .674-.421 60.358 60.358 0 0 0 2.96-7.228.75.75 0 0 0-.525-.965A60.864 60.864 0 0 0 5.68 4.509l-.232-.867A1.875 1.875 0 0 0 3.636 2.25H2.25ZM3.75 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM16.5 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z" />
                </svg></a>
            </div>
        </div>
        `
    })
    searchResultDiv.innerHTML = generatedHTML;
}


// adding item to favourite list with favourite icon starts here

function addToFavourites() {
    alert('Great!')
    // if (!isInFavourites(itemId)) {
    //     addToLocalStorage('favourite', itemId);
    //     updateUI(itemId);
    // }
}

// function isInFavourites(itemId) {
//     const favourites = getFromLocalStorage('favourites') || [];
//     return favourites.includes(itemId);
// }

// function addToLocalStorage(key, value) {
//     const favourites = getFromLocalStorage(key) || [];
//     favourites.push(value);
//     localStorage.setItem(key, JSON.stringify(favourites));
// }

// function getFromLocalStorage(key) {
//     const storedItems = localStorage.getItem(key);
//     return JSON.parse(storedItems);
// }

// function updateUI(itemId) {
//     const itemElement = document.getElementById(itemId);
//     if(itemElement) {
//         const favouriteIcon = itemElement.querySelector('w-6');
//         if (favouriteIcon) {
//             favouriteIcon.style.color = 'red';
//         }
//     }
// }