
function DetailsSkeleton() {
    return (
        <div className="animate-pulse">
            <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="w-[90%] mx-auto md:ms-0">
                    <div className="h-[500px] w-full bg-gray-300 rounded-lg"></div>
                </div>

                <div className="flex items-center">
                    <div className="w-10/12 mx-auto mt-5 md:mt-0">
                        <div className="h-8 bg-gray-300 w-3/4 rounded mb-4"></div>
                        <div className="flex gap-5 items-center mb-4">
                            <div className="rating rating-sm">
                                {Array.from({ length: 5 }).map((_, index) => (
                                    <div
                                        key={index}
                                        className="w-4 h-4 bg-gray-300 rounded-full"
                                    ></div>
                                ))}
                            </div>
                            <div className="h-4 bg-gray-300 w-20 rounded"></div>
                        </div>
                        <div className="flex gap-5 my-5 items-center">
                            <div className="h-6 bg-gray-300 w-20 rounded"></div>
                            <div className="h-6 bg-gray-300 w-20 rounded"></div>
                            <div className="h-6 bg-gray-300 w-10 rounded"></div>
                        </div>
                        <div className="flex justify-between mb-4">
                            <div className="h-4 bg-gray-300 w-24 rounded"></div>
                            <div className="h-4 bg-gray-300 w-24 rounded"></div>
                        </div>
                        <div className="flex justify-between mb-4">
                            <div className="h-4 bg-gray-300 w-32 rounded"></div>
                            <div className="h-4 bg-gray-300 w-24 rounded"></div>
                        </div>
                        <div className="mb-4">
                            <div className="h-4 bg-gray-300 w-24 rounded mb-2"></div>
                            <div className="h-3 bg-gray-300 w-full rounded"></div>
                            <div className="h-3 bg-gray-300 w-full rounded mt-2"></div>
                            <div className="h-3 bg-gray-300 w-3/4 rounded mt-2"></div>
                        </div>
                        <div>
                            <div className="h-4 bg-gray-300 w-24 rounded mb-2"></div>
                            <ul>
                                {Array.from({ length: 3 }).map((_, index) => (
                                    <li
                                        key={index}
                                        className="h-3 bg-gray-300 w-full rounded mt-1"
                                    ></li>
                                ))}
                            </ul>
                        </div>
                        <div className="flex justify-end mt-5">
                            <div className="h-10 bg-gray-300 w-32 rounded"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DetailsSkeleton
