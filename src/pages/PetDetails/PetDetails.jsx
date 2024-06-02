import { Card } from "flowbite-react";

const PetDetails = () => {
  return (
    <div className="p-10">
      <div className="w-full h-[25rem] bg-orange-300 rounded-2xl p-10 flex flex-col items-center justify-center gap-3 relative">
        <h1 className="text-5xl">
          Meet <span className="text-red-500 font-semibold">Burno</span>
        </h1>
        <p className="text-sm font-semibold md:w-1/2 text-center text-gray-600">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam ratione
          laborum sit perspiciatis ipsa doloremque, quis sequi incidunt nostrum
          quos blanditiis id explicabo qui aliquam debitis impedit maiores
          repellendus neque.
        </p>
        <Card className="absolute bottom-4 right-2">
          <p className="font-semibold">
            Adopeted Fee : <span className="text-red-500">$122</span>
          </p>
        </Card>
      </div>
      <div className="mt-16 flex flex-col gap-5">
        <div className="w-full h-full">
          <img
            className="h-full w-full object-cover fixed top-0 -z-10 left-0"
            src="https://templatekit.jegtheme.com/pawsnest/wp-content/uploads/sites/417/2023/10/beautiful-dog-golden-retriever-labrador-sits-in-th-2023-05-13-00-32-27-utc-1-1536x1025.jpg"
            alt=""
          />
        </div>
        <div className="h-[32rem] p-12 bg-white bg-opacity-30 rounded-2xl shadow">
          <h1 className="text-6xl">Hi i'm Buruo</h1>
          <p className="text-gray-800 w-11/12 mt-2">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci
            itaque iste repudiandae at autem aut aspernatur non, esse pariatur
            eum voluptates labore dolor unde, culpa nisi! Nesciunt eaque eum sit
            ipsam voluptates, vel impedit adipisci nemo vero consequuntur quis
            repellat neque error iusto animi consectetur commodi suscipit veniam
            iure quae?
          </p>
          
        </div>
      </div>
    </div>
  );
};
export default PetDetails;
