import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import PropTypes from "prop-types";
import CheckoutForm from "../CheckoutForm/CheckoutForm";
import { Modal } from "flowbite-react";

import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";

const PaymentModal = ({ open, setOpen }) => {
  const stripePromise = loadStripe("pk_test_6pRNASCoBOKtIshFeQd4XMUh");

  return (
    <>
      <Dialog
        open={open}
        handler={() => setOpen(!open)}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
      >
        <DialogHeader />
        <DialogBody className="p-10">
          <h1 className="text-2xl mb-2">Payment</h1>
          <Elements stripe={stripePromise}>
            <CheckoutForm />
          </Elements>
        </DialogBody>
      </Dialog>
    </>
  );
};
PaymentModal.propTypes = {
  open: PropTypes.bool,
  setOpen: PropTypes.func,
};
export default PaymentModal;
