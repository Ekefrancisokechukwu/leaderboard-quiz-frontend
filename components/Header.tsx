"use client";

import Link from "next/link";
import google from "@/public/google.svg";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { FormEvent, useRef, useState } from "react";
import { useClickOutside } from "@/hooks/useClickOutside";
import { usePathname } from "next/navigation";
import User from "./User";
import { useUser } from "@/hooks/useUset";

const quizzLinks = [
  {
    label: "Javascript",
    href: "/javascript",
  },
  {
    label: "React",
    href: "/react",
  },
  {
    label: "Css",
    href: "/css",
  },
  {
    label: "Node",
    href: "/node",
  },
];

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  useClickOutside(dropdownRef, () => setIsOpen(false));
  const pathname = usePathname();
  const user = useUser();

  const handlePathname = () => {
    const currentPath = quizzLinks.find((path) => pathname === path.href);
    return currentPath ? currentPath.href.replace(/^\//, "") : "Select Quizz";
  };

  const handleOAuthLogin = (e: FormEvent) => {
    e.preventDefault(); // Prevent default navigation
    const width = 500;
    const height = 600;
    const left = (window.innerWidth - width) / 2;
    const top = (window.innerHeight - height) / 2;

    // Open the new window with custom settings
    const popup = window.open(
      "http://localhost:5000/auth/google",
      "OAuth Login",
      `width=${width},height=${height},top=${top},left=${left},toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=yes`
    );

    // Optional: Polling to detect if the popup window is closed
    const popupTimer = setInterval(() => {
      if (popup && popup.closed) {
        clearInterval(popupTimer);
        console.log("Popup closed"); // Handle post-login here, e.g., check session
      }
    }, 500);
  };

  return (
    <header className="py-2 px-5 shadow  z-50 fixed w-full top-0 left-0 bg-white flex justify-between">
      <Link href={"/"} className="italic font-semibold">
        Quizz App
      </Link>
      <div ref={dropdownRef} className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="inline-flex gap-x-2 capitalize items-center py-1 px-3 hover:bg-gray-100 rounded-lg"
        >
          {handlePathname()}
          <ChevronDown
            size={16}
            className={`transition-transform duration-150 ${
              isOpen ? "rotate-180" : "rotate-0"
            }`}
          />
        </button>
        <div
          className={`w-[25rem] z-50 top-[110%]     bg-white transition-transform transform duration-200 absolute  p-3 rounded-lg h-[9rem] shadow-[0_4px_6px_-1px_#0000001d,0_-2px_2px_-1px_#0000001c] left-1/2 -translate-x-1/2  ${
            isOpen
              ? " opacity-100 visible translate-y-0"
              : " opacity-0 invisible -translate-y-4"
          }  `}
        >
          <div className="grid items-center grid-cols-2 gap-x-5 gap-y-3">
            {quizzLinks.map((link) => (
              <Link
                onClick={() => {
                  setIsOpen(false);
                }}
                key={link.label}
                href={link.href}
                className="inline-flex items-center py-2 px-4 text-sm rounded-lg bg-gray-50 hover:bg-gray-100"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
      {user.user ? (
        <User />
      ) : (
        <Link
          href={"http://localhost:5000/auth/google"}
          onClick={handleOAuthLogin}
          className="flex items-center gap-x-2 py-1 px-3 hover:bg-gray-100 shadow rounded bg-gray-50"
        >
          <Image src={google} alt="google icon" className="size-[1rem]" />
          Login
        </Link>
      )}
    </header>
  );
};
export default Header;
