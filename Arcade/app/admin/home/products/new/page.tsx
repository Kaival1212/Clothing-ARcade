// Import required modules and functions
"use client";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  listAll,
  deleteObject,
} from "firebase/storage";
import { initFirebase } from "../../../../../comps/firebase_init_admin";

// Define the functional component
export default function products() {
  // Set initial state values using the useState hook
  const [uuid, setUuid] = useState(uuidv4()); // generate a unique id for each product
  initFirebase(); // initialize Firebase app

  const [form_data, set_form_data] = useState({
    product_id:"",
    product_name: "",
    product_des: "",
    product_price: 0,
    product_category: "",
    product_images: [] as string[],
  }); // form data that will be sent to the server

  const [p_name, set_p_name] = useState("");
  const [p_dec, set_p_dec] = useState("");
  const [p_price, set_p_price] = useState(0);
  const [p_cat, set_p_cat] = useState("");
  const [imageUrls, setImageUrls] = useState<string[]>([]);

  const set_ev_null=()=>{
    set_p_name("");
    set_p_dec("");
    set_p_price(0);
    set_p_cat("");
    setImageUrls([])
  }
  // useEffect hook is used to make an API call to the server and send the form data
  useEffect(() => {
    const sendData = async () => {
      const response = await fetch("/api/Backend/Mongodb", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form_data),
      });
      const res = await response.status
      res === 200 ? set_ev_null() : console.error(await response.json());
    };

    sendData(); // call the API function
  }, [form_data]); // watch the form_data state for changes and call the API function if any changes occur

  // Function to fetch the uploaded images from Firebase storage
  const fetchImages = async () => {
    const storage = getStorage();
    const imagesRef = ref(storage, `temp/temp_images-${uuid}/`);
    const listResult = await listAll(imagesRef);

    const urlPromises = listResult.items.map(async (itemRef) => {
      const url = await getDownloadURL(itemRef);
      return url;
    });

    const urls = await Promise.all(urlPromises);
    setImageUrls(urls);
  };

  // Function to handle the image upload event
  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
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
        `temp/temp_images-${uuid}/${(image as File).name}`
      );
      return uploadBytesResumable(storageRef, image as File);
    });

    // Wait for all the upload tasks to complete before calling fetchImages
    await Promise.all(uploadPromises);

    fetchImages();
  };

  // Function to delete all uploaded images from Firebase storage
  const deleteimage = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const storage = getStorage();
    const imagesRef = ref(storage, `temp/temp_images-${uuid}/`);
    const listResult = await listAll(imagesRef);
    const deletePromises = listResult.items.map((itemRef)=>
      deleteObject(itemRef)
    );
    await Promise.all(deletePromises);
    setImageUrls([]);
  };

  async function return_data(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    set_form_data((prevState) => ({
      ...prevState,
      product_id: uuid,
      product_name: p_name,
      product_des: p_dec,
      product_price: p_price,
      product_category: p_cat,
      product_images: imageUrls,
    }));
  }

  return (
    <div className="h-screen flex flex-col mt-28 ml-8">
      <form className="h-screen flex flex-col w-2/3 " onSubmit={return_data}>
        <h1>Product Name:</h1>
        <input
          type="text"
          placeholder="productName"
          className="pri-input"
          value={p_name}
          onChange={(e) => {
            set_p_name(e.target.value);
          }}
        />
        <h1>Description:</h1>
        <input
          type="text"
          placeholder="description"
          className="pri-input"
          value={p_dec}
          onChange={(e) => {
            set_p_dec(e.target.value);
          }}
        />
        <h1>Price in USD(without TAX):</h1>
        <input
          type="number"
          placeholder="price"
          className="pri-input"
          value={p_price}
          onChange={(e) => {
            set_p_price(Number(e.target.value));
          }}
          inputMode="numeric"
        />
        <h1>Category:</h1>
        <select
          className="mt-1"
          value={p_cat}
          onChange={(e) => {
            set_p_cat(e.target.value);
          }}
        >
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
          {imageUrls &&
            imageUrls.map((imageUrl, index) => (
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
          className="mt-4 bg-pri text-white w-24 rounded-lg"
          onClick={deleteimage}
        >
          delete
        </button>
        <button
          type="submit"
          className="mt-4 bg-pri text-white w-24 rounded-lg"
        >
          Save
        </button>
      </form>
    </div>
  );
}
