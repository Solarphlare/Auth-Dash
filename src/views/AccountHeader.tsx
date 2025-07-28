import { useEffect, useState } from "react";
import { CapsuleButton, CapsuleButtonStyle } from "../Components/CapsuleButton";
import { APIUser } from "discord-api-types/v10";

export default function AccountHeader({ setUserInfo }: { setUserInfo: (userInfo: APIUser) => void }) {
    const [displayName, setDisplayName] = useState("");
    const [username, setUsername] = useState("");

    useEffect(() => {
        (async () => {
            const res = await fetch("https://api.solarphlare.com/users/me", { credentials: 'include' });
            const data: APIUser = await res.json();

            if (!res.ok) return console.error(data);

            setDisplayName(data.global_name ?? data.username);
            setUsername(data.username);
            setUserInfo(data);
        })();
    }, [setUserInfo]);

    return (
        <div className="flex justify-between w-full">
            <div className="flex md:gap-5 gap-4 items-center">
                <div className="rounded-full shadow md:w-24 md:h-24 w-20 h-20 account-profile-img"></div>
                <div className="flex flex-col sm:max-w-96 max-w-48">
                    <h1 className="font-bold text-2xl dark:text-neutral-100 select-none text-ellipsis overflow-hidden whitespace-nowrap md:max-w-fit max-w-28 transition duration-200">{displayName}</h1>
                    <h2 className="dark:text-neutral-100/50 text-black/50 select-none transition duration-200 text-ellipsis overflow-hidden whitespace-nowrap md:max-w-fit max-w-28">@{username}</h2>
                </div>
            </div>
            <div className="flex flex-col justify-center items-center">
                <CapsuleButton onClick={() => window.location.href = "/logout"} style={CapsuleButtonStyle.SECONDARY}>Log Out</CapsuleButton>
            </div>
        </div>
    )
}
