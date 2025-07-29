const basePrice = 17999;

function toggleSection(id) {
  document.getElementById(id).classList.toggle("collapsed");
}

function unlockNextSteps() {
  ["address-section", "delivery-section", "payment-section"].forEach((id) => {
    document.getElementById(id).classList.remove("collapsed");
  });
}

function updateDeliveryCharge() {
  const state = document.getElementById("state").value.trim().toLowerCase();
  const deliveryOptionCharge = parseInt(
    document.getElementById("delivery-option").value || 0
  );
  const country = document.getElementById("country").value;
  let baseDelivery = 0;

  if (country === "India") {
    baseDelivery = state === "rajasthan" ? 100 : 249;
  }

  const deliveryCharge = baseDelivery + deliveryOptionCharge;
  const total = basePrice + deliveryCharge;

  document.getElementById("total-summary").innerHTML = `
    Subtotal: ₹${basePrice} <br>
    Delivery Charge: ₹${deliveryCharge} <br>
    <strong>Total to Pay: ₹${total}</strong>
  `;
}

document.getElementById("state").addEventListener("input", updateDeliveryCharge);
document
  .getElementById("delivery-option")
  .addEventListener("change", updateDeliveryCharge);
document
  .getElementById("country")
  .addEventListener("change", updateDeliveryCharge);

document.getElementById("pincode").addEventListener("blur", function () {
  const pincode = this.value.trim();
  if (pincode.length === 6) {
    fetch(`https://api.postalpincode.in/pincode/${pincode}`)
      .then((res) => res.json())
      .then((data) => {
        if (data[0].Status === "Success") {
          const postOffice = data[0].PostOffice[0];
          document.getElementById("city").value = postOffice.District;
          document.getElementById("state").value = postOffice.State;
          updateDeliveryCharge();
        } else {
          alert("Invalid PIN Code");
          document.getElementById("city").value = "";
          document.getElementById("state").value = "";
          updateDeliveryCharge();
        }
      })
      .catch(() => {
        alert("Error fetching location");
      });
  }
});

function placeOrder() {
  document.getElementById("confirmation").style.display = "block";
  window.scrollTo({ top: 0, behavior: "smooth" });
}
