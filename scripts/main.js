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

            // Recipe image
            const img_recipe = document.createElement('div');
            img_recipe.className = 'card-img-top';
            img_recipe.src = ""; // Introduire l'image de chaque recette
            img_recipe.alt = recipe.appliance;
            img_recipe.style.height = '200px';
            img_recipe.style.backgroundColor = '#C7BEBE';
            card.appendChild(img_recipe);

            // Recipe body
            const card_body = document.createElement('div');
            card_body.className = 'card-body text-dark p-2';
            card_body.style.height = '250px';
            card_body.style.backgroundColor = '#E7E7E7';

            // Recipe title part 
            let recipe_div = document.createElement('div');
            recipe_div.className = 'card-title d-flex justify-content-between border border-left-0 border-right-0 border-top-0 border-secondary pr-0';
            let recipe_title = document.createElement('span');
            recipe_title.className = 'h5 font-weight-bold';
            recipe_title.innerHTML = recipe.name;
            let recipe_time = document.createElement('span');
            recipe_time.className = 'h5 font-weight-bold mb-0';
            recipe_time.innerHTML = '<img class="mb-0" src="assets/main/clock.png">' + recipe.time + 'min';
            recipe_time.style.minWidth = '90px';
            recipe_div.appendChild(recipe_title);
            recipe_div.appendChild(recipe_time);

            // Recipe informations part
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

            // Recipe unit handling
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

            // Recipe informations DOM
            let column_recipe_right = document.createElement('div');
            column_recipe_right.className = 'col-6 col-lg-5 m-0 pl-0 pr-0 recipe-descriptor';
            row_recipe.appendChild(column_recipe_right);

            let desc_recipe = document.createElement('span');
            desc_recipe.className = 'h6';
            desc_recipe.innerHTML = recipe.description.substr(0, 100) + '(...)';
            column_recipe_right.appendChild(desc_recipe);
            
            // DOM nesting
            card.appendChild(img_recipe);
            card_body.appendChild(recipe_div);
            card_body.appendChild(container_recipe);
            card.appendChild(card_body);
            card_deck.appendChild(grid);
        })
        recipesSection.appendChild(main_container);
    }
}


// Auto display ingredients inside ingredient search bar 
async function displayIngredientsInDOM(ingredients) {
    const dropped_ingredients_components = document.querySelector('#dropped_ingredients_components');
    dropped_ingredients_components.innerHTML = '';

    // DOM imbrication nesting
    if(ingredients.length != 0 && ingredients.length != 2) {
        ingredients.forEach((ingredient) => {
            const dropped_column = document.createElement('div');
            dropped_column.className = 'col-4';
            dropped_column.innerHTML = '<a class="h6 pl-2 dropdown-item text-light btn btn-primary bg-primary">' + ingredient.charAt(0).toUpperCase() + ingredient.slice(1).split(' ').slice(0, 3).join(' '); + '</a>';
            dropped_ingredients_components.style.minWidth = '40em';
            dropped_ingredients_components.appendChild(dropped_column);
        })
    }
    else if (ingredients.length == 2) {
        ingredients.forEach((ingredient) => {
            const dropped_column = document.createElement('div');
            dropped_column.className = 'col-6';
            dropped_column.innerHTML = '<a class="h6 pl-2 dropdown-item text-light btn btn-primary bg-primary">' + ingredient.charAt(0).toUpperCase() + ingredient.slice(1) + '</a>';
            dropped_ingredients_components.style.width = '10em';
            dropped_ingredients_components.appendChild(dropped_column);
        })
    }
    else if (ingredients.length == 0) {
        const dropped_column = document.createElement('div');
        dropped_column.innerHTML = '<span class="h6 pl-3 text-light"> Aucun résultat </span>';
        dropped_ingredients_components.style.width = 'auto';
        dropped_ingredients_components.appendChild(dropped_column);
    }
}


// Autocompletion system inside search bars
function autocompletionDataSearcher(datas) {
    const main_search_bar = document.querySelector('#main-search-bar');

    const ingredients_search_bar = document.querySelector('#ingredients-search-bar');

    main_search_bar.addEventListener('keydown', (e) => {
        // console.log(datas);
        let datas_searched = [];

        // Sorting the initial dataset in ascending alphabetical order
        if(datas.length >= 2) {
            datas.sort(function(a, b) {
                return a.name.localeCompare(b.name);
            });
        }
        console.log(datas); 

        // Recherche dans le tableau de données trié des valeurs correspondantes à l'input de la search bar 
        datas.forEach((data) => {
            if(data.name.toLowerCase().startsWith(main_search_bar.value.toLowerCase()) && main_search_bar.value != "") {
                datas_searched.push(data);
            }
        });

        // Modification automatique du DOM de l'id recipes_section
        displayRecipes(datas_searched);

        return datas_searched;
    });


    ingredients_search_bar.addEventListener('focus', (e) => {
        const dropped_ingredients_components = document.querySelector('#dropped_ingredients_components');
        dropped_ingredients_components.innerHTML = '';
        console.log(ingredients_search_bar.value);
        setTimeout(() => {
            ingredients_search_bar.value = "";
            ingredients_search_bar.innerHTML = "";
        }, 20);
        
        setTimeout(() => {
            if(ingredients_search_bar.value == ''){
                const dropped_column = document.createElement('div');
                dropped_column.innerHTML = '<span class="h6 pl-3 text-light"> Aucun résultat </span>';
                dropped_ingredients_components.appendChild(dropped_column);
            }
        }, 50);
    });


    ingredients_search_bar.addEventListener('keydown', (e) => {
        let ingredients_searched = [];

        setTimeout(() => {
            datas.forEach((data) => {
                // console.log(data.appliance);
                data.ingredients.forEach((item) => {
                    if(item.ingredient.toLowerCase().startsWith(ingredients_search_bar.value.toLowerCase()) && ingredients_search_bar.value != "") {
                        ingredients_searched.push(item.ingredient);
                    }
                });
            });

            // Delete all values in ingredients_searched that are the same
            let unique_ingredients = ingredients_searched.filter((x, i) => ingredients_searched.indexOf(x) === i);

            // Display unique_ingredients into yje ingredient search element as dropdown items elements
            displayIngredientsInDOM(unique_ingredients);
        }, 100);
    });
}


// Initialisation
async function init() {
    const recipes = await requestAllRecipes();
    displayRecipes(recipes);
    autocompletionDataSearcher(recipes);
};

init();


