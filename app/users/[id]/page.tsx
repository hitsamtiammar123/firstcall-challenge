"use client";
import React, { useEffect, useState } from 'react'
import { useForm, SubmitHandler } from "react-hook-form"
import { useRouter } from 'next/navigation';
import { useAppDispatch } from '@/redux/hooks';
import { setNewFetch } from '@/redux/mainSlice';
import withRedux from '@/redux/withRedux';
import Users from '../users';

type Inputs = {
  username: string;
  firstname: string;
  lastname: string;
}

export interface UsersProps{ params: { id: string } }

export default function Page({ params: { id } } : UsersProps){
  return (
    <Users type="edit" id={id} />
  )
}

