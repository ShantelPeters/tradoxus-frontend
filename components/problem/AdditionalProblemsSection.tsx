"use client";

const AdditionalProblems = () => {
    return (
        <section className="mt-10">
            <h2 className="text-2xl font-bold text-white">Additional Problems</h2>
            <div className="grid grid-cols-1 gap-4 mt-4">
                <div className="bg-gray-800 text-white p-6 rounded-lg">
                    <h3 className="text-lg font-bold">Emotional Trading</h3>
                    <p className="mt-2">Traders often make impulsive decisions based on FOMO or panic selling, leading to significant losses. Market volatility and social media influence amplify these emotional reactions.</p>
                    <p className="mt-2 italic">68% of traders report making emotional decisions that negatively impact their portfolio.</p>
                </div>
                <div className="bg-gray-800 text-white p-6 rounded-lg">
                    <h3 className="text-lg font-bold">Lack of Safe Practice Environment</h3>
                    <p className="mt-2">Without a proper simulation environment, beginners risk real capital while learning. This leads to costly mistakes that could have been avoided with proper practice tools.</p>
                    <p className="mt-2 italic">92% of successful traders started with paper trading or simulations.</p>
                </div>
                <div className="bg-gray-800 text-white p-6 rounded-lg">
                    <h3 className="text-lg font-bold">Absence of Mentorship</h3>
                    <p className="mt-2">Trading without proper guidance extends the learning curve significantly. Mentor-guided traders show 3x better performance compared to self-taught traders.</p>
                    <p className="mt-2 italic">73% of profitable traders credit their success to proper mentorship.</p>
                </div>
                <div className="bg-gray-800 text-white p-6 rounded-lg">
                    <h3 className="text-lg font-bold">Poor Risk Management</h3>
                    <p className="mt-2">Most beginners lack understanding of position sizing, portfolio diversification, and risk-reward ratios, leading to account-breaking losses.</p>
                    <p className="mt-2 italic">82% of failed traders didn't implement proper risk management.</p>
                </div>
            </div>
        </section>
    );
};

export default AdditionalProblems;
