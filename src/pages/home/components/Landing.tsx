import { useCallback, useEffect, useState } from "react";
import DocumentTable from "./DocumentTable";
import { useUserStore } from "../../../store/useUserStore";
import useFileQuery from "../../../hook/useFileQuery";

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
          <DocumentTable
            files={filteredFiles()}
            isLoading={isLoading}
            viewMode={viewMode}
            onViewModeChange={handleViewModeChange}
          />
        </main>
      </div>
    </>
  );
}
