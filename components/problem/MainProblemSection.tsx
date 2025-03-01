'use client';

const MainProblemSection = () => {
    return (
        <section className="py-12 px-6">
            <h2 className="text-3xl font-bold mb-4 text-center">The Main Problem in Crypto Trading</h2>
            <p className="text-lg font-semibold mb-8 text-center max-w-2xl mx-auto">
                Most people who enter the crypto trading world lose money due to a lack of practical education and real experience. Our data shows that 95% of beginner traders lose their capital in the first few months.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-gray-800 text-red-500 p-6 text-center rounded-lg">
                    <h3 className="text-5xl font-bold">95%</h3>
                    <p className="text-lg">Beginners Face Losses</p>
                </div>
                <div className="bg-gray-800 text-red-500 p-6 text-center rounded-lg">
                    <h3 className="text-5xl font-bold">3mo</h3>
                    <p className="text-lg">Average Time to Quit</p>
                </div>
                <div className="bg-gray-800 text-red-500 p-6 text-center rounded-lg">
                    <h3 className="text-5xl font-bold">68%</h3>
                    <p className="text-lg">Emotional Decisions</p>
                </div>
                <div className="bg-gray-800 text-red-500 p-6 text-center rounded-lg">
                    <h3 className="text-5xl font-bold">82%</h3>
                    <p className="text-lg">Lack Risk Management</p>
                </div>
            </div>
        </section>
    );
};


export default MainProblemSection; 