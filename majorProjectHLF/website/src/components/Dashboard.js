import React, { useState } from "react"
import TopNavbar from "./TopNavbar"
import AssetsTable from "./AssetsTable"

export default function Dashboard() {

  return (
    <>
      <TopNavbar />
      All Assets   
      <AssetsTable/>
    </>
  )
}
