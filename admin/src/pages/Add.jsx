import React, { useState } from "react";
import { assets } from "../assets/admin_assets/assets";
import axios from "axios";
import { toast } from "react-toastify";

const Add = ({ token }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Men");
  const [subcategory, setSubcategory] = useState("Topwear");
  const [price, setPrice] = useState("");
  const [bestseller, setBestseller] = useState(false);
  const [sizes, setSizes] = useState([]);
  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);

  const handler = async (e) => {
    e.preventDefault();

    try {
      console.log("Add : ", token);
      const formData = new FormData();
      formData.append("bestseller", bestseller);
      formData.append("name", name);
      formData.append("description", description);
      formData.append("category", category);
      formData.append("subcategory", subcategory);
      formData.append("price", price);
      // formData.append("bestseller", bestseller);
      formData.append("sizes", JSON.stringify(sizes));
      image1 && formData.append("image1", image1);
      image2 && formData.append("image2", image2);
      image3 && formData.append("image3", image3);
      image4 && formData.append("image4", image4);
      const response = await axios.post(
        "http://localhost:4000/api/product/add",
        formData,
        { headers: { token } }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        setName(" ");
        setDescription(" ");
        setImage1(false);
        setImage2(false);
        setImage3(false);
        setImage4(false);
        setPrice("");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <form onSubmit={handler}>
      <div className="flex flex-col items-start w-full gap-3">
        <p className="mb-2">Upload Images</p>
        <div>
          <div className=" flex gap-2">
            <label htmlFor="image1">
              <img
                className="w-20"
                src={image1 ? URL.createObjectURL(image1) : assets.upload_area}
                alt=""
              />
              <input
                onChange={(e) => setImage1(e.target.files[0])}
                type="file"
                id="image1"
                hidden
              />
            </label>
            <label htmlFor="image2">
              <img
                className="w-20"
                src={image2 ? URL.createObjectURL(image2) : assets.upload_area}
                alt=""
              />
              <input
                onChange={(e) => setImage2(e.target.files[0])}
                type="file"
                id="image2"
                hidden
              />
            </label>
            <label htmlFor="image3">
              <img
                className="w-20"
                src={image3 ? URL.createObjectURL(image3) : assets.upload_area}
                alt=""
              />
              <input
                onChange={(e) => setImage3(e.target.files[0])}
                type="file"
                id="image3"
                hidden
              />
            </label>
            <label htmlFor="image4">
              <img
                className="w-20"
                src={image4 ? URL.createObjectURL(image4) : assets.upload_area}
                alt=""
              />
              <input
                onChange={(e) => setImage4(e.target.files[0])}
                type="file"
                id="image4"
                hidden
              />
            </label>
          </div>
        </div>
      </div>
      <div className="w-full">
        <p className="mb-2">Product Name</p>
        <input
          onChange={(e) => setName(e.target.value)}
          type="text"
          className="w-full max-w-[500px] px-3 py-2"
          placeholder="Type here"
          required
        />
      </div>
      <div className="w-full">
        <p className="mb-2">Product Description</p>
        <textarea
          onChange={(e) => setDescription(e.target.value)}
          className="w-full max-w-[500px] px-3 py-2"
          placeholder="Type here"
          rows={3}
          required
        />
      </div>

      <div className="flex flex-col sm:flex-row gap-2 w-full sm:gap-8">
        <div className="">
          <p className="mb-2">Product Category</p>
          <select
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-3 py-2"
            name=""
            id=""
          >
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
          </select>
        </div>

        <div className="">
          <p className="mb-2">Product Sub-Category</p>
          <select
            onChange={(e) => setSubcategory(e.target.value)}
            className="w-full px-3 py-2"
            name=""
            id=""
          >
            <option value="Topwear">Topwear</option>
            <option value="Bottomwear">Bottomwear</option>
            <option value="Winterwear">Winterwear</option>
          </select>
        </div>

        <div className="">
          <p className="mb-2">Product Price</p>
          <input
            onChange={(e) => setPrice(e.target.value)}
            className="w-full px-3 py-2 max-w-[108px]"
            type="Number"
            placeholder="20"
            required
          />
        </div>
      </div>

      <div className="">
        <p className="mb-2">Product Sizes</p>
        <div className="flex gap-3">
          <div
            className=""
            onClick={() =>
              setSizes((pre) =>
                pre.includes("S") ? pre.filter((i) => i != "S") : [...pre, "S"]
              )
            }
          >
            <p
              className={`${
                sizes.includes("S") ? "bg-pink-300" : "bg-slate-200"
              } px-3 py-1 cursor-pointer`}
            >
              S
            </p>
          </div>
          <div
            className=""
            onClick={() =>
              setSizes((pre) =>
                pre.includes("M") ? pre.filter((i) => i != "M") : [...pre, "M"]
              )
            }
          >
            <p
              className={`${
                sizes.includes("M") ? "bg-pink-300" : "bg-slate-200"
              } px-3 py-1 cursor-pointer`}
            >
              M
            </p>
          </div>
          <div
            className=""
            onClick={() =>
              setSizes((pre) =>
                pre.includes("L") ? pre.filter((i) => i != "L") : [...pre, "L"]
              )
            }
          >
            <p
              className={`${
                sizes.includes("L") ? "bg-pink-300" : "bg-slate-200"
              } px-3 py-1 cursor-pointer`}
            >
              L
            </p>
          </div>
          <div
            className=""
            onClick={() =>
              setSizes((pre) =>
                pre.includes("XL")
                  ? pre.filter((i) => i != "XL")
                  : [...pre, "XL"]
              )
            }
          >
            <p
              className={`${
                sizes.includes("XL") ? "bg-pink-300" : "bg-slate-200"
              } px-3 py-1 cursor-pointer`}
            >
              XL
            </p>
          </div>
          <div
            className=""
            onClick={() =>
              setSizes((pre) =>
                pre.includes("XXL")
                  ? pre.filter((i) => i != "XXL")
                  : [...pre, "XXL"]
              )
            }
          >
            <p
              className={`${
                sizes.includes("XXL") ? "bg-pink-300" : "bg-slate-200"
              } px-3 py-1 cursor-pointer`}
            >
              XXL
            </p>
          </div>
        </div>
      </div>

      <div className="flex gap-2 mt-2">
        <input
          onChange={() => setBestseller((prev) => (prev = !prev))}
          checked={bestseller}
          type="checkbox"
          id="bestseller"
        />
        <label className="cursor-pointer" htmlFor="bestseller">
          Add to bestseller
        </label>
      </div>
      <button className="w-28 py-3 mt-4 bg-black text-white">Add </button>
    </form>
  );
};

export default Add;
