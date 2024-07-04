import { doc, getDoc, updateDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { db } from "../Firebase/Config";
import { useSelector } from "react-redux";

const Payment = () => {
  const key_id = "rzp_test_JDumAGUYVqtCC3";
  const key_secret = "ZQuFauPLpSKQKZbXhzFTRIKo";
  const [SearchParams] = useSearchParams();
  const [order, setorder] = useState(null);

  const userId = useSelector((state) => state.user.userId);

  useEffect(() => {
    fetch_order();
    console.log(order);
  }, []);

  const fetch_order = async () => {
    const docSnap = await getDoc(doc(db, "Orders", SearchParams.get("q")));
    setorder(docSnap.data());
  };

  function loadScript(src) {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  }

  async function displayRazorpay() {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    const result = {
      amount: parseFloat(order.price) * 100,
      order_id: SearchParams.get("q"),
      currency: "INR",
    };

    const { amount, id: order_id, currency } = result;

    const options = {
      key: key_id, // Enter the Key ID generated from the Dashboard
      amount: amount.toString(),
      currency: currency,
      name: `${order.firstName}  ${order.lastName}`,
      description: "Test Transaction",
      order_id: order_id,
      handler: async function (response) {
        const data = {
          razorpayPaymentId: response.razorpay_payment_id,
          razorpayOrderId: response.razorpay_order_id || " ",
          razorpaySignature: response.razorpay_signature || " ",
        };
        await updateDoc(doc(db, "Orders", SearchParams.get("q")), {
          paymentDetails: data,
          paymentStatus: "paid",
          deliver_stauts: "processing",
        });

        // adding in user
        const userDoc = await getDoc(doc(db, "Users", userId));
        console.log(userDoc);

        if (userDoc.exists()) {
          const currentOrders = userDoc.data().orders || [];

          currentOrders.push(SearchParams.get("q"));

          await updateDoc(doc(db, "Users", userId), { orders: currentOrders });
        } else {
          console.log("Document does not exist");
        }

        // updating stock
        // Process each product in the order

        order.productIdQuantityArray.forEach(async (product) => {
          const { Id, quantity } = product;

          const productDocRef = doc(db, "Products", Id);
          const productDoc = await getDoc(productDocRef);

          if (productDoc.exists()) {
            const productData = productDoc.data();
            console.log(productData);
            const currentStock = parseInt(productData.Stock) || 0;

            const newStock = currentStock - quantity;
            console.log(newStock);

            await updateDoc(doc(productDocRef, { Stock: newStock }));
          } else {
            console.log(`Product not found.`);
          }
        });
        localStorage.clear();
      },
      prefill: {
        name: `${order.firstName}  ${order.lastName}`,
        email: "SoumyaDey@example.com",
        contact: "9999999999",
      },
      notes: {
        address: order.address,
      },
      theme: {
        color: "#61dafb",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  }

  return (
    <div className="App">
      <header className="App-header">
        <p>Continue to Payment now!</p>
        <button className="App-link" onClick={displayRazorpay}>
          Pay ₹{order && order.price}
        </button>
      </header>
    </div>
  );
};

export default Payment;
