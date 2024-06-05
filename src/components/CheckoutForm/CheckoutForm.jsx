import { Input } from "@material-tailwind/react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { Button } from "flowbite-react";
import PropTypes, { element } from "prop-types";
import useAuth from "../../hooks/useAuth";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const CheckoutForm = ({ pet, refetch }) => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const [price, setPrice] = useState(0);
  const [show, setShow] = useState(false);
  const [clientSecret, setClientSecret] = useState("");
  const [transId, setTransId] = useState("");
  const [error, setError] = useState("");

  const handleAmount = async (log) => {
    log.preventDefault();
    const amount = log.target.amount.value;
    setPrice(amount);
    if (amount < 0) {
      return toast.warning("Amount box is empty!");
    }
    const res = await axiosSecure.post("/payment_intent", { amount: amount });
    if (res.data?.success) {
      setClientSecret(res.data?.clientSecret);
      setShow(true);
    }
  };

  const handlePayment = async (event) => {
    event.preventDefault();
    const card = elements.getElement(CardElement);
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
      setError(error?.message);
    } else {
      setError("");
    }
    //
    const { error: cardError, paymentIntent } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card: card,
          billing_details: {
            name: user?.displayName,
            email: user?.email,
          },
        },
      }
    );
    if (cardError) {
      setError(cardError?.message);
      return;
    } else {
      if (paymentIntent.status === "succeeded") {
        setError("");
        setTransId(paymentIntent.id);
        // send data to database
        const paymentDetails = {
          paymentId: paymentIntent.id,
          email: user?.email,
          name: user?.displayName,
          amount: parseFloat(price),
          date: new Date().toLocaleDateString(),
          time: new Date().toLocaleTimeString(),
          petName: pet.petName,
          petId: pet._id,
          image: pet.image,
        };
        // ------------------------------------------
        const info = {
          currentAmount: price,
        };
        axiosSecure.patch(`/donation_amount/${pet._id}`, info).then((res) => {
          // console.log(res.data);
        });
        axiosSecure.post("/donation", paymentDetails).then((res) => {
          if (res.data?.insertedId) {
            refetch();
            toast.success("The donation has success !");
            navigate(-1);
          } else {
            refetch();
            toast.success("The donation has success !");
            navigate(-1);
          }
        });
      }
    }
  };
  return (
    <>
      {show ? (
        <form onSubmit={handlePayment} className="space-y-6">
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
          <Button color="success" type="submit" disabled={!stripe}>
            Donation now
          </Button>
        </form>
      ) : (
        <form onSubmit={handleAmount} className="space-y-6">
          <Input
            variant="standard"
            name="amount"
            label="Donation amount"
            placeholder="amount"
            type="number"
            className="border-0 shadow-none"
          />
          <Button color="success" type="submit" disabled={!stripe}>
            Next
          </Button>
        </form>
      )}
    </>
  );
};
CheckoutForm.propTypes = {
  setAmount: PropTypes.func,
  pet: PropTypes.object,
};
export default CheckoutForm;
