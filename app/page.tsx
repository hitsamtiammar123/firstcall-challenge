import UsersTable from './components/users-table'

export default async function Home() {
  return (
    <main className="p-5">
      <h1 className="font-bold text-lg">User List Table</h1>
      <UsersTable defaultData={[]} />
    </main>
  )
}
