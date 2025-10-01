import React, { useContext, useState } from "react";
import Title from "../components/Title";
import CartTotal from "../components/CartTotal";
import { assets } from "../assets/frontend_assets/assets";
import { ShopContext } from "../context/ShopContext";

const PlaceOrder = () => {
    const {
      navigate,
      backendURL,
      cartItem,
      setCartItem,
      products,
      deliveryFee,
      getCartTotal,
    } = useContext(ShopContext);
    const [paymentMethod, setPaymentMethod] = useState("cod");
    const [formData, setFormData] = useState({
      fistName: "",
      lastName: "",
      email: "",
      street: "",
      state: "",
      zipcode: "",
      country: "",
      phone: "",
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setFormData((data) => ({ ...data, [name]: value }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    console.log("chal rha hain");
    // console.log(cartItem)
    try {
      let orderItem = [];
      for (const items in cartItem) {
        for (const size in cartItem[items]) {
          if (cartItem[items][size] > 0) {
            let itemInfo = structuredClone(
              products.find((i) => i._id == items)
            );
            // console.log(itemInfor)
            if (itemInfo) {
              itemInfo.size = items;
              itemInfo.quantity = cartItem[items][size];
            }
            console.log("it ", itemInfo);
            orderItem.push(itemInfo);
          }
        }
      }

      let orderData = {
        address: formData,
        amount: getCartTotal() + deliveryFee,
        items: orderItem,
      }


      switch(paymentMethod){
        // COD
        case 'cod':
          const response = await axios.post(backendURL + '/api/order/place',orderData,{headers:{token}})
          console.log(response)
          if(response.data.success){
            setCartItem({})
            navigate('/orders')
          }else{
            toast.error(response.data.message)
          }
          break
      }
    } catch (error) {}
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t"
    >
      {/* Left */}
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
        <div className="text-xl sm:text-2xl my-3">
          <Title t1={"DELIVERY"} t2={"INFORMARTION"} />
        </div>
        <div className="flex gap-3">
          <input
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="First Name"
            onChange={onChangeHandler}
            name="firstName"
            value={formData.firstName}
          />
          <input
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="Last Name"
            onChange={onChangeHandler}
            name="lastName"
            value={formData.lastName}
          />
        </div>
        <input
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          type="text"
          placeholder="Email"
          onChange={onChangeHandler}
          name="email"
          value={formData.email}
        />
        <input
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          type="text"
          placeholder="Street"
          onChange={onChangeHandler}
          name="street"
          value={formData.street}
        />
        <div className="flex gap-3">
          <input
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="City"
            onChange={onChangeHandler}
            name="city"
            value={formData.city}
          />
          <input
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="State"
            onChange={onChangeHandler}
            name="state"
            value={formData.state}
          />
        </div>
        <div className="flex gap-3">
          <input
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="Zip/Pin Code"
            onChange={onChangeHandler}
            name="zipcode"
            value={formData.zipcode}
          />
          <input
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="Country"
            onChange={onChangeHandler}
            name="country"
            value={formData.country}
          />
        </div>
        <input
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          type="text"
          placeholder="Phone Number"
          onChange={onChangeHandler}
          name="phone"
          value={formData.phone}
        />
      </div>

      {/* Right */}
      <div className="mt-8">
        <div className="mt-8 min-w-80">
          <CartTotal />
        </div>
        <div className="mt-12">
          <Title t1={"PAYMENT"} t2={"METHOD"} />
          <div className="flex gap-3 flex-col lg:flex-row">
            <div
              onClick={() => setPaymentMethod("razorpay")}
              className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${
                  paymentMethod == "razorpay" ? "bg-green-300" : ""
                }`}
              ></p>
              <img className="h-5 mx-4" src={assets.razorpay_logo} alt="" />
            </div>
            <div
              onClick={() => setPaymentMethod("stripe")}
              className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${
                  paymentMethod == "stripe" ? "bg-green-300" : ""
                }`}
              ></p>
              <img className="h-5 mx-4" src={assets.stripe_logo} alt="" />
            </div>
            <div
              onClick={() => setPaymentMethod("cod")}
              className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${
                  paymentMethod == "cod" ? "bg-green-300" : ""
                } `}
              ></p>
              <p className="text-gray-500 text-sm font-medium mx-4">
                CASH ON DELIVERY
              </p>
            </div>
          </div>
        </div>
        <div className="w-full text-end mt-8">
          <button
            type="submit"
            // onClick={() => navigate("/orders")}
            className="text-sm bg-black text-white px-16 py-3"
          >
            PLACE ORDER
          </button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
