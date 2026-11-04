interface TopBarProps {
  left?: React.ReactNode;
  center?: React.ReactNode;
  right?: React.ReactNode;
}

export default function TopBar({ left, center, right }: TopBarProps) {
  return (
    <header
      className={`bg-white dark:bg-slate-900 border-b border-slate-200 
    dark:border-slate-800 sm:h-16 ${center? 'max-sm:h-30 max-sm:pb-3':'max-sm:h-16'} px-6 flex content-center flex-wrap items-center shadow-sm`}
    >
      <div className="flex shrink-0 items-center">
        {left}
      </div>
      <div
        className="flex items-center min-w-0
        sm:flex-12 max-sm:order-3 max-sm:basis-full max-sm:flex-none"
      >
        {center}
      </div>
      <div className="flex-1 flex items-center justify-end gap-3 max-sm:gap-1 shrink-0">
        {right}
      </div>
    </header>
  );
}
