import { create, useStore } from 'zustand';

interface login {
    token: string;
    isLogined: boolean;
    role: string;
    setLoginedHandler: () => void;
    setLogined: (s: boolean) => void;
    setLogoutHandler: () => void;

    setRole: () => void;
}

const useLoginStore = create<login>((set) => ({
    token: '',
    isLogined: false,
    role: '',
    setLoginedHandler() {
        set(() => ({
            isLogined: true,
        }));
    },
    setLogined(s) {
        set(() => ({
            isLogined: s,
            role: localStorage.getItem('ROLE_GROUP') as string,
        }));
    },
    setLogoutHandler() {
        set(() => ({
            isLogined: false,
        }));
    },
    setRole() {
        set(() => ({}));
    },
}));

export default useLoginStore;
