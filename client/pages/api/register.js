import { uri } from "../../config/db.js"

export default async (req, res) => {
  let requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: req.body,
    redirect: "follow",
  }

  try {
    const response = await fetch(`${uri}/api/auth/signup`, requestOptions)
    const data = await response.json()
    if (data.err) res.status(200).json({ data: null, err: data.err })

    res.status(200).json({ data: "Successful registration", err: null })
  } catch (err) {
    res.status(500).json({ data: null, err: "Server Error" })
  }
}
