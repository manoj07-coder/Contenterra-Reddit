const client_id = "njBjyh7OBbuTPi5teBu8AA";
const secret = "8RoOIM3PlHf4vcuYZWMgqIlU_9VdAg";

export default async function handler(req, res) {
  try {
    const tokenRes = await fetch("https://www.reddit.com/api/v1/access_token", {
      method: "POST",
      headers: {
        Authorization:
          "Basic " + Buffer.from(`${client_id}:${secret}`).toString("base64"),
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: "grant_type=client_credentials",
    });

    const tokenJson = await tokenRes.json();
    const accessToken = tokenJson.access_token;

    const response = await fetch(
      "https://oauth.reddit.com/r/reactjs/hot?limit=10",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "User-Agent": "ContenterraRedditFeed/1.0 (by u/MostSky9263)",
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
