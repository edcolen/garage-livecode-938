import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
    static targets = ["carsList"];

    connect() {
        this.garageName = "awesome-garage-name";
        this.garageUrl = `https://wagon-garage-api.herokuapp.com/${this.garageName}/cars`;
        fetch(this.garageUrl)
            .then((response) => response.json())
            .then((data) => {
                this.carsListTarget.innerHTML = "";
                data.forEach((car) => this._insertCarCard(car));
            });
    }

    insertCarCard(car) {
        const carCard = `<div class="car">
        <div class="car-image">
          <img src="http://loremflickr.com/300/300/${car.brand}%20${car.model}">
        </div>
        <div class="car-info">
          <h4>${car.brand} - ${car.model}</h4>
          <p><strong>Owner:</strong> ${car.owner}</p>
          <p><strong>Plate:</strong> ${car.plate}</p>
        </div>
      </div>`;
        this.carsListTarget.insertAdjacentHTML("beforeend", carCard);
    }
}