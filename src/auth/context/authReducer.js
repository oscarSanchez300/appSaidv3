import { types } from "../types/types";



export const authReducer = (state = {}, action) => {

    switch (action.type) {
        case types.login:
            return {
                ...state,
                logged: true,
                token: action.token,
                user: action.payload,
                idUser: action.idUser,  
            };

        case types.logout:
            return {
                logged: false
            };

        default:
            return state;
    }
}