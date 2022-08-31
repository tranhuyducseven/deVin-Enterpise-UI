import React from "react";
import { Link } from "react-router-dom";
import { Image } from "semantic-ui-react";
import { MainLayout } from "../../layouts/MainLayout";
import { SubstrateContextProvider } from "../../substrate-lib";
import AnimationBox from "../components/AnimationBox";

const HomeScreen = () => {
  return (
    <SubstrateContextProvider>
      <MainLayout>
        <div className="bg-black h-screen flex justify-center items-center">
          <Link
            to="/app"
            className="bg-[#ffdd50] button-connect w-[40rem] hover:scale-105 active:scale-90 duration-300 border-8 border-white p-8 rounded-lg animate-pulse cursor-pointer z-10"
            style={{ animationDuration: "4s" }}
          >
            <Image src={`${process.env.PUBLIC_URL}/assets/deVin.png`}></Image>
            <div className="flex flex-row items-center justify-center px-4 py-1  rounded-lg mt-5">
              <span style={{ letterSpacing: "6px" }} className="font-thin text-black text-xl pr-2">
                CONNECT YOUR ORGANIZATION
              </span>
            </div>
          </Link>
          <AnimationBox />
        </div>
      </MainLayout>
    </SubstrateContextProvider>
  );
};

export default HomeScreen;
