import type { DropdownItem } from "@/types/DropdownItem";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { cloneElement, Fragment, type ReactElement } from "react";

type DropdownProps = {
  trigger: ReactElement<any>;
  items: DropdownItem[];
  id?: string;
  side?: "top" | "right" | "bottom" | "left";
  align?: "start" | "center" | "end";
}

export default function Dropdown({
  trigger,
  items,
  id = "dropdown-menu",
  side = "top",
  align = "end",
}: DropdownProps) {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>{trigger}</DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          side={side}
          align={align}
          sideOffset={6}
          className="z-50 min-w-40 rounded-lg border border-slate-200 dark:border-slate-700 p-1 shadow-lg
            bg-primary-100 dark:bg-primary-800 text-text-color"
          id={id}
        >
          {items.map((item) => (
            <Fragment key={item.label}>
              <DropdownMenu.Item
                onSelect={item.onClick}
                className="flex cursor-pointer select-none items-center gap-2 rounded-md px-3 py-2 text-sm outline-none
                data-[highlighted]:bg-primary-400 dark:data-[highlighted]:bg-primary-900"
              >
                {item.icon &&
                  cloneElement(item.icon, { fontSize: "small" })}
                {item.label}
              </DropdownMenu.Item>

              {item.dividerAfter && (
                <DropdownMenu.Separator className="my-1 h-px bg-slate-300 dark:bg-slate-600" />
              )}
            </Fragment>
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}