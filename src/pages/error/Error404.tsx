import { useNavigate } from "react-router";
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";
import HomeIcon from "@mui/icons-material/Home";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function Error404() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-1 items-center justify-center bg-white dark:bg-slate-900 min-h-[70vh] px-6">
      <div className="flex flex-col items-center text-center max-w-md">
        <SentimentDissatisfiedIcon
          className="text-primary-500 dark:text-primary-400"
          style={{ fontSize: 96 }}
        />

        <h1 className="mt-4 text-7xl font-bold text-primary-800 dark:text-primary-200">
          404
        </h1>

        <h2 className="mt-2 text-2xl font-semibold text-primary-700 dark:text-primary-300">
          Page not found
        </h2>

        <p className="mt-3 text-primary-600 dark:text-slate-400">
          The page you're looking for doesn't exist or may have been moved.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 rounded-lg border border-secondary-600 px-5 py-2.5 font-medium text-primary-700 transition-colors hover:bg-secondary-200 dark:border-slate-700 dark:text-primary-200 dark:hover:bg-slate-800"
          >
            <ArrowBackIcon fontSize="small" />
            Go back
          </button>

          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 rounded-lg bg-primary-600 px-5 py-2.5 font-medium text-white transition-colors hover:bg-primary-700"
          >
            <HomeIcon fontSize="small" />
            Back to home
          </button>
        </div>
      </div>
    </div>
  );
}
