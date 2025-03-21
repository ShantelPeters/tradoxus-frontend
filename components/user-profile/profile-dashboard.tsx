"use client"

import { Settings } from "lucide-react"
import Button from "@/components/ui/button"
import ProfileSidebar from "@/components/user-profile/profile-sidebar"
import LearningTabs from "@/components/user-profile/learning-tabs"
import LearningPath from "@/components/user-profile/learning-path"
import StudyTime from "@/components/user-profile/study-time"
import Certifications from "@/components/user-profile/certifications"

export default function ProfileDashboard() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <header className="border-b border-[#1E2530] p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">Profile Dashboard</h1>
        <Button 
          href="#" 
          onClick={() => console.log("Settings clicked")}
          className="flex items-center bg-[#141823] text-[#9BA1AE] border border-[#1E2530] px-3 py-1.5 rounded-md hover:bg-[#1E2530] transition-colors"
        >
          <Settings className="h-4 w-4 mr-2" />
          Settings
        </Button>
      </header>

      <div className="container mx-auto py-6 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <ProfileSidebar />
          </div>
          <div className="lg:col-span-2 space-y-6">
            <LearningTabs />
            <LearningPath />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <StudyTime />
              <Certifications />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

