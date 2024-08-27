import React from 'react';

const Gamedetails = () => {
  return (
    <div className="flex min-h-screen bg-[#141414] justify-center">
      <div className=" h-full  bg-[#141414]  p-28 w-1/2 justify-center">
        <div className="flex flex-row border  border-[#1DD0E0] rounded-md justify-center text-center">
          <div>
            <h2 className="underline text-center py-2 text-white font-extrabold text-3xl">
              Gamename
            </h2>
            <div className="flex flex-col  py-2">
              <img
                className=" rounded-md  border-black  border-2"
                src="https://media.rawg.io/media/resize/420/-/screenshots/5aa/5aaff742f85c733ab675e934b41d4e7b.jpg"
              ></img>
            </div>
            <div className="md-2 space-y-2 mb-2">
              <button className="p-2 justify-center  text-white border bg-[#141414] rounded-md border-[#1CE0AF] flex flex-col items-center w-1/4">
                <span className="text-sm">Add to</span>
                <span className="text-lg font-bold">Wishlist</span>
              </button>
              <div className="flex flex-row p-2  justify-center">
                <p className="text-white border w-full rounded-md border-[#1CE0AF]">
                  Story: shorttext about the game
                </p>
              </div>
              <div className="flex flex-row p-2   justify-center">
                <div className="flex flex-col p-2 gap-y-2 w-full">
                  <p className="text-white border rounded-md  border-[#1CE0AF]">
                    Genre: Text
                  </p>
                  <p className="text-white border  rounded-md border-[#1CE0AF]">
                    Release Date: Text
                  </p>
                  <p className="text-white border rounded-md  border-[#1CE0AF]">
                    Developer: Text
                  </p>
                  <p className="text-white border rounded-md  border-[#1CE0AF]">
                    Publisher: Text
                  </p>
                </div>
                <div className="flex flex-col p-2 gap-y-2 w-full">
                  <p className="text-white border rounded-md  border-[#1CE0AF]">
                    Rating: Text
                  </p>
                  <p className="text-white border  rounded-md border-[#1CE0AF]">
                    IGDB Id:: Text
                  </p>
                  <p className="text-white border  rounded-md border-[#1CE0AF]">
                    Age Rating: Text
                  </p>
                  <p className="text-white border  rounded-md border-[#1CE0AF]">
                    Languages: Text
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gamedetails;
