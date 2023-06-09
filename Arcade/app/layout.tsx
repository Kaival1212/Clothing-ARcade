// Import necessary dependencies and components
import "./globals.css";
import Image from "next/image";
import logo from "../comps/Main.png";

// Define a functional component named RootLayout that takes in children as props 
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  // Return the HTML layout with the logo and children components
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
