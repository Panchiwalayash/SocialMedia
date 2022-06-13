import React from 'react'
import './trend.css'
import { TrentData } from './trendData'

export default function Trend() {
  return (
    <>

      <div className="trend" >
        {TrentData.map((t) => {
          return (
            <div className="trendCard" key={t.id}>
              <div className="trendName">{t.name}</div>
              <div className="trendShare">{t.shares} shares</div>
            </div>
          )
        })}
      </div>
    </>
  )
}
