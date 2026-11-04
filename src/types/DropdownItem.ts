import type { ReactElement } from "react";

export type DropdownItem = {
  icon?: ReactElement<any>;
  label: string;
  onClick?: () => void;
  dividerAfter?: boolean;
}