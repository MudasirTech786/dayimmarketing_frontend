"use client";
import React from "react";
import NavBar from "../components/Navbar";
import Residences_item from "./Residences_item";
import MainFooter from "../components/footer/MainFooter";
import { GET_ALL_Z_PROPERTIES_API } from "@/lib/apiEndPoints";
import useSWR from "swr";
import { DotLoader } from "react-spinners";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

// ✅ Reusable Section Heading Component
const SectionHeading = ({ title, id }) => (
  <div className="text-center my-20">
    <h2
      id={id}
      className="text-5xl md:text-7xl font-extrabold text-[#d6ad42] uppercase tracking-wider"
    >
      {title}
    </h2>
    <div className="mt-5 w-40 h-2 mx-auto bg-[#d6ad42] rounded-full"></div>
  </div>
);


function Residences() {
  const { data, error, isLoading } = useSWR(GET_ALL_Z_PROPERTIES_API, fetcher);

  if (error) {
    return <h2 className="text-center text-red-600 mt-20">Failed to load</h2>;
  }

  const residences =
    data?.filter((item) => item.name === "Dayim Zindagi") || [];

  function getResidenceByFloor(floorName) {
    return residences?.filter((residence) => residence.floor === floorName);
  }

  // ✅ Centralized floors array
  const floors = [
    { label: "Lower Ground Floor", key: "Lower Ground" },
    { label: "Ground Floor", key: "Ground" },
    { label: "First Floor", key: "1st" },
    { label: "Second Floor", key: "2nd" },
    { label: "Third Floor", key: "3rd" },
    { label: "Fourth Floor", key: "4th" },
    { label: "Fifth Floor", key: "5th" },
    { label: "Sixth Floor", key: "6th" },
    { label: "Seventh Floor", key: "7th" },
  ];

  return (
    <div className="mt-[120px] flex flex-col min-h-screen">
      <NavBar videoBg={false} />

      {/* Loading State */}
      {isLoading ? (
        <div className="flex-1 flex items-center justify-center">
          <DotLoader color="#f3ac27" size={60} />
        </div>
      ) : (
        <main className="flex-1 py-10 px-6 lg:px-32">
          {floors.map((floor) => {
            const floorResidences = getResidenceByFloor(floor.key);
            if (!floorResidences.length) return null; // skip empty floors

            return (
              <section key={floor.key} className="mt-16">
                <SectionHeading
                  title={floor.label}
                  id={floor.key.toLowerCase().replace(/\s+/g, "-")}
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {floorResidences.map((i) => (
                    <Residences_item
                      key={i.id}
                      id={i.id}
                      sold={i.sold}
                      title={i.category}
                      number={i.number}
                      type={i.dz_type}
                      s_type={i.subtype}
                      size={i.size}
                      image={i.image}
                      floor={i.floor}
                      purchased_by={i.purchased_by}
                    />
                  ))}
                </div>
              </section>
            );
          })}
        </main>
      )}

      <footer>
        <MainFooter />
      </footer>
    </div>
  );
}

export default Residences;
