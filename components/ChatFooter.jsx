import React, { useState } from "react";
import Icon from "./Icon";
import { CgAttachment } from "react-icons/cg";
import { HiOutlineEmojiHappy } from "react-icons/hi";
import Composebar from "./Composebar";
import EmojiPicker from "emoji-picker-react";
import ClickAwayListener from "react-click-away-listener";
import { useChatContext } from "@/context/chatContext";
import { IoClose } from "react-icons/io5";
import { MdDeleteForever } from "react-icons/md";
const ChatFooter = () => {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const {
    isTyping,
    setAttachment,
    editMessage,
    setEditMessage,
    inputText,
    attachmentPreview,
    setInputText,
    setAttachmentPreview,
  } = useChatContext();
  const onFileChange = (e) => {
    const file = e.target.files[0];
    setAttachment(file);
    if (file) {
      const blobUrl = URL.createObjectURL(file);
      setAttachmentPreview(blobUrl);
    }
  };
  const onEmojiClick = (emojiData, event) => {
    console.log(emojiData, event);
    let text = inputText;
    setInputText((text += emojiData.emoji));
  };
  return (
    <div className="flex items-center bg-c1/[0.5] p-2 rounded-xl relative">
      {attachmentPreview && (
        <div className="absolute w-[100px] h-[100px] bottom-16 left-0 bg-c1 p-2 rounded-md">
          <img src={attachmentPreview} />
          <div
            className="absolute flex items-center justify-center w-6 h-6 bg-red-500 rounded-full cursor-pointer -right-2 -top-2"
            onClick={() => {
              setAttachment(null);
              setAttachmentPreview(null);
            }}
          >
            <MdDeleteForever size={14} />
          </div>
        </div>
      )}
      <div className="shrink-0">
        <input
          type="file"
          id="fileUploader"
          className="hidden"
          onChange={onFileChange}
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
      {isTyping && (
        <div className="absolute w-full h-6 -top-6 left-4 bg-c2">
          <div className="flex h-full gap-2 text-sm text-white opacity-50">
            {`
          user is typing
          `}
            <img src="/typing.svg" />
          </div>
        </div>
      )}
      {/* {editMessage && ( */}
      <div
        className="absolute flex items-center gap-2 px-4 py-2 pr-2 text-sm font-semibold -translate-x-1/2 rounded-full shadow-lg cursor-pointer -top-12 left-1/2 bg-c4"
        onClick={() => setEditMessage(null)}
      >
        <span>Cancel Edit</span>
        <IoClose size={20} className="text-white" />
      </div>
      {/* )} */}
      <Composebar />
    </div>
  );
};

export default ChatFooter;
