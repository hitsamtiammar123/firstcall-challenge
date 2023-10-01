"use client";
import React, { useEffect, useState } from 'react'
import { useForm, SubmitHandler } from "react-hook-form"
import { RedirectType, redirect, useRouter } from 'next/navigation';
import Router from 'next/router';
import { useAppDispatch } from '@/redux/hooks';
import { setNewFetch } from '@/redux/mainSlice';
import withRedux from '@/redux/withRedux';

type Inputs = {
  username: string;
  firstname: string;
  lastname: string;
}

export interface UsersProps{ params: { id: string } }

export default withRedux(function  UsersDetail({ params: { id } }: UsersProps) {
   const {
    register,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm<Inputs>()

  const router = useRouter()
  const dispatch = useAppDispatch()
  const [loading, setLoading] = useState(false)
  console.log({ id })

  async function loadData(){
    try{
      setLoading(true)
      const data = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/?id=${id}`, { cache: 'no-cache'})
      if(!data.ok){
        alert('An error occured when load some data');
        return;
      }
      const res = await data.json();
      setValue("firstname", res.data.firstname)
      setValue("lastname", res.data.lastname)
      setValue("username", res.data.username)
    }catch(e){
      console.log('error on edit', { e })
      alert('An error occured when load data')
    }finally{
      setLoading(false)
    }
  }

  useEffect(() => {
    if(id){
      loadData()
    }

  }, [id])

  const onSubmit: SubmitHandler<Inputs> = async(data) => {
    console.log({ data })
    try{
      setLoading(true)
      const res =  await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api`,{
        method: 'PUT',
        body: JSON.stringify({
          "firstname": data.firstname,
          "lastname": data.lastname,
          "id": id
        })
      })

      const d = await res.json();

      if(d.status === 200){
        router.push('/')
        dispatch(setNewFetch(true))
      }
  }catch(e){
    console.log('An error on submit data', { e })
    alert('An erro occurend on submiting data')
  }finally{
    setLoading(false)
  }
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="p-5">
        <div className="flex flex-col items-center flex-1">
          <h1 className="font-bold mb-5">Edit User</h1>
          <div className="flex flex-col">
            <span>User name:</span>
            <input {...register("username", { required: true, minLength: 4, maxLength: 50 })} type="text"
              placeholder="Input username"
              disabled
              className={`input input-bordered w-full max-w-xs ${errors.username ? 'border border-red-600' : ''}`}
            />
             {errors.username && <span className="text-red-600">{errors.username.message}</span>}
          </div>
          <div className="flex flex-col mt-4">
            <span>First name:</span>
            <input
              disabled={loading}
              {...register("firstname", { required: true, minLength: 4, maxLength: 50 })}
              type="text" placeholder="Input firstname"
              className={`input input-bordered w-full max-w-xs ${errors.firstname ? 'border border-red-600' : ''}`}
              />
              {errors.firstname && <span className="text-red-600">{errors.firstname.message}</span>}
          </div>
          <div className="flex flex-col mt-4">
            <span>Last name:</span>
            <input
                disabled={loading}
                {...register("lastname", { required: true, maxLength: 55 })}
                type="text" placeholder="Type lastname"
                className={`input input-bordered w-full max-w-xs ${errors.lastname ? 'border border-red-600' : ''}`}
                 />
             {errors.lastname && <span className="text-red-600">{errors.lastname?.message}</span>}
          </div>
          <button disabled={loading} className="btn btn-success btn-wide mt-4">
            Edit user
          </button>
        </div>
      </div>
    </form>

  )
})
