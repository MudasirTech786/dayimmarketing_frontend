"use client";
import React, { useState } from "react";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { getCookie } from "cookies-next";
import { User_Payment_API } from "@/lib/apiEndPoints";
import { DotLoader } from "react-spinners";
import { toast } from "react-toastify";
import { Crown, Home, Square, Layers } from "lucide-react";

function Residences_item({
  id,
  sold,
  title,
  number,
  type,
  s_type,
  size,
  image,
  floor,
  purchased_by,
}) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);

  const router = useRouter();
  const user = getCookie("logged-in-user")
    ? JSON.parse(getCookie("logged-in-user"))
    : null;

  const handleFileChange = (e) => setFile(e.target.files[0]);

  function buyNowHandler() {
    if (!user) router.push("/auth/login?name=dsa");
    else setDialogOpen(true);
  }

  async function paymentHandler(type) {
    try {
      setLoading(true);
      if (type === "cash") {
        const response = await fetch(User_Payment_API, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            product_id: id,
            payment: type,
            user_id: user?.id,
          }),
        });
        const res = await response.json();
        response.status === 200
          ? toast.success("Payment Created Successfully")
          : toast.error(res.message);
        setDialogOpen(false);
      }
      if (type === "bank") {
        if (!file) return toast.error("Please select a file");
        const formData = new FormData();
        formData.append("image", file);
        formData.append("product_id", id);
        formData.append("payment", type);
        formData.append("user_id", user?.id);
        const response = await fetch(User_Payment_API, {
          method: "POST",
          headers: { Accept: "application/json" },
          body: formData,
        });
        const res = await response.json();
        response.status === 200
          ? toast.success("Payment Created Successfully")
          : toast.error(res.message);
        setDialogOpen(false);
        setFile(null);
      }
    } catch (err) {
      throw new Error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative max-w-sm rounded-2xl overflow-hidden shadow-2xl border border-[#d6ad42]/50 bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white hover:scale-[1.02] transition-transform duration-300">

      {/* IMAGE */}
      <div className="relative">
        <Zoom>
          <img
            src={`https://portal.dayimmarketing.com/uploads/${image}`}
            alt={title}
            className="w-full h-auto max-h-[400px] object-contain bg-black"
          />
        </Zoom>
      </div>


      {/* CONTENT */}
      <div className="p-6">
        <h3 className="text-2xl font-bold flex items-center gap-2 text-[#d6ad42]">
          <Home size={20} /> {type}
        </h3>
        <p className="text-sm text-gray-400">{title}</p>

       {/* INFO GRID */}
<div className="grid grid-cols-2 gap-3 mt-5 text-sm">
  <div className="flex items-center gap-2">
    <Layers size={16} className="text-[#d6ad42]" />
    <span>Floor {floor}</span>
  </div>
  <div className="flex items-center gap-2">
    <Square size={16} className="text-[#d6ad42]" />
    <span>{size} Sq.Ft</span>
  </div>

  {/* Crown + Type + Badge */}
  <div className="flex items-center gap-2 col-span-2">
    <Crown size={16} className="text-[#d6ad42]" />
    <span className="font-medium">{s_type + " - " + number}</span>

    {/* Status Badge */}
    <span
      className={`ml-auto px-4 py-1.5 text-sm font-bold rounded-full shadow-md ${
        sold === "No"
          ? "bg-[#15803d] text-white border border-[#14532d]"   // Dark Green
          : sold === "Reserved"
          ? "bg-[#d6ad42] text-black border border-[#b8860b]"   // Gold
          : "bg-[#b91c1c] text-white border border-[#7f1d1d]"   // Deep Red
      }`}
    >
      {sold === "No" ? "AVAILABLE" : sold === "Reserved" ? "RESERVED" : "SOLD"}
    </span>
  </div>
</div>


        {/* PURCHASE INFO */}
        {sold !== "No" && sold !== "Reserved" && (
          <div className="mt-4">
            <h4 className="text-xs font-bold text-gray-400">Purchased By</h4>
            <span className="bg-red-600/90 px-3 py-1 rounded-md text-sm font-bold">
              {purchased_by}
            </span>
          </div>
        )}

        {/* ACTIONS */}
        {sold === "No" && (
          <div className="flex gap-3 mt-7">
            <button
              onClick={buyNowHandler}
              className="flex-1 bg-[#d6ad42] text-black font-semibold py-2 rounded-lg shadow-md hover:shadow-[#d6ad42]/60 hover:scale-[1.02] transition"
            >
              BUY NOW
            </button>
            <Link
              href={`/dayim-signature-apartments/contact?floor=${floor}&inventory_name=${type}&inventory_number=${number}`}
              className="flex-1 text-center bg-green-700 hover:bg-green-800 border border-[#d6ad42] text-[#d6ad42] font-semibold py-2 rounded-lg shadow-md hover:shadow-[#d6ad42]/40 hover:scale-[1.02] transition"
            >
              CONTACT
            </Link>

          </div>
        )}
      </div>
    </div>
  );
}

export default Residences_item;
