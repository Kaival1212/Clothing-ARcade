// This is a functional component named Home
export default function Home() {

  // The component returns a div element with a purple background, centered contents,
  // and a heading that says "this is main page". There's also a button that links to "/admin".
  return (
    <div className="bg-[#4B0082] min-h-screen flex flex-col items-center ">
        <h1>this is main page</h1>
        <a href="/admin">
          <button className=" bg-white p-1 rounded-lg">press this to go to admin page</button>
        </a>
    </div>
  );
}
