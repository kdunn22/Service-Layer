
function getMeal(mealType){

var search = document.getElementById(mealType).value;
var logTable = document.getElementById('logTable')
var url = 'https://api.nutritionix.com/v1_1/search/' + search + '?results=0:1&fields=item_name,nf_calories&appId=8f6f160e&appKey=b1faaff0da2551cf674f119bf131b33d'

switch(mealType){
    case 'bMeal':
        var x = 1;
        break;
    case 'lMeal':
        var x = 2;
        break;
    case 'dMeal':
        var x = 3;
        break;
    case 'sMeal':
        var x = 4;
        break;
}

fetch(url)
    .then(
        function(response) {
            if (response.status !== 200) {
              console.log('Looks like there was a an error retrieving the data.');
              return;
            }
        response.json().then(function(data){
                logTable.rows[x].cells[1].innerHTML = data.hits[0].fields["item_name"];
                logTable.rows[x].cells[2].innerHTML = data.hits[0].fields["nf_calories"];
            })
        }
    )
    .catch(function(err) {
        console.log('Fetch Error :-S', err);
    });
}
