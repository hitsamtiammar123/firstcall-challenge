import Image from 'next/image'

export default function Home() {
  return (
    <main className="p-5">
      <h1 className="font-bold text-lg">User List Table</h1>
      <div className="overflow-x-auto mt-6">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Username</th>
              <th>Firstname</th>
              <th>Last Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            <tr>
              <th>1</th>
              <td>hitsam</td>
              <td>Hitsam</td>
              <td>Tiammar</td>
              <td>
                <div className="flex flex-row">
                  <button className="btn btn-primary me-4">Edit</button>
                  <button className="btn btn-error">Delete</button>
                </div>
              </td>
            </tr>
            {/* row 2 */}
            <tr>
              <th>2</th>
              <td>Hart Hagerty</td>
              <td>Desktop Support Technician</td>
              <td>Purple</td>
            </tr>
            {/* row 3 */}
            <tr>
              <th>3</th>
              <td>Brice Swyre</td>
              <td>Tax Accountant</td>
              <td>Red</td>
            </tr>
          </tbody>
        </table>
      </div>
    </main>
  )
}
