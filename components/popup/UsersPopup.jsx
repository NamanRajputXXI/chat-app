import React from "react";
import PopupWrapper from "./PopupWrapper";
import { useAuth } from "@/context/authContext";
import { useChatContext } from "@/context/chatContext";
import Avtar from "../Avtar";
const UsersPopup = (props) => {
  const { currentUser } = useAuth();
  const { users } = useChatContext();
  return (
    <PopupWrapper {...props}>
      <div className="relative flex flex-col gap-2 mt-5 overflow-auto grow scrollbar">
        <div className="absolute w-full">
          {users &&
            Object.values(users).map((user) => (
              <div className="flex items-center gap-4 px-4 py-2 cursor-pointer rounded-xl hover:bg-c5">
                <Avtar size="large" user={user} />
                <div className="flex flex-col gap-1 grow">
                  <span className="flex items-center justify-between text-base text-white">
                    <div className="font-medium">{user.displayName}</div>
                  </span>
                  <p className="text-sm text-c3">{user.email}</p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </PopupWrapper>
  );
};

export default UsersPopup;
