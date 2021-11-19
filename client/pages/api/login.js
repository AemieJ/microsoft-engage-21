export default async (req, res) => {
    const parsed = JSON.parse(req.body);
    // fake response will be replaced with calls to the server
    try {
        let data = {
            role: "faculty",
            accessToken: {
                token: "9QYjTeJHoEuIgAKbeVFQQrxEqlsiKQhj",
                expires: 1637252590
            }, 
            refreshToken: {
                token: "VNHIZ0f6OPotuDEDWBel8my2MKBGx7b2",
                expires: 1637598190
            }
        }
        res.status(200).json({ data: JSON.stringify(data), err: null})
    } catch (err) {
        res.status(500).json({ data: null, err: "Server Error"})
    }
}