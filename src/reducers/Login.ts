import { Ilogin } from "../service";

const initialState:Partial<Ilogin> = {
    isLoggedIn: false,
};

const authReducer = (state = initialState, action: {type: string; payload: Ilogin}) => {
    switch (action.type) {
        case 'LOGGED_IN': {
            return {
                ...state,
                ...action.payload,
            }
        }
        default: {
            return state;
        }
    }
};

export default authReducer;