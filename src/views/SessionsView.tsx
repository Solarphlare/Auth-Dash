import { useEffect, useState } from "react";
import Session from "../Types/Session";
import SessionComponent from "../Components/Session";
import { Flipped } from "react-flip-toolkit";
import { useDialog } from "../ComponentContexts/DialogContext";

export default function SessionsView() {
    const [currentSession, setCurrentSession] = useState<Session | null>(null);
    const [sessionsList, setSessionsList] = useState<Session[]>([]);
    const { showDialog, hideDialog } = useDialog();

    useEffect(() => {
        (async () => {
            const sessionsRequest = await fetch("https://api.solarphlare.com/users/me/sessions", { credentials: 'include' });

            if (!sessionsRequest.ok) {
                return console.error("Failed to fetch sessions");
            }

            const sessions: { currentSession: Session, sessions: Session[]; } = await sessionsRequest.json();

            setSessionsList([...sessions.sessions]);
            setCurrentSession(sessions.currentSession);
        })();
    }, []);

    function onSessionDeleteClick(sessionId: string) {
        showDialog({
            title: "Delete Session?",
            body: "Deleting this session will log you out from that device.\n\nIf this is a session you don't recognize, check your Passkeys for any that look unfamiliar, and make sure that your Discord account hasn't been compromised.",
            primaryButton: "Delete",
            secondaryButton: "Cancel",
            confirmAction: async () => {
                hideDialog();

                let deleteResponse: Response;
                try {
                    deleteResponse = await fetch(`https://auth.solarphlare.com/users/me/sessions/${sessionId}`, { method: 'DELETE', credentials: 'include' });
                }
                catch (e) {
                    console.error(e);
                    return showDialog({ title: "Failed to delete session", body: "An error occurred while trying to delete the session. Give it another shot, or try again later.", primaryButton: "OK", confirmAction: hideDialog });
                }

                if (!deleteResponse.ok) {
                    if (deleteResponse.status >= 400 && deleteResponse.status < 500) {
                        const jsonBody = await deleteResponse.json();
                        return showDialog({ title: "Failed to delete session", body: jsonBody.error_message, primaryButton: "OK", confirmAction: hideDialog });
                    }
                    else return showDialog({ title: "Failed to delete session", body: "An error occurred while trying to delete the session. Give it another shot, or try again later.", primaryButton: "OK", confirmAction: hideDialog });
                }

                setSessionsList(sessionsList.filter(session => session.id !== sessionId));
            }
        });
    }

    return (
        <div className="flex flex-col md:flex-row justify-center md:justify-between items-start gap-8 md:gap-0 w-full select-none">
            <div className="flex flex-col max-w-md gap-6">
                <div className="flex flex-col gap-1">
                    <h1 className="text-2xl font-bold dark:text-white transition duration-200">Sessions</h1>
                    <p className="dark:text-white/50 text-black/50 transition duration-200 md:pr-8">These are all the devices you are currently logged in on. If you see a device you don't recognize, remove it immediately.</p>
                    <p className="dark:text-white/30 text-black/30 transition duration200 font-semibold md:pr-8 text-sm pt-1">Sessions will automatically expire after 24 hours.</p>
                </div>
            </div>
            <div className="flex flex-col gap-6 w-full md:w-auto">
                {currentSession && (
                    <div className="flex flex-col gap-2 w-full md:w-auto">
                        <h3 className={`text-black/50 dark:text-white/50 text-sm md:ml-4 ml-1 font-semibold`}>Current Session</h3>
                        <SessionComponent session={currentSession} deletable={false} onDelete={() => { }} />
                    </div>
                )}

                {sessionsList.length > 0 && (
                    <div className="flex flex-col gap-2.5 w-full md:w-auto">
                        <h3 className={`text-black/50 dark:text-white/50 text-sm md:ml-4 ml-1 font-semibold`}>Other Sessions</h3>
                        {sessionsList.map(session => (
                            <Flipped key={session.id} flipId={session.id}>
                                {flippedProps => <SessionComponent key={session.id} session={session} onDelete={onSessionDeleteClick} flippedProps={flippedProps} />}
                            </Flipped>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
