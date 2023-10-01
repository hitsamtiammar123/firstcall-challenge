import React from 'react'

export default function Users() {
  return (
    <div className="p-5">
      <div className="flex flex-col items-center flex-1">
        <h1 className="font-bold mb-5">Add new User</h1>
        <div className="flex flex-col">
          <span>User name:</span>
          <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
        </div>
        <div className="flex flex-col mt-4">
          <span>First name:</span>
          <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
        </div>
        <div className="flex flex-col mt-4">
          <span>Last name:</span>
          <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
        </div>
        <button className="btn btn-success btn-wide mt-4">
          Add new user
        </button>
      </div>
    </div>
  )
}
