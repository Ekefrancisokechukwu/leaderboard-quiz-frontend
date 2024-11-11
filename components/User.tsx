"use client";

import { CircleUserRound, LogOutIcon } from "lucide-react";
import { motion } from "framer-motion";
import { useRef, useState } from "react";
import { useClickOutside } from "@/hooks/useClickOutside";
import { IUser, useUser } from "@/hooks/useUset";
import Image from "next/image";
import axios from "axios";

interface UserProps {
  user: IUser;
}

const User = ({ user }: UserProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const dropdownRef = useRef(null);
  useClickOutside(dropdownRef, () => setIsOpen(false));

  const handleLogout = async () => {
    const token = localStorage.getItem("authToken");
    if (token) {
      try {
        await axios("http://localhost:5000/api/v1/auth/logout", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      } catch (error) {
        console.error("Error logging out:", error);
      }
    }
    useUser.getState().setuser(null);
    localStorage.removeItem("authToken");
  };

  return (
    <div ref={dropdownRef} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="size-[2rem] hover:bg-gray-100 grid place-items-center rounded-full bg-gray-50"
      >
        {user.profilePicture ? (
          <Image
            alt="profile pic"
            width={32}
            height={32}
            src={user.profilePicture}
            className="rounded-full"
          />
        ) : (
          <CircleUserRound size={19} />
        )}
      </button>
      <motion.div
        initial={{ opacity: 0, visibility: "hidden" }}
        animate={
          isOpen
            ? { opacity: 1, visibility: "visible", y: 10 }
            : { opacity: 0, visibility: "hidden" }
        }
        className="bg-white w-[19rem]  h-auto absolute top-[110%] right-6 shadow rounded-lg"
      >
        <div className="px-5 py-3 ">
          <p className="text-neutral-400 text-sm">{user.email}</p>
          <div className="flex items-center gap-x-2 mt-2">
            <div className="size-[2rem] bg-gray-200 rounded-md">
              <Image
                alt="profile pic"
                width={32}
                height={32}
                src={user.profilePicture}
                className="rounded-md"
              />
            </div>
            <p className="text-sm text-neutral-500 font-medium">{user.name}</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="mt-3 flex  gap-x-3 items-center py-2 hover:bg-gray-50 px-5 border-t w-full text-gray-400"
        >
          <LogOutIcon size={18} />
          Logout
        </button>
      </motion.div>
    </div>
  );
};
export default User;
