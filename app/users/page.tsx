"use client";
import React from 'react'
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

export default withRedux(function  Users() {
   const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>()

  const router = useRouter()
  const dispatch = useAppDispatch()

  const onSubmit: SubmitHandler<Inputs> = async(data) => {

    console.log({data, errors})
    const res =  await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api`,{
      method: 'POST',
      body: JSON.stringify({
        "username": data.username,
        "firstname": data.firstname,
        "lastname": data.lastname
      })
    })

    const d = await res.json();

    if(d.status === 200){
      router.push('/')
      dispatch(setNewFetch(true))
    }
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="p-5">
        <div className="flex flex-col items-center flex-1">
          <h1 className="font-bold mb-5">Add new User</h1>
          <div className="flex flex-col">
            <span>User name:</span>
            <input {...register("username", { required: true, minLength: 4, maxLength: 50 })} type="text"
              placeholder="Input username"
              className={`input input-bordered w-full max-w-xs ${errors.username ? 'border border-red-600' : ''}`}
            />
             {errors.username && <span className="text-red-600">{errors.username.message}</span>}
          </div>
          <div className="flex flex-col mt-4">
            <span>First name:</span>
            <input
              {...register("firstname", { required: true, minLength: 4, maxLength: 50 })}
              type="text" placeholder="Input firstname"
              className={`input input-bordered w-full max-w-xs ${errors.firstname ? 'border border-red-600' : ''}`}
              />
              {errors.firstname && <span className="text-red-600">{errors.firstname.message}</span>}
          </div>
          <div className="flex flex-col mt-4">
            <span>Last name:</span>
            <input
                {...register("lastname", { required: true, maxLength: 55 })}
                type="text" placeholder="Type lastname"
                className={`input input-bordered w-full max-w-xs ${errors.lastname ? 'border border-red-600' : ''}`}
                 />
             {errors.lastname && <span className="text-red-600">{errors.lastname?.message}</span>}
          </div>
          <button className="btn btn-success btn-wide mt-4">
            Add new user
          </button>
        </div>
      </div>
    </form>

  )
})
