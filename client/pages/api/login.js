// const uri = 'http://localhost:4000'
const uri = "http://ec2-13-232-90-241.ap-south-1.compute.amazonaws.com:4000"

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
    const response = await fetch(`${uri}/api/auth/login`, requestOptions)
    const data = await response.json()
    if (data.err) res.status(200).json({ data: null, err: data.err })

    res.status(200).json({ data: JSON.stringify(data), err: null })
  } catch (err) {
    res.status(500).json({ data: null, err: "Server Error" })
  }
}
