// Import the necessary Firebase authentication functions and dependencies
"use client"
import { getAuth, signOut } from "firebase/auth";
import { initFirebase } from "../../../comps/firebase_init_admin";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/navigation";

// Define a functional component named Page
export default function Page() {

    // Initialize the Firebase app
    initFirebase();

    // Get the Firebase authentication object and check the authentication state
    const auth = getAuth();
    const [user, loading] = useAuthState(auth);

    // Get the router object to redirect to the login page
    const router = useRouter();

    // Define a function to redirect to the login page
    function go_to_login(){
        router.push("/admin");
    }

    // If the user is logged in, show their email and a sign out button
    if (!loading && user) {
        return (
            <div>
                <h1>Hello..... {user?.email}</h1>
                <button onClick={() => signOut(auth)}> sign out</button>
            </div>
        );
    }

    // If the user is not logged in, show a message and a button to redirect to the login page
    return (
        <div>
            <h1>please sign in</h1>
            <button onClick={() => go_to_login()}>go to the login page</button>
        </div>
    );
}
