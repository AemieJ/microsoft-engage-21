export default async (req, res) => {
    const parsed = JSON.parse(req.body); // body will include the access token + email + subject + day
    // fake response will be replaced with calls to the server
    try {
        let data = {
            subject: "CO302",
            day: "Tuesday", 
            name: "CNS", 
            status: "OnGoing",
            from: 0,
            to: 0
        }

        res.status(200).json({ data: JSON.stringify(data), err: null})
    } catch (err) {
        res.status(500).json({ data: null, err: "Server Error"})
    }
}