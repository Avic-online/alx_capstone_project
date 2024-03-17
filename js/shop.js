// this is the javascript code that fetches ingredients with its 
// label from local storage and convert to an object to be displayed
// on the addToShoppingList.html page


function displayShoppingList() {
    // Retrieve shopping list from local storage
    const shoppingList = JSON.parse(localStorage.getItem('shoppingList')) || [];

    // Get the container element
    const shoppingListContainer = document.getElementById('shopRetrieve');

    // Initialize HTML string
    let html = '';

    // Iterate over each item in the shopping list
    shoppingList.forEach(item => {
        // Create a div for the label
        html += `<div class="label">Ingredients For ${item.label}</div>`;

        // Create a div for the ingredients
        item.ingredients.forEach(ingredient => {
            // Remove characters before semi-colon and replace commas with line breaks
            const formattedIngredient = ingredient.replace(/.*?:/, '').replace(/,/g, '<br>');

            // Split the formatted ingredient by line breaks
            const ingredientLines = formattedIngredient.split('<br>');

            // Iterate over each line
            ingredientLines.forEach(line => {
                // Check if the line is not empty
                if (line.trim() !== '') {
                    // Construct the Walmart query URL
                    const walmartQuery = `https://www.walmart.com/search/?query=${encodeURIComponent(line.trim())}`;

                    // Create a link for each line
                    html += `<div class="ingredient"><a href="${walmartQuery}" target="_blank">${line}</a></div>`;
                } else {
                    // If the line is empty, add a line break
                    html += '<br>';
                }
            });
        });
    });

    // Set the HTML content of the container
    shoppingListContainer.innerHTML = html;
}

// Call the function to display the shopping list when the page loads
window.addEventListener('DOMContentLoaded', displayShoppingList);