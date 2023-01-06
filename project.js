const form = document.getElementById("car-form");
const titleElement = document.querySelector("#title");
const priceElement = document.querySelector("#price");
const urlElement = document.querySelector("#url");
const cardBody = document.querySelectorAll(".card-body")[1];
const clear = document.getElementById("clear-cars");


//UI Objesini Başlatma
const ui = new UI();
const storage = new Storage();

//Tüm Eventleri Yükleme
eventListeners();

function eventListeners() {
    form.addEventListener("submit", addCar);

    document.addEventListener("DOMContentLoaded", function(){
        let cars = storage.getCarsFromStorage();
        ui.loadAllCars(cars);
    });

    cardBody.addEventListener("click", deleteCar);
    clear.addEventListener("click", clearAllCars);
}

function addCar(e) {
    const title = titleElement.value;
    const price = priceElement.value;
    const url = urlElement.value;

    if (title === "" || price === "" || url === "") {
        ui.displayMessage("Tüm alanları doldur...", "danger");
    } else {
        const newCar = new Car(title, price, url);
        ui.addCarToUI(newCar); //Arayüze araç ekleme
        storage.addCarToStorage(newCar);
        ui.displayMessage("Araç başarıyla eklendi...", "success");
    }
    ui.clearInputs(titleElement, urlElement, priceElement)

    e.preventDefault();
}

function deleteCar(e){
    if(e.target.id === "delete-car"){
        ui.deleteCarFromUI(e.target);
        storage.deleteCarFromStorage(e.target.parentElement.previousElementSibling.previousElementSibling);

        ui.displayMessage("Silme işlemi başarıyla gerçekleşti...", "success");
    }
}

function clearAllCars(){
    ui.clearAllCarsFromUI();
    storage.clearAllCarsFromStorage();
}