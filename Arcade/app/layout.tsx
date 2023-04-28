import './globals.css'
import Image from 'next/image'
import logo from "../comps/Main.png"

export default function RootLayout({children,}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body>
        <div className=' bg-gray-500 p-5 flex justify-between'>
          <Image src={logo} height={60} width={270}></Image>
          <div className='mt-2'>
          <button className=' bg-red-600 mx-3 h-9 w-20 rounded-xl hover:bg-red-800'>Cart</button>
          <button className=' bg-red-600 mx-3 h-9 w-20 rounded-xl hover:bg-red-800'>Account</button>
          </div>
        </div>
        {children}
        </body>
    </html>
  )
}
