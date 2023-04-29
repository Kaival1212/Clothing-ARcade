'use client'

import { useState } from "react"

export default function Home() {
  const [user, setuser] = useState<Array<{ _id: string, name: string }>>([]);

  async function getusers(){
    const f_data= await fetch("/api/main",{method:"GET"})
    const data = await f_data.json()
    setuser(data)
}
  return (
    <div className=" bg-slate-300 h-full ">
      <p className=" font-semibold text-lg mt-20 ml-10">Trending</p>
      <button className=' bg-red-600 mx-3 h-9 w-20 rounded-xl hover:bg-red-800' onClick={()=>getusers()}>Cart</button>
      <ul style={{ listStyle: 'disc inside' }}>
        {user && user.map((a) => <li key={a._id}>{a.name}</li>)}
      </ul>
    </div>
  )
}
