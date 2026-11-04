import { NavLink } from "react-router";
import type { ButtonsNavType } from "../types/ButtonsNavType";

type BottomNavProps = {
  buttonsNav: ButtonsNavType[];
};

export function BottomNav({ buttonsNav }: BottomNavProps) {
  return (
    <nav
      className="fixed bottom-0 inset-x-0 z-30 sm:hidden bg-secondary-500 dark:bg-secondary-800 py-1"
    >
      <ul className="flex h-14 items-stretch justify-around">
        {buttonsNav.map((item) => (
          <li key={item.label} className="flex-1">
            <NavLink
              to={item.to}
              end={item.to === "/"}
              className={({ isActive }) =>
                `flex h-full flex-col items-center justify-center gap-0.5 text-xs transition-colors ${
                  isActive ? "text-text-color font-medium" : "text-text-color hover:text-text-color"
                }`
              }
            >
              <span className="material-symbols-outlined text-xl">{item.icon}</span>
              <span>{item.label}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}