import { useEffect, useState } from "react";
import { VscSearch } from "react-icons/vsc";
import SearchBox from "../../components/SearchBox/SearchBox";
import CardComponent from "../../components/Card/CardComponent";
import {
  Button,
  Option,
  Select,
  Spinner,
  Tooltip,
} from "@material-tailwind/react";
import { useInView } from "react-intersection-observer";
import { useInfiniteQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useLoaderData } from "react-router-dom";
import { Helmet } from "react-helmet-async";
const PetListing = () => {
  const axiosSecure = useAxiosSecure();
  const [openModal, setOpenModal] = useState(false);
  const [sort, setSort] = useState("petAddDate");
  const { ref, inView } = useInView();
  const {
    data = [],
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
    refetch,
  } = useInfiniteQuery({
    queryKey: ["petlistings", sort],
    queryFn: async ({ pageParam }) => {
      const res = await axiosSecure.post(
        `/pets?page=${pageParam}&sort=${sort}`
      );
      return res.data;
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPage) => {
      return allPage.length + 1;
    },
  });
  const handleSortType = (e) => {
    setSort(e);
  };

  useEffect(() => {
    if (inView || hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage, sort]);

  return (
    <>
      <Helmet>
        <title>Pet Listing | AmiciAdoptHub</title>
      </Helmet>
      <SearchBox open={openModal} setOpen={setOpenModal} />
      {/* -------------------- */}
      <div className="p-10">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl">Pet Listing</h1>
          <div className="flex gap-5">
            <Tooltip
              content="Search"
              animate={{
                mount: { scale: 1, y: 0 },
                unmount: { scale: 0, y: 25 },
              }}
            >
              <Button
                color="dark"
                outline
                size={"lg"}
                onClick={() => setOpenModal(true)}
              >
                <VscSearch className="text-md" />
              </Button>
            </Tooltip>
            <div>
              <Select size="lg" label="Sort by" onChange={handleSortType}>
                <Option value="petName">Name</Option>
                <Option value="petAge">Age</Option>
                <Option value="petAddDate">Date</Option>
                <Option value="petAddTime">Time</Option>
                <Option disabled>Coming soon</Option>
              </Select>
            </div>
          </div>
        </div>
        <div className="">
          <div className="grid md:grid-cols-3 gap-10 mt-16">
            {data?.pages?.map((item) =>
              item.map((list) => {
                return (
                  <CardComponent innerRef={ref} key={list._id} pet={list} />
                );
              })
            )}
          </div>
          {isFetchingNextPage && (
            <div>
              <Spinner className="h-10 w-10 mt-14 mx-auto" />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default PetListing;
