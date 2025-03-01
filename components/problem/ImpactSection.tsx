'use client';

import React from 'react';

const ImpactSection: React.FC = () => {
    return (
        <section className="py-12 px-6 bg-gray-900 text-white">
            <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-3xl font-bold mb-4">The Impact</h2>
                <p className="text-lg mb-6">
                    This lack of proper education and experience leads to significant financial losses for novice traders, creating a barrier to entry in the crypto market and potentially damaging the overall ecosystem. Tradoxus aims to address these issues head-on with our innovative, gamified educational platform.
                </p>
            </div>
            <div className="grid gap-6 max-w-3xl mx-auto">
                <div className="bg-gray-800 p-6 rounded-lg">
                    <h3 className="text-xl font-bold mb-2">Structured Learning Path</h3>
                    <p>Step-by-step guidance from basics to advanced strategies</p>
                </div>
                <div className="bg-gray-800 p-6 rounded-lg">
                    <h3 className="text-xl font-bold mb-2">Risk-Free Practice</h3>
                    <p>Advanced simulation environment with real market conditions</p>
                </div>
                <div className="bg-gray-800 p-6 rounded-lg">
                    <h3 className="text-xl font-bold mb-2">Expert Mentorship</h3>
                    <p>Direct guidance from successful traders and industry experts</p>
                </div>
            </div>
            <div className="text-center mt-8">
                <a href="/register" className="bg-blue-600 text-white py-3 px-6 rounded-lg text-lg font-bold hover:bg-blue-500 transition">
                    Start Your Trading Journey
                </a>
            </div>
        </section>
    );
};

export default ImpactSection;
