export default function Home() {

  return (
    <div className="bg-[#4B0082] min-h-screen flex flex-col items-center ">
        <h1>this is main page</h1>
        <a href="/admin">
          <button className=" bg-white p-1 rounded-lg">press this to go to admin page</button>
        </a>
    </div>
  );
}
