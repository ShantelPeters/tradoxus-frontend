"use client";

import { solutionData } from "./contants";

const AdditionalProblems = () => {
    return (
        <section className="">
            <div className="grid grid-cols-1 gap-4">
                {solutionData.data.map((item, index) => (
                    <div key={index} className="flex gap-4 bg-gray-800 text-white p-6 rounded-lg">
                        <div className="flex items-center justify-center bg-red-500/10 p-2 max-w-8 max-h-8 rounded-sm">
                            {item.icon}
                        </div>
                        <div>
                            <h3 className="text-lg font-bold">{item.title}</h3>
                            <p className="mt-2 text-sm text-gray-400">{item.description}</p>
                            <p className="mt-2 italic bg-white/5 p-2 rounded-sm">{item.percentage}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default AdditionalProblems;
