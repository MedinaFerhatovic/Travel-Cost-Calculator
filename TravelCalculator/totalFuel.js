function calculateFuel(){
    const distance = parseFloat(document.getElementById("distance").value);
    const litres = parseFloat(document.getElementById("litres").value);
    const price = parseFloat(document.getElementById("price").value);

    if (isNaN(distance) || isNaN(litres) || isNaN(price)){
        alert('Please enter the correct numerical values.');
        return;
    }

    const fuelLitres = (distance*litres)/100;
    const fuelCosts = (fuelLitres*price).toFixed(2);

    const costsInput = document.getElementById('costs');
    costsInput.value = fuelCosts + ' KM';

    localStorage.setItem("fuelCosts", fuelCosts + ' KM');
}
