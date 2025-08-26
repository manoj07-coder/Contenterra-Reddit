import { useEffect, useState } from "react";

const useRedditFeed = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetch(
          "https://api.allorigins.win/get?url=" +
            encodeURIComponent(
              "https://www.reddit.com/r/reactjs.json?raw_json=1"
            )
        );
        const json = await data.json();

        const children = json?.data.children;
        if (Array.isArray(children)) {
          setItems(children);
        } else {
          setItems([]);
        }

        // setItems(json.data.children || []);
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
