"use client";
import { Fragment, useState } from "react";
import { Tab } from "@headlessui/react";
import HomeTabItem from "./HomeTabItem";
import useSWR from "swr";
import { GET_ALL_PROPERTIES_API } from "@/lib/apiEndPoints";

// fetcher for SWR
const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function HomeTab() {
  // fetch data from Laravel
  const { data, error, isLoading } = useSWR(GET_ALL_PROPERTIES_API, fetcher);

  // filter for Dayim Zindagi only
  const residences = data?.filter((item) => item.name === "DSA") || [];

  // ✅ availability function (counts unsold units across multiple floors)
  function getAvailableResidencesByFloors(floors) {
    return residences.filter(
      (item) => floors.includes(item.floor) && item.sold === "No"
    ).length;
  }

  // ✅ helper to get minimum size per floor group
  function getMinSizeByFloors(floors) {
    const units = residences.filter((item) => floors.includes(item.floor));
    if (units.length === 0) return 0;
    return Math.min(...units.map((u) => Number(u.size)));
  }

  // ✅ Tabs config with proper floor keys (matching DB)
  const tabs = [
    {
      name: "Lower Ground Floor",
      floors: ["Lower Ground"],
      image: "/images/dsa/tabs/lower_ground_floor2.jpeg",
      type: "Shops/Offices",
    },
    {
      name: "Ground Floor",
      floors: ["Ground"],
      image: "/images/dsa/tabs/ground_floor.png",
      type: "Shops/Offices",
    },
    {
      name: "1st Floor",
      floors: ["1st"],
      image: "/images/dsa/tabs/first_floor.png",
      type: "Shops/Offices",
    },
    {
      name: "2nd - 4th Floor",
      floors: ["2nd", "3rd", "4th"],
      image: "/images/dsa/tabs/2nd-4th-Floor.png",
      type: "Apartments",
    },
    {
      name: "5th - 6th Floor",
      floors: ["5th", "6th"],
      image: "/images/dsa/tabs/5th-6th-Floor.png",
      type: "Apartments",
    },
  ];

  const [selectedFloor, setSelectedFloor] = useState(0);

  if (isLoading) {
    return <h2 className="text-center p-10">Loading...</h2>;
  }
  if (error) {
    return <h2 className="text-center p-10 text-red-500">Failed to load</h2>;
  }

  return (
    <div>
      {/* Mobile Dropdown */}
      <div className="md:hidden px-4 py-2">
        <select
          value={selectedFloor}
          onChange={(e) => setSelectedFloor(Number(e.target.value))}
          className="w-full p-2 rounded border border-gray-300"
        >
          {tabs.map((tab, idx) => (
            <option key={tab.name} value={idx}>
              {tab.name}
            </option>
          ))}
        </select>
      </div>

      {/* Desktop Tabs */}
      <Tab.Group selectedIndex={selectedFloor} onChange={setSelectedFloor}>
        <div className="hidden md:flex justify-center overflow-x-auto">
          <Tab.List className="flex gap-4 px-4 py-2 ">
            {tabs.map((tab) => (
              <Tab key={tab.name} as={Fragment}>
                {({ selected }) => (
                  <button
                    className={`flex-shrink-0 min-w-[140px] px-4 py-2 rounded-full font-semibold border-2 transition-all duration-300 ${selected
                      ? "bg-gradient-to-r from-purple-500 to-indigo-500 text-second border-[#d6ad42] shadow-lg"
                      : "bg-gray-100 text-gray-700 border-black hover:bg-gray-200"
                      }`}
                  >
                    {tab.name}
                  </button>
                )}
              </Tab>
            ))}
          </Tab.List>
        </div>

        {/* Tab Panels */}
        <Tab.Panels>
          {tabs.map((tab) => {
            const minSize = getMinSizeByFloors(tab.floors);
            const availableUnits = getAvailableResidencesByFloors(tab.floors);

            return (
              <Tab.Panel key={tab.name}>
                <HomeTabItem
                  image={tab.image}
                  size={minSize}
                  availableUnits={availableUnits}
                  freeUnits={
                    <div className="flex flex-col text-left pl-8">
                      <span>{availableUnits} - {tab.type} Available</span>
                      {tab.type1 && <span>{availableUnits} - {tab.type1} Available</span>}
                    </div>
                  }
                />
              </Tab.Panel>
            );
          })}
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}
