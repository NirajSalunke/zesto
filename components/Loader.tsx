import { LoaderPinwheel } from "lucide-react";
import React from "react";

const Loader = () => {
  return (
    <div className="flex-center  h-screen w-full">
      <div className="scale-150">
        <LoaderPinwheel className="text-white animate-spin" />
      </div>
    </div>
  );
};

export default Loader;
