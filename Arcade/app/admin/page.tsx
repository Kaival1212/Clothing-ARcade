// Import necessary dependencies and components
"use client";
import { useState } from "react";
import Admin_Image from "../../comps/user.png";
import Image from "next/image";
import { getAuth, signInWithEmailAndPassword ,signOut } from "firebase/auth";
import { initFirebase } from "../../comps/firebase_init_admin";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/navigation";

// Define a functional component named Home
export default function Home() {

  // Initialize Firebase and get authentication object and user authentication state
  initFirebase();
  const auth = getAuth();
  const [user, loading] = useAuthState(auth);

  // Initialize email and password state and router object
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const router = useRouter();

  // Define an async function to handle form submission and user login
  async function  submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const login_user = await signInWithEmailAndPassword(auth, email, password);
    console.log(login_user.user.email);
  }

  // If authentication state is loading, show a loading message
  if (loading){
    return <div>loading....</div>
  }

  // If user is authenticated, redirect to the admin home page
  if (user){
    router.push('/admin/Home')
  }

  // Otherwise, show the login form
  return (
    <div className="bg-[#4B0082] min-h-screen flex flex-col items-center ">
      <div className="w-1/2 h-auto mt-32 mb-20 bg-[#F87B4E] rounded-2xl shadow-lg hover:shadow-xl hover:shadow-black shadow-black ">
        <form className="flex flex-col items-center mt-8" onSubmit={submit}>
          <Image src={Admin_Image} alt="loading" height={100} width={140} />
          <h1 className=" font-bold mt-4 text-2xl">Admin Login</h1>
          <div className="flex flex-col items-center w-2/3 mt-6">
            <h1 className="mb-5 w-1/2 text-2xl font-bold">Email</h1>
            <input
              type="email"
              placeholder="Email"
              className="w-1/2 h-10 rounded-lg pl-4"
              value={email}
              onChange={(e) => setemail(e.target.value)}
            />
            <h1 className="mb-5 mt-5 w-1/2 text-2xl font-bold">Password</h1>
            <input
              type="password"
              placeholder="Password"
              className="w-1/2 h-10 rounded-lg pl-4"
              value={password}
              onChange={(e) => setpassword(e.target.value)}
            />
            <button
              type="submit"
              className="mb-14 font-bold bg-white px-10 py-2 mt-10 rounded-xl hover:bg-slate-200 hover:rounded-md"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
