import React, { useEffect } from "react";
import { useAuth } from "@/context/authContext";
import { useRouter } from "next/router";
import Loader from "@/components/Loader";
import LeftNav from "@/components/LeftNav";
import Chats from "@/components/Chats";
const Home = () => {
  const { signOut, currentUser, isLoading } = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (!isLoading && !currentUser) {
      router.push("/login");
    }
  }, [currentUser, isLoading]);
  return !currentUser ? (
    <Loader />
  ) : (
    // <div className="w-20 h-20 bg-red-400">
    //   <button onClick={signOut}>Signout</button>
    // </div>
    <div className="flex h-screen bg-c1">
      <div className="flex w-full shrink-0">
        <LeftNav />
        <div className="flex bg-c2 grow">
          <div className="w-[400px] p-5 scrollbar overflow-auto shrink-0 border-r border-white/[0.05]">
            <div className="flex flex-col h-full">
              <Chats />
            </div>
          </div>
          <div>Chat</div>
        </div>
      </div>
    </div>
  );
};

export default Home;
