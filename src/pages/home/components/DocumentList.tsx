import { useState } from "react";
import {
    createColumnHelper, createPaginatedRowModel, createSortedRowModel,
    columnVisibilityFeature, rowPaginationFeature, rowSortingFeature,
    sortFn_alphanumeric, sortFn_text, tableFeatures,
    useTable, type PaginationState, type SortingState,
} from "@tanstack/react-table";
import { Skeleton } from "@mui/material";
import { ArrowDown, ArrowUp, ChevronLeft, ChevronRight, Trash, Edit, EllipsisVertical, ChevronsUpDown, } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Dropdown from "@/components/Dropdown";
import { getFileIcon, getIconBgColor } from "@/helpers/FileIcons";
import type { FileData } from "@/interfaces/FileData";
import { useNavigate } from "react-router";

/* ───────────── Features ───────────── */
const features = tableFeatures({
    columnVisibilityFeature,
    rowSortingFeature,
    rowPaginationFeature,
    sortedRowModel: createSortedRowModel(),
    paginatedRowModel: createPaginatedRowModel(),
    sortFns: { alphanumeric: sortFn_alphanumeric, text: sortFn_text },
});
type DataTableFeatures = typeof features;


/* ───────────── Columns ───────────── */
const columnHelper = createColumnHelper<DataTableFeatures, FileData>();

const columns = columnHelper.columns([
    columnHelper.accessor("fileName", {
        id: "name",
        header: "Name",
        cell: ({ row }) => {
            const file = row.original;
            return (
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
            );
        },
    }),
    columnHelper.display({
        id: "owner",
        header: "Owner",
        cell: () => (
            <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center text-[10px] text-white font-bold">
                    ME
                </div>
                <span className="text-sm text-slate-600 dark:text-slate-400">You</span>
            </div>
        ),
    }),
    columnHelper.accessor((row) => new Date(row.lastUpdatedDate).getTime(), {
        id: "lastModified",
        header: "Last Modified",
        cell: ({ row }) => (
            <span className="text-sm text-slate-600 dark:text-slate-400">
                {new Date(row.original.lastUpdatedDate).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                })}
            </span>
        ),
    }),
    columnHelper.display({
        id: "actions",
        header: "Actions",
        cell: () => (
            <Dropdown
            trigger={
                <button className="text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 transition-colors">
                        <span className="material-symbols-outlined">
                            <EllipsisVertical />
                        </span>
                    </button>
                }
                items={[
                    { label: "Rename", icon: <Edit /> },
                    { label: "Delete", icon: <Trash /> },
                ]}
                />
            ),
        }),
    ]);
    
const headClass =
"h-auto px-6 py-4 text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400";
const rowClass =
"border-slate-100 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors";
const cellClass = "px-6 py-4 whitespace-normal";
const pageBtnClass =
"p-1 rounded border border-slate-200 dark:border-slate-600 hover:bg-white dark:hover:bg-slate-600 disabled:opacity-40 disabled:cursor-not-allowed transition-colors";
    
interface DocumentListViewProps {
    files: FileData[];
    isLoading: boolean;
}
    
