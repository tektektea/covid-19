import {
    ERROR,
    FETCH_GLOBAL, FETCH_INDIA,
    LOADING
} from "./action";

const initialState = {
    global: [],
    globalSummary: {},
    indiaSummary: {},
    india: [],
    loading: false,
    error:null
}
export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case LOADING:
            return {...state, loading: action.payload}
        //GLOBAL

        case ERROR:
            return {...state,error:action.payload}
        case FETCH_GLOBAL:
            // console.log("data",action.payload)
            return {
                ...state,
                global: action.payload.Countries,
                globalSummary: action.payload.Global
            }

        //INDIA
        case FETCH_INDIA:
            return {
                ...state,
                isLoadingIndia: false,
                india: action.payload.data,
                indiaSummary: action.payload.summary
            }

        default:
            return initialState;

    }
}
