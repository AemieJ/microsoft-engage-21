// const uri = 'http://localhost:4000'
const uri = 'http://ec2-13-232-90-241.ap-south-1.compute.amazonaws.com:4000'


export default async (req, res) => {
    let parsed = JSON.parse(req.body)
    let requestOptions = {
        method: 'POST',
        headers: {
            "Authorization": `Bearer ${parsed.accessToken}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(parsed.body),
        redirect: 'follow'
      };

    try {
        const response = await fetch(`${uri}/api/lecture`, requestOptions)
        const data = await response.json()
        if (data.err) res.status(200).json({ data: null, err: data.err})
        
        res.status(200).json({ data: JSON.stringify(data), err: null})
    } catch (err) {
        res.status(500).json({ data: null, err: "Server Error"})
    }
}