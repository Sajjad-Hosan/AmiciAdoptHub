import { useEffect, useState } from "react";

const useLoading = () => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (loading) {
      const timer = setTimeout(() => {
        setLoading(false);
      }, 2000);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [loading]);
  return [loading, setLoading];
};

export default useLoading;
