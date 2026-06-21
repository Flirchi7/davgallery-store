let cart = [];
let count = 0;

function addToCart(name, price) {
    cart.push({
        name,
        price
    });

    count++;
    document.getElementById("cart-count").innerText = count;

    alert(name + " added to cart");
}

document.getElementById("checkout-btn").addEventListener("click", () => {

    if (cart.length === 0) {
        alert("Cart is empty");
        return;
    }

    let total = 0;

    cart.forEach(item => {
        total += item.price;
    });

    let email = prompt("Enter your email address");

    if (!email) return;

    let handler = PaystackPop.setup({

        key: "pk_test_a5708212fbf3f7eec52ab1e31f22fa608d787d8d",

        email: email,

        amount: total * 100,

        currency: "GHS",

        ref: "DAV_" + Math.floor(Math.random() * 1000000000),

        callback: function(response) {

            alert(
                "Payment Successful! Reference: " +
                response.reference
            );

            sendWhatsAppOrder(response.reference, total);

        },

        onClose: function() {
            alert("Payment window closed");
        }

    });

    handler.openIframe();

});

function sendWhatsAppOrder(reference, total) {

    let message =
        "Hello DavGallery,%0A%0A" +
        "I have completed payment.%0A%0A";

    cart.forEach(item => {
        message +=
            "• " +
            item.name +
            " - GH₵" +
            item.price +
            "%0A";
    });

    message +=
        "%0ATotal: GH₵" +
        total +
        "%0APayment Ref: " +
        reference;

    window.open(
        "https://wa.me/233539302559?text=" +
        message,
        "_blank"
    );
}
