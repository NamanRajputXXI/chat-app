import React, { useEffect, useRef, useState } from "react";
import { useChatContext } from "@/context/chatContext";
import { Timestamp, collection, doc, onSnapshot } from "firebase/firestore";
import { db } from "@/firebase/firebase";
import { RiSearch2Line } from "react-icons/ri";
import Avtar from "./Avtar";
import { useAuth } from "@/context/authContext";
import { formatDate } from "@/utils/helpers";
const Chats = () => {
  const {
    users,
    setUsers,
    chats,
    setChats,
    selectedChats,
    setSelectedChats,
    dispatch,
  } = useChatContext();
  const [search, setSearch] = useState("");
  const { currentUser } = useAuth();
  const isBlockExecutedRef = useRef(false);
  const isUsersFetchedRef = useRef(false);
  useEffect(() => {
    onSnapshot(collection(db, "users"), (snapshot) => {
      const updatedUsers = {};
      snapshot.forEach((doc) => {
        updatedUsers[doc.id] = doc.data();
        console.log(doc.data());
      });
      setUsers(updatedUsers);
      if (!isBlockExecutedRef.current) {
        isUsersFetchedRef.current = true;
      }
    });
  }, []);
  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        if (doc.exists()) {
          const data = doc.data();
          setChats(data);
          if (
            !isBlockExecutedRef.current &&
            isUsersFetchedRef.current &&
            users
          ) {
            const firstChat = Object.values(data).sort(
              (a, b) => b.date - a.date
            )[0];
            if (firstChat) {
              const user = users[firstChat?.userInfo?.uid];
              handleSelect(user);
            }
            isBlockExecutedRef.current = true;
          }
        }
      });
    };
    currentUser.uid && getChats();
  }, [isBlockExecutedRef, users]);
  const filteredChats = Object.entries(chats || {})
    .filter(
      ([, chat]) =>
        chat?.userInfo?.displayName
          .toLowerCase()
          .includes(search.toLocaleLowerCase()) ||
        chat?.lastMessage?.text
          .toLowerCase()
          .includes(search.toLocaleLowerCase())
    )
    .sort((a, b) => b[1].date - a[1].date);
  console.log(filteredChats);
  const handleSelect = (user, selectedChatId) => {
    setSelectedChats(user);
    dispatch({ type: "CHANGE_USER", payload: user });
  };
  return (
    <div className="flex flex-col h-full">
      <div className="sticky z-20 flex justify-center w-full py-5 shrink-0 -top-5 bg-c2">
        <RiSearch2Line className="absolute top-9 left-12 text-c3" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search username..."
          className="w-[300px] h-12 rounded-xl bg-c1/[0.5] pl-11 pr-5 placeholder:text-c3 outline-none text-base"
        />
      </div>
      <ul className="flex flex-col w-full my-5 gap-[2px]">
        {Object.keys(users || {}).length > 0 &&
          filteredChats?.map((chat, key) => {
            const timestamp = new Timestamp(
              chat[1].date.seconds,
              chat[1].date.nanoseconds
            );
            const date = timestamp.toDate();
            console.log(date);
            const user = users[chat[1].userInfo.uid];
            return (
              <li
                key={chat[0]}
                onClick={() => handleSelect(user, chat[0])}
                className={` h-[90px] flex items-center gap-4 rounded-3xl hover:bg-c1 p-4 cursor-pointer ${
                  selectedChats?.uid === user.uid ? " bg-c1" : ""
                } `}
              >
                <Avtar size="x-large" user={user} />
                <div className="relative flex flex-col grow">
                  <span className="flex items-center justify-between text-base text-white">
                    <div className="font-medium">{user?.displayName}</div>
                    <div className="text-xs text-c3">{formatDate(date)}</div>
                  </span>
                  <p className="text-sm text-c3 line-clamp-1">
                    {chat[1]?.lastMessage?.text ||
                      (chat[1]?.lastMessage?.img && "image") ||
                      "Send first message"}
                  </p>
                  <span className="absolute right-0 flex items-center justify-center h-5 text-sm bg-red-500 rounded-full top-7 min-w-[20px]">
                    5
                  </span>
                </div>
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default Chats;
