"use strict";

class Pizza {
  static TYPES = {
    margarita: { name: "Маргарита", price: 500, calories: 300 },
    pepperoni: { name: "Пепперони", price: 800, calories: 400 },
    bavarian: { name: "Баварская", price: 700, calories: 450 },
  };

  static SIZES = {
    small: { name: "Маленькая", price: 100, calories: 100 },
    large: { name: "Большая", price: 200, calories: 200 },
  };

  static TOPPINGS = {
    mozzarella: { name: "Сливочная моцарелла", price: 50, calories: 20 },
    cheeseBorder: {
      name: "Сырный борт",
      prices: { small: 150, large: 300 },
      calories: 50,
    },
    cheddarParmesan: {
      name: "Чеддер и пармезан",
      prices: { small: 150, large: 300 },
      calories: 50,
    },
  };

  constructor(type, size) {
    if (!Pizza.TYPES[type]) {
      throw new Error("Неверный вид пиццы");
    }

    if (!Pizza.SIZES[size]) {
      throw new Error("Неверный размер пиццы");
    }

    this.type = type;
    this.size = size;
    this.toppings = [];
  }

  addTopping(topping) {
    if (!Pizza.TOPPINGS[topping]) {
      throw new Error("Такой добавки не существует");
    }

    if (!this.toppings.includes(topping)) {
      this.toppings.push(topping);
    }
  }

  removeTopping(topping) {
    this.toppings = this.toppings.filter((item) => item !== topping);
  }

  getToppings() {
    return this.toppings.map((item) => Pizza.TOPPINGS[item].name);
  }

  getStuffing() {
    return Pizza.TYPES[this.type].name;
  }

  getSize() {
    return Pizza.SIZES[this.size].name;
  }

  calculatePrice() {
    const pizzaPrice = Pizza.TYPES[this.type].price;
    const sizePrice = Pizza.SIZES[this.size].price;

    const toppingsPrice = this.toppings.reduce((total, topping) => {
      const toppingData = Pizza.TOPPINGS[topping];
      return total + (toppingData.prices ? toppingData.prices[this.size] : toppingData.price);
    }, 0);

    return pizzaPrice + sizePrice + toppingsPrice;
  }

  calculateCalories() {
    const pizzaCalories = Pizza.TYPES[this.type].calories;
    const sizeCalories = Pizza.SIZES[this.size].calories;

    const toppingsCalories = this.toppings.reduce((total, topping) => {
      return total + Pizza.TOPPINGS[topping].calories;
    }, 0);

    return pizzaCalories + sizeCalories + toppingsCalories;
  }
}

const pizzaTypeSelect = document.getElementById("pizzaType");
const pizzaSizeSelect = document.getElementById("pizzaSize");
const toppingsCheckboxes = document.querySelectorAll('input[type="checkbox"]');
const calculateBtn = document.getElementById("calculateBtn");
const resultBlock = document.getElementById("result");

calculateBtn.addEventListener("click", () => {
  const pizzaType = pizzaTypeSelect.value;
  const pizzaSize = pizzaSizeSelect.value;

  if (!pizzaType || !pizzaSize) {
    resultBlock.textContent = "Сначала выберите вид пиццы и размер.";
    return;
  }

  const pizza = new Pizza(pizzaType, pizzaSize);

  toppingsCheckboxes.forEach((checkbox) => {
    if (checkbox.checked) {
      pizza.addTopping(checkbox.value);
    }
  });

  const toppings = pizza.getToppings();
  const toppingsText = toppings.length ? toppings.join(", ") : "без добавок";

  resultBlock.textContent =
    `Пицца: ${pizza.getStuffing()}\n` +
    `Размер: ${pizza.getSize()}\n` +
    `Добавки: ${toppingsText}\n` +
    `Цена: ${pizza.calculatePrice()} рублей\n` +
    `Калорийность: ${pizza.calculateCalories()} ккал`;

  console.log(pizza);
});
