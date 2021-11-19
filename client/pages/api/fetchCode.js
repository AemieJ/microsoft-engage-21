export default async (req, res) => {
    const parsed = JSON.parse(req.body); // body will include the access token + email
    // fake response will be replaced with calls to the server
    try {
        let data = {
                remote: "26jd9E",
                in_person: ""
        }

        res.status(200).json({ data: JSON.stringify(data), err: null})
    } catch (err) {
        res.status(500).json({ data: null, err: "Server Error"})
    }
}