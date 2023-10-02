import UsersTable from './components/users-table'

export default async function Home() {
  const data = await fetch(`${process.env.NEXT_PUBLIC_API_URL}`, { cache: 'no-cache'})
  if(!data.ok){
    return;
  }
  const final = await data.json()

  return (
    <main className="p-5">
      <h1 className="font-bold text-lg">User List Table</h1>
      <UsersTable defaultData={final.data} />
    </main>
  )
}
