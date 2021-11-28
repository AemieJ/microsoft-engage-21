import { uri } from '../../config/db.js'


export default async (req, res) => {
  let token = req.body
  let requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    redirect: "follow",
  }

  try {
    const response = await fetch(`${uri}/api/profile/`, requestOptions)
    const data = await response.json()
    if (data.err) res.status(200).json({ data: null, err: data.err })

    res.status(200).json({ data: JSON.stringify(data), err: null })
  } catch (err) {
    res.status(500).json({ data: null, err: "Server Error" })
  }
}
