import { startRegistration } from "@simplewebauthn/browser";
import { ShowDialogProps } from "../ComponentContexts/DialogContext";
import turnstileRender from "../util/turnstile";
import { RegistrationResponseJSON } from '@simplewebauthn/typescript-types';

export default async function CreatePasskey(showDialog: (options: ShowDialogProps) => void, hideDialog: () => void) {
    let registrationOptsToken: string
    try {
        registrationOptsToken = await turnstileRender("#root", {
            sitekey: "0x4AAAAAABoB88S_MNbuZG5w"
        });
    }
    catch (e) {
        showDialog({ title: "Failed to process request", body: "Something happened while we were trying to process your request. Give it another shot, or try again later.", primaryButton: "OK", confirmAction: hideDialog });
        return;
    }

    let passkeyCreateOptions: Response;
    try {
        passkeyCreateOptions = await fetch("https://auth.solarphlare.com/auth/public-key/create-registration-options", {
            method: "POST",
            credentials: "same-origin",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ turnstileToken: registrationOptsToken })
        });
    }
    catch {
        showDialog({ title: "Something went wrong", body: "Something happened when we were trying to prepare for you to create a passkey. Give it another shot, or try again in a bit.", primaryButton: "OK", confirmAction: hideDialog });
        return;
    }

    if (!passkeyCreateOptions.ok) {
        showDialog({ title: "Something went wrong", body: "Something happened when we were trying to prepare for you to create a passkey. Give it another shot, or try again in a bit.", primaryButton: "OK", confirmAction: hideDialog });
        return;
    }

    const attestationOptions = await passkeyCreateOptions.json();
    let attestationResponse: RegistrationResponseJSON;

    try {
        attestationResponse = await startRegistration(attestationOptions);
    }
    catch (e) {
        return;
    }

    let creationResponse: Response;
    try {
        creationResponse = await fetch("https://auth.solarphlare.com/auth/public-key/register", {
            method: "POST",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ attId: attestationOptions.attId, ...attestationResponse })
        });
    }
    catch {
        showDialog({ title: "Something went wrong", body: "Something happened when we were trying to prepare for you to create a passkey. Give it another shot, or try again in a bit.", primaryButton: "OK", confirmAction: hideDialog });
        return;
    }

    if (!creationResponse.ok) {
        showDialog({ title: "Something went wrong", body: "Something happened when we were trying to prepare for you to create a passkey. Give it another shot, or try again in a bit.", primaryButton: "OK", confirmAction: hideDialog });
        return;
    }

    const creationResponseBody: { id: string, name: string, created_at: string, aaguid: string } = await creationResponse.json();

    return {...creationResponseBody, transports: attestationResponse.response.transports ?? [] };
}
