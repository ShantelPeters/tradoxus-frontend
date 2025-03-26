import { Shield, Gamepad2, BarChart3 } from 'lucide-react';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#050a14] text-white">
      {/* Hero Section */}
      <section className="text-center py-24 px-4">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-[#18b6e8] to-[#2ecc71] text-transparent bg-clip-text">
          Master Crypto Trading Safely
        </h1>
        <p className="text-lg md:text-xl max-w-3xl mx-auto mb-12 text-gray-300">
          Tradoxus provides a safe, practical learning environment for crypto trading education through
          gamified experiences.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button className="bg-[#18b6e8] text-white px-8 py-3 rounded hover:bg-[#0e9ed0] transition">
            Get Started
          </button>
          <button className="border border-[#18b6e8] text-[#18b6e8] px-8 py-3 rounded hover:bg-[#0e9ed0] hover:text-white transition">
            Explore Features
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 px-6 pb-24 max-w-7xl mx-auto">
        {/* Safe Learning Environment */}
        <div className="bg-[#0c1524] p-8 rounded-lg">
          <div className="bg-[#18b6e8] w-16 h-16 rounded-full flex items-center justify-center mb-6">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold mb-4">Safe Learning Environment</h2>
          <p className="text-gray-300">
            Practice trading with real-time market data without risking your actual funds. Get immediate feedback on your decisions.
          </p>
        </div>

        {/* Gamified Education */}
        <div className="bg-[#0c1524] p-8 rounded-lg">
          <div className="bg-[#18b6e8] w-16 h-16 rounded-full flex items-center justify-center mb-6">
            <Gamepad2 className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold mb-4">Gamified Education</h2>
          <p className="text-gray-300">
            Earn rewards, complete missions, and climb the rankings as you learn. Make education engaging and motivating.
          </p>
        </div>

        {/* Advanced Analytics */}
        <div className="bg-[#0c1524] p-8 rounded-lg">
          <div className="bg-[#18b6e8] w-16 h-16 rounded-full flex items-center justify-center mb-6">
            <BarChart3 className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold mb-4">Advanced Analytics</h2>
          <p className="text-gray-300">
            Track your performance, develop custom indicators, and analyze your trading strategies with professional tools.
          </p>
        </div>
      </section>
    </main>
  );
}