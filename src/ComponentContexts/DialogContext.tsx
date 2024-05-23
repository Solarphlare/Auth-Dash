import { createContext, useState, useContext, ReactNode } from 'react';

const DialogContext = createContext<DialogContextProps>({
    isVisible: false,
    title: "",
    body: "",
    primaryButton: "",
    secondaryButton: "",
    confirmAction: () => {},
    showDialog: (_options: ShowDialogProps) => {},
    hideDialog: () => {},
});

export interface ShowDialogProps {
    title: string;
    body: string;
    primaryButton: string;
    secondaryButton?: string;
    confirmAction: () => void;
}

interface DialogStateProps extends ShowDialogProps {
    isVisible: boolean;
}

interface DialogContextProps extends DialogStateProps {
    showDialog: (options: ShowDialogProps) => void;
    hideDialog: () => void;
}

export const DialogProvider = ({ children }: { children: ReactNode }) => {
    const [dialogProps, setDialogProps] = useState<DialogStateProps>({ isVisible: false, title: "", body: "", primaryButton: "", confirmAction: () => {} });

    const showDialog = (options: ShowDialogProps) => {
        setDialogProps({ ...options, isVisible: true });
    };

    const hideDialog = () => {
        setDialogProps({ isVisible: false, title: "", body: "", primaryButton: "", confirmAction: () => {} });
    };

    return (
        <DialogContext.Provider value={ { ...dialogProps, showDialog, hideDialog } }>
            {children}
        </DialogContext.Provider>
    );
};

export const useDialog = () => useContext(DialogContext);
