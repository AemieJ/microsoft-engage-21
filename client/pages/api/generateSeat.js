export default async (req, res) => {
    const parsed = JSON.parse(req.body); // body will include the access token + email
    // fake response will be replaced with calls to the server
    try {
        let data = {
            "seat_code": "C60"
        }

        res.status(200).json({ data: JSON.stringify(data), err: null})
    } catch (err) {
        res.status(500).json({ data: null, err: "Server Error"})
    }
}