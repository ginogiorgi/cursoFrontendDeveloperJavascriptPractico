const navEmail = document.querySelector('.navbar-email');
const desktopMenu = document.querySelector('.desktop-menu');
const menuHamburguer = document.querySelector('.menu');
const mobileMenu = document.querySelector('.mobile-menu');
const shoppingCart = document.querySelector('.navbar-shopping-cart');
const shoppingCartContainer = document.querySelector('#shoppingCartContainer');
const cardsContainer = document.querySelector('.cards-container');
const productDetailContainer = document.querySelector('#productDetail');
const productDetailCloseIcon = document.querySelector('.product-detail-close');
const shoppingCartContent = document.querySelector('#mainShoppingCartDiv');
const cartTitleContainer = document.querySelector(".titileContainer");
const cartNumber = document.querySelector('#count');
const totalCart = document.querySelector('#shopping-cart-total');
const addToCartButton = document.querySelector('.add-to-cart-button');
const all = document.querySelector('#all');
const clothes = document.querySelector('#clothes');
const electronics = document.querySelector('#electronics');
const futernitures = document.querySelector('#futernitures');
const toys = document.querySelector('#toys');
const others = document.querySelector('#others');
const all2 = document.querySelector('#all2');
const clothes2 = document.querySelector('#clothes2');
const electronics2 = document.querySelector('#electronics2');
const futernitures2 = document.querySelector('#futernitures2');
const toys2 = document.querySelector('#toys2');
const others2 = document.querySelector('#others2');
let selectedItemValues = {};
let cartObjects = [];
let productsShown = [];

function toggleDesktopMenu(){
    const isshoppingCartContainerOpen = !shoppingCartContainer.classList.contains('inactive');
    const productDetailAsideOpen = !productDetailContainer.classList.contains('inactive');
    if (isshoppingCartContainerOpen){
        shoppingCartContainer.classList.add('inactive');
    }
    if (productDetailAsideOpen){
        productDetailContainer.classList.add('inactive');
    }
    desktopMenu.classList.toggle('inactive');
}
function toggleShoppingCartContainer(){
    const isMobileMenuOpen = !mobileMenu.classList.contains('inactive');
    const isDesktopMenuOpen = !desktopMenu.classList.contains('inactive');
    const productDetailAsideOpen = !productDetailContainer.classList.contains('inactive');
    if (isMobileMenuOpen){
        mobileMenu.classList.add('inactive');
    }
    if (isDesktopMenuOpen){
        desktopMenu.classList.add('inactive');
    }
    if (productDetailAsideOpen){
        productDetailContainer.classList.add('inactive');
    }
    document.getElementById('shopping-cart-total').innerHTML = new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(total);;
    shoppingCartContainer.classList.toggle('inactive');
}
function toggleMobileMenu(){
    const isshoppingCartContainerOpen = !shoppingCartContainer.classList.contains('inactive');
    const productDetailAsideOpen = !productDetailContainer.classList.contains('inactive');
    if (isshoppingCartContainerOpen){
        shoppingCartContainer.classList.add('inactive');
    };
    if (productDetailAsideOpen){
        productDetailContainer.classList.add('inactive');
    };
    mobileMenu.classList.toggle('inactive');
}
function renderProducts(list){
    list.forEach((product) =>{
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');
    
        const productImg = document.createElement('img');
        productImg.setAttribute('src', product.image);
        productImg.addEventListener('click', () =>{
            selectedItemValues = ({
                name: product.name,
                image: product.image,
                description: product.description,
                price: product.price,
                id: product.id,
            });
            openProductDetailAside();
        });
    
        const productInfo = document.createElement('div');
        productInfo.classList.add('product-info');
        const productInfoDiv = document.createElement('div');
    
        const productPrice = document.createElement('p');
        productPrice.innerText = new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(product.price);
        const productName = document.createElement('p');
        productName.innerText = product.name;
    
        productInfoDiv.appendChild(productPrice);
        productInfoDiv.appendChild(productName);
    
        const productInfoFigure = document.createElement('figure');
        const productImgCart = document.createElement('img');
        productImgCart.setAttribute('src', './icons/bt_add_to_cart.svg');
        productImgCart.addEventListener('click',() =>{
            cartObjects.push({
                name: product.name,
                image: product.image,
                description: product.description,
                price: product.price,
                id: product.id,
            });
            addCartItem();

        });
    
        productInfoFigure.appendChild(productImgCart);
    
        productInfo.appendChild(productInfoDiv);
        productInfo.appendChild(productInfoFigure);
    
        productCard.appendChild(productImg);
        productCard.appendChild(productInfo);
        
        cardsContainer.appendChild(productCard);
    });
}

