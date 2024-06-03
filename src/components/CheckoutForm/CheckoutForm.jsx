import { Input } from "@material-tailwind/react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { Button } from "flowbite-react";
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
      <form onSubmit={handlePayment} className="space-y-6">
        <Input
          variant="standard"
          label="Donation amount"
          placeholder="amount"
        />
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
        <Button color="success">Donation now</Button>
      </form>
    </>
  );
};

export default CheckoutForm;
