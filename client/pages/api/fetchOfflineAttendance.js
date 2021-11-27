export default async (req, res) => {
  const parsed = JSON.parse(req.body) // body => access token, code, date
  // fake response will be replaced with calls to the server
  try {
    let data = {
      count: 1,
      users: [
        {
          name: "Krunal Rank",
          email: "u18co081@coed.svnit.ac.in",
        },
      ],
    }
    res.status(200).json({ data: JSON.stringify(data), err: null })
  } catch (err) {
    res.status(500).json({ data: null, err: "Server Error" })
  }
}
