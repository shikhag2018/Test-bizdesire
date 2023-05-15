import { fetchData } from "../../firebase/functions";

// Action types
const FETCH_CANDIDATES_REQUEST = "FETCH_CANDIDATES_REQUEST";
const FETCH_CANDIDATES_SUCCESS = "FETCH_CANDIDATES_SUCCESS";
const FETCH_CANDIDATES_FAILURE = "FETCH_CANDIDATES_FAILURE";

// Initial state
const initialState = {
    candidates: [],
    loading: false,
    error: null,
};

// Reducer function
const candidateReducer = (state = initialState, action) => {
    // er
    switch (action.type) {
        case FETCH_CANDIDATES_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case FETCH_CANDIDATES_SUCCESS:
            return {
                ...state,
                loading: false,
                candidates: action.payload,
            };
        case FETCH_CANDIDATES_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};

// Action creators
const fetchCandidatesRequest = () => {
    return {
        type: FETCH_CANDIDATES_REQUEST,
    }
}

const fetchCandidatesSuccess = (candidates) => ({
    type: FETCH_CANDIDATES_SUCCESS,
    payload: candidates,
});

const fetchCandidatesFailure = (error) => ({
    type: FETCH_CANDIDATES_FAILURE,
    payload: error,
});

// Async action creator to fetch candidates
export const fetchCandidates = () => async (dispatch) => {
    console.log("I m here")
    dispatch(fetchCandidatesRequest());
    try {
        console.log("I m here")
        const data = await fetchData().then((res) => {
            dispatch(fetchCandidatesSuccess(res));
        })
    } catch (error) {
        dispatch(fetchCandidatesFailure(error.message));
    }
};

export default candidateReducer;
