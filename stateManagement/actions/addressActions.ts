import { Address } from "@/models/address_model";

export interface AddressState {
    address: Address | null;
}

export const SET_ADDRESS = 'SET_ADDRESS';

interface SetAddressAction {
    type: typeof SET_ADDRESS;
    payload: Address;
}

export type AddressActionTypes = SetAddressAction;