
// Alle opskrifter
const baseUrl = "https://api.martinnguyen.dk/wp-json/wp/v2/posts";

getAllPosts()
    
//  henter alle public posts
function getAllPosts() {
    fetch(baseUrl)
        .then(res => res.json())
        .then(data => renderArticles(data, ".container"))
        .catch(err => console.log("Fejl: ", err));
}

function renderArticles(posts, selector) {
    // tilføjet en selector i loopet
    const allRecipes = document.querySelector(selector);
    console.log('posts:', posts)

    posts.forEach(post => {
        // ingredients
        let ingredients = [];
        for (const key in post.acf.ingredienser) {
            const value = post.acf.ingredienser[key];

            if (value) {
                ingredients.push(value);
            }
        }
        // directions
        let directions = [];
        for (const key in post.acf.fremgangsmade) {
            const value = post.acf.fremgangsmade[key];

            if (value) {
                directions.push(value);
            }
        }

        allRecipes.innerHTML += `
        <article>
        <h2>${post.acf.titel}</h2>
        <img src="${post.acf.primaer_billede}"/>
        <p>${post.acf.beskrivelse}</p>
        <h2>Ingredients</h2>
        <ul>
            ${ingredients.map(ing => `<li>${ing}</li>`).join("")}
        </ul>
        <h2>Directions</h2>
        <ul>
            ${directions.map(ing => `<li>${ing}</li>`).join("")}
        </ul>
        </article>`;
    })
}
