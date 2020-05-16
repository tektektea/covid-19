import {FETCH_GLOBAL, FETCH_INDIA, SET_LOADING} from "./action";

const initialState={
    global: [],
    globalSummary:{},
    indiaSummary:{},
    india:[],
    loading:false
}
export const reducer=(state=initialState,action)=>{
    switch (action.type) {
        case FETCH_GLOBAL:
            return {...state,global:action.payload.Countries,globalSummary:action.payload.Global,loading: false}
        case FETCH_INDIA:
            return {...state,india:action.payload.data,indiaSummary:action.payload.summary,loading: false}
        case SET_LOADING:
            return {...state,loading:true}
        default:
            return initialState;

    }
}
