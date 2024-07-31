const Shimmer = () => {
    return (
      <div className=" flex flex-wrap justify-center items-center">
        {Array.from({ length: 12 }).map((_, index) => (
          <div
            key={index}
            className="m-4 p-4 w-[250px] bg-gray-100 rounded-lg animate-pulse transform hover:translate-y-1 transition-transform duration-200"
          >
            <div className="h-32 bg-gray-200 rounded-md"></div>
            <div className="h-6 mt-2 bg-gray-200 rounded-md"></div>
            <div className="h-4 mt-2 bg-gray-200 rounded-md"></div>
            <div className="h-4 mt-1 bg-gray-200 rounded-md"></div>
            <div className="h-4 mt-1 bg-gray-200 rounded-md"></div>
            <div className="h-4 mt-1 bg-gray-200 rounded-md"></div>
          </div>
        ))}
      </div>
    );
  };
  
  export default Shimmer;