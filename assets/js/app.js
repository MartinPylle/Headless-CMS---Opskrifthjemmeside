
// Alle opskrifter
const baseUrl = "https://api.martinnguyen.dk/wp-json/";

const postsUrl = "wp/v2/posts";

getAllPosts()
//  henter alle public posts
function getAllPosts() {
    fetch(baseUrl)
        .then(res => res.json())
        .then(data => renderArticles1(data))
        .catch(err => console.log("Fejl: ", err));
}

function renderArticles1(posts, selector) {
    // tilføjet en selector i loopet
    const glutenEl = document.querySelector(selector);
    console.log('posts:', posts)
    posts.forEach(post => {
        let ingredients = [];   
        for (const key in post.acf.diaet) {
            const value = post.acf.diaet[key];
            if (value) {
                ingredients.push(value)
            }
        }
        console.log('ingredients:', ingredients)
        glutenEl.innerHTML += `
        <article>
            <h2>${post.acf.titel}</h2>
            <img src="${post.acf.primaer_billede.sizes.medium_large}"/>
            <p>${post.acf.beskrivelse}</p>
            <h2>ingredienser</h2>
            <ul>
            ${ingredients.map(ing => `<li>${ing}</li>`).join("")}
            </ul>
            <p class="author">${post.acf.forfatter[0].post_title}</p>
        </article>`;
    })
}


// Enkelte opskrifter

const rec = getRecipes();

function getRecipes() {
    fetch(baseUrl)
        .then(res => res.json())
        .then(data => renderArticles1(data))
        .catch(err => console.log("Fejl: ", err));
}
