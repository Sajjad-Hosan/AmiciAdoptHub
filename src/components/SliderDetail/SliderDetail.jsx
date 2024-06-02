import { FaXmark } from "react-icons/fa6";
import PropTypes from "prop-types";

const SliderDetail = ({ details }) => {
  return (
    <>
      <dialog id="sliderDetails" className="modal">
        <div className="modal-box max-w-6xl">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-lg">Know about {"Bruno"}</h3>
            <form method="dialog">
              <button className="btn btn-ghost text-lg text-error">
                <FaXmark />
              </button>
            </form>
          </div>
          <div className="flex flex-col items-center gap-10 my-5">
            <div className="md:w-[700px] h-[500px] rounded-xl overflow-hidden">
              <img
                src={
                  "https://templatekit.jegtheme.com/pawsnest/wp-content/uploads/sites/417/2023/10/beautiful-dog-golden-retriever-labrador-sits-in-th-2023-05-13-00-32-27-utc-1-1536x1025.jpg"
                }
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
            <div className="w-full">
              <div className="flex items-center justify-between">
                <h1 className="text-3xl">Hi, I'm Bruno</h1>
                <span className="flex items-center card border px-6 py-3">
                  Adoption Fee<p className="font-semibold">$420*</p>
                </span>
              </div>
              <p className="font-light text-gray-700 mt-2">
                Et magnis arcu elit elit ipsum. Eget in libero faucibus amet.
                Arcu, aliquam facilisi consequat proin velit sollicitudin non.
                Risus mauris risus molestie mus tellus enim nulla tortor.
                Ultrices semper dictum. Sed ut perspiciatis unde omnis iste
                natus error sit voluptatem accusantium doloremque laudantium,
                totam rem aperiam, eaque ipsa quae ab illo inventore veritatis
                et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim
                ipsam voluptatem quia voluptas sit aspernatur aut odit aut
                fugit, sed quia consequuntur magni dolores eos qui ratione
                voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem
                ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia
                non numquam eius modi tempora incidunt ut labore et dolore.
              </p>
              <div className="mt-10">
                <h2 className="text-xl">More about Bruno</h2>
                <div className="card border p-5 overflow-x-auto mt-5">
                  <table className="table mt-5">
                    <tbody>
                      <tr>
                        <th>Weight</th>
                        <td>:</td>
                        <td>45 Pound</td>
                      </tr>
                      <tr>
                        <th>Date of Arrival</th>
                        <td>:</td>
                        <td>August 18 2023</td>
                      </tr>
                      <tr>
                        <th>Sex</th>
                        <td>:</td>
                        <td>Male (Neutered)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </dialog>
    </>
  );
};
SliderDetail.propTypes = {
  details: PropTypes.object,
};
export default SliderDetail;
