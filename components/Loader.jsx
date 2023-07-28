import React from "react";
import Image from "next/image";
const Loader = () => {
  return (
    <div className="fixed top-0 left-0 flex items-center justify-center w-full h-full">
      <Image src="/loader.svg" alt=" Loading" width={100} height={100} />
    </div>
  );
};

export default Loader;
