export default async function handler(req, res) {
  try {
    const response = await fetch(
      "https://thingproxy.freeboard.io/fetch" +
        encodeURIComponent("https://www.reddit.com/r/reactjs.json?raw_json=1"),
      {
        headers: {
          "User-Agent": "ContenterraRedditFeed/1.0 (by u/MostSky9263)",
          Accept: "application/json", // required!
        },
      }
    );

    if (!response.ok) {
      return res
        .status(response.status)
        .json({ error: "Failed to fetch reddit data" });
    }
    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    console.log("Reddit API error: ", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
