import React, { useState } from "react";
import { useAuth } from "@/context/authContext";
import Avtar from "./Avtar";
import { BiEdit } from "react-icons/bi";
import Icon from "./Icon";
import { FiPlus } from "react-icons/fi";
import { IoClose, IoLogOutOutline } from "react-icons/io5";
const LeftNav = () => {
  const { currentUser, signOut } = useAuth();
  const [editProfile, setEditProfile] = useState(true);
  const editProfileContainer = () => {
    return (
      <div className=" relative flex flex-col">
        <Icon
          size="small"
          className="absolute top-0 right-5 hover:bg-c2"
          icon={<IoClose size={20} />}
          onClick={() => setEditProfile(false)}
        />
      </div>
    );
  };
  return (
    <div
      className={`${
        editProfile ? "w-[350px]" : "w-[80px] items-center "
      } flex flex-col justify-between py-5 shrink-0 transition-all`}
    >
      {editProfile ? (
        editProfileContainer()
      ) : (
        <div
          className="relative cursor-pointer group"
          onClick={() => {
            setEditProfile(true);
          }}
        >
          <Avtar size="large" user={currentUser} />
          <div className="w-full h-full rounded-full bg-black/[0.5]  absolute top-0 left-0 justify-center items-center hidden group-hover:flex">
            <BiEdit size={24} />
          </div>
        </div>
      )}

      <div
        className={`flex  gap-5 ${
          editProfile ? "ml-5" : "flex-col items-center"
        }`}
      >
        <Icon
          size="x-large"
          className="bg-green-500 hover:bg-gray-600"
          icon={<FiPlus size={24} />}
          onClick={() => {}}
        />
        <Icon
          size="x-large"
          className=" hover:bg-c2"
          icon={<IoLogOutOutline size={24} />}
          onClick={signOut}
        />
      </div>
    </div>
  );
};

export default LeftNav;
