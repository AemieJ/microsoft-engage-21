export default async (req, res) => {
    const parsed = JSON.parse(req.body); // body will include the access token + email + subject code
    // fake response will be replaced with calls to the server
    try {
        let data = {
            code: "CO302",
            lastWeek: 1637384993,
            name: "CNS", 
            description: "CNS subject will help in understanding the various security and cipher based algorithm utilized for the secure transmission of data and communication",
            days: ["Thursday", "Tuesday", "Sunday"], 
            from: ['09:00', '10:30', '10:00'], 
            to: ['09:50', '11:20', '10:50']
        }

        res.status(200).json({ data: JSON.stringify(data), err: null})
    } catch (err) {
        res.status(500).json({ data: null, err: "Server Error"})
    }
}