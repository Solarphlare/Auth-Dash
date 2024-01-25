import { ReactNode } from "react";

type CapsuleButtonProps = {
    style: CapsuleButtonStyle,
    onClick: () => void,
    children: ReactNode
}

export enum CapsuleButtonStyle {
    PRIMARY,
    SECONDARY,
    DANGEROUS,
    DISABLED
}

export function CapsuleButton({ onClick, style, children }: CapsuleButtonProps) {
    switch (style) {
        case CapsuleButtonStyle.PRIMARY: {
            return (
                <button onClick={onClick} className="bg-black dark:bg-neutral-200 text-white dark:text-black shadow lg:hover:shadow-lg lg:hover:scale-110 active:scale-90 lg:active:scale-90  rounded-full py-2 px-4 font-semibold transition duration-200 select-none">
                    {children}
                </button>
            )
        }
        case CapsuleButtonStyle.SECONDARY: {
            return (
                <button onClick={onClick} className="bg-neutral-200 dark:bg-zinc-700 dark:text-white shadow lg:hover:shadow-lg lg:hover:scale-110 active:scale-90 lg:active:scale-90 rounded-full py-2 px-4 font-semibold transition duration-200 select-none">
                    {children}
                </button>
            )
        }
        case CapsuleButtonStyle.DANGEROUS: {
            return (
                <button onClick={onClick} className="bg-neutral-200 text-red-600 dark:bg-zinc-700 dark:text-red-500 shadow lg:hover:shadow-lg lg:hover:scale-110 active:scale-90 lg:active:scale-90  rounded-full py-2 px-4 font-semibold transition duration-200 select-none">
                    {children}
                </button>
            )
        }
        case CapsuleButtonStyle.DISABLED: {
            return (
                <button className="bg-neutral-200 dark:bg-zinc-700 dark:text-white shadow rounded-full py-2 px-4 font-semibold transition duration-200 cursor-default opacity-50 select-none">
                    {children}
                </button>
            )
        }
    }
}
