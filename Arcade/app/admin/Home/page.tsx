"use client"

import {getAuth, signOut } from "firebase/auth";
import { initFirebase } from "../../../comps/firebase_init_admin";
import {useAuthState} from "react-firebase-hooks/auth";
import { useRouter } from "next/navigation";


export default function Page() {

    initFirebase();
    const auth= getAuth();
    const [user , loading] = useAuthState(auth)
    const router = useRouter();

    function go_to_login(){
        router.push("/admin")
    }

    if(!loading && user) {
        return (
            <div>
            <h1>Hello..... {user?.email}</h1>
            <button onClick={()=>signOut(auth)}> sign out</button>
            </div>
            )
    }

    return(
        <div>
        <h1>please sign in</h1>
        <button onClick={()=> go_to_login()}>go to the login page</button>
        </div>
    )

  }