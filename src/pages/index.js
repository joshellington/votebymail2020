import React, { useEffect, useState } from "react"
import axios from "axios"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Rules from "../data/rules"

const LOOKUP_URL = `https://bsvi9k134l.execute-api.us-west-2.amazonaws.com/dev/lookup`

const Index = () => {
  const [currentState, setCurrentState] = useState('')
  const [currentRules, setCurrentRules] = useState(false)

  useEffect(() => {
    const getState = async () => {
      const response = await axios.get(LOOKUP_URL)
      if (response.data.country.iso_code === "US") {
        setCurrentState(response.data.subdivisions[0].names.en)
      }
    }

    getState()
  }, [])

  useEffect(() => {
    const matchingRule = Rules.rules.filter(r => r.state === currentState)
    setCurrentRules(matchingRule[0])
  }, [currentState])
  
  const handleChange = e => {
    setCurrentState(e.target.value)
  }

  return (
    <Layout>
      <SEO title="Home" />

      <section className="state-selector">
        <form>
          <label htmlFor="state-select">Select a state</label>
          <select
            value={currentState}
            onChange={handleChange}
            onBlur={handleChange}
          >
            {Rules.rules.map((s, ind) => {
              return (
                <option key={s.state} value={s.state}>
                  {s.state}
                </option>
              )
            })}
          </select>
        </form>
      </section>

      {currentRules && (
        <>
          <section className="status">
            <dl className="large">
              <dt>Can you vote by mail?</dt>
              <dd>{currentRules.status ? "Yes" : "No"}</dd>
            </dl>

            {currentRules.excuseRequired && (
              <dl>
                <dt>Excuse Required</dt>
                <dd>Yes</dd>
              </dl>
            )}

            {currentRules.applicationDeadline !== "N/A" && (
              <dl>
                <dt>Application Deadline</dt>
                <dd
                  dangerouslySetInnerHTML={{
                    __html: currentRules.applicationDeadline.replace(
                      /\./g,
                      ".<br>"
                    ),
                  }}
                ></dd>
              </dl>
            )}

            {currentRules.ballotDeadline !== "N/A" && (
              <dl>
                <dt>Ballot Deadline</dt>
                <dd
                  dangerouslySetInnerHTML={{
                    __html: currentRules.ballotDeadline.replace(/\./g, ".<br>"),
                  }}
                ></dd>
              </dl>
            )}
          </section>

          <section className="details">
            <div className="inner">
              <dl>
                <dt>Automatically Mailed</dt>
                <dd>{currentRules.applicationMailed ? "Yes" : "No"}</dd>
              </dl>

              {currentRules.onlineSubmission !== "N/A" && (
                <dl>
                  <dt>Online Submission</dt>
                  <dd>{currentRules.onlineSubmission}</dd>
                </dl>
              )}
            </div>
          </section>

          {currentRules.applicationInfo !== "N/A" && (
            <section className="info">
              <dl>
                <dt>Application Info</dt>
                <dd
                  dangerouslySetInnerHTML={{
                    __html: currentRules.applicationInfo,
                  }}
                ></dd>
              </dl>
            </section>
          )}
        </>
      )}

      {!currentRules && (
        <section className="loading">
          <p>Finding your state...</p>
        </section>
      )}

      <footer>
        <p>
          #SaveUSPS by texting <a href="sms:50409?body=USPS">"USPS" to 50409</a> / <a href="https://store.usps.com/store/results/stamps/_/N-9y93lv">Buy stamps</a>
        </p>
        <p>
          Data source: <a href="https://represent.us/how-to-vote-2020">RepresentUs</a> / Built by: <a href="https://joshellington.com">Josh Ellington</a>
        </p>
      </footer>
    </Layout>
  )
}

export default Index