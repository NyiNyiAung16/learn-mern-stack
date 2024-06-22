import { useState } from "react";

function FilteredBy({filteredBySearch,sortBy,sortedArrays,placeholder}) {
    let [search, setSearch] = useState("");
    let [isAsending,setIsAsending] = useState(false);
    let [sort,setSort] = useState('');

    const filtered = (e) => {
        if(e.key !== 'Enter') return;
        filteredBySearch(search);
    }

    const sorting = (name) => {
        setSort(name);
        sortBy(name,isAsending);
        setIsAsending(!isAsending);
    }

    return (
        <div className="flex justify-between items-center px-2 ">
            <div>
                <input
                    type="text"
                    value={search}
                    onInput={(e) => setSearch(e.target.value)}
                    onKeyUp={filtered}
                    placeholder={placeholder || "Search..."}
                    className="w-full min-w-[300px] p-2 rounded focus:outline-none ouline-none border-s bg-gray-100"
                />
            </div>
            <div className="flex gap-3 items-center text-slate-50">
                {sortedArrays && sortedArrays.map((name) => (
                    <div className="cursor-pointer" key={name} onClick={() => sorting(name)}>
                        <span>FilteredBy {name}</span>
                        <i className={isAsending && (sort === name || sort === '') ? `fa-solid fa-arrow-up ms-2 text-gray-800` : `fa-solid fa-arrow-down ms-2 text-gray-800`}></i>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default FilteredBy;