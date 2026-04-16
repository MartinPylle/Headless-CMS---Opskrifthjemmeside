// const containerEl = document.querySelector(".container");

const baseUrl = "https://api.martinnguyen.dk/wp-json/";

const postsUrl = "wp/v2/posts";

function getAllPosts() {
    fetch(baseUrl)
    .then(res => res.json())
    .then(data => renderArticles1(data))
    .catch(err => console.log("fejl", err))
}

// getAllPosts()
 
// getAllPostsByCategory(8);

getToken()
    // Hent nyt id med diæt id 10 fra id 8 
    .then(() => getAllPrivatePostsByCategory(10))

    

async function getToken() {

    const userLogin = {
        username: "MartinHNguyen",
        password: "dCuc vC9H kS4I QHw0 Wlu9 iUIH"
    }

    fetch(baseUrl + "jwt-auth/v1/token", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userLogin)
    })
    .then(res => res.json())
    .then(data => {
        sessionStorage.setItem("myToken", data.token)
    })
    .catch(err => console.log("Det gik galt i getToken!!", err))
}

//  henter alle public posts
function getAllPosts() {
    fetch(baseUrl)
        .then(res => res.json())
        .then(data => renderArticles1(data))
        .catch(err => console.log("Fejl: ", err));
}

// Henter alle private posts 
async function getAllPrivatePostsByCategory(id) {
    try {
        // Ændret til ?acf_format=standard&status=private&diaet fra categori
        const res = await fetch(baseUrl + postsUrl + "?acf_format=standard&status=private&diaet=" + id, {
            headers: {
                Authorization: "Bearer " + sessionStorage.getItem("myToken")
            }
        });
        const posts = await res.json();
        renderArticles1(posts, ".glutenfri")
    } catch (err) {
        console.log('error:', err)
    }
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
