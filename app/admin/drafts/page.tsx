// Modified DraftsPage with dark mode support
import { CirclePlus, MoreHorizontal, Plus, Search } from "lucide-react";
import Link from "next/link";

interface DraftCourse {
  id: string;
  title: string;
  level: string;
  author: string;
  lastUpdated: string;
  status: "draft" | "in-review";
}

const mockDrafts: DraftCourse[] = [
  {
    id: "1",
    title: "Advanced Technical Analysis",
    level: "Advanced",
    author: "Admin",
    lastUpdated: "Oct 25, 2024",
    status: "draft",
  },
  {
    id: "2",
    title: "UX Design Fundamentals",
    level: "Basic",
    author: "John Doe",
    lastUpdated: "Oct 25, 2024",
    status: "draft",
  },
  {
    id: "3",
    title: "Cryptocurrency Trading Fundamentals",
    level: "Medium",
    author: "Admin",
    lastUpdated: "Oct 24, 2024",
    status: "in-review",
  },
];

export default function DraftsPage() {
  return (
    <div className="space-y-6 text-black dark:text-white p-4 sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-2xl font-semibold">Drafts</h1>
        <Link
          href="/admin/new-course"
          className="flex items-center gap-2 bg-black dark:bg-gray-700 text-white p-3 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-600 transition duration-200"
        >
          <CirclePlus size={18} />
          <span>New Course</span>
        </Link>
      </div>

      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm p-6">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="relative w-full max-w-xs">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search className="h-5 w-5 text-gray-400 dark:text-gray-500" />
            </div>
            <input
              type="search"
              placeholder="Search drafts..."
              className="w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <select className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
            <option value="">All Statuses</option>
            <option value="draft">Draft</option>
            <option value="in-review">In Review</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-max">
            <thead>
              <tr className="text-left text-sm font-medium text-gray-500 dark:text-gray-400 border-b dark:border-gray-700">
                <th className="pb-3 pl-4">Course</th>
                <th className="pb-3">Level</th>
                <th className="pb-3">Author</th>
                <th className="pb-3">Last Updated</th>
                <th className="pb-3">Status</th>
                <th className="pb-3 pr-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y dark:divide-gray-700">
              {mockDrafts.map((draft) => (
                <tr
                  key={draft.id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  <td className="py-4 pl-4">
                    <div className="font-medium">{draft.title}</div>
                  </td>
                  <td className="py-4">{draft.level}</td>
                  <td className="py-4">{draft.author}</td>
                  <td className="py-4">{draft.lastUpdated}</td>
                  <td className="py-4">
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        draft.status === "draft"
                          ? "bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-100"
                          : "bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100"
                      }`}
                    >
                      {draft.status === "draft" ? "Draft" : "In Review"}
                    </span>
                  </td>
                  <td className="py-4 pr-4 text-right">
                    <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-gray-500 dark:text-gray-400">
                      <MoreHorizontal size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 mt-6 text-sm">
          <div className="text-gray-500 dark:text-gray-400">
            Showing 1-3 of 3 drafts
          </div>
          <div className="flex items-center gap-1">
            <button
              className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 text-gray-700 dark:text-gray-300"
              disabled
            >
              Previous
            </button>
            <button
              className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 text-gray-700 dark:text-gray-300"
              disabled
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
