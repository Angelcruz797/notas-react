import type { ReactNode } from "react";
import { Drawer, DrawerContent, DrawerTitle } from "@/components/ui/drawer";

interface ResponsiveDrawerProps {
    mobileSidebarOpen: boolean;
    onClose: () => void;
    children: ReactNode;
}

const asideStyle =
    "w-56 shrink-0 dark:bg-secondary-800 bg-secondary-200 border-r border-slate-200 dark:border-slate-800 flex flex-col";

export default function ResponsiveDrawer({
    mobileSidebarOpen,
    onClose,
    children,
}: ResponsiveDrawerProps) {
    return (
        <>
            {/* lg+: fijo */}
            <aside className={`max-lg:hidden ${asideStyle}`}>{children}</aside>

            {/* menor a lg: el hamburger ya está oculto en max-sm, así que ahí nunca se abre */}
            <Drawer
                direction="left"
                open={mobileSidebarOpen}
                onOpenChange={(open) => !open && onClose()}
            >
                <DrawerContent
                    className={`lg:hidden w-56! max-w-56! rounded-none ${asideStyle}`}
                >
                    <DrawerTitle className="sr-only">Menú de navegación</DrawerTitle>
                    {children}
                </DrawerContent>
            </Drawer>
        </>
    );
}