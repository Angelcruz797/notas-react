import { AppBar, Toolbar, Typography } from "@mui/material";
import GridViewIcon from '@mui/icons-material/GridView';
import { useNavigate } from "react-router";

type TopbarProps = {
  title: string | Promise<string>;
  children?: React.ReactNode;
}

export default function Topbar({ title, children }: TopbarProps) {
  const navigate = useNavigate();

  return (
    <AppBar 
      position="static" 
      className="shadow-none"
      sx={{
        backgroundColor: "transparent",
      }}
    >
      <Toolbar
        className="h-14 min-h-14 px-4 py-3 flex items-center bg-white! dark:bg-slate-900! border-b border-slate-200 dark:border-slate-800 justify-between gap-2"
      >
        {/* Left Section - Document Branding */}
        <div className="flex items-center gap-2 shrink-0">
          <Typography
            variant="body1"
            className="text-gray-400 text-sm font-medium tracking-wider cursor-pointer"
            onClick={() => navigate('/')}
          >
            <GridViewIcon className="text-gray-400 mr-1.5" fontSize="small" />
            Document
          </Typography>
          <Typography className="dark:text-white/60 text-black/60 text-sm">/</Typography>
          <Typography
            variant="h6"
            className="dark:text-white text-black text-sm font-semibold max-w-xs overflow-hidden text-ellipsis whitespace-nowrap"
          >
            {title}
          </Typography>
        </div>

        {/* Center Section - Custom children */}
        {children && (
          <div className="flex-1 flex justify-center">
            {children}
          </div>
        )}

        {/* Right Section - save section */}
        <div className="flex items-center gap-2 shrink-0">
        </div>
      </Toolbar>
    </AppBar>
  );
}
