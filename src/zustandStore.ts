import { create, useStore } from 'zustand';

interface login {
    token: string;
    isLogined: boolean;
    role: string;
    setLoginedHandler: () => void;
    setLogined: (s: boolean) => void;
    setLogoutHandler: () => void;
}

const useLoginStore = create<login>((set) => ({
    token: '',
    isLogined: false,
    role: 'roelroelroer',
    setLoginedHandler() {
        set(() => ({
            isLogined: true,
        }));
    },
    setLogined(s) {
        set(() => ({
            isLogined: s,
        }));
    },
    setLogoutHandler() {
        set(() => ({
            isLogined: false,
        }));
    },
}));

export default useLoginStore;
