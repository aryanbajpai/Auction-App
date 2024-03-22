import React from "react";
import { useState } from "react";
import admindata from "../Admin.json";
import { useNavigate } from "react-router-dom";

export const AdminForm = () => {
  const [fromData, setFormData] = useState({ username: "", password: "" });
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...fromData,
      [name]: value
    });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const { username, password } = fromData;
    const admin = admindata.admin.find(
      (admin) => admin.username === username && admin.password === password
    );

    if (admin) {
      alert("Login Successful");
      navigate('/register')
    } else {
      setErrorMsg("Invalid username or password");
    }
  };

  return (
    <div className="">
      <form
        onSubmit={handleLogin}
        className="m-auto border w-[350px] my-[19.5%] lg:my-[10.5%] px-6 py-4"
      >
        <h1 className="text-[32px] font-semibold text-center mb-3">ADMIN LOGIN</h1>
        <div className="w-full py-2">
          <label className="text-lg">Username: </label>
          <input
            className="w-full text-lg py-1 px-3"
            type="text"
            name="username"
            value={fromData.username}
            onChange={handleChange}
            placeholder="Enter username..."
          />
        </div>
        <div className="w-full py-2">
          <label className="text-lg">Password: </label>
          <input
            className="w-full text-lg py-1 px-3"
            type="password"
            name="password"
            value={fromData.password}
            onChange={handleChange}
            placeholder="Enter username..."
          />
        </div>
        <button
          type="submit"
          className="my-2 border mx-[33%] px-2 py-2 w-[100px]"
        >
          LOG IN
        </button>
        {errorMsg && <div className="text-right mt-1 text-red-500">{errorMsg}</div>}
      </form>
      
    </div>
  );
};
