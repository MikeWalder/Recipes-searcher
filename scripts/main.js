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


async function displayRecipes(dataRecipes) {
    const recipesSection = document.querySelector('#recipes_section');
    recipesSection.innerHTML = '';

    if(dataRecipes.length > 0) {
        let main_container = document.createElement('div');
        main_container.className = 'container';
        recipesSection.appendChild(main_container);

        let main_row = document.createElement('div');
        main_row.className = 'row';
        main_container.appendChild(main_row);


        let center_spacing_column_cards = document.createElement('div');
        center_spacing_column_cards.className = 'col-12 px-0';
        main_row.appendChild(center_spacing_column_cards);

        let container_cards = document.createElement('div');
        container_cards.className = 'container';
        center_spacing_column_cards.appendChild(container_cards);

        let row_cards = document.createElement('div');
        row_cards.className = 'row';
        container_cards.appendChild(row_cards);

        let card_deck = document.createElement('div');
        card_deck.className = 'card-deck';
        row_cards.appendChild(card_deck);
        
        dataRecipes.forEach((recipe) => {
            const grid = document.createElement('div');
            grid.className = 'col-12 col-md-6 col-lg-4';

            const card = document.createElement('div');
            card.className = "card border-0 p-0 m-0 text-light rounded";
            grid.appendChild(card);

            // Image de la recette
            const img_recipe = document.createElement('div');
            img_recipe.className = 'card-img-top';
            img_recipe.src = ""; // Introduire l'image de chaque recette
            img_recipe.alt = recipe.appliance;
            img_recipe.style.height = '200px';
            img_recipe.style.backgroundColor = '#C7BEBE';
            card.appendChild(img_recipe);

            // Corps de la recette
            const card_body = document.createElement('div');
            card_body.className = 'card-body text-dark p-2';
            card_body.style.height = '250px';
            card_body.style.backgroundColor = '#E7E7E7';

            // Partie titre du de la recette et temps alloué
            let recipe_div = document.createElement('div');
            recipe_div.className = 'card-title d-flex justify-content-between pr-0';
            let recipe_title = document.createElement('span');
            recipe_title.className = 'h5';
            recipe_title.innerHTML = recipe.name;
            let recipe_time = document.createElement('span');
            recipe_time.className = 'h5 font-weight-bold';
            recipe_time.innerHTML = '<img class="mb-1" src="assets/main/clock.png"> ' + recipe.time + 'min';
            recipe_time.style.minWidth = '85px';
            recipe_div.appendChild(recipe_title);
            recipe_div.appendChild(recipe_time);

            // Partie informations de la recette
            let container_recipe = document.createElement('div');
            container_recipe.className = 'container-fluid no-gutters';
            let row_recipe = document.createElement('div');
            row_recipe.className = 'row';
            container_recipe.appendChild(row_recipe);
            let column_recipe = document.createElement('div');
            column_recipe.className = 'col-6 col-lg-7 m-0 ml-0 pl-0';
            let ingredients_recipe = document.createElement('span');
            ingredients_recipe.className = 'font-weight-bold h6';
            column_recipe.appendChild(ingredients_recipe);
            row_recipe.appendChild(column_recipe);

            recipe.ingredients.forEach((ingredient) => {
                ingredients_recipe.innerHTML += ingredient.ingredient;
                if(ingredient.unit) {
                    switch(ingredient.unit) {
                        case 'cuillères à soupe' :
                            ingredients_recipe.innerHTML += ' : ' + ingredient.quantity + 'c.c.<br>';
                            break;
                        case 'grammes' : 
                            ingredients_recipe.innerHTML += ' : ' + ingredient.quantity + 'g<br>';
                            break;
                        default:
                            ingredients_recipe.innerHTML += ' : ' + ingredient.quantity + ' ' + ingredient.unit + '<br>';
                    }
                } else {
                    ingredients_recipe.innerHTML += '<br>';
                }
            })

            let column_recipe_right = document.createElement('div');
            column_recipe_right.className = 'col-6 col-lg-5 m-0 pl-0 pr-0 recipe-descriptor';
            row_recipe.appendChild(column_recipe_right);
            let desc_recipe = document.createElement('span');
            desc_recipe.className = 'h6';
            desc_recipe.innerHTML = recipe.description.substr(0, 100) + '(...)';
            column_recipe_right.appendChild(desc_recipe);
            
            // Imbrications du DOM
            card.appendChild(img_recipe);
            card_body.appendChild(recipe_div);
            card_body.appendChild(container_recipe);
            card.appendChild(card_body);
            card_deck.appendChild(grid);
            
        })
        recipesSection.appendChild(main_container);
    }
}

// Système d'autocomplétion de la barre de recherches 


function autocompletionDataSearcher(datas) {
    const main_search_bar = document.querySelector('#search-bar');
    main_search_bar.addEventListener('keydown', (e) => {
        // console.log(datas);
        let datas_searched = [];

        // Tri du jeu de données initial par ordre alphabétique croissant
        console.log(datas);
        if(datas.length >= 2) {
            datas.sort(function(a, b) {
                return a.name.localeCompare(b.name);
            });
        }
        console.log(datas); 


        // Recherche dans le tableau de données trié des valeurs correspondantes à l'input de la search bar 
        datas.forEach((data) => {
            //console.log(data.name);
            if(data.name.toLowerCase().startsWith(main_search_bar.value.toLowerCase()) && main_search_bar.value != "") {
                datas_searched.push(data);
            }
        });
        console.log(datas_searched);

        // Modification automatique du DOM de l'id recipes_section
        displayRecipes(datas_searched);
        return datas_searched;
    });
}

async function init() {
    // Récupère les datas des photographes
    const recipes = await requestAllRecipes();

    displayRecipes(recipes);
    
    autocompletionDataSearcher(recipes);
};

init();


