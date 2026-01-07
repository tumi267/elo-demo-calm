'use client'
import React from 'react'
import Nav from "../components/(public)/Nav/Nav"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Nav/>
      <div>{children}</div>
    </>
  )
}