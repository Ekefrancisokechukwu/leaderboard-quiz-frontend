"use client";

import { motion } from "framer-motion";

const StartMessage = () => {
  return (
    <div className="h-[calc(100vh_-_4rem)] grid place-items-center">
      <div className="max-w-[30rem] mx-auto text-center">
        <h1 className="text-4xl font-semibold ">
          Welcome to the JavaScript Quiz!
        </h1>
        <p className="mt-4 text-lg">
          Ready to put your JavaScript skills to the test <span>⚡</span>?
        </p>
        <motion.div className="mt-5">
          Click <button className="">Start</button> when you&apos;re ready, and
          see how well you know JavaScript!&ldquo;
        </motion.div>

        <motion.button
          whileTap={{ scale: 1 }}
          whileHover={{ scale: 1.2 }}
          transition={{ type: "spring", bounce: 0.5 }}
          className="px-10 py-1.5 hover:shadow-xl  rounded-full bg-slate-300 font-medium inline-block mt-6"
        >
          Start
        </motion.button>
      </div>
    </div>
  );
};
export default StartMessage;
