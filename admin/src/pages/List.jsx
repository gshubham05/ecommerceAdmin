import axios from "axios";
import React, { useEffect, useState } from "react";

const List = ({token}) => {
  const [list, setList] = useState([]);

  const fetchProduct = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/api/product/list",{headers:{token}}
      );
      if (response.data.success) {
        setList(response.data.products);
      }
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  };

  const handleRemove = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this product?");
    if (!confirmDelete) return;

    try {
      const response = await axios.post("http://localhost:4000/api/product/remove", {
        id: id,
      });

      if (response.data.success) {
        setList(list.filter((item) => item._id !== id));
        alert("Product removed successfully!");
      } else {
        alert("Failed to delete: " + response.data.message);
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("Something went wrong.");
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  return (
    <>
      <p className="mb-2">All Product</p>
      <div className="flex flex-col gap-2">
        {/* Header */}
        <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center px-2 py-1 border bg-gray-100 text-sm">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b className="text-center">Action</b>
        </div>

        {/* Product Rows */}
        {list.map((item, index) => (
          <div
            className="grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center px-2 py-1 border text-sm"
            key={index}
          >
            <img className="w-12" src={item.image} alt={item.name} />
            <p>{item.name}</p>
            <p>{item.category}</p>
            <p>{item.price}</p>
            <button
              className="text-red-600 hover:underline text-center"
              onClick={() => handleRemove(item._id)}
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </>
  );
};

export default List;
