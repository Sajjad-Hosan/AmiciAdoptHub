import { Card, CardHeader } from "@material-tailwind/react";
import { Button, Label, Modal, TextInput } from "flowbite-react";
import PropTypes from "prop-types";
import Loading from "../Loading/Loading";
import useLoading from "../../hooks/useLoading";
/**
 * pet id
 * pet name
 * pet image
 * user name
 * user email
 * user address
 * user phone number
 * this will goto database
 */
const AdoptMeModal = ({ open, setOpen }) => {
  const [loading, setLoading] = useLoading();
  const handleClicks = (bool) => {
    setLoading(true);
    setOpen(bool);
  };
  return (
    <div>
      <Modal
        dismissible
        show={open}
        onClose={() => handleClicks(false)}
        size="5xl"
        popup
      >
        {loading ? (
          <>
            <Loading />
          </>
        ) : (
          <>
            <Modal.Header className="p-6">Burno</Modal.Header>
            <div className="md:p-8 overflow-y-scroll">
              <Modal.Body className="flex flex-col-reverse md:flex-row justify-between items-center">
                <form className="flex flex-col gap-4 w-full">
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <div className="mb-2 block">
                        <Label value="Pet Id" />
                      </div>
                      <TextInput type="text" value={"Burno"} readOnly />
                    </div>
                    <div>
                      <div className="mb-2 block">
                        <Label value="Pet Name" />
                      </div>
                      <TextInput type="text" value={"Burno"} readOnly />
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <div className="mb-2 block">
                        <Label value="Name" />
                      </div>
                      <TextInput type="text" defaultValue={"Sajjad Hosan"} />
                    </div>
                    <div>
                      <div className="mb-2 block">
                        <Label value="Email" />
                      </div>
                      <TextInput
                        type="text"
                        defaultValue={"sajjadhosan12@gmail.com"}
                      />
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <div className="mb-2 block">
                        <Label value="Phone Number" />
                      </div>
                      <TextInput type="text" defaultValue={"0123456789"} />
                    </div>
                    <div>
                      <div className="mb-2 block">
                        <Label value="Address" />
                      </div>
                      <TextInput type="text" defaultValue={"Nilphamari,BD"} />
                    </div>
                  </div>
                </form>
                <Card className="w-96 p-2 mb-4">
                  <CardHeader floated={false} className="">
                    <img
                      src="https://docs.material-tailwind.com/img/team-3.jpg"
                      alt="profile-picture"
                    />
                  </CardHeader>
                </Card>
              </Modal.Body>
              <Modal.Footer>
                <Button onClick={() => setOpen(false)}>I accept</Button>
              </Modal.Footer>
            </div>
          </>
        )}
      </Modal>
    </div>
  );
};
AdoptMeModal.propTypes = {
  open: PropTypes.bool,
  setOpen: PropTypes.func,
};
export default AdoptMeModal;
