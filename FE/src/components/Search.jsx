import React from 'react';

const Search = () => {
  return (
    <div className="flex">
      <div className="flex-1 mx-4">
        <div className="relative text-gray-400">
          <input
            type="search"
            placeholder="Search..."
            className="w-full bg-gray-700 text-white rounded-full py-2 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
    </div>
  );
};

export default Search;
