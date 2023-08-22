import React from "react";
import ClickAwayListener from "react-click-away-listener";
const ChatMenu = ({ setShowMenu, showMenu }) => {
  const handleClickAway = () => {
    setShowMenu(false);
  };
  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <div className="w-[200px] absolute top-[70px] right-5 bg-c0 z-10 rounded-md overflow-hidden]">
        <ul className="flex flex-col py-2">
          <li className="flex items-center px-5 py-3 cursor-pointer hover:bg-black">
            Delete Chat
          </li>
          <li className="flex items-center px-5 py-3 cursor-pointer hover:bg-black">
            Block User
          </li>
        </ul>
      </div>
    </ClickAwayListener>
  );
};

export default ChatMenu;
