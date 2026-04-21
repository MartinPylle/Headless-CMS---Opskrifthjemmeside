// Erklær en variable med const som ikke kan ændre på
// Url'en peger på min wordpress REST API
// /wp-json/wp/v2/ henter alle post / opskrifter
// per_page begrænser antallet af opskrifter til 3
// acf_format=standard sørger for at ACF-felter bliver inkluderet i et nemt format
const baseUrl = "https://api.martinnguyen.dk/wp-json/wp/v2/posts?per_page=3&acf_format=standard";

// Her logger vi to funktioner, fx getCategories henter alle kategorierne først, når kategorierne er hentet .then, hentes getAllposts
getCategories().then(() => getAllPosts());

//  henter alle public posts

// definerer en funktion der henter alle opskrifter
function getAllPosts() {
    // fetch sender en HTTP request ud til API'et og bliver gemt i baseURL og får et response tilbage
    fetch(baseUrl)
    // Det vi får tilbage er rå data, derfor bruger vi .json() for at konvertere fra rå data til JSON (Javascript data)
        .then(res => res.json())
        // Når data'et er konverteret til JSON, sender vi data videre til renderArticles, og .recipe-cards er der hvor indholdet skal vises
        .then(data => renderArticles(data, ".under30min-recipes-cards"))
        // Hvis der skulle gå noget galt, så vil den logge fejl i konsolen. På den måde ved vi hvis koden fejler. 
        .catch(err => console.log("Fejl: ", err));
}

// Objekt til kategori

// Erklær en variable categoriesMap og gi den en tom objekt, dette bruges til at gemme kategori ID -> navn
let categoriesMap = {};

// Hent kategorier 

// Definerer funktion getCategories til at hente kategori 
function getCategories() {
    // fetcher alle kategorier fra API, 
    // return er vigtigt her, da den returnere en promise, sådan at andre kodestykker kan vente før denne bliver færdig, Derfor kan vi logge getCategories() før funktionen kører.
    // Henter alle kategorier fra Wordpress ved at tilføje categories tilsidst i Url'en
    return fetch("https://api.martinnguyen.dk/wp-json/wp/v2/categories")
    // Konvertere rå response data til Javascript objekter 
    .then(res => res.json())
    // Her laver vi en forEach som looper alle categories igennem og gemme det inde i categoriesMap 
    // Så det nu er Breakfast, Dinner, Entrees osv. 
    .then(data => {
        data.forEach(cat => {
            // Gemmer kategoriens navn med id og som nøgle
            categoriesMap[cat.id] = cat.name;
        });
    });
}   

     // Funktion med sværhedsgrad 

    // definerer en funktion getDifficultyLevel() inde i parentesen har den en værdi ved navn value. Value kommer fra linje 76 inde i renderArticles funktionen, hvori den henter ACF-data'et.
    // post.acf.svaerhedsgrad er hvor den skal finde det data om sværhedsgrad og derefter gemmer det i variablen. 
    // Det der vil komme frem er enten easy, medium eller hard afhængigt af sværhedsgraden, vi sat opskriften til.
    function getDifficultyLevel(value) {
        // Her bliver der oprettet en såkaldt fallback. Det gør at kode bliver robust.
        // !value betyder at den enten kan være null, undefined eller en tom string
        // Hvis !value ikke har nogen værdi vil den returnere 1. 
        if (!value) return 1;

        // I denne variable gør vi brug af toLowerCase() og trim() funktion og det bruger vi på det data får fra value. 
        // Det gør vi på grund af, ens data fra CMS godt kan være inkonsistent skrevet, så derfor hardcoder vi det til lowerCase og fjerne potentielle ekstra mellemrum.
        const v = value.toLowerCase().trim();

        // Her bliver alt oversæt til numerisk værdier.
        if (v === "easy") return 1;
        if (v === "medium") return 2;
        if (v === "hard") return 3;
        return 1;
    }
