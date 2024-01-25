import { useEffect, useState } from "react";
import { CapsuleButton, CapsuleButtonStyle } from "../Components/CapsuleButton";
import { APIUser } from "discord-api-types/v10";

export default function AccountHeader() {
    const [displayName, setDisplayName] = useState("");
    const [username, setUsername] = useState("");

    useEffect(() => {
        (async () => {
            const res = await fetch("https://api.cominatyou.com/users/me", { credentials: 'include' });
            const data: APIUser = await res.json();

            if (!res.ok) return console.error(data);

            setDisplayName(data.global_name ?? data.username);
            setUsername(data.username);
        })();
    });

    return (
        <div className="flex justify-between w-full">
            <div className="flex md:gap-8 gap-4 items-center">
                <div className="rounded-full shadow w-24 h-24 account-profile-img"></div>
                <div className="flex flex-col sm:max-w-96 max-w-48">
                    <h1 className="font-bold text-2xl dark:text-neutral-100 select-none overflow-ellipsis overflow-hidden whitespace-nowrap transition duration-200">{displayName}</h1>
                    <h2 className="dark:text-neutral-100 select-none transition duration-200">@{username}</h2>
                </div>
            </div>
            <div className="flex flex-col justify-center items-center">
                <CapsuleButton onClick={() => window.location.href = "/logout"} style={CapsuleButtonStyle.SECONDARY}>Log Out</CapsuleButton>
            </div>
        </div>
    )
}
