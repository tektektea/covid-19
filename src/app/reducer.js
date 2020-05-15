import {
    FETCH_GLOBAL_REQUEST,
    FETCH_GLOBAL_SUCCESS,
    FETCH_GLOBAL_FAILURE,
    FETCH_INDIA_REQUEST,
    FETCH_INDIA_SUCCESS,
    FETCH_INDIA_FAILURE,
} from "./action";

const initialState={
    global: [],
    globalSummary:{},
    indiaSummary:{},
    india:[],
    isLoadingGlobal: true,
    isLoadingIndia: true,
    isLoadingGlobalError: "",
    isLoadingIndiaError: ""
}
export const reducer=(state=initialState,action)=>{
    switch (action.type) {
        //GLOBAL
        case FETCH_GLOBAL_REQUEST:
            return {
                ...state,
                isLoadingGlobal: true
            }
        case FETCH_GLOBAL_SUCCESS:
            // console.log("data",action.payload)
            return {
                ...state,
                isLoadingGlobal: false,
                global:action.payload.Countries,
                globalSummary:action.payload.Global
            }
        case FETCH_GLOBAL_FAILURE:
            return {
                ...state,
                isLoadingGlobalError: action.payload
            }
        
        //INDIA
        case FETCH_INDIA_REQUEST:
            return {
                ...state,
                isLoadingIndia: true
            }
        case FETCH_INDIA_SUCCESS:
            return {
                ...state,
                isLoadingIndia: false,
                india:action.payload.data,
                indiaSummary:action.payload.summary
            }
            case FETCH_INDIA_FAILURE:
                return {
                    ...state,
                    isLoadingIndiaError: action.payload
                }
        default:
            return initialState;

    }
}
