import React, { useEffect, useState } from 'react'
import { useWeb3Context } from '../context'
import { ShareCustom } from './shareCustom'

export function Tabs() {
  const { address } = useWeb3Context()
  const [copySuccess, setCopySuccess] = useState(false)
  const [referral, setreferral] = useState('')
  localStorage.setItem('referral_link', referral)
  useEffect(() => {
    setCopySuccess(false)
    setreferral(' ')
  }, [])
  const [currentActive, setCurrentActive] = useState(1)
  const generatereferal = async () => {
    if (referral == ' ') {
      const add = `https://quadspace.io?ref=${address}`
      setreferral(add)
    } else {
      setreferral(' ')
    }
  }
  return (
    <>
      <div className="tabcontainer">
        <div className="tab-wrapper">
          <label htmlFor="one">Referrals</label>
          <input
            type="radio"
            name="tab"
            onChange={() => {
              setCurrentActive(1)
            }}
            id="one"
          />
          <label htmlFor="two">Rewards </label>
          <input
            type="radio"
            name="tab"
            onChange={() => {
              setCurrentActive(2)
            }}
            id="two"
          />
          <div className="tab-content">
            {currentActive == 1 ? (
              <>
                <input
                  className="input1"
                  type="text"
                  name="postlink"
                  onChange={(e) => setreferral(e.target.value)}
                  value={referral}
                  placeholder="Click Generate for Referral Link"
                  required
                />

                <a className="bn49" onClick={generatereferal}>
                  Generate
                </a>

                <a
                  onClick={() => {
                    navigator.clipboard.writeText(
                      `https://quadspace.io?ref=${address}`
                    )
                    setCopySuccess(!copySuccess)
                    setreferral(`https://quadspace.io?ref=${address}`)
                  }}
                  data-toggle="modal"
                >
                  <i className="fa-regular fa-clone"></i>
                </a>
                {copySuccess == true ? (
                  <span className="text-success sucess-text-helper">copied</span>
                ) : (
                  <></>
                )}
                
                <div>
                  <ShareCustom />
                </div>
              </>
            ) : null}
            {currentActive == 2 ? <>
            <h6 style={{marginTop:"15px"}}>See your Referral points</h6>
         
            </> : null}
          </div>
          <div className="active-bar">
            <span></span>
          </div>
        </div>
      </div>
    </>
  )
}
