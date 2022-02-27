import React from 'react'
import './dashboard.css'
import {Divider} from '@mui/material'
export default function Dashboard() {
  return (
<div className="adminDashboardBox">

  <div className="topadminBoxes">
    <div className="adminInfoBox">
      <div className="adminInfoHeading">50000 ₹</div>
      <div className="adminInfodescription">total Sale</div>
    </div>

    <div className="adminInfoBox">
      <div className="adminInfoHeading">0</div>
      <div className="adminInfodescription">out of stock items</div>
    </div>

    <div className="adminInfoBox">
      <div className="adminInfoHeading">50000 ₹</div>
      <div className="adminInfodescription">profit</div>
    </div>
  </div>
  <Divider />
</div>
  )
}
