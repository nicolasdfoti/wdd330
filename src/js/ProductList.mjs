import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {

    return `
        <li class="product-card">
            <h2 class="card-name">${product.NameWithoutBrand}</h2>
            <p class="card-description">${product.DescriptionHtmlSimple}</p>
            <img src="${product.Image}" alt="${product.NameWithoutBrand}" />
            <p class="product-card__price">$${product.FinalPrice}</p>
        </li>
    `;    

}

export default class ProductList {
    constructor(category, dataSource, listElement) {
        this.category = category;
        this.dataSource = dataSource;
        this.listElement = listElement;
    }

    async init() {
        const list = await this.dataSource.getData();
        this.renderList(list);
    }

    // renderList(list) {
    //     console.log(list);
    //     const htmlList = list.map(productCardTemplate).join('');
    //     this.listElement.innerHTML = htmlList;
    // }

    renderList(list) {
        renderListWithTemplate(productCardTemplate, this.listElement, list, "afterbegin", true);
    }
}