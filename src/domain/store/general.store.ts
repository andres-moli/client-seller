import { produce } from "immer";
import { create } from "zustand";
import { shallow } from "zustand/shallow"
import { devtools, persist } from "zustand/middleware"
import Cookies from "js-cookie";
import { User } from "../graphql";

/*------------------- config -------------------*/

export type AlertTypes = 'success' | 'info' | 'error' | 'warning' | 'custom' | 'working';
interface IAlertContent {
    type: AlertTypes;
    title?: string;
    description?: string;
    onCancel?: () => void;
    onConfirm?: () => void;
    showCancelButton?: boolean;
    showConfirmButton?: boolean;
    cancelButtonText?: string;
    confirmButtonText?: string;
}

export interface IModal {
    id: string;
    content?: any;
}

export interface IAdvertising {
    isActive: boolean;
    advertisignMsg: string;
    type: AlertTypes;
}

export interface IModalContent {
    type: string;
    content: any;
}

export interface IGeneral {
    userInfo?: User
    isLogged?: boolean
    isAdvertisign?: IAdvertising
    modalInformation?: IModalContent[]

    homeLoading?: boolean

    currentAlert?: IAlertContent;
    modalStatus?: IModal;

    progressLoading?: boolean;

}


export interface IGeneralActions {
    setHomeLoading: (isLoading: boolean) => void
    setLoginUser: (data: User) => void,
    logout: () => void,
    setAdvertising: (data: IAdvertising) => void
    setCurrentAlert: (currentAlert?: IAlertContent) => void;
    setModalStatus: (status?: IModal) => void;
    setProgressLoading: (loading:boolean) => void
}

/*------------------- store -------------------*/

const useGeneral = create<IGeneral & IGeneralActions>()(devtools(persist((set, get) => ({
    isLogged: undefined,
    currentTheme: "GreenThemeResponsive",

    setLoginUser: (data) => {
        set(produce((draft: IGeneral) => {
            draft.isLogged = true
            draft.userInfo = data
        }), false, { type: "general/setLoginUser" })
    },
    logout: () => {
        set(produce((draft: IGeneral) => {
            draft.isLogged = undefined
            draft.userInfo = undefined
        }), false, { type: "general/logout" })

        Cookies.remove(import.meta.env.VITE_APP_KEY_COOKIE_SESSION)
        Cookies.remove(import.meta.env.VITE_APP_KEY_COOKIE_USER)
    },
    setAdvertising: (data: IAdvertising) => {
        set(produce((draft: IGeneral) => {
            draft.isAdvertisign = data
        }), false, { type: "general/setAdvertising" })
    },
    setHomeLoading: (isLoading) => {
        set(produce((draft: IGeneral) => {
            draft.homeLoading = isLoading
        }), false, { type: "general/setHomeLoading" })
    },

    setModalStatus: (modal) => {
        set(produce((draft: IGeneral) => {
            draft.modalStatus = modal
        }), false, { type: "general/setModalStatus" })
    },

    setCurrentAlert: (alert) => {
        set(produce((draft: IGeneral) => {
            draft.currentAlert = alert
        }), false, { type: "general/setCurrentAlert" })
    },

    setProgressLoading: (loading) => {
        set(produce((draft: IGeneral) => {
            draft.progressLoading = loading
        }), false, { type: "general/setProgressLoading_" })
    }

}), {
    name: "generalStore",
    partialize: (state) => (Object.fromEntries(
        Object.entries(state).filter(([key]) => ['currentTheme',].includes(key))
    )

    ),
    onRehydrateStorage: (_) => {
        // optional
        return (_, error) => {
            if (error) {
                console.log('an error happened during hydration - property-tax-info', error)
            } else {
                //  console.log('hydration finished')
            }
        }
    },
}), {
    enabled: import.meta.env.DEV,
    anonymousActionType: "general"
}))

/*------------------- store functions -------------------*/

// basic store functions
export const setter = useGeneral.setState;
export const getter = useGeneral.getState;

// hooks selectors
export const isLoged = () => useGeneral((state) => state.isLogged)
export const getTypeOfUser = () => useGeneral((state) => state.userInfo?.userRoles)
// export const isAdmin = () => useGeneral((state) => (state.userInfo?.userRoles?.includes("Admin" as )))
export const isAdmin = () => true

/**
 * return general state value and/or funtions implementing a shallow option
 * @param selector funtions selector
 * @returns 
 */
export const useShallowGeneralStore = <U>(selector: (state: IGeneral & IGeneralActions) => U) => {
    return useGeneral(selector);
};

export const fireAlert = (alert?: IAlertContent) => {
    return new Promise(resolve => {
        setter(produce((draft: IGeneral) => {
            draft.currentAlert = {
                ...alert,
                type: alert?.type || 'info',
                onConfirm: async () => {
                    if (alert?.onConfirm) {
                        await alert.onConfirm();
                        closeAlert();
                    }
                    resolve(true);
                },
                onCancel: () => {
                    if (alert?.onCancel) {
                        alert.onCancel();
                    }
                    closeAlert();
                    resolve(false);
                },
            };
        }));

        // setter((state) => state.currentAlert = alert)
    });
};

export const closeAlert = () => {
    setter(produce((draft: IGeneral) => {
        draft.currentAlert = undefined;
    }));
};


export default useGeneral