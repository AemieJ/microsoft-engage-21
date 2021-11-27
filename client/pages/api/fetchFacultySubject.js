// const uri = 'http://localhost:4000'
const uri = "http://ec2-13-232-90-241.ap-south-1.compute.amazonaws.com:4000"

const week = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
]

export default async (req, res) => {
  let parsed = JSON.parse(req.body)
  let requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${parsed.accessToken}`,
    },
    redirect: "follow",
  }
  try {
    let response = await fetch(
      `${uri}/api/classroom/faculty/${parsed.email}`,
      requestOptions
    )
    let data1 = await response.json()
    if (data1.err) res.status(200).json({ data: null, err: data1.err })
    let length1 = data1.length
    let data = []
    for (let j = 0; j < length1; ++j) {
      let code = data1[j].code
      response = await fetch(`${uri}/api/lecture/${code}`, requestOptions)
      let data2 = await response.json()
      let length = data2.length
      let days = []
      let from = []
      let to = []
      let lectureID = []
      let lastWeek = parsed.lastWeek
      for (let idx = 0; idx < length; ++idx) {
        let dateFrom = new Date(0),
          dateTo = new Date(0)
        dateFrom.setUTCMilliseconds(data2[idx].from)
        dateTo.setUTCMilliseconds(data2[idx].to)
        let id = data2[idx].id
        if (Math.round(data2[idx].from / 1000) >= lastWeek) {
          if (!days.includes(week[dateFrom.getDay()])) {
            lectureID.push(id)
            days.push(week[dateFrom.getDay()])
            let time = `${dateFrom.getHours()}:${dateFrom.getMinutes()}`
            from.push(time)
            time = `${dateTo.getHours()}:${dateTo.getMinutes()}`
            to.push(time)
          }
        }
      }

      let obj = {
        code,
        days,
        from,
        to,
        lectureID,
      }
      data.push(obj)
    }

    res.status(200).json({ data: JSON.stringify(data), err: null })
  } catch (err) {
    res.status(500).json({ data: null, err: "Server Error" })
  }
}
