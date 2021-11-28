import { uri } from "../../config/db.js"

export default async (req, res) => {
  let parsed = JSON.parse(req.body)
  let requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${parsed.accessToken}`,
    },
    redirect: "follow",
  }

  try {
    const response = await fetch(`${uri}/api/classroom/`, requestOptions)
    const data = await response.json()

    res.status(200).json({ data: JSON.stringify(data), err: null })
  } catch (err) {
    res.status(500).json({ data: null, err: "Server Error" })
  }
}
