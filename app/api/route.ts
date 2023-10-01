import { NextResponse, NextRequest } from "next/server";
import { User } from "../types/user";
import fs from 'fs';

let DATA: User[] = [];

function fetchData(){
  const check = fs.existsSync('./data.json');
  if(check){
    const content = fs.readFileSync('./data.json', 'utf-8')
    console.log({ content })
    DATA = JSON.parse(content);

  }else{
    const initData = [
      {
        "id": "483048903284",
        "username" :"hitsam",
        "firstname": "Tiammar"
      }
    ]

    fs.writeFileSync('./data.json', JSON.stringify(initData))
    DATA = initData as User[]
  }

}

function writeData(){
  console.log('written file', {d: JSON.stringify(DATA)})
  fs.writeFileSync('./data.json', JSON.stringify(DATA))
}


export async function GET(request: NextRequest) {
  fetchData();
  const data: User[] = [];
  const searchParams = request.nextUrl.searchParams
  const id = searchParams.get('id')

  console.log({ id })
  return Response.json({ status: 200, data: DATA })
}

export async function POST(request: NextRequest){
  fetchData();
  const data: User[] = [];
  const body = await request.json()

  console.log({ post: body })
  DATA.push({
    id: new Date().getTime().toString(),
    firstname: body.firstname,
    username: body.username,
    lastname: body.lastname
  })
  writeData()
   return Response.json({ status: 200, message: 'new Data Added' })
}

export async function PUT(request: NextRequest){
  const data: User[] = [];
  const searchParams = await request.json()

  console.log({ put: searchParams })
   return Response.json({ status: 200, data: DATA })
}

export async function DELETE(request: NextRequest){
  const data: User[] = [];
  const searchParams = await request.json()

  console.log({ delete: searchParams })
   return Response.json({ status: 200, data: DATA })
}

