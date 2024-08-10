import Shimmer from "@/components/Shimmer";
import LeaderboardTable from "@/layouts/LeaderboardTable";
import { useEffect, useState } from "react";

const LeaderBoard = () => {
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    const loadingTimer = setTimeout(() => {
      setLoading(false);
    }, 200);
    return () => clearTimeout(loadingTimer);
  }, []);
  return loading ? (
    <Shimmer />
  ) : (
    <div className="min-h-screen bg-gray-50 font-semibold md:mx-40">
      <LeaderboardTable />
    </div>
  );
};

export default LeaderBoard;
