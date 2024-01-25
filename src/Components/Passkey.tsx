export default function Passkey({ name, id, creationDate, onRename, onDelete }: { name: string, id: string, creationDate: Date, onRename: (passkeyId: string) => void, onDelete: (passkeyId: string) => void }) {
    return (
        <div className="passkey-container py-4 px-6 flex bg-neutral-200 dark:bg-zinc-700 justify-betweenitems-center rounded-3xl md:max-w-[22rem] md:min-w-[22rem] w-full transition-all duration-200">
            <div className="flex gap-4 items-center">
                <svg xmlns="http://www.w3.org/2000/svg" id="Passkey" viewBox="0 0 24 24" width="38" height="38" className="dark:invert transition-all duration-200 mt-1"><g><circle cx="10.5" cy="6" r="4.5"/><path d="M22.5,10.5a3.5,3.5,0,1,0-5,3.15V19L19,20.5,21.5,18,20,16.5,21.5,15l-1.24-1.24A3.5,3.5,0,0,0,22.5,10.5Zm-3.5,0a1,1,0,1,1,1-1A1,1,0,0,1,19,10.5Z"/><path d="M14.44,12.52A6,6,0,0,0,12,12H9a6,6,0,0,0-6,6v2H16V14.49A5.16,5.16,0,0,1,14.44,12.52Z" /></g></svg>
                <div className="flex flex-col text-left">
                    <p className="font-semibold dark:text-white transition-all duration-200 passkey-title max-w-[12rem] whitespace-nowrap overflow-hidden text-ellipsis">{name}</p>
                    <p className="passkey-add-date opacity-40 text-sm dark:text-white transition-all duration-200">Created {creationDate.toLocaleDateString()}</p>
                </div>
            </div>
            <div className="flex justify-end items-center flex-1 gap-0.5">
                <button className="rounded-full p-1.5 lg:hover:bg-[rgb(200,200,200)] active:hover:bg-neutral-400 dark:hover:bg-zinc-500 dark:active:bg-zinc-600 duration-300" onClick={() => onRename(id)}>
                    <svg xmlns="http://www.w3.org/2000/svg" height="22" className="dark:invert" viewBox="0 0 24 24" width="22"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M14.06 9.02l.92.92L5.92 19H5v-.92l9.06-9.06M17.66 3c-.25 0-.51.1-.7.29l-1.83 1.83 3.75 3.75 1.83-1.83c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.2-.2-.45-.29-.71-.29zm-3.6 3.19L3 17.25V21h3.75L17.81 9.94l-3.75-3.75z"/></svg>
                </button>
                <button className="rounded-full p-1.5 hover:bg-[rgb(200_200_200)] active:hover:bg-neutral-400 dark:hover:bg-zinc-500 dark:active:bg-zinc-600 duration-300" onClick={() => onDelete(id)}>
                    <svg xmlns="http://www.w3.org/2000/svg" height="22" className="dark:invert" viewBox="0 -960 960 960" width="22"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>
                </button>
            </div>
        </div>
    )
}
