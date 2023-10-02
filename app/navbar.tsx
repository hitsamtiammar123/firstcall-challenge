"use client"
import React from 'react'
import Link from 'next/link'

export default function Navbar() {
  return (
  <div className="navbar bg-sky-400">
    <div className="flex-1">
      <Link href="/" className="btn btn-ghost normal-case text-xl">Firstcall Next Challenge</Link>
    </div>
    <div className="flex-none">
      <Link href="/users" className="btn  me-4 btn-ghost px-3">
        <h2>Insert</h2>
      </Link>
    </div>
  </div>
  )
}
