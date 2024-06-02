import "./common.css";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const handlePayment = async (event) => {
    event.preventDefault();
    const card = document.getElementById(CardElement);
    if (!stripe || !elements) {
      return;
    }
    if (card === null) {
      return;
    }
    //
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });
    if (error) {
      console.log("error", error);
    } else {
      console.log("payment methos", paymentMethod);
    }
  };
  return (
    <>
      <form onSubmit={handlePayment} className="space-y-4">
        <input placeholder="Donation amount"></input>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        <button>Donation now</button>
      </form>
    </>
  );
};

export default CheckoutForm;
