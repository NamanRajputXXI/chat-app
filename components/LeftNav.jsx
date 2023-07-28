import React from "react";
import { useAuth } from "@/context/authContext";
import Avtar from "./Avtar";
import { BiEdit } from "react-icons/bi";
const LeftNav = () => {
  const { currentUser } = useAuth();
  return (
    <div className="w-[80px] items-center flex flex-col justify-between py-5 shrink-0 transition-all">
      <div className="relative cursor-pointer group"></div>
      <Avtar size="large" user={currentUser} />
      <div className="w-full h-full rounded-full bg-black/[0.5]  absolute top-0 left-0 justify-center items-center hidden group-hover:flex"></div>
      <BiEdit size={24} />
    </div>
  );
};

export default LeftNav;
