import { uri } from '../../config/db.js'


export default async (req, res) => {
  let parsed = JSON.parse(req.body)
  let requestOptions = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${parsed.accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(parsed.body),
    redirect: "follow",
  }
  try {
    const response = await fetch(
      `${uri}/api/booking/preferences`,
      requestOptions
    )
    const data = await response.json()
    if (data.err) return res.status(200).json({ data: null, err: data.err })
    let finalData = {
      count: 0,
      users: [],
    }

    if (data.length !== 0) {
      let remote = data.filter((obj) => obj.mode === "Remote")
      let remoteUsers = remote.map((detail) => {
        let obj = { name: detail.user.name, email: detail.user.email }
        return obj
      })

      finalData = {
        count: remoteUsers.length,
        users: remoteUsers,
      }
    }

    res.status(200).json({ data: JSON.stringify(finalData), err: null })
  } catch (err) {
    res.status(500).json({ data: null, err: "Server Error" })
  }
}
