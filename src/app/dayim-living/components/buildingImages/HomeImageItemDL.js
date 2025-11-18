"use client";

import React, { useEffect, useState } from "react";
import { getAvailableResidencesByFloor } from "../../residences/Data";
import useSWR from "swr";
import { GET_ALL_PROPERTIES_API } from "@/lib/apiEndPoints";
const fetcher = (...args) => fetch(...args).then((res) => res.json());

const HomeImageItemDL = () => {
  const { data, error, isLoading } = useSWR(GET_ALL_PROPERTIES_API, fetcher);
  if (error) {
    return <h2>failed to load</h2>;
  }

  const residences = data?.filter((item) => item.name === "Dayim Living") || [];

  function getAvailableResidencesByFloor(floor) {
    return residences.filter(
      (item) => item.floor === floor && item.sold == "No"
    ).length;
  }

  const groundFloorAvailable = residences.filter(
    (item) => item.floor == "Ground" && item.sold == "No"
  ).length;
  const firstFloorAvailable = residences.filter(
    (item) => item.floor == "1st" && item.sold == "No"
  ).length;
  const secondFloorAvailable = residences.filter(
    (item) => item.floor == "2nd" && item.sold == "No"
  ).length;
  const thirdFloorAvailable = residences.filter(
    (item) => item.floor == "3rd" && item.sold == "No"
  ).length;
  const fourthFloorAvailable = residences.filter(
    (item) => item.floor == "4th" && item.sold == "No"
  ).length;
  const fifthFloorAvailable = residences.filter(
    (item) => item.floor == "5th" && item.sold == "No"
  ).length;

  const handleMouseOver = (id) => {
    const highlightArea = document.getElementById(`highlight-${id}`);
    highlightArea.classList.remove("hidden");
    highlightArea.classList.add("flex");
  };

  const handleMouseOut = (id) => {
    const highlightArea = document.getElementById(`highlight-${id}`);

    highlightArea.classList.add("hidden");
    highlightArea.classList.remove("flex");
  };

  return (
    <div className="relative">
      <img
        src="/images/dayim_living/img3-imageItem.jpg"
        alt="Your Image"
        useMap="#your-image-map"
        className=" "
      />

      <map name="your-image-map">

        <area
          target=""
          alt=""
          title=""
          coords="214,100,461,200"
          shape="rect"
          href="/dayim-living/residences"
          onMouseEnter={() => handleMouseOver("area1")}
          onMouseLeave={() => handleMouseOut("area1")}
        />
        <area
          target=""
          alt=""
          title=""
          coords="214,200,461,310"
          shape="rect"
          href="/dayim-living/residences"
          onMouseEnter={() => handleMouseOver("area2")}
          onMouseLeave={() => handleMouseOut("area2")}
        />
        <area
          target=""
          alt=""
          title=""
          coords="214,200,461,420"
          shape="rect"
          href="/dayim-living/residences"
          onMouseEnter={() => handleMouseOver("area3")}
          onMouseLeave={() => handleMouseOut("area3")}
        />
        <area
          target=""
          alt=""
          title=""
          coords="214,200,461,530"
          shape="rect"
          href="/dayim-living/residences"
          onMouseEnter={() => handleMouseOver("area4")}
          onMouseLeave={() => handleMouseOut("area4")}
        />
        <area
          target=""
          alt=""
          title=""
          coords="214,200,461,630"
          shape="rect"
          href="/dayim-living/residences"
          onMouseEnter={() => handleMouseOver("area5")}
          onMouseLeave={() => handleMouseOut("area5")}
        />

        <area
          target=""
          alt=""
          title=""
          coords="214,200,461,800"
          shape="rect"
          href="/dayim-living/residences"
          onMouseEnter={() => handleMouseOver("area6")}
          onMouseLeave={() => handleMouseOut("area6")}
        />
      </map>
      <div className="hidden lg:block">
        <div
          id="highlight-area1"
          className="absolute hidden bg-third w-[200px] h-[60px] top-[15%] right-[0%] rounded-2xl  items-center justify-center text-white font-bold text-xl "
        >
          Available - {fifthFloorAvailable}
        </div>
        <div
          id="highlight-area2"
          className="absolute hidden bg-third w-[200px] h-[60px] top-[30%] right-[0%] rounded-2xl  items-center justify-center text-white font-bold text-xl "
        >
          Available - {fourthFloorAvailable}
        </div>
        <div
          id="highlight-area3"
          className="absolute hidden bg-third w-[200px] h-[60px] top-[45%] right-[0%] rounded-2xl  items-center justify-center text-white font-bold text-xl "
        >
          Available - {thirdFloorAvailable}
        </div>
        <div
          id="highlight-area4"
          className="absolute hidden bg-third w-[200px] h-[60px] top-[58%] right-[0%] rounded-2xl  items-center justify-center text-white font-bold text-xl "
        >
          Available - {secondFloorAvailable}
        </div>
        <div
          id="highlight-area5"
          className="absolute hidden bg-third w-[200px] h-[60px] top-[72%] right-[0px] rounded-2xl  items-center justify-center text-white font-bold text-xl "
        >
          Available - {firstFloorAvailable}
        </div>
        <div
          id="highlight-area6"
          className="absolute hidden bg-third w-[200px] h-[60px] top-[85%] right-[0px] rounded-2xl  items-center justify-center text-white font-bold text-xl "
        >
          Available - {groundFloorAvailable}
        </div>
      </div>

      {/* Add more highlight divs for additional areas */}
    </div>
  );
};

export default HomeImageItemDL;
