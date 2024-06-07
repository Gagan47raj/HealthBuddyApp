import { 
    DELETE_USER_SUCCESS,
    FIND_USER_BY_ID_FAILURE, 
    FIND_USER_BY_ID_REQUEST, 
    FIND_USER_BY_ID_SUCCESS, 
    FIND_USER_FAILURE, 
    FIND_USER_REQUEST, 
    FIND_USER_SUCCESS 
} from "./ActionType";

const initialState = {
    users: [],
    user: null,
    loading: false,
    error: null
};

export const userReducer = (state = initialState, action) => {
    switch(action.type) {
        case FIND_USER_REQUEST:
        case FIND_USER_BY_ID_REQUEST:
            return { ...state, loading: true, error: null };
        
        case FIND_USER_SUCCESS:
            return { ...state, loading: false, error: null, users: action.payload };
        
        case FIND_USER_BY_ID_SUCCESS:
            return { ...state, loading: false, error: null, user: action.payload };
        
        case FIND_USER_FAILURE:
        case FIND_USER_BY_ID_FAILURE:
            return { ...state, loading: false, error: action.payload };

        case DELETE_USER_SUCCESS:
            return {...state, loading:false, error : null, 
                deletedProduct:action.payload}
        
        default:
            return state;
    }
};
