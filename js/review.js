// Retrieve reviews from local storage or initialize an empty array if no reviews exist
const reviews = JSON.parse(localStorage.getItem('reviews')) || [];

// Get the container element
const reviewsContainer = document.getElementById('reviewRetrieve');

// Clear the previous content in the reviews container
reviewsContainer.innerHTML = '';

// Generate HTML for each review and append it to the container
reviews.forEach(function(review) {
    const reviewDiv = document.createElement('div');
    reviewDiv.classList.add('review');

    const usernameParagraph = document.createElement('p');
    usernameParagraph.textContent = review.username;

    const ratingParagraph = document.createElement('p');
    ratingParagraph.textContent = review.rating + 'stars';

    const descriptionParagraph = document.createElement('p');
    descriptionParagraph.textContent = review.description;

    reviewDiv.appendChild(usernameParagraph);
    reviewDiv.appendChild(ratingParagraph);
    reviewDiv.appendChild(descriptionParagraph);

    reviewsContainer.appendChild(reviewDiv);
});