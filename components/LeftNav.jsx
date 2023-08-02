import React, { useState } from "react";
import { useAuth } from "@/context/authContext";
import Avtar from "./Avtar";
import { BiCheck, BiEdit } from "react-icons/bi";
import Icon from "./Icon";
import { FiPlus } from "react-icons/fi";
import { IoClose, IoLogOutOutline } from "react-icons/io5";
import { MdPhotoCamera, MdAddAPhoto, MdDeleteForever } from "react-icons/md";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { profileColors } from "@/utils/constants";
const LeftNav = () => {
  const { currentUser, signOut } = useAuth();
  const [editProfile, setEditProfile] = useState(true);
  const [nameEdited, setNameEdited] = useState(false);
  const handleUpdateProfile = (type, value) => {
    // color, name, photo, photo-remove
  };
  const onKeyDown = (e) => {
    if (e.key === "Enter" && e.keyCode === 13) {
      e.preventDefault();
    }
  };
  const onKeyUp = (e) => {
    if (e.target.innerText.trim() !== currentUser.displayName) {
      // name is edited
      setNameEdited(true);
    } else {
      // name is not edited
      setNameEdited(false);
    }
  };
  const editProfileContainer = () => {
    return (
      <div className="relative flex flex-col items-center ">
        <Icon
          size="small"
          className="absolute top-0 right-5 hover:bg-c2"
          icon={<IoClose size={20} />}
          onClick={() => setEditProfile(false)}
        />
        <div className="relative cursor-pointer group">
          <Avtar size="xx-large" user={currentUser} />
          <div className="w-full h-full rounded-full bg-black/[0.5] absolute top-0 justify-center items-center hidden group-hover:flex">
            <label htmlFor="fileUpload">
              {currentUser.photoURL ? (
                <MdPhotoCamera size={34} />
              ) : (
                <MdAddAPhoto size={34} />
              )}
            </label>
            <input
              type="file"
              id="fileUpload"
              onChange={(e) => {}}
              style={{ display: "none" }}
            />
          </div>
          {currentUser.photoURL && (
            <div className="absolute bottom-0 right-0 flex items-center justify-center w-6 h-6 bg-red-500 rounded-full">
              <MdDeleteForever size={14} />
            </div>
          )}
        </div>
        <div className="flex flex-col items-center mt-5 l">
          <div className="flex flex-col items-center gap-2">
            {!nameEdited && <BiEdit className="text-c3" />}
            {nameEdited && (
              <BsFillCheckCircleFill
                className="cursor-pointer text-c4"
                onClick={() => {
                  //name edit logic
                }}
              />
            )}
            <div
              contentEditable
              className="text-center bg-transparent border-none outline-none"
              id="displayNameEdit"
              onKeyUp={onKeyUp}
              onKeyDown={onKeyDown}
            >
              {currentUser.displayName}
            </div>
            <span className="text-c3 text sm">{currentUser.email}</span>
          </div>
        </div>
        <div className="grid grid-cols-5 gap-4 mt-5">
          {profileColors.map((color, index) => (
            <span
              key={index}
              className="flex items-center justify-center w-10 h-10 transition-transform rounded-full cursor-pointer hover:scale-125"
              style={{ backgroundColor: color }}
            >
              {color === currentUser.color && <BiCheck size={24} />}
            </span>
          ))}
        </div>
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
