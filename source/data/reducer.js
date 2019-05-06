import dayjs from "dayjs"

import {
    TYPE_FETCH_ENTRIES_BUSY,
    TYPE_FETCH_ENTRIES_SUCCESS,
    TYPE_UPDATE_ENTRY_BUSY,
    TYPE_UPDATE_ENTRY_SUCCESS,
    TYPE_FETCH_SETTINGS_BUSY,
    TYPE_FETCH_SETTINGS_SUCCESS,
    TYPE_UPDATE_SETTING_BUSY,
    TYPE_UPDATE_SETTING_SUCCESS,
} from "./actions"

export const initial = {
    ids: [],
    entries: [],
    busy: {
        fetchEntries: false,
        updateEntry: false,
        fetchSettings: false,
        updateSetting: false,
    },
    formattedDate: dayjs().format("YYYY-MM-DD"),
    formattedDay: dayjs().format("D"),
    formattedMonth: dayjs().format("MMM"),
    settings: {
        profile: "",
    },
}

export const reducer = (state = initial, action) => {
    switch (action.type) {
        case TYPE_FETCH_ENTRIES_BUSY: {
            return {
                ...state,
                busy: {
                    ...state.busy,
                    fetchEntries: true,
                },
            }
        }
        case TYPE_FETCH_ENTRIES_SUCCESS: {
            return {
                ...state,
                busy: {
                    ...state.busy,
                    fetchEntries: false,
                },
                ids: action.payload.ids,
                entries: action.payload.entries,
            }
        }
        case TYPE_UPDATE_ENTRY_BUSY: {
            const { date, key, value } = action.payload

            return {
                ...state,
                busy: {
                    ...state.busy,
                    updateEntry: true,
                },
                entries: [
                    ...state.entries.filter(entry => entry.date !== date),
                    {
                        ...state.entries.find(entry => entry.date === date),
                        [key]: value,
                    },
                ],
            }
        }
        case TYPE_UPDATE_ENTRY_SUCCESS: {
            return {
                ...state,
                busy: {
                    ...state.busy,
                    updateEntry: false,
                },
            }
        }
        case TYPE_FETCH_SETTINGS_BUSY: {
            return {
                ...state,
                busy: {
                    ...state.busy,
                    fetchSettings: true,
                },
            }
        }
        case TYPE_FETCH_SETTINGS_SUCCESS: {
            return {
                ...state,
                busy: {
                    ...state.busy,
                    fetchSettings: false,
                },
                settings: action.payload,
            }
        }
        case TYPE_UPDATE_SETTING_BUSY: {
            const { key, value } = action.payload

            return {
                ...state,
                busy: {
                    ...state.busy,
                    updateSetting: true,
                },
                settings: {
                    ...state.settings,
                    [key]: value,
                },
            }
        }
        case TYPE_UPDATE_SETTING_SUCCESS: {
            return {
                ...state,
                busy: {
                    ...state.busy,
                    updateSetting: false,
                },
            }
        }
        default: {
            return state
        }
    }
}
