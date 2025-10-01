import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";
const Login = () => {
  const [currentState, setCurrentState] = useState("Sign Up");
  const { token, setToken, backendURL, navigate } = useContext(ShopContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      if (currentState == "Sign Up") {
        const response = await axios.post(backendURL + "/api/user/register", {
          name,
          email,
          password,
        });
        console.log(response);
        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
        } else {
          toast.error(response.data.message);
        }
      } else {
        const response = await axios.post(backendURL + "/api/user/login", {
          email,
          password,
        });
        console.log(response);
        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
        } else {
          toast.error(response.data.message);
        }
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(()=>{
    if(token){
      navigate('/')
    }
  },[token])
  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800"
    >
      <div className="mb-2 mt-10 flex items-center gap-2">
        <p className="prata-regular text-3xl">{currentState}</p>
        <hr className="h-[1.5px] w-8 bg-gray-800 border-none" />
      </div>
      {currentState == "Login" ? (
        ""
      ) : (
        <input
          type="text"
          className="w-full px-3 py-2 border border-gray-800"
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
      )}
      <input
        type="email"
        className="w-full px-3 py-2 border border-gray-800"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />
      <input
        type="password"
        className="w-full px-3 py-2 border border-gray-800"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />
      <div className="w-full flex justify-between text-sm mt-[-8px]">
        <p className="cursor-pointer">Forget your Password?</p>
        {currentState == "Login" ? (
          <p
            onClick={() => setCurrentState("Sign Up")}
            className="cursor-pointer"
          >
            Create Account
          </p>
        ) : (
          <p
            onClick={() => setCurrentState("Login")}
            className="cursor-pointer"
          >
            Login Here
          </p>
        )}
      </div>
      <button className="bg-black text-white font-light px-8 py-2 mt-4">
        {currentState == "Login" ? "Sign In" : "Sign Up"}
      </button>
    </form>
  );
};

export default Login;
