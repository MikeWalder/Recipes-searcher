async function requestAllRecipes() {
    return fetch('http://127.0.0.1:5500/Recipes-searcher/data/recipes.json')
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

    if(dataRecipes.length > 0) {
        let main_container = document.createElement('div');
        main_container.className = 'container-fluid';
        let main_row = document.createElement('div');
        main_row.className = 'row';


        let container = document.createElement('div');
        container.className = 'container-fluid';
        let row = document.createElement('div');
        row.className = 'row';
        let card_deck = document.createElement('div');
        card_deck.className = 'card-deck';
        
        container.appendChild(row);
        row.appendChild(card_deck);
        
        dataRecipes.forEach((recipe) => {
            const grid = document.createElement('div');
            grid.className = 'col-12 col-md-4';

            const card = document.createElement('div');
            card.className = "card border-0 p-0 m-0 text-light rounded";
            grid.appendChild(card);

            // Image de la recette
            const img_recipe = document.createElement('div');
            img_recipe.className = 'card-img-top img-thumbnail';
            img_recipe.src = ""; // Introduire l'image de chaque recette
            img_recipe.alt = recipe.appliance;
            img_recipe.style.height = '200px';
            img_recipe.style.backgroundColor = '#C7BEBE';
            card.appendChild(img_recipe);

            // Corps de la recette
            const card_body = document.createElement('div');
            card_body.className = 'card-body text-dark';
            card_body.style.height = '250px';
            card_body.style.backgroundColor = '#E7E7E7';

            // Partie titre du de la recette et temps alloué
            let recipe_div = document.createElement('div');
            recipe_div.className = 'card-title d-flex justify-content-between';
            let recipe_title = document.createElement('span');
            recipe_title.className = 'h5';
            recipe_title.innerHTML = recipe.name;
            let recipe_time = document.createElement('span');
            recipe_time.className = 'h5 font-weight-bold';
            recipe_time.innerHTML = '<img src="assets/main/clock.png"> ' + recipe.time + ' min';
            recipe_div.appendChild(recipe_title);
            recipe_div.appendChild(recipe_time);

            // Partie informations de la recette
            let container_recipe = document.createElement('div');
            container_recipe.className = 'container-fluid p-0 m-0';
            let row_recipe = document.createElement('div');
            row_recipe.className = 'row';
            container_recipe.appendChild(row_recipe);
            let column_recipe = document.createElement('div');
            column_recipe.className = 'col-6 m-0';
            let ingredients_recipe = document.createElement('span');
            ingredients_recipe.className = 'font-weight-bold';
            column_recipe.appendChild(ingredients_recipe);
            row_recipe.appendChild(column_recipe);

            recipe.ingredients.forEach((ingredient) => {
                if(ingredient.unit) {
                    if(ingredient.unit.length <= 2){
                        ingredients_recipe.innerHTML += '' + ingredient.ingredient + ' : ' + ingredient.quantity + ' ' + ingredient.unit.split(" ", 1) + '<br>';
                    }
                    else {
                        ingredients_recipe.innerHTML += '' + ingredient.ingredient + ' : ' + ingredient.quantity + ' ' + ingredient.unit.substr(0, 1) + '<br>';
                    }
                }
            })

            let column_recipe_right = document.createElement('div');
            column_recipe_right.className = 'col-6 m-0';
            row_recipe.appendChild(column_recipe_right);
            let desc_recipe = document.createElement('span');
            desc_recipe.className = 'h6';
            desc_recipe.innerHTML = recipe.description.split(" " , 30) + '...';
            column_recipe_right.appendChild(desc_recipe);
            

            // Imbrications du DOM
            card.appendChild(img_recipe);
            card_body.appendChild(recipe_div);
            card_body.appendChild(container_recipe);
            card.appendChild(card_body);
            card_deck.appendChild(grid);
            
        })
        console.log(card_deck);
        recipesSection.appendChild(container);
        /* console.log(containerDOM);
        row.appendChild(containerDOM); */
    }
}

/* async function completeRecipesByReserches(inpt, recipes) {
    recipes.forEach((recipe) =>{
        // console.log(recipe.name + " - " + recipe.appliance);
    })
} */

async function init() {
    // Récupère les datas des photographes
    const recipes = await requestAllRecipes();
    // console.log(photographers);
    // displayData(photographers);

    console.log(typeof(recipes));
    displayAllRecipes(recipes);
    // completeRecipesByReserches(document.getElementById('#recipes_section'), recipes);
};

init();


