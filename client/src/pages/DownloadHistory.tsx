import Shimmer from "@/components/Shimmer";
import  { useEffect, useState } from "react";
import HistoryTable from "@/layouts/HistoryTable";

const DownloadHistory = () => {
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
    <div className="min-h-screen bg-gray-50 font-semibold md:mx-20">
      <HistoryTable />
    </div>
  );
};

export default DownloadHistory;
