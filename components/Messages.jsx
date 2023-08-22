import { useChatContext } from "@/context/chatContext";
import { db } from "@/firebase/firebase";
import { doc, onSnapshot } from "firebase/firestore";
import React, { useEffect, useRef, useState } from "react";

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const { data } = useChatContext();
  const ref = useRef();
  useEffect(() => {
    const unsub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
      if (doc.exists()) {
        setMessages(doc.data().messages);
      }
    });
    return () => unsub();
  }, [data.chatId]);
  return (
    <div className="flex flex-col p-5 overflow-auto grow scrollbar" ref={ref}>
      Messages
    </div>
  );
};

export default Messages;
