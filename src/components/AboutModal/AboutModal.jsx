import { Dialog, DialogHeader, DialogBody } from "@material-tailwind/react";
import PropTypes from "prop-types";
const AboutModal = ({ open, handleOpenModal }) => {
  return (
    <>
      <Dialog open={open} handler={handleOpenModal} size="xl">
        <DialogHeader>Why This Website Was Made</DialogHeader>
        <DialogBody>
          **Our mission is to connect homeless pets with caring individuals and
          families, creating lasting bonds and happy homes. This website was
          created out of a deep love for animals and a commitment to reducing
          the number of pets in shelters. We believe that every pet deserves a
          chance to live a happy, healthy life in a loving home. We work closely
          with shelters and rescue organizations to provide a platform where
          potential adopters can easily find and connect with pets in need. By
          streamlining the adoption process, we aim to make it easier for people
          to find their perfect pet match and make a positive difference in an
          animal's life.** By following this structure, you'll be able to create
          a clear, concise, and engaging "About Us" section that informs
          visitors about how your website works and the meaningful mission
          behind it.
        </DialogBody>
        {/* <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button variant="gradient" color="green" onClick={handleOpen}>
            <span>Confirm</span>
          </Button>
        </DialogFooter> */}
      </Dialog>
    </>
  );
};
AboutModal.propTypes = {
  open: PropTypes.bool,
  handleOpenModal: PropTypes.func,
};
export default AboutModal;
