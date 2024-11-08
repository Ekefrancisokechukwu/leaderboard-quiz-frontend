"use client";
import { motion } from "framer-motion";

interface IProgressbar {
  questionCount: number;
  currentCount: number;
  width: string;
}

const Progressbar = ({ currentCount, questionCount, width }: IProgressbar) => {
  return (
    <motion.div className="w-[25rem] mx-auto bg-gray-100 h-2 rounded-full">
      <motion.div
        transition={{ type: "spring", duration: 0.2, damping: 40 }}
        animate={{ width: `${width}` }}
        initial={{ width: 0 }}
        className="h-full  rounded-full bg-black"
      ></motion.div>
      <div className="text-center  mt-1 font-medium text-gray-900">
        {currentCount}/{questionCount}
      </div>
    </motion.div>
  );
};
export default Progressbar;
