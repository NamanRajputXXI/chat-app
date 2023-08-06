import React from "react";
import Icon from "../Icon";
import { IoClose } from "react-icons/io5";

const PopupWrapper = (props) => {
  return (
    <div className="fixed top-0 left-0 z-20 flex items-center justify-center w-full h-full ">
      <div
        className="absolute w-full h-full glass-effect"
        onClick={props.onHide}
      ></div>
      <div className="flex flex-col w-[500px] max-h-[80%] min-h-[600px] bg-c2 relative z-10 rounded-3xl">
        <div className="flex items-center justify-between p-6 shrink-0">
          <div className="text-lg font-semibold">{props.title || ""}</div>
          <Icon
            size="small"
            icon={<IoClose size={20} />}
            onClick={props.onHide}
          />
        </div>
        <div className="flex flex-col p-6 pt-0 grow">{props.children}</div>
      </div>
    </div>
  );
};

export default PopupWrapper;
