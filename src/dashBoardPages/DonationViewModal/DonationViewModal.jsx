import { Modal, Table } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import PropTypes from "prop-types";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useEffect, useState } from "react";
import NoData from "../../service/firebase/NoData/NoData";

const DonationViewModal = ({ openModal, setOpenModal, name }) => {
  const [donations, setDonations] = useState([]);
  const axiosSecure = useAxiosSecure();
  useEffect(() => {
    axiosSecure.get(`/donations?name=${name}`).then((res) => {
      setDonations(res.data);
    });
  }, [axiosSecure, name]);
  return (
    <>
      <Modal
        show={openModal}
        size="2xl"
        onClose={() => setOpenModal(false)}
        popup
      >
        <Modal.Header className="px-6 pt-6">
          <h1 className="text-2xl mb-5">See Who Donateds</h1>
        </Modal.Header>
        <Modal.Body>
          <div className="overflow-x-auto">
            <Table>
              <Table.Head>
                <Table.HeadCell>#</Table.HeadCell>
                <Table.HeadCell>Name</Table.HeadCell>
                <Table.HeadCell>Amount</Table.HeadCell>
              </Table.Head>
              <Table.Body className="divide-y">
                {donations.length < 1 ? (
                  <NoData />
                ) : (
                  donations.map((item, i) => (
                    <Table.Row
                      key={i}
                      className="bg-white dark:border-gray-700 dark:bg-gray-800"
                    >
                      <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                        {i}
                      </Table.Cell>
                      <Table.Cell>{item.name}</Table.Cell>
                      <Table.Cell>{item.amount}$</Table.Cell>
                    </Table.Row>
                  ))
                )}
              </Table.Body>
            </Table>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};
DonationViewModal.propTypes = {
  openModal: PropTypes.bool,
  setOpenModal: PropTypes.func,
};
export default DonationViewModal;
