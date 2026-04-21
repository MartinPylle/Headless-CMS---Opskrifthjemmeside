// Alle opskrifter ændre per_page= til din antal opskrifter du vil hente
const baseUrl = "https://api.martinnguyen.dk/wp-json/wp/v2/posts?per_page=25&acf_format=standard";

getCategories().then(() => getAllPosts());



//  henter alle public posts
function getAllPosts() {
    fetch(baseUrl)
        .then(res => res.json())
        .then(data => renderArticles(data, ".recipe-cards"))
        .catch(err => console.log("Fejl: ", err));
}

let categoriesMap = {};

function getCategories() {
    return fetch("https://api.martinnguyen.dk/wp-json/wp/v2/categories")
    .then(res => res.json())
    .then(data => {
        data.forEach(cat => {
            categoriesMap[cat.id] = cat.name;
        });
    });
}

    function getDifficultyLevel(value) {
        if (!value) return 1;

        const v = value.toLowerCase().trim();

        if (v === "easy") return 1;
        if (v === "medium") return 2;
        if (v === "hard") return 3;
        return 1;
    }

function renderDifficulty(level) {
    let html = "";

    for (let i = 1; i <= level; i++) {
        html += `<span class="kokkehuer">👨‍🍳</span>`;
    }

    return html;
}

function renderArticles(posts, selector) {
    const allRecipes = document.querySelector(selector);
    console.log('posts:', posts)

    
    posts.forEach(post => {
        
        let difficultyLevel = getDifficultyLevel(post.acf.svaerhedsgrad);
        let difficultyHTML = renderDifficulty(difficultyLevel);
        // slet
        // let courseName = categoriesMap[post.acf.course] || "";
        // console.log('courseName:', courseName)

        let imageUrl = "";
        if (post.acf.picture) {
            imageUrl = post.acf.picture.url;
        }
        // slet 
        // let courseUrl = "";
        // if (post.acf.course) {
        //     courseUrl = post.acf.course
        // }

        allRecipes.innerHTML += `
        <article class="recipe-card">
				<div class="image-recipe-wrapper">
					<img class="recipe-picture" src="${imageUrl}" alt="">
					<div class="course">Breakfast</div>
				</div>
				<div class="recipe-wrapper">
					<h3>${post.acf.titel}</h3>
					<div class="minutes-difficulty">
						<div class="time">
							<p>Total time</p>
							<p>${post.acf.tid_i_alt}<i class="fa-regular fa-clock"></i></p>
						</div>
						<div class="difficulty">
							<p>Difficulty</p>
							<div class="kokkehuer"> 
                            ${difficultyHTML} </div>
						</div>
					</div>
				</div>
				<button id="makeNow-button">Make now</button>
			</article>`;
    });
}

 // let difficultyUrl = "";
        // if(post.acf.svaerhedsgrad) {
        //     difficultyUrl = post.acf.svaerhedsgrad.url
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





// Alle opskrifter ændre per_page= til din antal opskrifter du vil hente
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