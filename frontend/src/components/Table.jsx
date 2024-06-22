function Table({children}) {
    return (
        <div className="overflow-hidden rounded-lg border border-gray-200 shadow-md m-5">
            <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
                {children}
            </table>
        </div>
    )
}

export default Table;