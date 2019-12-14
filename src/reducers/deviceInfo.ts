import { Ideviceinfo } from "../service";

const initialState:Ideviceinfo = {
    screenWidth: 0,
    screenHeight: 0
};

const deviceInfoReducer = (state = initialState, action: {type: string; payload: Ideviceinfo}) => {
    switch (action.type) {
        case 'DEVICE_INFO': {
            // console.log('file: src/reducers/deviceInfo.ts, function: deviceInfoReducer, state: ', state);
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

export default deviceInfoReducer;