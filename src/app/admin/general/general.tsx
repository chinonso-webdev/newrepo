export default function GeneralComponent() {
    return <>
    <div className="bg-gray-100 shadow shadow-gray-500 p-5">
            <div className="">Current Wallet Address :</div>

            <div className="mt-5">
                <input className="p-2 w-full h-10 rounded" value={'dkjvbbiorg3r90u4rijwwiwurh34ihig3riruoht43eug9jevre0ghrie'} />
            </div>


            <div className="mt-5 w-full">
                <button className="w-10/12 md:w-1/2 py-4 rounded text-center mx-auto bg-blue-800 text-white" >
                    Update
                </button>
            </div>
        </div>
    </>
}