function openProductDetailAside(){
    const isshoppingCartContainerOpen = !shoppingCartContainer.classList.contains('inactive');
    const isMobileMenuOpen = !mobileMenu.classList.contains('inactive');
    const isDesktopMenuOpen = !desktopMenu.classList.contains('inactive');
    if (isshoppingCartContainerOpen){
        shoppingCartContainer.classList.add('inactive');
    };
    if (isMobileMenuOpen){
        mobileMenu.classList.add('inactive');
    };
    if (isDesktopMenuOpen){
        desktopMenu.classList.add('inactive');
    };
    document.getElementById('product-detail-image').src = selectedItemValues.image;
    document.getElementById('product-detail-name').innerHTML = selectedItemValues.name;
    document.getElementById('product-detail-description').innerHTML = selectedItemValues.description;
    document.getElementById('product-detail-price').innerHTML = new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(selectedItemValues.price);

    productDetailContainer.classList.remove('inactive');
};
function closeProductDetailAside(){
    productDetailContainer.classList.add('inactive');
};
function addCartItem(){
    shoppingCartContent.innerHTML = "";
    total = 0;
    cartNumber.innerText = cartObjects.length;
    if(cartObjects.length==0){
        totalCart.innerHTML = new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(total);
    }
    else{
        cartObjects.forEach((product) =>{
            total = total + product.price;
            totalCart.innerHTML = new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(total);
            const itemFigure = document.createElement('figure');
            const itemImage = document.createElement('img');
            itemImage.setAttribute('src', product.image);
            itemImage.setAttribute('alt', product.name);

            itemFigure.appendChild(itemImage);
            shoppingCartContent.appendChild(itemFigure);

            const itemName = document.createElement('p');
            itemName.innerHTML = product.name;

            const itemPrice = document.createElement('p');
            itemPrice.innerHTML = new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(product.price);

            const itemCancelImg = document.createElement('img');
            itemCancelImg.setAttribute('id', 'itemCancelImg')
            itemCancelImg.setAttribute('src', './icons/icon_close.png');
            itemCancelImg.addEventListener('click', () => {
                i = cartObjects.indexOf(product);
                deleteElement(i);
            });

            shoppingCartContent.appendChild(itemName);
            shoppingCartContent.appendChild(itemPrice);
            shoppingCartContent.appendChild(itemCancelImg); 
        });
    };
};
function deleteElement(a){
    cartObjects.splice(a, 1);
    addCartItem();
}
function showCategoriesElements(arrayValue){
    cardsContainer.innerHTML = "";
    productsShown = [];
    productList.forEach((product) =>{
        if (product.type == arrayValue){
            productsShown.push({
                name: product.name,
                image: product.image,
                description: product.description,
                price: product.price,
                id: product.id,
            });
        };
    });
    renderProducts(productsShown);
};


navEmail.addEventListener('click', toggleDesktopMenu);
shoppingCart.addEventListener('click', toggleShoppingCartContainer);
menuHamburguer.addEventListener('click', toggleMobileMenu);
productDetailCloseIcon.addEventListener('click', closeProductDetailAside);
addToCartButton.addEventListener('click', () =>{
    cartObjects.push({
        name: selectedItemValues.name,
        image: selectedItemValues.image,
        description: selectedItemValues.description,
        price: selectedItemValues.price,
        id: selectedItemValues.id,
    });
    addCartItem();
});
clothes.addEventListener('click',() =>{
    showCategoriesElements('clothes');
});
electronics.addEventListener('click',() =>{
    showCategoriesElements('electronics');
});
futernitures.addEventListener('click',() =>{
    showCategoriesElements('futernitures');
});
toys.addEventListener('click',() =>{
    showCategoriesElements('toys');
});
others.addEventListener('click',() =>{
    showCategoriesElements('others');
});
all.addEventListener('click',() =>{
    renderProducts(productList);;
});
clothes2.addEventListener('click',() =>{
    showCategoriesElements('clothes');
    toggleMobileMenu();
});
electronics2.addEventListener('click',() =>{
    showCategoriesElements('electronics');
    toggleMobileMenu();
});
futernitures2.addEventListener('click',() =>{
    showCategoriesElements('futernitures');
    toggleMobileMenu();
});
toys2.addEventListener('click',() =>{
    showCategoriesElements('toys');
    toggleMobileMenu();
});
others2.addEventListener('click',() =>{
    showCategoriesElements('others');
    toggleMobileMenu();
});
all2.addEventListener('click',() =>{
    renderProducts(productList);;
    toggleMobileMenu();
});
renderProducts(productList);
addCartItem();




