
import { getCookie } from "../utils/cookie.js";
import { getData } from "../utils/httpReq.js";
import { shortenText } from "../utils/stringFunction.js";

let allProducts = null;
let search = "";
let category = "all";

/* These lines of code are selecting HTML elements from the DOM (Document Object Model) using their
respective IDs. */
const loginButton = document.getElementById("login");
const dashboardButton = document.getElementById("dashboard");
const mainContent = document.getElementById("products");
const searchButton = document.querySelector('button');
const inputBox = document.querySelector('input');
const listItems = document.querySelectorAll("li");

const showProducts = (products) => {
    mainContent.innerHTML = ""
    products.forEach(product => {
        const JSX = `
    <div>
            <img alt="${product.title}" src="${product.image}"/>
            <h4>${shortenText(product.title)}</h4>
        <div id="price">
            <p>$ ${product.price}</p>
            <button>
                 Buy
             <i class="fa fa-shopping-cart" aria-hidden="true"></i>
            </button>
        <div id="rate">
                <span>
                <i class="fa fa-star" aria-hidden="true"></i>
                ${product.rating.rate}</span>  
        </div>
        <div id="count">
                <span>
                 <i class="fa fa-user" aria-hidden="true"></i>
                ${product.rating.count}
                </span>  
        </div>
        </div>
    </div>
    `
        mainContent.innerHTML += JSX;
    });
}

const init = async () => {
    const cookie = getCookie()
    if (cookie) {
        loginButton.style.display = "none";
    } else {
        dashboardButton.style.display = "none";
    }
    allProducts = await getData("products");

    showProducts(allProducts);
}

const filterProducts = () => {
    const filteredProducts = allProducts.filter((product) => {
        if (category === "all") {
            return product.title.toLowerCase().includes(search)
        } else {
            return (product.title.toLowerCase().includes(search) &&
                product.category.toLowerCase() === category)
        }
    });
    showProducts(filteredProducts)
};
const searchHandler = () => {
    search = inputBox.value.trim().toLowerCase();
    filterProducts();

}
const filterHandler = (e) => {
    category = e.target.innerText.toLowerCase();
    listItems.forEach(li => {
        if (li.innerText.toLowerCase() === category) {
            li.className = "selected";
        } else {
            li.className = "";
        }
    })
    filterProducts();
}


document.addEventListener("DOMContentLoaded", init);
searchButton.addEventListener('click', searchHandler);
listItems.forEach(li => li.addEventListener("click", filterHandler));