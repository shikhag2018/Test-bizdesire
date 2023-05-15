
import { saveData } from "../../firebase/functions";
// Define initial state
const initialState = {
    formData: null,
    isLoading: false,
    error: null,
};

// Define action types
const SUBMIT_FORM_REQUEST = 'SUBMIT_FORM_REQUEST';
const SUBMIT_FORM_SUCCESS = 'SUBMIT_FORM_SUCCESS';
const SUBMIT_FORM_FAILURE = 'SUBMIT_FORM_FAILURE';

// Define action creators
const submitFormRequest = () => ({
    type: SUBMIT_FORM_REQUEST,
});

const submitFormSuccess = (data) => ({
    type: SUBMIT_FORM_SUCCESS,
    payload: data,
});

const submitFormFailure = (data) => ({
    type: SUBMIT_FORM_FAILURE,
    payload: data,
});


// Define thunk function to submit form data
export const submitForm = (formData) => {
    return async (dispatch) => {
        dispatch(submitFormRequest());
        try {
            // Simulate API call with axios
            saveData(formData).then((res)=>{
                dispatch(submitFormSuccess(res));
            })
            // Dispatch success action with the response data
        } catch (error) {
            // Dispatch failure action with the error message
            dispatch(submitFormFailure(error.message));
        }
    };
};

// Define reducer function
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SUBMIT_FORM_REQUEST:
            return {
                ...state,
                isLoading: true,
                error: null,
            };
        case SUBMIT_FORM_SUCCESS:
            return {
                ...state,
                formData: action.payload,
                isLoading: false,
                error: null,
            };
        case SUBMIT_FORM_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload,
            };
        
        default:
            return state;
    }
};

export default reducer;