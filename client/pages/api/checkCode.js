export default async (req, res) => {
    const parsed = JSON.parse(req.body);
    // fake response will be replaced with calls to the server
    try {
        res.status(200).json({ data: true, err: null})
    } catch (err) {
        res.status(500).json({ data: null, err: "Server Error"})
    }
}