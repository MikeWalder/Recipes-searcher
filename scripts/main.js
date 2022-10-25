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


/* async function displayData(photographers) {
    const photographersSection = document.querySelector(".photographer_section");

    photographers.photographers.forEach((photographer) => {
        const photographerModel = photographerFactory(photographer);
        // console.log(photographerModel);
        const userCardDOM = photographerModel.getUserCardDOM();
        photographersSection.appendChild(userCardDOM);
    });
}; */

async function init() {
    // Récupère les datas des photographes
    const recipes = await requestAllRecipes();
    console.log(recipes[0].id);
    // console.log(photographers);
    // displayData(photographers);
};

init();
