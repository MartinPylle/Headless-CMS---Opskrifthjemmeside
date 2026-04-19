// // Alle opskrifter ændre per_page= til din antal opskrifter du vil hente
// const baseUrl = "https://api.martinnguyen.dk/wp-json/wp/v2/posts?per_page=1&acf_format=standard";

// getAllPosts()
    
// //  henter alle public posts
// function getAllPosts() {
//     fetch(baseUrl)
//         .then(res => res.json())
//         .then(data => renderArticles(data, ".container"))
//         .catch(err => console.log("Fejl: ", err));
// }

// function renderArticles(posts, selector) {
//     const allRecipes = document.querySelector(selector);
//     console.log('posts:', posts)

//     posts.forEach(post => {

//         let imageUrl = "";
//         if (post.acf.picture) {
//             imageUrl = post.acf.picture.url;
//         }

//         let ingredients = [];
//         for (const key in post.acf.ingredienser) {
//             const value = post.acf.ingredienser[key];
//             if (value) ingredients.push(value);
//         }

//         let directions = [];
//         for (const key in post.acf.fremgangsmade) {
//             const value = post.acf.fremgangsmade[key];
//             if (value) directions.push(value);
//         }

//         allRecipes.innerHTML += `
//         <article>
//             <h2>${post.acf.titel}</h2>
//             <img src="${imageUrl}" alt=""/>
//             <p>${post.acf.beskrivelse}</p>
//             <h2>Ingredients</h2>
//             <ul>
//                 ${ingredients.map(ing => `<li>${ing}</li>`).join("")}
//             </ul>

//             <h2>Directions</h2>
//             <ul>
//                 ${directions.map(step => `<li>${step}</li>`).join("")}
//             </ul>
//         </article>`;
//     });
// }




// Opskrifter filtering course, time and preferences

// //  ændre per_page= til din antal opskrifter du vil hente
// const baseUrl = "https://api.martinnguyen.dk/wp-json/wp/v2/posts?categories=BREAKFAST_ID&acf_format=standard";
//     console.log('baseUrl:', baseUrl)
    
// //  henter posts med categori
// fetch(baseUrl)
//     .then(res => res.json())
//     .then(data => {
//         const filtered = data.filter(post => {
//             return post.acf.tid && post.acf.tid <= 30;
//         });

//         renderArticles(filtered, ".container");
//     })
//     .catch(err => console.log(err));




// function renderArticles(posts, selector) {
//     const allRecipes = document.querySelector(selector);
//     console.log('posts:', posts)

//     posts.forEach(post => {

//         let imageUrl = "";
//         if (post.acf.picture) {
//             imageUrl = post.acf.picture.url;
//         }

//         let ingredients = [];
//         for (const key in post.acf.ingredienser) {
//             const value = post.acf.ingredienser[key];
//             if (value) ingredients.push(value);
//         }

//         let directions = [];
//         for (const key in post.acf.fremgangsmade) {
//             const value = post.acf.fremgangsmade[key];
//             if (value) directions.push(value);
//         }

//         allRecipes.innerHTML += `
//         <article>
//             <h2>${post.acf.titel}</h2>
//             <img src="${imageUrl}" alt=""/>
//             <p>${post.acf.beskrivelse}</p>
//             <h2>Ingredients</h2>
//             <ul>
//                 ${ingredients.map(ing => `<li>${ing}</li>`).join("")}
//             </ul>

//             <h2>Directions</h2>
//             <ul>
//                 ${directions.map(step => `<li>${step}</li>`).join("")}
//             </ul>
//         </article>`;
//     });
// }