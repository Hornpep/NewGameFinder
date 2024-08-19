import React from 'react';

const Search = () => {
  return (
    <div>
      <form
        onSubmit={handleSearch}
        className="flex"
      >
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Suche..."
          className="px-2 py-1 rounded"
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSearch(e);
            }
          }}
        />
      </form>
    </div>
  );
};

export default Search;
