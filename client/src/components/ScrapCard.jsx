import React from "react";

const ScrapCard = () => {
  return (
    <div className="flex justify-center flex-col items-center min-h-screen">
      <div className="p-10 flex justify-center border-yellow-300 border-4 items-center bg-gradient-to-b from-red-800 to-red-600 rounded-lg shadow-lg">
        <div className="flex flex-col justify-center items-center">
          <img
            src="/arc.jpeg"
            alt="Iron Man"
            className="rounded-md items-center max-w-full h-20 w-20 object-cover shadow-md"
          />
          <h2 className="mt-4 mb-2 text-white text-2xl font-bold text-center drop-shadow-lg">
            SCRAP PICKUP REQUEST
          </h2>
          <div>
            <form className="flex flex-col gap-4">
              <div className="w-full">
                <label className="pr-4 text-white">ENTER YOUR NAME</label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  className="border border-gray-500 rounded-md p-2 bg-transparent text-white focus:ring focus:ring-yellow-300 w-full"
                />
              </div>
              <div className="w-full">
                <label className="pr-4 text-white">ENTER YOUR ADDRESS</label>
                <input
                  type="text"
                  placeholder="Enter your address"
                  className="border border-gray-500 rounded-md p-2 bg-transparent text-white focus:ring focus:ring-yellow-300 w-full"
                />
              </div>
              <div className="w-full">
                <label className="pr-4 text-white">SELECT DATE</label>
                <input
                  type="date"
                  className="border border-gray-500 rounded-md p-2 bg-transparent text-white focus:ring focus:ring-yellow-300 w-full"
                />
              </div>
              <div className="w-full">
                <label className="pr-4 text-white">SELECT TIME</label>
                <input
                  type="time"
                  className="border border-gray-500 rounded-md p-2 bg-transparent text-white focus:ring focus:ring-yellow-300 w-full"
                />
              </div>
              <button
                className="relative mt-2 bg-gradient-to-r from-yellow-400 to-yellow-600 text-white font-mono py-2 px-4 rounded-lg 
                clip-path-[polygon(10%_0,95%_40%,100%_90%,50%_100%,0_40%)] 
                transition-all duration-300 
                hover:shadow-[0_0_25px_#20f5ff,inset_0_0_10px_#d4ab03] hover:scale-105"
              >
                REQUEST PICKUP
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScrapCard;
