import { Skeleton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router";
import {Cloud , MoreHoriz, GridView, ViewList, Article, Brush} from '@mui/icons-material';
import type { FileData } from "../../../interfaces/FileData";

interface DocumentTableProps {
  files: FileData[];
  isLoading: boolean;
  onAddDocument: () => void;
  viewMode: "list" | "grid";
  onViewModeChange: (mode: "list" | "grid") => void;
}

type FilterTab = "All Files" | "Recent" | "Drafts";

export default function DocumentTable({
  files,
  isLoading,
  onAddDocument,
  viewMode,
  onViewModeChange,
}: DocumentTableProps) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<FilterTab>("All Files");

  const handleDocumentClick = useCallback(
    (id: string, fileType: string) => {
      navigate(`/${fileType.toLowerCase()}/${id}`);
    },
    [navigate]
  );

  const getFileIcon = (fileType: string) => {
    return fileType === "Draw" ? <Brush /> : <Article/>;
  };

  const getIconBgColor = (fileType: string) => {
    if (fileType === "Draw") {
      return "bg-green-50 dark:bg-green-900/30 text-green-600";
    }
    return "bg-blue-50 dark:bg-blue-900/30 text-primary";
  };

  // Grid View Component
  const renderGridView = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {/* Add New Document Button */}
      <div
        onClick={onAddDocument}
        className="h-40 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-lg flex flex-col items-center justify-center cursor-pointer transition-all duration-200 bg-white dark:bg-slate-800 hover:border-primary hover:bg-slate-50 dark:hover:bg-slate-700/50"
      >
        <AddIcon className="text-4xl opacity-70 mb-1" />
        <span className="text-sm font-semibold text-slate-900 dark:text-white">
          New Document
        </span>
      </div>

      {/* Loading State */}
      {isLoading
        ? Array(4)
            .fill(null)
            .map((_, index) => (
              <div key={`skeleton-${index}`}>
                <Skeleton
                  variant="rectangular"
                  width="100%"
                  height={160}
                  sx={{ borderRadius: 1, mb: 1 }}
                />
                <Skeleton variant="text" width="80%" height={24} />
              </div>
            ))
        : /* Render Documents */
          files.map((file) => (
            <div
              key={file.id}
              onClick={() => handleDocumentClick(file.id, file.fileType)}
              className="group cursor-pointer transition-all duration-200"
            >
              <div className={`h-40 rounded-lg overflow-hidden flex items-center justify-center transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 ${getIconBgColor(file.fileType)}`}>
                <span className="material-symbols-outlined text-5xl">
                  {getFileIcon(file.fileType)}
                </span>
              </div>

              <p className="text-sm mt-2 truncate font-medium text-slate-900 dark:text-white">
                {file.fileName}
              </p>
            </div>
          ))}
    </div>
  );

  // List View Component
  const renderListView = () => (
    <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden shadow-sm">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-slate-50 dark:bg-slate-700/50 text-slate-500 dark:text-slate-400 uppercase text-[11px] font-bold tracking-wider">
            <th className="px-6 py-4">Name</th>
            <th className="px-6 py-4">Owner</th>
            <th className="px-6 py-4">Last Modified</th>
            <th className="px-6 py-4 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
          {isLoading
            ? Array(5)
                .fill(null)
                .map((_, index) => (
                  <tr key={`skeleton-${index}`} className="hover:bg-slate-50 dark:hover:bg-slate-700/50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <Skeleton variant="circular" width={36} height={36} />
                        <div>
                          <Skeleton width={120} height={16} />
                          <Skeleton width={80} height={12} sx={{ mt: 0.5 }} />
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <Skeleton width={60} height={16} />
                    </td>
                    <td className="px-6 py-4">
                      <Skeleton width={80} height={16} />
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Skeleton width={24} height={24} />
                    </td>
                  </tr>
                ))
            : files.map((file) => (
                <tr
                  key={file.id}
                  className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors group cursor-pointer"
                  onClick={() => handleDocumentClick(file.id, file.fileType)}
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-9 h-9 rounded flex items-center justify-center ${getIconBgColor(
                          file.fileType
                        )}`}
                      >
                        <span className="material-symbols-outlined text-lg">
                          {getFileIcon(file.fileType)}
                        </span>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-slate-900 dark:text-white">
                          {file.fileName}
                        </p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          {file.fileType === "Draw" ? "Drawing" : "Text Document"}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center text-[10px] text-white font-bold">
                        ME
                      </div>
                      <span className="text-sm text-slate-600 dark:text-slate-400">
                        You
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">
                    {new Date(file.lastUpdatedDate).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 transition-colors">
                      <span className="material-symbols-outlined">
                        <MoreHoriz />
                      </span>
                    </button>
                  </td>
                </tr>
              ))}
        </tbody>
      </table>

      {/* Empty State */}
      {!isLoading && files.length === 0 && (
        <div className="bg-slate-50 dark:bg-slate-700/30 py-12 flex flex-col items-center justify-center text-slate-400">
          <span className="material-symbols-outlined text-4xl mb-2 opacity-20">
            <Cloud fontSize="large"/>
          </span>
          <p className="text-sm italic">No documents found</p>
        </div>
      )}

      {/* Footer */}
      {!isLoading && files.length > 0 && (
        <div className="bg-slate-50 dark:bg-slate-700/30 py-3 px-6 text-slate-500 dark:text-slate-400 text-sm">
          Showing {files.length} of {files.length} documents
        </div>
      )}
    </div>
  );

  return (
    <div>
      {/* Header Section */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
            My Documents
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
            {isLoading
              ? "Loading your documents..."
              : `Manage and organize your personal workspace`}
          </p>
        </div>
        <div className="flex items-center gap-1 bg-white dark:bg-slate-800 p-1 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm">
          <button
            onClick={() => onViewModeChange("list")}
            className={`p-2 rounded transition-colors ${
              viewMode === "list"
                ? "bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-white"
                : "text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            }`}
            title="List view"
          >
            <span className="material-symbols-outlined text-lg"><ViewList/></span>
          </button>
          <button
            onClick={() => onViewModeChange("grid")}
            className={`p-2 rounded transition-colors ${
              viewMode === "grid"
                ? "bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-white"
                : "text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            }`}
            title="Grid view"
          >
            <span className="material-symbols-outlined text-lg"><GridView/></span>
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex border-b border-slate-200 dark:border-slate-700 mb-6 gap-6">
        {(["All Files", "Recent", "Drafts"] as FilterTab[]).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-3 text-sm font-medium transition-colors ${
              activeTab === tab
                ? "border-b-2 border-primary text-text-color"
                : "border-b-2 border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Content View */}
      {viewMode === "grid" ? renderGridView() : renderListView()}
    </div>
  );
}
