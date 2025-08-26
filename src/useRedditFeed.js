import { useEffect, useState } from "react";

const useRedditFeed = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetch("/api/reddit.js");
        const json = await data.json();

        setItems(json.data.children || []);
      } catch (error) {
        console.log("Error fetching data: ", error);
      }
    };
    fetchData();
  }, []);

  return { items };
};

export default useRedditFeed;
