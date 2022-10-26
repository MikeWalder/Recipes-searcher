async function requestAllRecipes() {
    return fetch('http://127.0.0.1:5500/data/recipes.json')
    .then(function(response) {
        return response.json();
    })
    .then((data) => {
        console.log(data);
        return data;
    })
    .catch(err => console.log(err));
}


async function displayData(photographers) {
    const recipesSection = document.querySelector("#recipes_result");

    photographers.photographers.forEach((photographer) => {
        const photographerModel = photographerFactory(photographer);
        // console.log(photographerModel);
        const userCardDOM = photographerModel.getUserCardDOM();
        recipesSection.appendChild(userCardDOM);
    });
};

async function displayAllRecipes(dataRecipes) {
    const recipesSection = document.querySelector('#recipes_section');
    recipesSection.innerHTML = '';
    console.log(recipesSection);
    if(dataRecipes.length !== 0) {
        let container = document.createElement('div');
        container.className = 'container';
        let row = document.createElement('div');
        row.className = 'row';
        let card_deck = document.createElement('div');
        card_deck.className = 'card-deck';
        
        container.appendChild(row);
        row.appendChild(card_deck);
        
        

        dataRecipes.forEach((recipe) => {
            const card = document.createElement('div');
            card.className = "card p-3 col-12 col-md-6 col-lg-3 bg-secondary text-light";
            card.style.width = "300px";

            // Image de la recette
            const img_recipe = document.createElement('div');
            img_recipe.className = 'card-img-top';
            img_recipe.src = ""; // Introduire l'image de chaque recette
            img_recipe.alt = recipe.appliance;
            card.appendChild(img_recipe);

            // Corps de la recette
            const card_body = document.createElement('div');
            card_body.className = 'card-body bg-secondary text-light';

            let recipe_title = document.createElement('h5');
            recipe_title.className = 'card-title';
            recipe_title.innerHTML = recipe.name;

            card.appendChild(img_recipe);
            card.appendChild(recipe_title);
            card_deck.appendChild(card);
            
        })
        console.log(card_deck);

        recipesSection.appendChild(container);
        /* console.log(containerDOM);
        row.appendChild(containerDOM); */
    }
}

async function completeRecipesByReserches(inpt, recipes) {
    recipes.forEach((recipe) =>{
        // console.log(recipe.name + " - " + recipe.appliance);
    })
}

async function init() {
    // Récupère les datas des photographes
    const recipes = await requestAllRecipes();
    // console.log(photographers);
    // displayData(photographers);
    displayAllRecipes(recipes);
    completeRecipesByReserches(document.getElementById('#recipes_section'), recipes);
};

init();


