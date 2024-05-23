import SessionIntf from "../Types/Session";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";

TimeAgo.addDefaultLocale(en);
const timeAgo = new TimeAgo("en-US");

export default function Session({ session, onDelete, flippedProps = undefined, deletable = true }: { session: SessionIntf, onDelete: (sessionId: string) => void, flippedProps?: object, deletable?: boolean }) {
    function getIcon(device: string) {
        switch (device) {
            case "Mac": {
                return <svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" className="dark:fill-white transition-all duration-200 mt-1"><path d="M64.67-160Q37.99-160 19-179.58 0-199.17 0-226.67h147.33q-27 0-46.83-19.83t-19.83-46.83v-480q0-27 19.83-46.84Q120.33-840 147.33-840h665.34q27 0 46.83 19.83 19.83 19.84 19.83 46.84v480q0 27-19.83 46.83t-46.83 19.83H960q0 27.67-19.58 47.17-19.59 19.5-47.09 19.5H64.67ZM480-188q15.3 0 25.65-10.35Q516-208.7 516-224q0-15.3-10.35-25.65Q495.3-260 480-260q-15.3 0-25.65 10.35Q444-239.3 444-224q0 15.3 10.35 25.65Q464.7-188 480-188ZM147.33-293.33h665.34v-480H147.33v480Zm0 0v-480 480Z"/></svg>
            }
            case "iPhone": {
                return <svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" className="dark:fill-white transition-all duration-200 mt-1"><path d="M266.67-40q-27 0-46.84-19.83Q200-79.67 200-106.67v-746.66q0-27 19.83-46.84Q239.67-920 266.67-920h426.66q27 0 46.84 19.83Q760-880.33 760-853.33v746.66q0 27-19.83 46.84Q720.33-40 693.33-40H266.67Zm0-166.67v100h426.66v-100H266.67Zm213.45 83.34q14.21 0 23.71-9.62t9.5-23.83q0-14.22-9.61-23.72-9.62-9.5-23.84-9.5-14.21 0-23.71 9.62-9.5 9.61-9.5 23.83 0 14.22 9.61 23.72 9.62 9.5 23.84 9.5Zm-213.45-150h426.66v-480H266.67v480Zm0-546.67h426.66v-33.33H266.67V-820Zm0 613.33v100-100Zm0-613.33v-33.33V-820Z"/></svg>
            }
            case "iPad": {
                return <svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" className="dark:fill-white transition-all duration-200 mt-1"><path d="M480.12-123.33q14.21 0 23.71-9.62t9.5-23.83q0-14.22-9.61-23.72-9.62-9.5-23.84-9.5-14.21 0-23.71 9.62-9.5 9.61-9.5 23.83 0 14.22 9.61 23.72 9.62 9.5 23.84 9.5ZM186.67-40q-27.5 0-47.09-19.58Q120-79.17 120-106.67v-746.66q0-27.5 19.58-47.09Q159.17-920 186.67-920h586.66q27.5 0 47.09 19.58Q840-880.83 840-853.33v746.66q0 27.5-19.58 47.09Q800.83-40 773.33-40H186.67Zm0-166.67v100h586.66v-100H186.67Zm0-66.66h586.66v-480H186.67v480Zm0-546.67h586.66v-33.33H186.67V-820Zm0 0v-33.33V-820Zm0 613.33v100-100Z"/></svg>
            }
            case "Windows": {
                return <svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" className="dark:fill-white transition-all duration-200 mt-1"><path d="M329.33-120v-66.67h84V-280H146.67q-27 0-46.84-19.83Q80-319.67 80-346.67v-426.66q0-27 19.83-46.84Q119.67-840 146.67-840h666.66q27 0 46.84 19.83Q880-800.33 880-773.33v426.66q0 27-19.83 46.84Q840.33-280 813.33-280H546.67v93.33h84V-120H329.33ZM146.67-346.67h666.66v-426.66H146.67v426.66Zm0 0v-426.66 426.66Z"/></svg>
            }
            default: {
                return <svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" className="dark:fill-white transition-all duration-200 mt-1"><path d="M266.67-40q-27 0-46.84-19.83Q200-79.67 200-106.67v-746.66q0-27 19.83-46.84Q239.67-920 266.67-920h426.66q27 0 46.84 19.83Q760-880.33 760-853.33v746.66q0 27-19.83 46.84Q720.33-40 693.33-40H266.67Zm0-100v33.33h426.66V-140H266.67Zm0-66.67h426.66v-546.66H266.67v546.66Zm0-613.33h426.66v-33.33H266.67V-820Zm0 0v-33.33V-820Zm0 680v33.33V-140Z"/></svg>
            }
        }
    }

    return (
        <div className="py-4 px-6 flex bg-neutral-200 dark:bg-zinc-700 shadow justify-between items-center rounded-3xl md:max-w-[22rem] md:min-w-[22rem] w-full" {...flippedProps}>
            <div className="flex gap-4 items-center">
                <div className="w-[38px] h-[38px] flex justify-center items-center">
                    {getIcon(session.device)}
                </div>
                <div className="flex flex-col text-left overflow-hidden">
                    <p className="font-semibold dark:text-white transition-all duration-200 passkey-title max-w-48 whitespace-nowrap overflow-hidden text-ellipsis">{session.device}</p>
                    <p className="text-sm text-black/40 dark:text-white/40 transition-all duration-200 overflow-hidden text-ellipsis whitespace-nowrap max-w-48">{session.location}</p>
                    {deletable && <p className="text-sm text-black/40 dark:text-white/40 transition-all duration-200">Last seen {timeAgo.format(new Date(session.last_seen))}</p>}
                </div>
            </div>
            {deletable && (
                <div className="flex justify-end items-center flex-1 gap-0.5">
                    <button onClick={() => onDelete(session.id)} className="rounded-full p-1.5 hover:bg-[rgb(200_200_200)] active:hover:bg-neutral-400 dark:hover:bg-zinc-500 dark:active:bg-zinc-600 duration-300 transition">
                        <svg xmlns="http://www.w3.org/2000/svg" height="22" className="dark:fill-white transition duration-200" viewBox="0 -960 960 960" width="22"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" /></svg>
                    </button>
                </div>
            )}
        </div>
    );
}
