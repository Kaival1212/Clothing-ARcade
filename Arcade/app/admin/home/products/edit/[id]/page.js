"use client"
import { useEffect, useState } from "react";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  listAll,
  deleteObject,
} from "firebase/storage";

export default function Page({ params }) {

  const data_ref = params.id;

  const [data, setData] = useState({
    product_name: "",
    product_des: "",
    product_price: "",
    product_category: "",
    product_images: [],
  });

  async function get_product(id) {
    const response = await fetch("/api/Backend/Mongodb", {
      method: "PUT",
      body: JSON.stringify(id),
    });
    const data = await response.json();
    return data;
  }

  useEffect(() => {
    async function fetchData() {
      const data = await get_product(data_ref);
      setData(data);
    }
    fetchData();
  }, [data_ref]);

  const deleteimage = async (event) => {
    event.preventDefault();
    const storage = getStorage();
    const imagesRef = ref(storage, `temp/temp_images-${data.product_id}/`);
    const listResult = await listAll(imagesRef);
    const deletePromises = listResult.items.map((itemRef)=>
      deleteObject(itemRef)
    );
    await Promise.all(deletePromises);
    setData(prevData => ({...prevData, product_images: []}));
  };

  // Function to fetch the uploaded images from Firebase storage
  const fetchImages = async () => {
    const storage = getStorage();
    const imagesRef = ref(storage, `temp/temp_images-${data.product_id}/`);
    const listResult = await listAll(imagesRef);

    const urlPromises = listResult.items.map(async (itemRef) => {
      const url = await getDownloadURL(itemRef);
      return url;
    });

    const urls = await Promise.all(urlPromises);
    setData(prevData => ({...prevData, product_images: urls}));
  };

  // Function to handle the image upload event
  const handleImageChange = async (event) => {
    event.preventDefault();
    const image_file = event.target.files;
    const storage = getStorage();

    if (!image_file) {
      console.error("No image file selected");
      return;
    }

    // Use Promise.all to create an array of promises that resolve when each upload task completes
    const uploadPromises = Array.from(image_file).map((image) => {
      const storageRef = ref(
        storage,
        `temp/temp_images-${data.product_id}/${image.name}`
      );
      return uploadBytesResumable(storageRef, image);
    });

    // Wait for all the upload tasks to complete before calling fetchImages
    await Promise.all(uploadPromises);

    fetchImages();
  };

  async function return_data(event){
    event.preventDefault();
    const response = await fetch("/api/Backend/Mongodb", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const res = response.status
  }

  return (
    <div className="h-screen flex flex-col mt-28 ml-8">
      <form
        className="h-screen flex flex-col w-2/3 "
        onSubmit={return_data}
      >
        <h1>Product Name:</h1>
        <input
          type="text"
          placeholder="productName"
          className="pri-input"
          value={data.product_name}
          onChange={(e)=>{setData({ ...data,product_name:e.target.value})}}
        />
        <h1>Description:</h1>
        <input
          type="text"
          placeholder="description"
          className="pri-input"
          value={data.product_des}
          onChange={(e)=>{setData({ ...data,product_des:e.target.value})}}

        />
        <h1>Price in USD(without TAX):</h1>
        <input
          type="number"
          placeholder="price"
          className="pri-input"
          value={data.product_price}
          inputMode="numeric"
          onChange={(e)=>{setData({ ...data,product_price:e.target.value})}}
        />
        <h1>Category:</h1>
        <select className="mt-1" value={data.product_category} onChange={(e)=>{setData({product_category:e.target.value})}}>
          <option> 1</option>
          <option> 2</option>
          <option> 3</option>
          <option> 4</option>
          <option> 5</option>
        </select>
        <h1>Photos:</h1>
        <input
          type="file"
          accept="image/png, image/jpeg"
          onChange={handleImageChange}
          multiple
          value=""

        ></input>
        <div className=" flex gap-2">
          {data.product_images &&
            data.product_images.map((imageUrl, index) => (
              <img
                key={index}
                src={imageUrl}
                alt="Image"
                height={100}
                width={100}
              />
            ))}
     </div>
      <button
        className="pri-button mt-4"
        onClick={deleteimage}
      >
        delete
      </button>
      <button
        type="submit"
        className="pri-button mt-4"
      >
        Save
      </button>
    </form>
  </div>
    );
}