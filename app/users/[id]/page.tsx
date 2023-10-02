"use client";
import React from 'react'
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

