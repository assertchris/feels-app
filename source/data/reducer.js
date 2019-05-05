import dayjs from "dayjs"

import { TYPE_FETCH_ENTRIES_SUCCESS, TYPE_UPDATE_ENTRY_BUSY } from "./actions"

export const initial = {
    ids: [],
    entries: [],
    formattedDate: dayjs().format("YYYY-MM-DD"),
    formattedDay: dayjs().format("D"),
    formattedMonth: dayjs().format("MMM"),
}

export const reducer = (state = initial, action) => {
    switch (action.type) {
        case TYPE_FETCH_ENTRIES_SUCCESS:
            return {
                ...state,
                ids: action.payload.ids,
                entries: action.payload.entries,
            }
        case TYPE_UPDATE_ENTRY_BUSY:
            const { date, key, value } = action.payload

            return {
                ...state,
                entries: [
                    ...state.entries.filter(entry => entry.date !== date),
                    {
                        ...state.entries.find(entry => entry.date === date),
                        [key]: value,
                    },
                ],
            }
        default:
            return state
    }
}
