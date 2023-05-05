// Import necessary dependencies and components
"use client";

import Link from "next/link";
import { getAuth, signOut } from "firebase/auth";
import { initFirebase } from "../../../comps/firebase_init_admin";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

// Define a functional component named RootLayout that takes in children as props
export default function SecondryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Initialize the Firebase app
  initFirebase();

  const [linkData, setLinkData] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setLinkData(window.location.href);
    }
  }, []);
  // Get the Firebase authentication object and check the authentication state
  const auth = getAuth();
  const [user, loading] = useAuthState(auth);

  // Get the router object to redirect to the login page
  const router = useRouter();

  const active =
    "mt-7 flex gap-2 pl-2 text-[#000000] bg-[#D1B23E] py-2 w-full ";
  const inactive = "mt-9 flex gap-2 pl-2 text-[#D1B23E]";

  function go_to_login() {
    router.push("/admin");
  }

  function updateLinkData(newLink: string) {
    setLinkData(newLink);
  }

  // Return the HTML layout with the logo and children components
  if (!user) {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-slate-900 text-white text-2xl">
        <h1>please sign in</h1>
        <button
          className=" bg-slate-950 p-4 m-2 rounded-xl"
          onClick={() => go_to_login()}
        >
          go to login
        </button>
      </div>
    );
  }
  return (
    <div className=" flex">
      <div className=" bg-[#4B0082]  pl-12 min-h-screen pt-14 text-xl font-bold">
        <div className="flex flex-col w-56 items-start ">
          <Link
            className={linkData.includes("dashboard") ? active : inactive}
            href={"/admin/home/dashboard"}
            onClick={() => updateLinkData("/admin/home/dashboard")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
              />
            </svg>
            Dashboard
          </Link>
          <Link
            className={linkData.includes("products") ? active : inactive}
            href={"/admin/home/products"}
            onClick={() => updateLinkData("/admin/home/products")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
              />
            </svg>
            Products
          </Link>
          <Link
            className={linkData.includes("orders") ? active : inactive}
            href={"/admin/home/orders"}
            onClick={() => updateLinkData("/admin/home/orders")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
              />
            </svg>
            Orders
          </Link>
          <Link
            className={linkData.includes("settings") ? active : inactive}
            href={"/admin/home/settings"}
            onClick={() => updateLinkData("/admin/home/settings")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            Settings
          </Link>
          <Link
            className={linkData.includes("e_photo") ? active : inactive}
            href={"/admin/home/e_photo"}
            onClick={() => updateLinkData("/admin/home/e_photo")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
              />
            </svg>
            Edit Photos
          </Link>
        </div>
        <button
          className="mt-9 bg-slate-50 p-2 rounded-xl font-black"
          onClick={() => signOut(auth)}
        >
          {" "}
          Sign Out
        </button>
      </div>
      <div className=" bg-[#D1B23E] w-full">
        <div>{children}</div>
      </div>
    </div>
  );
}
