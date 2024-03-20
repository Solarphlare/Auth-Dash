import { useState, useEffect } from "react";
import { CapsuleButton, CapsuleButtonStyle } from "../Components/CapsuleButton";
import Passkey from "../Components/Passkey";
import { Flipper, Flipped } from "react-flip-toolkit";
import CreatePasskey from "../PasskeyManagement/CreatePasskey";
import { useDialog } from "../ComponentContexts/DialogContext";
import { useTextEntryDialog } from "../ComponentContexts/TextEntryDialogContext";

const GenericPasskeyUADict = [
    { ua: "iPhone OS", name: "iCloud Keychain" },
    { ua: "Mac OS X", name: "iCloud Keychain" },
    { ua: "Windows NT 10.0", name: "Windows Hello" }
];

export default function PasskeysView() {
    const [passkeyButtonStyle, setPasskeyButtonStyle] = useState(CapsuleButtonStyle.PRIMARY);
    const [passkeysList, setPasskeysList] = useState<{ id: string, name: string, created_at: string }[]>([]);
    const { showDialog, hideDialog } = useDialog();
    const { showTextEntryDialog, hideTextEntryDialog } = useTextEntryDialog();

    async function onPasskeyCreateClick() {
        const creationResponse = await CreatePasskey(showDialog, hideDialog);
        if (!creationResponse) return;

        let passkeyName = GenericPasskeyUADict.find(i => navigator.userAgent.includes(i.ua))?.name ?? "";

        if (!creationResponse.transports.includes("internal")) {
            passkeyName = "";
        }

        const existingNamesCount = passkeysList.filter(i => i.name === passkeyName).length;
        if (existingNamesCount > 0) {
            const proposedName = `${passkeyName} ${existingNamesCount + 1}`;
            if (proposedName.length <= 22) {
                passkeyName = proposedName;
            }
            else {
                passkeyName = "";
            }
        }

        showTextEntryDialog({ title: "Passkey Created!", body: "Now, give your passkey a name.", placeholder: "Passkey name", initialText: passkeyName, isCancelable: false, onConfirm: async (name) => {
            hideTextEntryDialog();

            let renameResponse: Response;
            try {
                renameResponse = await fetch(`https://auth.cominatyou.com/users/me/public-keys/${creationResponse.id}`, { method: "PATCH", credentials: 'same-origin', headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name }) });
            }
            catch {
                showDialog({ title: "Failed to rename passkey", body: "Something happened while trying to rename your passkey. Give it another shot, or try again later.", primaryButton: "OK", confirmAction: hideDialog });
                return;
            }

            if (!renameResponse.ok) {
                if (renameResponse.status >= 400 && renameResponse.status < 500) {
                    const message = await renameResponse.json();
                    showDialog({ title: "Failed to rename passkey", body:  message.error_message, primaryButton: "OK" , confirmAction: hideDialog });
                }
                return;
            }

            const newPasskeysList = [...passkeysList];
            const insertIndex = newPasskeysList.findIndex(i => i.name.toLowerCase() > name.toLowerCase());
            newPasskeysList.splice(insertIndex === -1 ? newPasskeysList.length : insertIndex, 0, { id: creationResponse.id, name, created_at: creationResponse.created_at });
            setPasskeysList(newPasskeysList);
        }});
    }

    async function onPasskeyDeleteClick(passkeyId: string) {
        showDialog({ title: "Delete Passkey?", body: "Once you delete this passkey, it's gone forever, and you won't be able to restore or recover it.\n\nMake sure to also delete the passkey from the device you created it on as well.", primaryButton: "Delete", secondaryButton: "Cancel", confirmAction: async () => {
            hideDialog();

            let deleteResponse: Response;
            try {
                deleteResponse = await fetch(`https://auth.cominatyou.com/users/me/public-keys/${passkeyId}`, { method: "DELETE", credentials: 'same-origin' });
            }
            catch {
                showDialog({ title: "Failed to delete passkey", body: "Something happened while trying to delete your passkey. Give it another shot, or try again later.", primaryButton: "OK", confirmAction: hideDialog });
                return;
            }

            if (!deleteResponse.ok) {
                if (deleteResponse.status >= 400 && deleteResponse.status < 500) {
                    const message = await deleteResponse.json();
                    showDialog({ title: "Failed to delete passkey", body:  message.error_message, primaryButton: "OK" , confirmAction: hideDialog });
                }
                return;
            }

            const newPasskeysList = [...passkeysList];
            const passkeyIndex = newPasskeysList.findIndex(i => i.id === passkeyId);
            newPasskeysList.splice(passkeyIndex, 1);
            setPasskeysList(newPasskeysList);
        }});
    }

    async function onPasskeyRenameClick(passkeyId: string) {
        const passkey = passkeysList.find(i => i.id === passkeyId);
        showTextEntryDialog({ title: "Rename Passkey", body: passkey ? `Enter a new name for "${passkey.name}".` : "Enter a new name for your passkey.", placeholder: "Passkey name", initialText: "", isCancelable: true, onConfirm: async (name) => {
            hideTextEntryDialog();

            let renameResponse: Response;
            try {
                renameResponse = await fetch(`https://auth.cominatyou.com/users/me/public-keys/${passkeyId}`, { method: "PATCH", credentials: 'same-origin', headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name }) });
            }
            catch {
                showDialog({ title: "Failed to rename passkey", body: "Something happened while trying to rename your passkey. Give it another shot, or try again later.", primaryButton: "OK", confirmAction: hideDialog });
                return;
            }

            if (!renameResponse.ok) {
                if (renameResponse.status >= 400 && renameResponse.status < 500) {
                    const message = await renameResponse.json();
                    showDialog({ title: "Failed to rename passkey", body:  message.error_message, primaryButton: "OK" , confirmAction: hideDialog });
                }
                return;
            }

            const responseJSON = await renameResponse.json();

            const newPasskeysList = [...passkeysList];
            newPasskeysList.splice(newPasskeysList.findIndex(i => i.id === passkeyId), 1);

            // insert the renamed passkey at the correct index alphabetically by name, case insensitive
            const insertIndex = newPasskeysList.findIndex(i => i.name.toLowerCase() > name.toLowerCase());
            newPasskeysList.splice(insertIndex === -1 ? newPasskeysList.length : insertIndex, 0, { id: passkeyId, name, created_at: responseJSON.created_at });

            setPasskeysList(newPasskeysList);
        }, onCancel: hideTextEntryDialog});
    }

    useEffect(() => {
        (async () => {
            const passkeyData = await fetch("https://api.cominatyou.com/users/me/public-keys", { credentials: 'include' });
            if (!passkeyData.ok) return console.error("Failed to fetch passkeys");

            const passkeys = await passkeyData.json();
            setPasskeysList(passkeys);

            if (window.PublicKeyCredential === undefined) {
                setPasskeyButtonStyle(CapsuleButtonStyle.DISABLED);
            }
        })();
    }, []);

    useEffect(() => {
        if (window.PublicKeyCredential !== undefined) {
            setPasskeyButtonStyle(passkeysList.length >= 8 ? CapsuleButtonStyle.DISABLED : CapsuleButtonStyle.PRIMARY);
        }
    }, [passkeysList]);

    return (
        <div className="flex flex-col md:flex-row justify-center md:justify-between items-start gap-8 md:gap-0 w-full select-none">
            <div className="flex flex-col max-w-[28rem] gap-6">
                <div className="flex flex-col">
                    <h1 className="text-2xl font-bold dark:text-white transition duration-200">Passkeys</h1>
                    <p className="dark:text-white/50 text-black/50 transition duration-200 md:pr-8">Passkeys are a simpler and more secure way to log into your account using only your device's biometrics or credentials.</p>
                </div>
                <div className="mx-[-4px]">
                    <CapsuleButton onClick={onPasskeyCreateClick} style={passkeyButtonStyle}>
                        <div className="flex justify-center items-center gap-1 mr-1.5">
                            <svg xmlns="http://www.w3.org/2000/svg" className={ `${passkeyButtonStyle === CapsuleButtonStyle.DISABLED ? "" : "invert"} dark:invert-0` } height="24" viewBox="0 -960 960 960" width="24"><path d="M440-440H240q-17 0-28.5-11.5T200-480q0-17 11.5-28.5T240-520h200v-200q0-17 11.5-28.5T480-760q17 0 28.5 11.5T520-720v200h200q17 0 28.5 11.5T760-480q0 17-11.5 28.5T720-440H520v200q0 17-11.5 28.5T480-200q-17 0-28.5-11.5T440-240v-200Z"/></svg>
                            Add a Passkey
                        </div>
                    </CapsuleButton>
                </div>
            </div>
            <div className="flex flex-col gap-2 w-full md:w-auto">
                <h3 className={`text-black/50 dark:text-white/50 text-sm md:ml-4 ml-1 font-semibold ${passkeysList.length === 0 ? "hidden" : ""}`}>Your Passkeys</h3>
                    <Flipper flipKey={passkeysList.map(i => `${i.name}-${i.id}` ).join("")} className="flex flex-col gap-2.5">
                        {
                            passkeysList.map(passkey => (
                                <Flipped key={passkey.id} flipId={`${passkey.name}-${passkey.id}`}>
                                    {flippedProps => <Passkey {...passkey} creationDate={new Date(passkey.created_at)} flippedProps={flippedProps} onRename={onPasskeyRenameClick} onDelete={onPasskeyDeleteClick} />}
                                </Flipped>
                            ))
                        }
                    </Flipper>
            </div>
        </div>
    )
}
