"use client"
export default async function Page({ params }: { params: { id: string } }) {
  const id = params;

  const res=await fetch("/api/Backend/Mongodb", {
    method: "PUT",
    body: JSON.stringify(id.id),
  });
  const data = await res.json();

  const p_name=data.product_name
  const p_dec = data.product_dec
  const p_price = data.product_price
  const p_cat = data.product_category
  const imageUrls = [data.product_images]

  async function return_data(event: React.FormEvent<HTMLFormElement>) {

  }
  
function handleImageChange(event: React.ChangeEvent<HTMLInputElement>): void {
        throw new Error("Function not implemented.");
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

        />
        <h1>Description:</h1>
        <input
          type="text"
          placeholder="description"
          className="pri-input"
          value={p_dec}

        />
        <h1>Price in USD(without TAX):</h1>
        <input
          type="number"
          placeholder="price"
          className="pri-input"
          value={p_price}
          inputMode="numeric"
        />
        <h1>Category:</h1>
        <select
          className="mt-1"
          value={p_cat}

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
          className="pri-button mt-4"
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
  )
}
