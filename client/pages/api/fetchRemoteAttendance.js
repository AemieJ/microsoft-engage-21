export default async (req, res) => {
  const parsed = JSON.parse(req.body) // body => access token, code, date
  // fake response will be replaced with calls to the server
  try {
    let data = {
      count: 3,
      users: [
        {
          name: "Sahil Bondre",
          email: "u18co021@coed.svnit.ac.in",
        },
        {
          name: "Surya Teja",
          email: "u18co022@coed.svnit.ac.in",
        },
        {
          name: "Atul Bharti",
          email: "u18co096@coed.svnit.ac.in",
        },
      ],
    }
    res.status(200).json({ data: JSON.stringify(data), err: null })
  } catch (err) {
    res.status(500).json({ data: null, err: "Server Error" })
  }
}
