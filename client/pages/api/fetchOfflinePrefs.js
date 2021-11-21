export default async (req, res) => {
    const parsed = JSON.parse(req.body); // body => access token, code, date
    // fake response will be replaced with calls to the server
    try {
        let data = {
            count: 3, 
            users: [
                {
                    name: "Yamini Kabra", 
                    email: "u18co045@coed.svnit.ac.in"
                },
                {
                    name: "Krunal Rank", 
                    email: "u18co081@coed.svnit.ac.in"
                },
                {
                    name: "Yukta Shah", 
                    email: "u18co063@coed.svnit.ac.in"
                }
            ]
        }
        res.status(200).json({ data: JSON.stringify(data), err: null})
    } catch (err) {
        res.status(500).json({ data: null, err: "Server Error"})
    }
}