import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Clock, Users, Star, ChevronLeft } from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

// This would typically come from your API/database
const moduleData = {
  "technical-analysis-fundamentals": {
    title: "Technical Analysis Fundamentals",
    description: "Learn how to read charts, identify patterns, and make data-driven trading decisions.",
    duration: "2.5 hours",
    enrollmentCount: 2345,
    rating: 4.8,
    difficulty: "Beginner" as "Beginner" | "Intermediate" | "Advanced",
    instructors: [
      { name: "John Doe", initials: "JD", color: "bg-blue-600" },
      { name: "Alice King", initials: "AK", color: "bg-purple-600" },
    ],
    sections: [
      {
        title: "Introduction to Technical Analysis",
        duration: "30 min",
        lessons: [
          { title: "What is Technical Analysis?", duration: "10 min", completed: true },
          { title: "The Importance of Price Action", duration: "10 min", completed: true },
          { title: "Understanding Trading Volume", duration: "10 min", completed: false },
        ],
      },
      {
        title: "Chart Patterns",
        duration: "45 min",
        lessons: [
          { title: "Support and Resistance", duration: "15 min", completed: false },
          { title: "Trend Lines and Channels", duration: "15 min", completed: false },
          { title: "Common Chart Patterns", duration: "15 min", completed: false },
        ],
      },
      {
        title: "Technical Indicators",
        duration: "45 min",
        lessons: [
          { title: "Moving Averages", duration: "15 min", completed: false },
          { title: "RSI and MACD", duration: "15 min", completed: false },
          { title: "Volume Indicators", duration: "15 min", completed: false },
        ],
      },
    ],
  },
};

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const module = moduleData[params.slug as keyof typeof moduleData];
  if (!module) return { title: "Module Not Found" };

  return {
    title: `${module.title} - Tradoxus Education`,
    description: module.description,
  };
}

export default function ModulePage({ params }: { params: { slug: string } }) {
  const module = moduleData[params.slug as keyof typeof moduleData];
  if (!module) notFound();

  const totalLessons = module.sections.reduce(
    (acc, section) => acc + section.lessons.length,
    0
  );
  const completedLessons = module.sections.reduce(
    (acc, section) =>
      acc + section.lessons.filter((lesson) => lesson.completed).length,
    0
  );

  return (
    <div className="container py-8 space-y-8">
      <Link
        href="/education"
        className="inline-flex items-center text-sm text-blue-400 hover:text-blue-300"
      >
        <ChevronLeft className="h-4 w-4 mr-1" />
        Back to Education
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">{module.title}</h1>
            <p className="text-gray-400">{module.description}</p>
          </div>

          <div className="space-y-4">
            {module.sections.map((section, sectionIndex) => (
              <Card key={sectionIndex} className="bg-gray-900 border-gray-800">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg text-white">
                      {section.title}
                    </CardTitle>
                    <span className="text-sm text-gray-400">{section.duration}</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {section.lessons.map((lesson, lessonIndex) => (
                      <div
                        key={lessonIndex}
                        className="flex items-center justify-between p-3 rounded-lg bg-gray-800/50"
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={cn(
                              "h-4 w-4 rounded-full border",
                              lesson.completed
                                ? "bg-green-500/20 border-green-500"
                                : "bg-gray-700 border-gray-600"
                            )}
                          />
                          <span className="text-sm text-gray-200">
                            {lesson.title}
                          </span>
                        </div>
                        <span className="text-sm text-gray-400">
                          {lesson.duration}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <Card className="bg-gray-900 border-gray-800">
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Progress</span>
                  <span className="text-white font-medium">
                    {completedLessons}/{totalLessons} lessons
                  </span>
                </div>
                <div className="h-2 rounded-full bg-gray-800">
                  <div
                    className="h-full rounded-full bg-blue-500"
                    style={{
                      width: `${(completedLessons / totalLessons) * 100}%`,
                    }}
                  />
                </div>
                <button className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors">
                  Continue Learning
                </button>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-800">
            <CardContent className="p-6 space-y-4">
              <div>
                <h3 className="text-lg font-medium text-white mb-2">
                  Course Details
                </h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-gray-400">
                    <Clock className="h-4 w-4" />
                    <span>{module.duration}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-400">
                    <Users className="h-4 w-4" />
                    <span>{module.enrollmentCount.toLocaleString()} enrolled</span>
                  </div>
                  <div className="flex items-center gap-2 text-amber-400">
                    <Star className="h-4 w-4 fill-current" />
                    <span>{module.rating.toFixed(1)} rating</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium text-white mb-2">
                  Instructors
                </h3>
                <div className="space-y-3">
                  {module.instructors.map((instructor, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div
                        className={cn(
                          "h-8 w-8 rounded-full flex items-center justify-center text-sm font-medium text-white",
                          instructor.color
                        )}
                      >
                        {instructor.initials}
                      </div>
                      <span className="text-gray-200">{instructor.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
} 