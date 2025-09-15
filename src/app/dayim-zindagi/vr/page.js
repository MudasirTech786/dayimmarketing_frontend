"use client";
import React, { useState } from "react";

import Link from "next/link";
import VRSlider1 from "../components/sliders/vr/VRSlider1";
import NavBar from "../components/Navbar";

function VR() {
  const [showVrModal, setShowVrModal] = useState(false);

  return (
    <div className="flex items-center justify-center">
      <NavBar videoBg={true} />

      <div className="h-screen w-full relative overflow-hidden ">
        <div className="absolute top-0 h-full w-full bg-[rgba(0,0,0,0.5)]"></div>
        <video
          src="/videos/dz/zindagi1.mp4"
          autoPlay
          loop
          muted
          className="h-full w-full object-cover hidden
                          lg:block"
        />

        <div className="absolute h-full w-full top-0 flex items-center justify-center text-white text-6xl z-10">
          <button
            onClick={() => {
              setShowVrModal(true);
            }}
            className={`flex items-center justify-center bg-second py-5 w-[250px] gap-5 hover:scale-110 transition ${
              showVrModal && "hidden"
            }`}
          >
            <img
              src="/images/dsa/vr-icon.svg"
              className="object-contain h-[20px] "
            />
            <span className={`text-white text-lg font-bold `}>
              Explore in 3D
            </span>
          </button>
        </div>
      </div>


      {/* Vr Modal/slider (will be visibile on button click) */}
      <div
        className={`z-10 absolute top-0 h-screen  w-[95%] ${
          showVrModal ? "flex" : "hidden"
        } transition flex-col items-center justify-center  
                        lg:w-[70%]`}
      >
        <h3
          className="text-white  text-3xl font-bold w-[80%] text-center  mb-10
                            md:mt-28 lg:w-[40%]"
        >
          Explore one of the model apartments made by us
        </h3>
        <VRSlider1 />
      </div>
    </div>
  );
}

export default VR;
