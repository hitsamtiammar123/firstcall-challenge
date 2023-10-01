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



export interface UsersProps{
  type: "edit" | "insert";
  id?: string;
}

export default withRedux(function Users({ type, id } : UsersProps) {
   const {
    register,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm<Inputs>()

  const router = useRouter()
  const dispatch = useAppDispatch()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if(id){
      loadData()
    }

  }, [id])

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

  const onSubmit: SubmitHandler<Inputs> = async(data) => {
    try{
    let method;
    let request
    setLoading(true)
    if(type === 'edit'){
      method = 'PUT'
      request = {
        "firstname": data.firstname,
        "lastname": data.lastname,
        id
      }
    }
    else{
      method = 'POST'
      request = {
        "username": data.username,
        "firstname": data.firstname,
        "lastname": data.lastname
      }
    }
    const res =  await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api`,{
      method: method,
      body: JSON.stringify(request)
    })

    const d = await res.json();

    if(d.status === 200){
      router.push('/')
      dispatch(setNewFetch(true))
    }
  }catch(e){
    console.log('An erro on submit', { e })
    alert('An erro  on submit')
  }finally{
    setLoading(false)
  }
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="p-5">
        <div className="flex flex-col items-center flex-1">
          <h1 className="font-bold mb-5">{type === 'insert' ? 'Add new User' : 'Edit user'}</h1>
          <div className="flex flex-col">
            <span>User name:</span>
            <input disabled={type === 'edit'} {...register("username", { required: "Username is required", minLength: {
              message: 'Username minimun character is 4',
              value: 4
            }, maxLength: {
              message: 'Username maximum character is 50',
              value: 50
            } })}  type="text"
              placeholder="Input username"
              className={`input input-bordered w-full max-w-xs ${errors.username ? 'border border-red-600' : ''}`}
            />
             {errors.username && <span className="text-red-600 text-xs">{errors.username.message}</span>}
          </div>
          <div className="flex flex-col mt-4">
            <span>First name:</span>
            <input
              disabled={loading}
              {...register("firstname", { required: "First Name is required", minLength: {
                message: 'Firstname minimun character is 4',
                value: 4
              }, maxLength: {
                message: 'Firstname maximum character is 50',
                value: 50
              } })}
              type="text" placeholder="Input firstname"
              className={`input input-bordered w-full max-w-xs ${errors.firstname ? 'border border-red-600' : ''}`}
              />
              {errors.firstname && <span className="text-red-600 text-xs">{errors.firstname.message}</span>}
          </div>
          <div className="flex flex-col mt-4">
            <span>Last name:</span>
            <input
                disabled={loading}
                {...register("lastname", { required: " Name is required", maxLength: {
                  message: 'Last name maximum length is 55',
                  value: 55
                } })}
                type="text" placeholder="Type lastname"
                className={`input input-bordered w-full max-w-xs ${errors.lastname ? 'border border-red-600' : ''}`}
                 />
             {errors.lastname && <span className="text-red-600 text-xs">{errors.lastname?.message}</span>}
          </div>
          <button className="btn btn-success btn-wide mt-4">
            {type === 'insert' ? 'Add user' : 'Edit user'}
          </button>
        </div>
      </div>
    </form>

  )
});
