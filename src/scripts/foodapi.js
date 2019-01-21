fetch("http://localhost:8088/foods")
    .then(foods => foods.json())
    .then(parsedFoods => {
        console.table(parsedFoods)
        parsedFoods.forEach(food => {
            const foodAsHTML = foodFactory(food);
            addFoodToDom(foodAsHTML)
        })
    })


const foodFactory = food => {
    return `<section class="foodCard">
    <h2>${food.name}</h2>
    <p>${food.category}</p>
    <p>${food.ethnicity}</p>
    </section>`;
}

const addFoodToDom = foodAsHTML => {
    let foodGoHere = document.querySelector(".foodList");
    foodGoHere.innerHTML += foodAsHTML;
}