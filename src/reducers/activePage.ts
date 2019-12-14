import { IactivePage } from "../service";

const initialState: IactivePage = {
    page: "Dashboard"
};

const activePageReducer = (state = initialState, action: {type: string; payload: IactivePage}) => {
    switch (action.type) {
        case 'ACTIVE_PAGE': {
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

export default activePageReducer;