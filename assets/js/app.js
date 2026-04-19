// // Alle opskrifter
// const baseUrl = "https://api.martinnguyen.dk/wp-json/wp/v2/posts?per_page=100";

// getAllPosts()
    
// //  henter alle public posts
// function getAllPosts() {
//     fetch(baseUrl)
//         .then(res => res.json())
//         .then(data => renderArticles(data, ".container"))
//         .catch(err => console.log("Fejl: ", err));
// }

// async function getImageUrl(id) {
//     const res = await fetch(`https://api.martinnguyen.dk/wp-json/wp/v2/media/${id}`);
//     const data = await res.json();
//     return data.source_url;

// }

// async function renderArticles(posts, selector) {
//     console.log('posts:', posts)
//     const allRecipes = document.querySelector(selector);

//     for (const post of posts) {

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

//         // HENT BILLEDE FRA ID
//         let imageUrl = "";
//         if (post.acf.picture) {
//             imageUrl = await getImageUrl(post.acf.picture);
//         }

//         allRecipes.innerHTML += `
//         <article>
//             <h2>${post.acf.titel}</h2>
//             <img src="${imageUrl}" alt="" />
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
//     }
// }




// function renderArticles(posts, selector) {
//     // tilføjet en selector i loopet
//     const allRecipes = document.querySelector(selector);
//     console.log('posts:', posts)
    
//     posts.forEach(post => {

//         let imageUrl = "";
//         if (post.acf.picture) {
//             imageUrl = await getImageUrl(post.acf.picture);
//         }
//         // ingredients
//         let ingredients = [];
//         for (const key in post.acf.ingredienser) {
//             const value = post.acf.ingredienser[key];
            
//             if (value) {
//                 ingredients.push(value);
//             }
//         }
//         // directions
//         let directions = [];
//         for (const key in post.acf.fremgangsmade) {
//             const value = post.acf.fremgangsmade[key];
            
//             if (value) {
//                 directions.push(value);
//             }
//         }


//         allRecipes.innerHTML += `
//         <article>
//         <h2>${post.acf.titel}</h2>
//         <img src="${post.acf.picture}" alt""/>
//         <p>${post.acf.beskrivelse}</p>
//         <h2>Ingredients</h2>
//         <ul>
//             ${ingredients.map(ing => `<li>${ing}</li>`).join("")}
//         </ul>
//         <h2>Directions</h2>
//         <ul>
//             ${directions.map(step => `<li>${step}</li>`).join("")}
//         </ul>
//         </article>`;
//     })
// }
