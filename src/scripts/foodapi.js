fetch("http://localhost:8088/foods")
    .then(foods => foods.json())
    .then(parsedFoods => {
        parsedFoods.forEach(food => {
            fetch(`https://world.openfoodfacts.org/api/v0/product/${food.barcode}.json`)
                .then(response => response.json())
                .then(productInfo => {
                    // Use it here
                    // food.ingredients = productInfo.product.ingredients;
                    food.ingredients = productInfo.product.ingredients.map(i => {
                        return `${i.text}`
                    }).join(', ');
                    food.fat = productInfo.product.nutriments.fat_serving;
                    food.fatUnit = productInfo.product.nutriments.fat_unit;
                    food.sugar = productInfo.product.nutriments.sugars_serving;
                    food.sugarUnit = productInfo.product.nutriments.sugars_unit;
                    food.calories = productInfo.product.nutriments.energy_serving;
                    food.calUnit = productInfo.product.nutriments.energy_unit;
                    console.log(food);

                const foodAsHTML = foodFactory(food);
                addFoodToDom(foodAsHTML)
            })
        })
    })


const foodFactory = food => {
    // const shoppingList = food.ingredients;
    // let ingredients = [];
    // for (let i = 0; i < shoppingList.length; i++) {
    //     const element = shoppingList[i];
    //     ingredients.push(element.text);
    // }
    return `<section class="foodCard">
    <h2>${food.name}</h2>
    <p>${food.category}</p>
    <p>${food.ingredients}</p>    
    <p>${food.calories}${food.calUnit} per serving</p>
    <p>${food.sugar}${food.sugarUnit} of sugar per serving</p>
    <p>${food.fat}${food.fatUnit} of fat per serving</p>
    <p>${food.ethnicity}</p>
    </section>`;
}

const addFoodToDom = foodAsHTML => {
    let foodGoHere = document.querySelector(".foodList");
    foodGoHere.innerHTML += foodAsHTML;
}


/* <p>${ingredients.join(', ')}</p> */