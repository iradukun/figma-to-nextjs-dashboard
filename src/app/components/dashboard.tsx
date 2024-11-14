
"use client"
import React from 'react'


type AnalyticsData ={
    name: string,
    leads:number
    campaign:number
}
type Campaign={
    name: string,
    platform: string,
    date: string;
    leads:string
}
type Lead={
    name:string,
    email: string,
    image: string
}
const dashboard = () => {
  return (
    <div>dashboard</div>
  )
}

export default dashboard