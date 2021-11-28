import { uri } from '../../config/db.js'


export default async (req, res) => {
  let parsed = JSON.parse(req.body)
  let requestOptions = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${parsed.accessToken}`,
    },
    redirect: "follow",
  }

  try {
    const response = await fetch(
      `${uri}/api/classroom/join/${parsed.code}`,
      requestOptions
    )
    const data = await response.json()
    if (data.err) res.status(200).json({ data: null, err: data.err })

    res.status(200).json({ data: "Successfully joined the class", err: null })
  } catch (err) {
    res.status(500).json({ data: null, err: "Server Error" })
  }
}
