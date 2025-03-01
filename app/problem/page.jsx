import MainProblemSection from '../../components/problem/MainProblemSection';
import ImpactSection from '../../components/problem/ImpactSection';
import AdditionalProblemsSection from '../../components/problem/AdditionalProblemsSection';

const ProblemPage = () => {
    return (
        <div className="flex flex-col max-w-[74rem] mx-auto py-20 gap-20">
            <MainProblemSection />
            <ImpactSection />
            <AdditionalProblemsSection />
        </div>
    );
};

export default ProblemPage; 