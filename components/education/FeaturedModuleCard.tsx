import { type LucideIcon, Clock, Users, Star } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface Instructor {
  initials: string;
  color: string;
}

interface FeaturedModuleCardProps {
  title: string;
  description: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  duration: string;
  enrollmentCount: number;
  rating: number;
  instructors: Instructor[];
  icon: LucideIcon;
}

export function FeaturedModuleCard({
  title,
  description,
  difficulty,
  duration,
  enrollmentCount,
  rating,
  instructors,
  icon: Icon,
}: FeaturedModuleCardProps) {
  const difficultyColors = {
    Beginner: "bg-blue-500/10 text-blue-500",
    Intermediate: "bg-purple-500/10 text-purple-500",
    Advanced: "bg-green-500/10 text-green-500",
  };

  return (
    <Card className="bg-gray-900/50 border-gray-800/50 hover:border-gray-700/50 transition-colors h-full">
      <CardHeader className="space-y-2 pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Icon className="h-6 w-6 text-blue-400" />
            <h3 className="text-xl font-medium text-white">{title}</h3>
          </div>
          <span
            className={cn(
              "px-2.5 py-1 text-xs font-medium rounded-full",
              difficultyColors[difficulty]
            )}
          >
            {difficulty}
          </span>
        </div>
        <p className="text-sm text-gray-400 line-clamp-2">{description}</p>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between text-sm border-t border-gray-800/50 pt-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 text-gray-400">
              <Clock className="h-4 w-4" />
              <span>{duration}</span>
            </div>
            <div className="flex items-center gap-1.5 text-gray-400">
              <Users className="h-4 w-4" />
              <span>{enrollmentCount.toLocaleString()}</span>
            </div>
            <div className="flex items-center gap-1.5 text-amber-400">
              <Star className="h-4 w-4 fill-current" />
              <span>{rating.toFixed(1)}</span>
            </div>
          </div>
          <div className="flex -space-x-2">
            {instructors.map((instructor, index) => (
              <div
                key={index}
                className={cn(
                  "h-7 w-7 rounded-full flex items-center justify-center text-xs font-medium text-white ring-2 ring-gray-900/50",
                  instructor.color
                )}
              >
                {instructor.initials}
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 