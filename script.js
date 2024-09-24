let button = document.getElementById('start');
let paragraph = document.getElementById('content');

// fetch then
button.addEventListener('click', function () {
    button.disabled = true;
    setTimeout(() => {
        fetchData().then((result) => {
            paragraph.textContent = result;
        }).finally(() => {
            button.disabled = false;
        });
    }, 1000);
});

function fetchData() {
    return fetch("https://www.thecocktaildb.com/api/json/v1/1/random.php")
        .then((response) => {
            if (!response.ok) {
                throw new Error(`Status ${response.status}`);
            }
            return response.json();
        })
        .then((data) => {
            return ('Your cocktail for tonight is ' + data.drinks[0].strDrink) + '!';
        })
        .catch((error) => {
            console.error(`Could not get cocktail: ${error}`);
            return error;
        });
}


// same code with async await
let button1 = document.getElementById('start1');
let paragraph1 = document.getElementById('content1');

button1.addEventListener('click', async function () {
    button1.disabled = true;
    setTimeout(async () => {
        try {
            paragraph1.textContent = await fetchDataAsync();
        } finally {
            button1.disabled = false;
        }
    }, 1000);
});

async function fetchDataAsync() {
    try {
        let response = await fetch("https://www.thecocktaildb.com/api/json/v1/1/random.php");
        if (!response.ok) {
            throw new Error(`Status ${response.status}`);
        }
        let data = await response.json();
        return ('Your cocktail for tonight is ' + data.drinks[0].strDrink) + '!';
    } catch (error) {
        console.error(`Could not get cocktail: ${error}`);
        return error;
    }
}