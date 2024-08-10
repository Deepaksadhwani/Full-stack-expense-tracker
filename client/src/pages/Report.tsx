import Shimmer from "@/components/Shimmer";
import ReportTable from "@/layouts/ReportTable";

import { useEffect, useState } from "react";

const Report = () => {
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
      <ReportTable />
    </div>
  );
};

export default Report;
