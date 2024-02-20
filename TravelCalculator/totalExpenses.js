function totalExpenses() {
    var calculationOption = document.querySelector('input[name="calculationOption"]:checked').value;

    var fuelCosts = 0;
    var accommodationCosts = 0;

    if (calculationOption === "stored") {
        fuelCosts = parseFloat(localStorage.getItem("fuelCosts"));
        accommodationCosts = parseFloat(localStorage.getItem("accommodationCosts"));
    } else {
        fuelCosts = parseFloat(document.getElementById("fuelCosts").value) || 0;
        accommodationCosts = parseFloat(document.getElementById("accommodation").value) || 0;
    }

    var foodDrinks = parseFloat(document.getElementById("foodDrinks").value) || 0;
    var attractions = parseFloat(document.getElementById("attractions").value) || 0;
    var gifts = parseFloat(document.getElementById("gifts").value) || 0;

    var totalExpenses = fuelCosts + accommodationCosts + foodDrinks + attractions + gifts;

    document.getElementById("costs").value = isNaN(totalExpenses) ? "" : totalExpenses.toFixed(2);
}

function updateInputFields() {
    var calculationOption = document.querySelector('input[name="calculationOption"]:checked').value;

    if (calculationOption === "stored") {
        var fuelCostsStored = parseFloat(localStorage.getItem("fuelCosts")) || 0;
        var accommodationCostsStored = parseFloat(localStorage.getItem("accommodationCosts")) || 0;

        document.getElementById("fuelCosts").value = fuelCostsStored.toFixed(2);
        document.getElementById("accommodation").value = accommodationCostsStored.toFixed(2);
    } else {
        document.getElementById("fuelCosts").value = "";
        document.getElementById("accommodation").value = "";
    }
}
