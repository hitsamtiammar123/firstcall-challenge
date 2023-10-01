import UsersTable from './components/users-table'

export default async function Home() {
  console.log({ url: `${process.env.NEXT_PUBLIC_API_URL}/api`})
  const data = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api`, { cache: 'no-cache'})

  if(!data.ok){
    return (
      <div>
        <h1>An error when load user data. Please try again later</h1>
      </div>
    )
  }

  const final = await data.json()

  console.log({ final })

  return (
    <main className="p-5">
      <h1 className="font-bold text-lg">User List Table</h1>
      <UsersTable defaultData={final.data} />
    </main>
  )
}
