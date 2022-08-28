import React from "react";
import { Link } from 'react-router-dom';
import { Image } from 'semantic-ui-react';

const SocialMediaGroupComponent = () => {
    return (
      <div className="justify-around flex  p-1 w-32 lg:w-3/4">
        <a
          className="info-icon p-1 lg:m-1"
          href="https://www.linkedin.com/in/tranhuyducseven/"
        >
          <svg
            className="w-5 h-5  text-white fill-current"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="2 2 16 16"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
              clipRule="evenodd"
            />
          </svg>
        </a>
        <a
          className="facebook-icon p-1 lg:m-1"
          href="https://www.facebook.com/TranCongDuyNguyen/"
        >
          <svg
            className="w-5 h-5  text-white fill-current"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
          </svg>
        </a>
        <a className="github-icon p-1 lg:m-1" href="https://github.com/de-v-in">
          <svg
            className="w-5 h-5  text-white fill-current"
            viewBox="0 0 16 16"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path>
          </svg>
        </a>
      </div>
    );
};


export const ContactInfo = () => {
  return (
    <div>
      <footer
        id="footer"
        className="p-2 lg:p-5 xl:grid xl:grid-cols-4 items-center bg-black"
      >
        <div className="mb-12 xl:m-0 p-8 h-full  col-span-3 flex items-center relative">
          <div className="text-white xl:border-r-2 xl:border-white w-full">
            <h2 className="font-bold text-4xl md:text-5xl xl:text-3xl">FAQ</h2>
            <h3 className="text-[#BEBEBE] mt-5 text-lg md:text-2xl xl:text-xl">
              Who are we?
            </h3>
            <p className="mt-3 pb-4 text-lg">
              We are Vietnamese developers who bring global criteria into your
              products with the best price.
            </p>
            <h3 className="text-[#BEBEBE] mt-5 text-lg md:text-2xl xl:text-xl">
              What is our technical skills ?
            </h3>
            <p className="mt-3 pb-4 text-lg">
              We do full-stack development, establish Devops workflows, build
              core crypto functions.
            </p>
          </div>
        </div>
        <div className="flex items-center flex-col">
          <Link to="/">
            <div className="inline-flex items-center justify-center p-2">
              <Image  src={`${process.env.PUBLIC_URL}/assets/deVin-darkMode.png`} alt="deVin Logo" height="53" width="200" />
            </div>
          </Link>
          <span className="p-1 text-[#BEBEBE] text-xxs lg:text-xs text-thin  text-center">
            @Copyright by DEVIN 2022
          </span>
          <div className="p-1 my-3 flex items-center   justify-center lg:h-fit  lg:my-1">
            <SocialMediaGroupComponent />
          </div>
        </div>
      </footer>
    </div>
  )
}
