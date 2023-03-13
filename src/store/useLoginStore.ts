import { create, useStore } from 'zustand';

interface login {
    token: string;
    isLogined: boolean;
    role: string;
    level: number;
    email: string;

    setLevelHandler: (s: number) => void;
    setLoginedHandler: (s: string) => void;
    setLogined: (s: boolean) => void;
    setLogoutHandler: () => void;

    setRole: () => void;
}

const useLoginStore = create<login>((set) => ({
    token: '',
    isLogined: false,
    role: '',
    level: 0,
    email: '',

    setLevelHandler(s) {
        set(() => ({
            level: s,
        }));
    },
    setLoginedHandler(s) {
        set(() => ({
            isLogined: true,
            email: s,
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
        email: state.email,
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
