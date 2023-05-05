"use client"
// Importing necessary packages and components
import Link from "next/link";
import { useEffect, useState } from "react";

// Defining a functional component named 'products'
export default function products() {
  
  // Defining a state variable named 'Data' and a function to update it named 'SetData'
  const [Data, SetData] = useState<{ product_id: string, product_name: string, product_des: string, product_price: number, product_category: string, product_images: string[] }[]>([]);

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
    <div className="h-screen flex flex-col">
      {/* Linking to the add new product page */}
      <Link href={"/admin/home/products/new"}>
        <button className="bg-[#4B0082] text-white px-6 py-2 mt-10 rounded-xl mx-5">
          Add New Product
        </button>
      </Link>
      <div>
        {/* Rendering the products data fetched from the API */}
        {Data.length !== 0 ? Data.map((product) => (
          <div key={product.product_id}>
            <h1>product_name:{product.product_name}</h1>
            <p>product_des:{product.product_des}</p>
            <p>product_price:{product.product_price}</p>
            <p>product_category:{product.product_category}</p>
            <div className="flex">
              {/* Rendering the product images */}
              {product.product_images.map((image, index) => (
                <img key={index} src={image} alt={`Image ${index}`} height={100} width={100} />
              ))}
            </div>
          </div>
        )) : <h1>Loading....</h1>} {/* Displaying a loading message while the data is being fetched */}
      </div>
    </div>
  );
}
