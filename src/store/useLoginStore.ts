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

export const useLoginState = () =>
    useLoginStore((state) => ({
        token: state.token,
        isLogined: state.isLogined,
        role: state.role,
        level: state.level,
    }));

export const useLoginAction = () =>
    useLoginStore((state) => ({
        setLevelHandler: state.setLevelHandler,
        setLoginedHandler: state.setLoginedHandler,
        setLogined: state.setLogined,
        setLogoutHandler: state.setLogoutHandler,
        setRole: state.setRole,
    }));

export default useLoginStore;
