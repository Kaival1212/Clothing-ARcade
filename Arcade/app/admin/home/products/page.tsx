import Link from "next/link";

export default function products() {
  return (
    <div className="h-screen flex flex-col">
      <Link href={"/admin/home/products/new"}>
        <button className="bg-[#4B0082] text-white px-6 py-2 mt-10 rounded-xl mx-5">
          Add New Product
        </button>
      </Link>
    </div>
  );
}
