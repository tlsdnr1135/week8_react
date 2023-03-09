import { create, useStore } from 'zustand';

interface login {
    token: string;
    isLogined: boolean;
    role: string;
    level: number;

    setLevelHandler: (s: number) => void;
    setLoginedHandler: () => void;
    setLogined: (s: boolean) => void;
    setLogoutHandler: () => void;

    setRole: () => void;
}

const useLoginStore = create<login>((set) => ({
    token: '',
    isLogined: false,
    role: '',
    level: 0,

    setLevelHandler(s) {
        set(() => ({
            level: s,
        }));
    },
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
