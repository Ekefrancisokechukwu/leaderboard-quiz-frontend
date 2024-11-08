import GlobalLeaderboard from "@/components/GlobalLeaderboard";

export default function Home() {
  return (
    <div className="min-h-screen w-[50rem] mx-auto pt-[5rem]">
      <h1 className="text-center text-xl font-semibold">Leaderboards</h1>
      <div className="flex items-center gap-x-2 mt-8">
        <button className="font-medium text-sm inline-block p-2 bg-gray-50 rounded-lg shadow active:shadow-sm">
          GLobal
        </button>
        <button className="font-medium text-sm inline-block p-2 bg-gray-50 rounded-lg shadow active:shadow-sm">
          Javascript
        </button>
        <button className="font-medium text-sm inline-block p-2 bg-gray-50 rounded-lg shadow active:shadow-sm">
          Css
        </button>
        <button className="font-medium text-sm inline-block p-2 bg-gray-50 rounded-lg shadow active:shadow-sm">
          React
        </button>
      </div>
      <div className="  py-4 bg-gray-50 px-7 mt-6">
        <GlobalLeaderboard />
      </div>
    </div>
  );
}
