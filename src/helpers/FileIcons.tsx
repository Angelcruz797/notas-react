import { SquareText, Brush } from 'lucide-react';


export const getFileIcon = (fileType: string) => {
    return fileType === "Draw" ? <Brush /> : <SquareText />;
};

export const getIconBgColor = (fileType: string) => {
    if (fileType === "Draw") {
        return "bg-green-50 dark:bg-green-900/30 text-green-600";
    }
    return "bg-blue-50 dark:bg-blue-900/30 text-primary";
};