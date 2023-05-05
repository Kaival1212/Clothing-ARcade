// Import necessary dependencies and components
import Image from "next/image";
import logo from "../../comps/Main.png";

// Define a functional component named RootLayout that takes in children as props 
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  // Return the HTML layout with the logo and children components
  return (
    <html lang="en">
      <head><title>Admin page</title></head>
      <body>
        <div className=" bg-[#D3D3D3] p-8 flex justify-between">
          <Image src={logo} alt="loading" height={60} width={270}></Image>
          <div className="mt-2"></div>
        </div>
        {children}
      </body>
    </html>
  );
}
