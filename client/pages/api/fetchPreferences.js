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
      `${uri}/api/lecture/${parsed.code}`,
      requestOptions
    )
    let data1 = await response.json()
    if (data1.err) res.status(200).json({ data: null, err: data1.err })

    let length = data1.length
    let preferences = {}
    let lastWeek = parsed.lastWeek
    for (let idx = 0; idx < length; ++idx) {
      let from = data1[idx].from,
        to = data1[idx].to
      if (Math.round(Number(from) / 1000) >= lastWeek) {
        let requestOptions2 = {
          method: "POST",
          headers: {
            Authorization: `Bearer ${parsed.accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            subjectCode: parsed.code,
            from,
            to,
          }),
          redirect: "follow",
        }

        response = await fetch(
          `${uri}/api/booking/preferences`,
          requestOptions2
        )
        let data2 = await response.json()

        if (data2.length !== 0) {
          data2.forEach((detail) => {
            if (detail.user.email === parsed.email) {
              let date = new Date(0)
              date.setUTCMilliseconds(Number(from))
              let day = date.getDay()
              let mode = detail.mode
              preferences[week[day]] = mode
            }
          })
        }
      }
    }

    let data = {
      code: "CO305",
      preferences,
    }

    res.status(200).json({ data: JSON.stringify(data), err: null })
  } catch (err) {
    res.status(500).json({ data: null, err: "Server Error" })
  }
}
