import { useCallback, useEffect, useState } from "react";
import { useUserStore } from "../../../store/useUserStore";
import useFileQuery from "../../../hook/useFileQuery";
import { Grid2x2, TableProperties, Cloud, RotateCw } from "lucide-react";
import DocumentGrid from "./DocumentGrid";
import DocumentList from "./DocumentList";
import AddFileDialog from "./AddFileDialog";

export default function Landing() {
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  const { user, searchQuery, setSearchQuery } = useUserStore();
  const { getFiles, isLoading } = useFileQuery();

  // Load files on mount
  useEffect(() => {
    getFiles();
    return () => {
      setSearchQuery("");
    };
  }, []);

  // Filter files based on search query
  const filteredFiles = useCallback(() => {
    if (!user?.files) return [];
    
    if (!searchQuery.trim()) {
      return user.files;
    }

    return user.files.filter((file) =>
      file.fileName.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [user?.files, searchQuery]);

  const handleViewModeChange = useCallback((mode: "list" | "grid") => {
    setViewMode(mode);
  }, []);

  return (
    <>
      <div className="flex-1 overflow-y-auto bg-white dark:bg-slate-900">
        <main className="max-w-7xl mx-auto py-8 px-8">
          <div className="flex items-center justify-between mb-6">
                  <div>
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                      My Documents
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
                      Manage and organize your personal workspace
                    </p>
                  </div>
                  <div className="flex items-center gap-1 bg-white dark:bg-slate-800 p-1 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm">
                    <button
                      onClick={() => handleViewModeChange("list")}
                      className={`p-2 rounded transition-colors ${
                        viewMode === "list"
                          ? "bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-white"
                          : "text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                      }`}
                      title="List view"
                    >
                      <span className="material-symbols-outlined text-lg"><TableProperties /></span>
                    </button>
                    <button
                      onClick={() => handleViewModeChange("grid")}
                      className={`p-2 rounded transition-colors ${
                        viewMode === "grid"
                          ? "bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-white"
                          : "text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                      }`}
                      title="Grid view"
                    >
                      <span className="material-symbols-outlined text-lg"><Grid2x2/></span>
                    </button>
                  </div>
                </div>

          {viewMode === "grid" ? <DocumentGrid files={filteredFiles()} isLoading={isLoading} /> : <DocumentList files={filteredFiles()} isLoading={isLoading} />}
          {/* Empty State */}
            {!isLoading && filteredFiles().length === 0 && (
                <div className="bg-slate-50 dark:bg-slate-700/30 py-12 flex flex-col items-center justify-center text-slate-400">
                    <span className="material-symbols-outlined text-4xl mb-2 opacity-20">
                        <Cloud fontSize="large" />
                    </span>
                    <p className="text-sm italic">No documents found</p>
                    <span
                        className="cursor-pointer flex flex-col mt-2 items-center"
                        onClick={() =>getFiles()}
                    >
                        <RotateCw fontSize="medium" />
                        <p className="text-sm text-slate-500 dark:text-slate-400">Reload</p>
                    </span>
                </div>
            )}
          <DocumentTable
            files={filteredFiles()}
            isLoading={isLoading}
            viewMode={viewMode}
            onViewModeChange={handleViewModeChange}
          />
          <div className="sm:hidden">
            <AddFileDialog />
          </div>
        </main>
      </div>
    </>
  );
}
