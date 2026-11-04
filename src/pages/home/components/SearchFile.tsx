import { useCallback } from "react";
import { useUserStore } from "../../../store/useUserStore";
import { Search } from "lucide-react";

interface SearchFileProps {
    autoFocus?: boolean;
    onBlur?: () => void;
}

export const SearchFile = ({ autoFocus, onBlur }: SearchFileProps) => {
    const {searchQuery ,setSearchQuery } = useUserStore();

    const handleSearchChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const query = e.target.value;
            setSearchQuery(query);
        },
        [setSearchQuery]
    );

    return (
        <div className="relative w-full sm:max-w-sm">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 flex items-center">
                <Search />
            </span>
            <input
                type="text"
                id="search-file"
                autoFocus={autoFocus}
                onBlur={onBlur}
                placeholder="Search your documents..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="w-full h-9 pl-10 pr-4 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50
                dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2
                focus:ring-primary focus:border-transparent text-sm"
            />
        </div>
    );
};