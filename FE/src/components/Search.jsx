import React from 'react';

const Search = () => {
  return (
    <div className="flex">
      <div className="flex-1 mx-4">
        <div className="relative text-[#1CE0AF]">
          <input
            type="search"
            placeholder="Search..."
            className="w-full bg-gray-700 text-[#1CE0AF] border border-[#1CE0AF] rounded-full py-2 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-[#1DD0E0]"
          />
        </div>
      </div>
    </div>
  );
};

export default Search;
