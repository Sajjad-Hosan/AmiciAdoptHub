import { Input, Option, Select, Spinner } from "@material-tailwind/react";
import DonationCard from "../../components/DonationCard/DonationCard";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useInfiniteQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import { Helmet } from "react-helmet-async";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";

const DonationPage = () => {
  const { ref, inView } = useInView();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [sort, setSort] = useState("petName");
  const {
    data = [],
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: ["donations", user?.email,sort],
    initialPageParam: 0,
    queryFn: async ({ pageParam }) => {
      const res = await axiosSecure.post(
        `/donation_campaign?email=${user?.email}&page=${pageParam}`
      );
      return res.data;
    },
    getNextPageParam: (lastPage, allPages) => {
      return allPages.length + 1;
    },
  });
  const handleSort = (e) => {
    setSort(e);
  };
  useEffect(() => {
    if (inView || hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  return (
    <div className="md:p-10">
      <Helmet>
        <title>Donation Page | AAH</title>
      </Helmet>

      <h1 className="text-3xl md:text-5xl text-center">
        Donation campaigns page
      </h1>
      <div className="flex justify-between items-center gap-10 mt-9">
        <div className="md:w-96">
          <Input variant="standard" label="Search Here" placeholder="search" />
        </div>
        <div className="flex md:w-96 flex-col gap-6">
          <Select size="lg" label="Sort by" onChange={handleSort}>
            <Option value="petName">Name</Option>
            <Option value="currentDonation">current amount</Option>
            <Option value="maxDonationAmount">max amount</Option>
            <Option value="highestDonationAmount">highest amount</Option>
            <Option disabled>Coming soon</Option>
          </Select>
        </div>
      </div>
      <div>
        <div className="mt-20 grid md:grid-cols-2 lg:grid-cols-3 gap-5 place-items-center">
          {data?.pages?.map((item) =>
            item.map((list, i) => {
              if (list?.length === i + 1) {
                return (
                  <DonationCard innerRef={ref} key={list._id} donated={list} />
                );
              }
              return <DonationCard key={list._id} donated={list} />;
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
  );
};

export default DonationPage;
