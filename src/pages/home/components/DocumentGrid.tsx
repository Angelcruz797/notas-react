import { Skeleton } from "@/components/ui/skeleton";
import { getFileIcon, getIconBgColor } from "@/helpers/FileIcons";
import useFileQuery from "@/hook/useFileQuery";
import type { FileData } from "@/interfaces/FileData";
import { useNavigate } from "react-router";

type DocumentGridProps = {
    files: FileData[];
};

const DocumentGrid = ({ files }: DocumentGridProps) => {
    const {isLoading} = useFileQuery();
    const navigate = useNavigate();

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {/* Loading State */}
            {isLoading
                ? Array(4)
                    .fill(null)
                    .map((_, index) => (
                        <div key={`skeleton-${index}`}>
                            <Skeleton
                                className="h-40 rounded-lg w-full mb-0.5"
                            />
                            <Skeleton className="w-4/5 h-6" />
                        </div>
                    ))
                : /* Render Documents */
                files.map((file) => (
                    <div
                        key={file.id}
                        onClick={() => navigate(`/view/${file.fileType.toLowerCase()}/${file.id}`)}
                        className="group cursor-pointer transition-all duration-200"
                    >
                        <div className={`h-40 rounded-lg overflow-hidden flex items-center justify-center 
                            transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 border border-slate-200
                            dark:border-slate-800 bg-white dark:bg-slate-800 ${getIconBgColor(file.fileType)}`}>
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
}

export default DocumentGrid