// Her definerer vi så en ny funktion med parameteren level.
// Denne parameteren level gør, at den henter data fra difficultyLevel og tjekker hvilket sværhedsgrad opskriften har. Derefter kører funktion getDifficultyLevel(), det vil siges hvis en opskrift er "hard", så vil funktion returnere 3 kokkehatte. 
function renderDifficulty(level) {
    // Tom string, bruges til at opbygge HTML dynamisk 
    let html = "";
    // Dette loop gør at, den looper igennem opskrifterne, hvis der er en opskrift, der har en sværhedsgrad på "medium". Så vil den returnere et 2 tal.
    // Derefter += operatøren tilføjer til eksisterende string, ved hver iteration tilføj en kokkehat. Dvs. har en opskrift talet 2 "medium" udskriv 2 kokkehatte. 
    for (let i = 1; i <= level; i++) {
        html += `<span class="kokkehuer">👨‍🍳</span>`;
    }

    return html;
}
// Renderer alle artikler 
// definerer to funktioner posts (array af opskrift data) og en selector (en CSS selector som ".recipes-container") (Note kommer fra linje 20)
function renderArticles(posts, selector) {
    // Erklær en variable med navnet allRecipes og bruger derefter DOM manipulation for at fange selector som også er .recipes-container. Dette gemmer vi så i variablen 
    const allRecipes = document.querySelector(selector);
    console.log('posts:', posts)

    // Nu looper vi igennem alle posts som er alle opskrifterne ved at bruge forEach 
    posts.forEach(post => {
        
        let difficultyLevel = getDifficultyLevel(post.acf.svaerhedsgrad);
        let difficultyHTML = renderDifficulty(difficultyLevel);
        
        // Opretter en variable til at gemme billedets Url
        // starter som en tom string, det gør vi for at variablen altid eksisterer for at undgår errors senere hen. 
        let imageUrl = "";
        // Her laver vi en if altså den tjekker om billede eksisterer i ACF-databasen
        if (post.acf.picture) {
            // Hvis billedet findes henter vi selve billedes Url fra objektet. Hvor den så er gemt i imageUrl 
            imageUrl = post.acf.picture.url;
        }

        // Erklær en variable og gi den en tom string
        let courseName = "";
        // Dernæst bruger vi function Array.isArray som tjekker om værdien er en liste, da ACF kan returnere flere værdier og én værdi
        if (Array.isArray(post.acf.course)) {
            // Her går vi brug af .map() funktion som går igennem vores course array og laver derfor en ny liste hvori hvert element bliver transformeret. 
            // fx hvis post.acf.course = [3, 7], så bliver det transformeret til ["breakfast", "entrees"].
            // Med .map() funktion går den igennem hvert id i arrayet, dernæst står Id op i categoriesMap, og leder efter kategorien "course" og opretter en ny array med transformeret Id'er.
            // Efterfulgende bruger vi funktion .join(", ") som samler arrayet til en string og adskiller dem med komma
            // Så det kommer til at se sådanne ud her "Breakfast", "entrees"
            courseName = post.acf.course.map(id => categoriesMap[id]).join(", ");
            // hvis det bare er en kategori, så bruger vi else statement 
        } else {
            courseName = categoriesMap[post.acf.course];
        }

         // Her bruges der innerHTML for at overskrive det eksisterende HTML med data fra ACF ved at bruge template string. 
        // Vi har fanget selectoren allRecipes fra linje 76. 
        // += operatøren gør at for hvert opskrift i vores data udskriv det i browseren. 
        allRecipes.innerHTML += `
        <article class="recipe-card">
				<div class="image-recipe-wrapper">
					<img class="recipe-picture" src="${imageUrl}" alt="">
					<div class="course">${post.acf.course.label}</div>
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
				<a href="opskriftside.html?id=${post.id}" class="btn">Make now</a>
			</article>`;
    });
}