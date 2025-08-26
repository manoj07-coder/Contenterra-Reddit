import { useEffect, useState } from "react";

const useRedditFeed = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetch("/api/reddit.js");
        const json = await data.json();

        setItems(json.data.children || []);
      } catch (error) {
        console.log("Error fetching data: ", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return { items, loading, error };
};

export default useRedditFeed;
