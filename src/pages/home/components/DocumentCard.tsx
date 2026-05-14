import { Skeleton } from "@mui/material";
import DescriptionIcon from "@mui/icons-material/Description";
import ColorLensIcon from "@mui/icons-material/ColorLens";
import { useColor } from "../../../useContext/colorMode/ColorContext";
import { useCallback } from "react";

interface DocumentCardProps {
  id: string;
  fileName: string;
  fileType: "Draw" | "Text";
  isLoading?: boolean;
  onSelect?: (id: string, fileType: string) => void;
}

export default function DocumentCard({
  id,
  fileName,
  fileType,
  isLoading = false,
  onSelect,
}: DocumentCardProps) {
  const { colors } = useColor();

  const handleClick = useCallback(() => {
    onSelect?.(id, fileType);
  }, [id, fileType, onSelect]);

  if (isLoading) {
    return (
      <div>
        <Skeleton
          variant="rectangular"
          width="100%"
          height={160}
          className="rounded-lg mb-1"
        />
        <Skeleton variant="text" width="80%" height={24} />
      </div>
    );
  }

  const Icon = fileType === "Draw" ? ColorLensIcon : DescriptionIcon;

  return (
    <div
      title={fileName}
      className="group cursor-pointer transition-all duration-200"
    >
      <div
        onClick={handleClick}
        className="h-40 rounded-lg overflow-hidden flex items-center justify-center transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5"
        style={{
          backgroundColor: colors.primary[600],
          border: `1px solid ${colors.primary[700]}`,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = colors.primary[700];
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = colors.primary[600];
        }}
      >
        <Icon
          sx={{
            fontSize: 48,
            color: colors.letters,
            opacity: 0.7,
          }}
        />
      </div>

      <p
        className="text-sm mt-2 truncate font-medium"
        style={{ color: colors.letters }}
      >
        {fileName}
      </p>
    </div>
  );
}
