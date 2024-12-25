import React, { FC } from "react";
import { Wrapper } from "@/types/wrapper";

const MainWrappers: FC<Wrapper> = ({ children }) => {
  return (
    <div className="flex flex-col lg:flex-row h-screen">
      {children}
    </div>
  );
};

export default MainWrappers;
