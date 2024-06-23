function SponerBy() {
    return (
        <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl text-center font-bold mb-4">Sponsored by</h2>
            <div className="flex justify-around items-center gap-5">
                <div className="flex flex-col items-center">
                    <img src='/sponsor/abstract.avif' className="w-[50px] h-[50px]  rounded-full object-cover object-center" alt="" />
                    <span className="text-semibold text-lg">Abstract</span>
                </div>
                <div className="flex flex-col items-center">
                    <img src='/sponsor/colorconnect.avif' className="w-[50px] h-[50px]  rounded-full object-cover object-center" alt="" />
                    <span className="text-semibold text-lg">Color Connect</span>
                </div>
                <div className="flex flex-col items-center">
                    <img src='/sponsor/cooperation.avif' className="w-[50px] h-[50px]  rounded-full object-cover object-center" alt="" />
                    <span className="text-semibold text-lg">Cooperation</span>
                </div>
                <div className="flex flex-col items-center">
                    <img src='/sponsor/culturearrow.avif' className="w-[50px] h-[50px]  rounded-full object-cover object-center" alt="" />
                    <span className="text-semibold text-lg">Culture Arrow</span>
                </div>
                <div className="flex flex-col items-center">
                    <img src='/sponsor/socialnet.avif' className="w-[50px] h-[50px]  rounded-full object-cover object-center" alt="" />
                    <span className="text-semibold text-lg">Social Net</span>
                </div>
            </div>
        </div>
    )
}

export default SponerBy;