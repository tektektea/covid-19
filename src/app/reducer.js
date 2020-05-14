import {FETCH_GLOBAL, FETCH_INDIA} from "./action";

const initialState={
    global: [],
    globalSummary:{},
    indiaSummary:{},
    india:[]
}
export const reducer=(state=initialState,action)=>{
    switch (action.type) {
        case FETCH_GLOBAL:
            console.log("data",action.payload)
            return {...state,global:action.payload.Countries,globalSummary:action.payload.Global}
        case FETCH_INDIA:
            return {...state,india:action.payload.data,indiaSummary:action.payload.summary}
        default:
            return initialState;

    }
}
