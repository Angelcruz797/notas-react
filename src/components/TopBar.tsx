interface TopBarProps  {
  left?: React.ReactNode;
  center?: React.ReactNode;
  right?: React.ReactNode;
}

export default function TopBar({ left, center, right }: TopBarProps) {
  return (
    <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 h-16 px-6 flex items-center shadow-sm">
      <div className="flex-1 flex items-center">
        {left}
      </div>
      <div className="flex-1 flex items-center justify-center">
        {center}
      </div>
      <div className="flex-1 flex items-center justify-end gap-3">
        {right}
      </div>
    </header>
  );
}
