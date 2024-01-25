import { useDialog } from "../ComponentContexts/DialogContext";

export default function Dialog() {
    const { isVisible, title, body, primaryButton, secondaryButton, hideDialog, confirmAction } = useDialog();
    return (
        <div className={`${isVisible ? "" : "opacity-0 pointer-events-none"} dialog-container fixed w-full h-full top-[50%] left-[50%] dialog-transform z-20 bg-opacity-40 bg-black flex flex-col justify-center items-center select-none`}>
        <div className={`flex-col py-6 lg:bg-neutral-300 bg-neutral-200 dialog-box dark:bg-zinc-700 lg:dark:bg-zinc-700 [border-radius:_2rem] text-center max-w-[325px] min-w-[325px] gap-6 shadow-2xl ${isVisible ? "flex" : "hidden"}`}>
            <div className="flex flex-col gap-2 px-8 items-center">
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" className="dark:fill-neutral-200"><path d="M11 15h2v2h-2v-2zm0-8h2v6h-2V7zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"></path></svg>
                <h1 className="text-xl font-bold dark:text-neutral-200">{title}</h1>
                <p className="dark:text-neutral-200 leading-[1.3rem] whitespace-pre-wrap">{body}</p>
            </div>
            <div className="px-6 gap-2 flex" id="dialog-button-container">
                <button type="button" onClick={hideDialog} className={`${secondaryButton ? "" : "hidden"} dark:text-neutral-200 focus:outline-none lg:dark:hover:text-black bg-neutral-400/30 dark:bg-zinc-500/40 lg:bg-neutral-400/40 lg:dark:bg-zinc-500/50 py-1.5 w-full font-semibold rounded-[10px] lg:hover:scale-105 lg:hover:bg-white lg:hover:shadow-lg ease-in-out duration-300 lg:active:scale-100 active:scale-90 lg:active:shadow-none`}>{secondaryButton ? secondaryButton : ""}</button>
                <button type="button" onClick={confirmAction} className="dark:text-neutral-200 focus:outline-none lg:dark:hover:text-black bg-neutral-400/30 dark:bg-zinc-500/40 lg:bg-neutral-400/40 lg:dark:bg-zinc-500/50 py-1.5 w-full font-semibold rounded-[10px] lg:hover:scale-105 lg:hover:bg-white lg:hover:shadow-lg ease-in-out duration-300 lg:active:scale-100 active:scale-90 lg:active:shadow-none">{primaryButton}</button>
            </div>
        </div>
    </div>
    )
}
