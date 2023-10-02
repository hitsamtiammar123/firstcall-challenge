"use client";
import React, { useEffect, useState } from 'react'
import { User } from '../types/user'
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import withRedux from '@/redux/withRedux';
import { setNewFetch } from '@/redux/mainSlice';
import Link from 'next/link';

export interface UsersTableProps{
  defaultData: User[]
}

export default withRedux(function UsersTable({ defaultData }: UsersTableProps ) {
  const [data, setData] = useState(defaultData)

  const isNewFetch = useAppSelector((state) => state.main.isNewFetch)
  const dispatch = useAppDispatch();

  async function loadData(){
    const data = await fetch(`${process.env.NEXT_PUBLIC_API_URL}`)
    if(!data.ok){
      return;
    }
    const final = await data.json()
    setData(final.data)
    dispatch(setNewFetch(false))
    console.log({ final })
  }

  useEffect(() => {
    if(isNewFetch){
      loadData();
    }
  }, [isNewFetch])

  async function deleteData(id: string){
    const isConfirm = confirm('Are you sure want to delte this data?');
    if(isConfirm){
      const data = await fetch(`${process.env.NEXT_PUBLIC_API_URL}`, {
        method: 'DELETE',
        mode:'cors',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id
        })
      })
      if(!data.ok){
        return;
      }
      const final = await data.json()
      if(final.status === 200){
        alert('Data has been sucessfully deleted');
        loadData()
      }else if(final.status === 404){
        alert('Data not found')
      }
    }
  }


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
                <Link href={`/users/${item.id}`} className="btn btn-primary me-4">Edit</Link>
                <button className="btn btn-error" onClick={() => deleteData(item.id)}>Delete</button>
              </div>
            </td>
          </tr>
        ))}

      </tbody>
    </table>
  </div>
  )
})
