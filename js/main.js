// javascript code for our chefs recipe app 

const container = document.querySelector('.container');
const searchForm = document.querySelector('form');
const searchResultDiv = document.querySelector('.search-result');
let searchValue = '';
const app_id = 'ca12959c'
const app_key = 'c19751ea18825842d6846c57ebfd1898'

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
            <div class="flex-ctn">
                <h1 class="title">${result.recipe.label}</h1>
                <a class="view-btn" href="${result.recipe.url}" target="_blank">View Recipe</a>
            </div>
            <p class="item-data"><strong>INGREDIENTS/INSTRUCTIONS:</strong></br>${result.recipe.ingredientLines}</p>
            <p class="item-data"><strong>CALORIES: </strong>${result.recipe.calories}</p>
            <p class="item-data"><strong>COOKING TIME: </strong>${result.recipe.totalTime}minutes</p>
        </div>
        `
    })
    searchResultDiv.innerHTML = generatedHTML;
}