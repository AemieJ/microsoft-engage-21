export default async (req, res) => {
    const parsed = JSON.parse(req.body); // body will include the access token + email
    // fake response will be replaced with calls to the server
    try {
        let data = [
            {
                "subject": "CNS",
                "code": "CO304"
            }, 
            {
                "subject": "DWDM",
                "code": "CO306"
            }, 
            {
                "subject": "SE",
                "code": "CO302"
            }, 
        ]

        res.status(200).json({ data: JSON.stringify(data), err: null})
    } catch (err) {
        res.status(500).json({ data: null, err: "Server Error"})
    }
}