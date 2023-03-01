import { Dispatch } from "redux";
import { CustomEvent } from "../../models/CustomEvent";

type ActionAdd = {
    type: "ADD",
    payload: CustomEvent
}


type ChangePayload = {
    id: string
    event: CustomEvent
}

type ActionChange = {
    type: "CHANGE",
    payload: ChangePayload
}

type ActionSet = {
    type: "SET",
    payload: CustomEvent[]
}
type ActionRemove = {
    type: "REMOVE"
    payload: CustomEvent
}
type Action = ActionAdd | ActionChange | ActionSet | ActionRemove

const eventListReducer = (initialState: CustomEvent[] = [], action: Action) => {
    switch (action.type) {
        case "ADD": {
            return [...initialState, action.payload]
        }
        case "SET": {
            return initialState = [...action.payload]
        }
        case "REMOVE": {
            initialState = initialState.filter((e) => e != action.payload)
            return initialState
        }
        case "CHANGE": {
            return initialState = initialState.map((e) => {
                if (e.id == action.payload.id) {
                    return action.payload.event
                }
                return e
            })
        }
        default: {
            return []
        }
    }
}

const setEvents = (payload: CustomEvent[]) => ({ type: "SET", payload })
export const setEventsAction = (payload: CustomEvent[]) => {
    return function (dispatch: Dispatch) {
        dispatch(setEvents(payload))
    }
}

const addEvent = (payload: CustomEvent) => ({ type: "ADD", payload })
export const addEventAction = (e: CustomEvent) => {
    return function (dispatch: Dispatch) {
        dispatch(addEvent(e));
    }
}

const changeEvent = (payload: ChangePayload) => ({ type: "CHANGE", payload })
export const changeEventAction = (payload: ChangePayload) => {
    return function (dispatch: Dispatch) {
        dispatch(changeEvent(payload))
    }
}

const removeEvent = (payload: CustomEvent) => ({ type: "REMOVE", payload })
export const removeEventAction = (payload: CustomEvent) => {
    return function (dispatch: Dispatch) {
        dispatch(removeEvent(payload))
    }
}

export default eventListReducer