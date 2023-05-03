import "./globals.css";
import Image from "next/image";
import logo from "../comps/Main.png";

export default function RootLayout({
  children,
  session,
}: {
  children: React.ReactNode;
  session: any;
}) {

  return (
    <html lang="en">
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
