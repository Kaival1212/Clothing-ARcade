"use client"

import Link from "next/link";
import { useEffect, useState } from "react";

export default  function products() {

  const [Data,SetData]= useState([])

  const fetchData = async () => {
    const product_data= await fetch("/api/Backend/Mongodb", { method: "GET" });
    const json_data = await product_data.json(); // await the result of json() method
    SetData(json_data);
  };

  useEffect(() => {
    fetchData();
  }, []);
  console.log(Data)
  

  return (
    <div className="h-screen flex flex-col">
      <Link href={"/admin/home/products/new"}>
        <button className="bg-[#4B0082] text-white px-6 py-2 mt-10 rounded-xl mx-5">
          Add New Product
        </button>
      </Link>
      <div>
      {Data.length !== 0 && Data.map((product) => (
  <div key={product.product_id}>
    <h1>{product.product_name}</h1>
    <p>{product.product_des}</p>
    <p>{product.product_price}</p>
    <p>{product.product_category}</p>
    <div className="flex">
    {product.product_images.map((image, index) => (
      <img key={index} src={image} alt={`Image ${index}`} height={100} width={100}/>
    ))}
    </div>
  </div>
))}      </div>
    </div>
  );
}
