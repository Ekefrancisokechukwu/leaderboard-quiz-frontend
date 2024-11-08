import Image from "next/image";

const formatPlace = {
  1: "st",
  2: "sec",
  3: "rd",
  4: "th",
  5: "th",
};

const GlobalLeaderboard = () => {
  return (
    <div>
      <ul className="space-y-3">
        {Array(5)
          .fill("")
          .map((_, i) => {
            return (
              <li
                key={i}
                className="flex items-center justify-between bg-white px-3 py-2 rounded-lg"
              >
                <div className="flex flex-col ">
                  <span className="font-semibold text-lg">23,451</span>
                  <span className="text-sm">
                    {i + 1}
                    {formatPlace[i + 1]} Place
                  </span>
                </div>
                <div className="flex items-center">
                  <span className="font-medium text-lg mr-4">Davis Enoch</span>
                  <div className="size-[2.5rem] rounded-full">
                    <Image
                      src={"/avater-1.jpg"}
                      alt="avater"
                      width={500}
                      height={500}
                      className="w-full h-full object-cover rounded-full object-top"
                    />
                  </div>
                </div>
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default GlobalLeaderboard;
