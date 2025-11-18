"use client";

import React, { useEffect, useState } from "react";
import { GET_DSA_EVENTS_API } from "@/lib/apiEndPoints";

const HomeImageItem = () => {
  const [latestEvent, setLatestEvent] = useState(null);

  useEffect(() => {
    const fetchLatestEvent = async () => {
      try {
        let res = await fetch(GET_DSA_EVENTS_API);
        let data = await res.json();

        if (!data || data.length === 0) return;

        data = data.reverse();

        const event = data[0];
        let srcMatch = event?.event?.match(/src="([^"]+)"/);

        if (srcMatch && srcMatch[1]) {
          setLatestEvent({
            src: srcMatch[1],
          });
        }
      } catch (error) {
        console.error("Error fetching latest event:", error);
      }
    };

    fetchLatestEvent();
  }, []);

  return (
    <div className="relative w-[80%] mx-auto flex justify-center mt-10">
      {latestEvent ? (
        <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-lg">
          <iframe
            src={latestEvent.src}
            className="absolute top-0 left-0 w-full h-full"
            allowFullScreen
            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
          ></iframe>
        </div>
      ) : (
        <p className="text-center text-gray-500">Loading latest event...</p>
      )}
    </div>
  );
};

export default HomeImageItem;
