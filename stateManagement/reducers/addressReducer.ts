import { AddressActionTypes,AddressState,SET_ADDRESS } from "../actions/addressActions";

const initialState: AddressState = {
    address: null
};

const addressReducer = (state = initialState, action: AddressActionTypes): AddressState => {
    switch (action.type) {
        case SET_ADDRESS:
            return {
                ...state,
                address: action.payload
            }
        default:
            return state
    }
}

export default addressReducer