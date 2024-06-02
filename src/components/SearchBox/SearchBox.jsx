import { Button, Label, Modal, TextInput } from "flowbite-react";
import PropTypes from "prop-types";
const SearchBox = ({ open, setOpen }) => {
  return (
    <>
      <Modal show={open} size="md" onClose={() => setOpen(false)} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <form className="space-y-3">
              <div>
                <TextInput
                  type="text"
                  placeholder="Search here"
                  required
                  shadow
                />
              </div>
              <Button type="submit">Search</Button>
            </form>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};
SearchBox.propTypes = {
  open: PropTypes.bool,
  setOpen: PropTypes.func,
};
export default SearchBox;
