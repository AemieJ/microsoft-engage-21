const uri = 'http://localhost:4000'
const week = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

export default async (req, res) => {
    let parsed = JSON.parse(req.body)
    let requestOptions = {
        method: 'GET',
        headers: {
            "Authorization": `Bearer ${parsed.accessToken}`
        },
        redirect: 'follow'
    };
    try {
        let response = await fetch(`${uri}/api/classroom/code/${parsed.code}`, requestOptions)
        let data1 = await response.json()
        if (data1.err) res.status(200).json({ data: null, err: data1.err })
        response = await fetch(`${uri}/api/lecture/${parsed.code}`, requestOptions)
        let data2 = await response.json()
        let length = data2.length
        let days = []
        let from = []
        let to = []
        for (let idx = 0; idx < length; ++idx) {
            let dateFrom = new Date(0), dateTo = new Date(0)
            dateFrom.setUTCMilliseconds(data2[idx].from)
            dateTo.setUTCMilliseconds(data2[idx].to)
            if (!days.includes(week[dateFrom.getDay()])) {
                days.push(week[dateFrom.getDay()])
                let time = `${dateFrom.getHours()}:${dateFrom.getMinutes()}`
                from.push(time)
                time = `${dateTo.getHours()}:${dateTo.getMinutes()}`
                to.push(time)
            }
        }

        let data = {
            name: data1.name,
            description: data1.description,
            code: data1.code,
            days, from, to
        }

        console.log(data)
        res.status(200).json({ data: JSON.stringify(data), err: null})
    } catch (err) {
        res.status(500).json({ data: null, err: "Server Error"})
    }
}