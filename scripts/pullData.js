const fs = require("fs")
const axios = require("axios")
const cheerio = require("cheerio")

const url = `https://represent.us/how-to-vote-2020/`
let data = []

const canVoteByMail = (text) => {
  let status = false
  let excuse = false
  let applicationMailed = false

  if (text.indexOf('Temporarily allowing') > -1) {
    status = true
  }

  if (text.indexOf('Any voter can request a Vote') > -1) {
    status = true
  }

  if (text.indexOf('Vote by Mail is the default') > -1) {
    status = true
    applicationMailed = true
  }

  if (text.indexOf('Voters need an') > -1) {
    status = true
    excuse = true
  }

  return {
    status: status,
    excuse: excuse,
    applicationMailed: applicationMailed
  }
}

(async () => {
  const response = await axios.get(url)
  const $ = cheerio.load(response.data)
  const stateRows = $('.t_states > .row')

  stateRows.each((i, elem) => {
    let statusText = $(elem).find(".score1 p").text()
    let voteByMailStatus = canVoteByMail(statusText)

    data.push({
      state: $(elem).find("h4.title-").text(),
      status: voteByMailStatus.status,
      excuseRequired: voteByMailStatus.excuse,
      applicationMailed: voteByMailStatus.applicationMailed,
      onlineSubmission: $(elem).find(".score2 p").text().replace("\n", " "),
      applicationDeadline: $(elem).find(".score3 p").text().replace("\n", " "),
      ballotDeadline: $(elem).find(".score4 .text").text().replace("\n", " "),
      applicationInfo: $(elem).find(".score .text p").html(),
    })

    if (i === stateRows.length - 1) {
      fs.writeFileSync(
        `src/data/_vote-rules.json`,
        JSON.stringify(data, null, 2)
      )
    }
  })
})()