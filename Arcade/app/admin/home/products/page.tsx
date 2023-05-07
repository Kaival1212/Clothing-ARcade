"use client";
// Importing necessary packages and components
import Link from "next/link";
import { useEffect, useState } from "react";

// Defining a functional component named 'products'
export default function products() {
  // Defining a state variable named 'Data' and a function to update it named 'SetData'
  const [Data, SetData] = useState<
    {
      _id: string;
      product_name: string;
      product_des: string;
      product_price: number;
      product_category: string;
      product_images: string[];
      product_id:string;
    }[]
  >([]);

  // Defining an asynchronous function named 'fetchData' to fetch data from the API endpoint
  const fetchData = async () => {
    // Fetching data from the specified endpoint using the 'fetch' method
    const product_data = await fetch("/api/Backend/Mongodb", { method: "GET" });
    // Parsing the response data into a JSON object using the 'json' method
    const json_data = await product_data.json(); // await the result of json() method
    // Updating the 'Data' state variable with the fetched data
    SetData(json_data);
  };

  // Defining a useEffect hook to fetch data from the API endpoint when the component mounts
  useEffect(() => {
    fetchData();
  }, []);

  // Rendering the JSX content to be displayed by the component
  return (
    <div className="h-full flex flex-col">
      {/* Linking to the add new product page */}
      <Link href={"/admin/home/products/new"}>
        <button className="bg-[#4B0082] text-white px-6 py-2 mt-10 rounded-xl mx-5">
          Add New Product
        </button>
      </Link>
      <div className="ml-8 mt-10 grid grid-flow-row grid-cols-3 gap-4">
        {Array.isArray(Data) && Data.length !== 0 ? (
          Data.map((product) => (
            <div key={product._id} className="flex flex-col bg-slate-500 h-auto text-white w-2/3 items-center rounded-xl"> 
              <h1>Name:{product.product_name}</h1>
              <p>Des:{product.product_des}</p>
              <p>Price:{product.product_price}USD</p>
              <p>Category:{product.product_category}</p>
              <div className="flex z-0 ">
                {/* Rendering the product images */}
                <img
                    src={product.product_images[0]}
                    alt={`Image`}
                    className=" h-64 w-64 object-cover	"
                    // height={100}
                    // width={100}
                  />
                {/* {product.product_images.map((image, index) => (
                  <img
                  key={index}
                  src={image}
                  alt={`Image ${index}`}
                  height={100}
                  width={100}
                  />
                ))} */}
              </div>
              <Link href={`admin/home/products/edit/${product.product_id}`}>
                <button className="pri-button mt-4">edit</button>
              </Link>
              <button className=" pri-button  mb-8 mt-4">delete</button>

            </div>
          ))
        ) : (
          <h1>Loading....</h1>
        )}{" "}
        {/* Displaying a loading message while the data is being fetched */}
      </div>
    </div>
  );
}

