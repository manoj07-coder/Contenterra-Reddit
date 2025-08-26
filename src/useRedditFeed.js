import { useEffect, useState } from "react";

const useRedditFeed = () => {
  const [items, setItems] = useState([]);

  const baseUrl =
    import.meta.env.MODE === "development"
      ? "/reddit"
      : "https://www.reddit.com";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetch(`${baseUrl}/r/reactjs.json?raw_json=1`);
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
