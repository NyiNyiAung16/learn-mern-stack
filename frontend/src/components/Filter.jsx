import { useState } from "react";

function Filter({setFiler}) {
    let [search,setSearch] = useState('');

    const filterSubmit = (e) => {
        if(e.key === 'Enter') {
            setFiler(search)
        }
    }

  return (
    <div className="flex items-center bg-gray-100">
      <i className="fa-solid fa-search p-2 rounded"></i>
      <input
        type="text"
        value={search}
        onInput={(e) => setSearch(e.target.value)}
        onKeyUp={filterSubmit}
        placeholder="Search by title or creator name..."
        className="w-full min-w-[300px] p-2 rounded-br focus:outline-none ouline-none border-s bg-gray-100"
      />
    </div>
  );
}

export default Filter;
