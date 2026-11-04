import { useState } from "react";
import { motion } from "motion/react";
import { Search } from "lucide-react";
import { SearchFile } from "./SearchFile";

export const SearchToggle = () => {
    const [open, setOpen] = useState(false);

    return (
        <>
            {/* Botón: solo entre sm y lg, y solo si está cerrado */}
            {!open && (
                <button
                    type="button"
                    aria-label="Buscar"
                    onClick={() => setOpen(true)}
                    className="hidden sm:max-lg:flex h-9 w-9 items-center justify-center rounded-lg
            text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                    <Search />
                </button>
            )}

            {/* Input: siempre visible fuera de sm–lg; dentro de ese rango, solo si open */}
            <div className={open ? "flex-1" : "flex-1 sm:max-lg:hidden"}>
                {open ? (
                    <motion.div
                        className="p-0.5" // espacio para que el ring no se corte
                        initial={{ clipPath: "inset(0 100% 0 0)" }}
                        animate={{ clipPath: "inset(0 0% 0 0)" }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                    >
                        <SearchFile autoFocus onBlur={() => setOpen(false)} />
                    </motion.div>
                ) : (
                    <SearchFile />
                )}
            </div>
        </>
    );
};