import Storage from "react-native-icloudstore"
import dayjs from "dayjs"

export const TYPE_FETCH_ENTRIES_BUSY = "TYPE_FETCH_ENTRIES_BUSY"
export const TYPE_FETCH_ENTRIES_SUCCESS = "TYPE_FETCH_ENTRIES_SUCCESS"
export const TYPE_UPDATE_ENTRY_BUSY = "TYPE_UPDATE_ENTRY_BUSY"
export const TYPE_UPDATE_ENTRY_SUCCESS = "TYPE_UPDATE_ENTRY_SUCCESS"
export const TYPE_FETCH_SETTINGS_BUSY = "TYPE_FETCH_SETTINGS_BUSY"
export const TYPE_FETCH_SETTINGS_SUCCESS = "TYPE_FETCH_SETTINGS_SUCCESS"
export const TYPE_UPDATE_SETTING_BUSY = "TYPE_UPDATE_SETTING_BUSY"
export const TYPE_UPDATE_SETTING_SUCCESS = "TYPE_UPDATE_SETTING_SUCCESS"

export const STORAGE_KEY_IDS = "STORAGE_KEY_IDS"
export const STORAGE_KEY_SETTINGS = "STORAGE_KEY_SETTINGS"

export const fetchEntries = () => {
    return async (dispatch, getState) => {
        dispatch({ type: TYPE_FETCH_ENTRIES_BUSY })

        const { profile } = getState().settings
        const { ids, entries } = await fetchEntriesFromStorage(profile)

        dispatch({
            type: TYPE_FETCH_ENTRIES_SUCCESS,
            payload: { ids, entries },
        })
    }
}

const fetchEntriesFromStorage = async profile => {
    const ids = await getIds(profile)
    const savedEntries = await getEntries(profile, ids)
    const entries = await createMissingEntries(profile, savedEntries)

    return { ids, entries }
}

const getIds = async profile => {
    let ids = await Storage.getItem(`${profile}${STORAGE_KEY_IDS}`)

    if (ids) {
        ids = JSON.parse(ids)
    }

    if (!ids) {
        ids = []
    }

    return ids
}

const getEntries = async (profile, ids) => {
    const savedEntries = await Storage.multiGet(ids)

    for (let i in savedEntries) {
        savedEntries[i] = JSON.parse(savedEntries[i])
    }

    return savedEntries
}

const createMissingEntries = async (profile, entries) => {
    const start = dayjs()

    for (let i = 0; i < 14; i++) {
        const date = start.subtract(i, "day")
        const formattedDate = date.format("YYYY-MM-DD")

        const found = entries.find(entry => entry.date === formattedDate)

        if (!found) {
            const entry = {
                date: formattedDate,
            }

            entries = [...entries.filter(entry => entry.date !== formattedDate), entry]

            await saveEntry(profile, formattedDate, entry)
        }
    }

    return entries
}

const saveEntry = async (profile, id, entry) => {
    let ids = await getIds(profile)

    ids = [...ids.filter(next => next !== id), `${profile}${id}`]

    await Storage.setItem(`${profile}${STORAGE_KEY_IDS}`, JSON.stringify(ids))
    await Storage.setItem(`${profile}${id}`, JSON.stringify(entry))
}

export const updateEntry = (date, key, value) => {
    return async (dispatch, getState) => {
        const { profile } = getState().settings

        dispatch({
            type: TYPE_UPDATE_ENTRY_BUSY,
            payload: { date, key, value },
        })

        const entries = getState().entries
        const entry = entries.find(entry => entry.date === date)

        entry[key] = value

        await saveEntry(profile, date, entry)

        dispatch({ type: TYPE_UPDATE_ENTRY_SUCCESS })
    }
}

export const fetchSettings = () => {
    return async dispatch => {
        dispatch({
            type: TYPE_FETCH_SETTINGS_BUSY,
        })

        const settings = await Storage.getItem(STORAGE_KEY_SETTINGS)

        dispatch({
            type: TYPE_FETCH_SETTINGS_SUCCESS,
            payload: settings || {},
        })
    }
}

export const updateSetting = (key, value) => {
    return async (dispatch, getState) => {
        dispatch({
            type: TYPE_UPDATE_SETTING_BUSY,
            payload: { key, value },
        })

        const settings = getState().settings
        await Storage.setItem(STORAGE_KEY_SETTINGS, JSON.stringify(settings))

        dispatch({ type: TYPE_UPDATE_SETTING_SUCCESS })

        // get new entries from the intended profile
        dispatch(fetchEntries())
    }
}
