import { TriangleAlert, Shield, Users, ChartNoAxesColumn } from 'lucide-react';

export const mainProblemData = {
    title: 'The Main Problem in Crypto Trading',
    description: 'Most people who enter the crypto trading world lose money due to a lack of practical education and real experience. Our data shows that 95% of beginner traders lose their capital in the first few months.',
    data: [
        {
            title: '95%',
            description: 'Beginners Face Losses',
        },
        {
            title: '3mo',
            description: 'Average Time to Quit',
        },
        {
            title: '68%',
            description: 'Emotional Decisions',
        },
        {
            title: '82%',
            description: 'Lack Risk Management',
        },
    ],
};

export const impactData = {
    title: 'The Impact',
    description: 'This lack of proper education and experience leads to significant financial losses for novice traders, creating a barrier to entry in the crypto market and potentially damaging the overall ecosystem. Tradoxus aims to address these issues head-on with our innovative, gamified educational platform.',
    data: [
        {
            title: 'Structured Learning Path',
            description: 'Step-by-step guidance from basics to advanced strategies',
        },
        {
            title: 'Risk-Free Practice',
            description: 'Advanced simulation environment with real market conditions',
        },
        {
            title: 'Expert Mentorship',
            description: 'Direct guidance from successful traders and industry experts',
        },
    ],
    button: {
        text: 'Start Your Trading Journey',
        link: '/register',
    },
};

export const solutionData = {
    data: [
        {       
            title: 'Emotional Trading',
            description: 'Traders often make impulsive decisions based on FOMO or panic selling, leading to significant losses. Market volatility and social media influence amplify these emotional reactions.',
            percentage: '68% of traders report making emotional decisions that negatively impact their portfolio.',
            icon: <TriangleAlert className='w-6 h-6' color='red' />,
        },
        {
            title: 'Lack of Safe Practice Environment',
            description: 'Without a proper simulation environment, beginners risk real capital while learning. This leads to costly mistakes that could have been avoided with proper practice tools.',
            percentage: '92% of successful traders started with paper trading or simulations.',
            icon: <Shield className='w-6 h-6' color='red' />,
        },
        {
            title: 'Absence of Mentorship',
            description: 'Trading without proper guidance extends the learning curve significantly. Mentor-guided traders show 3x better performance compared to self-taught traders.',
            percentage: '73% of profitable traders credit their success to proper mentorship.',
            icon: <Users className='w-6 h-6' color='red' />,
        },
        {
            title: 'Poor Risk Management',
            description: 'Most beginners lack understanding of position sizing, portfolio diversification, and risk-reward ratios, leading to account-breaking losses.',
            percentage: '82% of failed traders didn\'t implement proper risk management.',
            icon: <ChartNoAxesColumn className='w-6 h-6' color='red' />,
        },
    ]
};