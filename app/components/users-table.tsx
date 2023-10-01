"use client";
import React, { useEffect, useState } from 'react'
import { User } from '../types/user'

export interface UsersTableProps{
  defaultData: User[]
}

export default function UsersTable({ defaultData }: UsersTableProps ) {
  const [data, setData] = useState(defaultData)
  console.log({ data })


  return (
    <div className="overflow-x-auto mt-6">
    <table className="table">
      <thead>
        <tr>
          <th></th>
          <th>Username</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={item.id}>
            <th>{index + 1}</th>
            <td>{item.username}</td>
            <td>{item.firstname}</td>
            <td>{item.lastname}</td>
            <td>
              <div className="flex flex-row">
                <button className="btn btn-primary me-4">Edit</button>
                <button className="btn btn-error">Delete</button>
              </div>
            </td>
          </tr>
        ))}

      </tbody>
    </table>
  </div>
  )
}