/* ───────────── Component  ───────────── */
export default function DocumentList({
    files,
    isLoading,
}: DocumentListViewProps) {
    const [sorting, setSorting] = useState<SortingState>([{ id: "lastModified", desc: true }]);
    const [pagination, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: 10,
    });
    const navigate = useNavigate();

    const table = useTable({
        features,
        data: files,
        columns,
        onSortingChange: setSorting,
        onPaginationChange: setPagination,
        state: { sorting, pagination },
    });

    return (
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden shadow-sm">
            <Table className="text-left border-collapse">
                <TableHeader className="[&_tr]:border-b-0">
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow
                            key={headerGroup.id}
                            className="bg-slate-50 dark:bg-slate-700/50 hover:bg-slate-50 dark:hover:bg-slate-700/50"
                        >
                            {headerGroup.headers.map((header) => (
                                <TableHead
                                    key={header.id}
                                    className={`${headClass} ${header.column.id === "actions" ? "text-right" : ""
                                        }`}
                                >
                                    {header.isPlaceholder ? null : header.column.getCanSort() ? (
                                        <button
                                            type="button"
                                            className="inline-flex items-center gap-1 uppercase hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
                                            onClick={() =>
                                                header.column.toggleSorting(
                                                    header.column.getIsSorted() === "asc"
                                                )
                                            }
                                        >
                                            <table.FlexRender header={header} />
                                            {header.column.getIsSorted() === "asc" ? (
                                                <ArrowUp className="h-3.5 w-3.5" />
                                            ) : header.column.getIsSorted() === "desc" ? (
                                                <ArrowDown className="h-3.5 w-3.5" />
                                            ) : (
                                                <ChevronsUpDown className="h-3.5 w-3.5 opacity-50" />
                                            )}
                                        </button>
                                    ) : (
                                        <table.FlexRender header={header} />
                                    )}
                                </TableHead>
                            ))}
                        </TableRow>
                    ))}
                </TableHeader>

                <TableBody>
                    {isLoading
                        ? Array(5)
                            .fill(null)
                            .map((_, index) => (
                                <TableRow key={`skeleton-${index}`} className={rowClass}>
                                    <TableCell className={cellClass}>
                                        <div className="flex items-center gap-3">
                                            <Skeleton className="h-9 w-9 rounded-full" />
                                            <div>
                                                <Skeleton className="h-4 w-30" />
                                                <Skeleton className="mt-1 h-3 w-20" />
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell className={cellClass}>
                                        <Skeleton className="h-4 w-15" />
                                    </TableCell>
                                    <TableCell className={cellClass}>
                                        <Skeleton className="h-4 w-20" />
                                    </TableCell>
                                    <TableCell className={`${cellClass} text-right`}>
                                        <Skeleton className="ml-auto h-6 w-6" />
                                    </TableCell>
                                </TableRow>
                            ))
                        : table.getRowModel().rows.map((row) => (
                            <TableRow
                                key={row.id}
                                className={`${rowClass} group cursor-pointer`}
                                onClick={() =>
                                    navigate(`/view/${row.original.fileType.toLowerCase()}/${row.original.id}`)
                                }
                            >
                                {row.getVisibleCells().map((cell) => {
                                    const isActions = cell.column.id === "actions";
                                    return (
                                        <TableCell
                                            key={cell.id}
                                            className={`${cellClass} ${isActions ? "text-right" : ""}`}
                                            onClick={isActions ? (e) => e.stopPropagation() : undefined}
                                        >
                                            <table.FlexRender cell={cell} />
                                        </TableCell>
                                    );
                                })}
                            </TableRow>
                        ))}
                </TableBody>
            </Table>

            {/* Footer */}
            {!isLoading && files.length > 0 && (
                <div className="bg-slate-50 dark:bg-slate-700/30 py-3 px-6 text-slate-500 dark:text-slate-400 text-sm flex items-center justify-between">
                    <span>
                        Showing {pagination.pageIndex * pagination.pageSize + 1}–
                        {Math.min(
                            (pagination.pageIndex + 1) * pagination.pageSize,
                            files.length
                        )}{" "}
                        of {files.length} documents
                    </span>

                    <div className="flex items-center gap-3">
                        <span>
                            Page {pagination.pageIndex + 1} of {table.getPageCount()}
                        </span>
                        <div className="flex items-center gap-1">
                            <button
                                type="button"
                                onClick={() => table.previousPage()}
                                disabled={!table.getCanPreviousPage()}
                                className={pageBtnClass}
                            >
                                <ChevronLeft fontSize="small" />
                            </button>
                            <button
                                type="button"
                                onClick={() => table.nextPage()}
                                disabled={!table.getCanNextPage()}
                                className={pageBtnClass}
                            >
                                <ChevronRight fontSize="small" />
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}