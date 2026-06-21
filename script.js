let cart = [];
let count = 0;

function addToCart(name, price){

    cart.push({
        name:name,
        price:price
    });

    count++;

    document.getElementById("cart-count").innerText = count;

    alert(name + " added to cart");
}

document.getElementById("checkout-btn").addEventListener("click", function(){

    if(cart.length === 0){
        alert("Cart is empty");
        return;
    }

    let message = "Hello DavGallery,%0A%0AI would like to order:%0A";

    let total = 0;

    cart.forEach(item => {
        message += `• ${item.name} - GH₵${item.price}%0A`;
        total += item.price;
    });

    message += `%0A*Total:* GH₵${total}`;

    window.open(
        `https://wa.me/233539302559?text=${message}`,
        "_blank"
    );

});
