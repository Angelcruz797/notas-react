import { useCallback, useEffect, useState } from "react";
import AddFileDialog from "./AddFileDialog";
import TopBar from "./TopBar";
import DocumentTable from "./DocumentTable";
import Sidebar from "./Sidebar";
import { useUser } from "../../../useContext/user/userContext";
import useFileQuery from "../../../hook/useFileQuery";

export default function Landing() {
  const [openDialog, setOpenDialog] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  const { user } = useUser();
  const { getFiles, isLoading } = useFileQuery();

  // Load files on mount
  useEffect(() => {
    getFiles();
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

  const handleOpenDialog = useCallback(() => {
    setOpenDialog(true);
  }, []);

  const handleCloseDialog = useCallback(() => {
    setOpenDialog(false);
  }, []);

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  const handleViewModeChange = useCallback((mode: "list" | "grid") => {
    setViewMode(mode);
  }, []);

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-slate-950 overflow-hidden">
      {/* Sidebar Navigation */}
      <Sidebar onFileSelect={handleCloseDialog} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <TopBar
          onSearch={handleSearch}
          onAddFile={handleOpenDialog}
          username={user?.username || "User"}
        />

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto bg-white dark:bg-slate-900">
          <main className="max-w-7xl mx-auto py-8 px-8">
            <DocumentTable
              files={filteredFiles()}
              isLoading={isLoading}
              onAddDocument={handleOpenDialog}
              viewMode={viewMode}
              onViewModeChange={handleViewModeChange}
            />
          </main>
        </div>
      </div>

      {/* Add File Dialog */}
      <AddFileDialog
        openDialog={openDialog}
        handleCloseDialog={handleCloseDialog}
      />
    </div>
  );
}
