import React, { useState } from "react";
import Icon from "./Icon";
import { CgAttachment } from "react-icons/cg";
import { HiOutlineEmojiHappy } from "react-icons/hi";
import Composebar from "./Composebar";
import EmojiPicker from "emoji-picker-react";
import ClickAwayListener from "react-click-away-listener";
const ChatFooter = () => {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const onEmojiClick = () => {};
  return (
    <div className="flex items-center bg-c1/[0.5] p-2 rounded-xl relative">
      <div className="shrink-0">
        <input
          type="file"
          id="fileUploader"
          className="hidden"
          onChange={() => {}}
        />
        <label htmlFor="fileUploader">
          <Icon
            size="large"
            icon={<CgAttachment className="text-c3" size={20} />}
          />
        </label>
      </div>
      <div className="relative shrink-0">
        <Icon
          size="large"
          className={``}
          icon={<HiOutlineEmojiHappy size={24} className="text-c3" />}
          onClick={() => {
            setShowEmojiPicker(true);
          }}
        />
        {showEmojiPicker && (
          <ClickAwayListener
            onClickAway={() => {
              setShowEmojiPicker(false);
            }}
          >
            <div className="absolute left-0 shadow-lg bottom-12">
              <EmojiPicker
                emojiStyle="native"
                theme="light"
                onEmojiClick={onEmojiClick}
                autoFocusSearch={false}
              />
            </div>
          </ClickAwayListener>
        )}
      </div>
      <Composebar />
    </div>
  );
};

export default ChatFooter;
