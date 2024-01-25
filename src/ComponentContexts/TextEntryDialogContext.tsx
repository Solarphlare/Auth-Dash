import { createContext, useState, useContext, ReactNode } from 'react';

type ShowTextEntryDialogParams = { title: string, body: string, placeholder: string, initialText: string, isCancelable: boolean, onConfirm: (text: string) => void, onCancel?: () => void };

const TextEntryDialogContext = createContext({
    isVisible: false,
    title: "",
    body: "",
    placeholder: "",
    initialText: "",
    isCancelable: true,
    showTextEntryDialog: (_params: ShowTextEntryDialogParams) => {},
    hideTextEntryDialog: () => {},
    onConfirm: (_text: string) => {},
    onCancel: () => {},
});

export const TextEntryDialogProvider = ({ children }: { children: ReactNode }) => {
    const [dialogProps, setDialogProps] = useState({ isVisible: false, title: "", body: "", placeholder: "", initialText: "", isCancelable: true, onConfirm: (_text: string) => {}, onCancel: () => {} });

    const showTextEntryDialog = (params: ShowTextEntryDialogParams) => {
        setDialogProps({ isVisible: true, ...params, onCancel: params.onCancel ?? (() => {}) });
    };

    const hideTextEntryDialog = () => {
        setDialogProps({ isVisible: false, title: "", body: "", placeholder: "", initialText: "", isCancelable: true, onConfirm: () => {}, onCancel: () => {} });
    };

    return (
        <TextEntryDialogContext.Provider value={{ ...dialogProps, showTextEntryDialog, hideTextEntryDialog }}>
            {children}
        </TextEntryDialogContext.Provider>
    );
};

export const useTextEntryDialog = () => useContext(TextEntryDialogContext);
