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
export const TYPE_RESET = "TYPE_RESET"

export const STORAGE_KEY_KEYS = "keys"
export const STORAGE_KEY_SETTINGS = "global-settings"

export const fetchEntries = () => {
    return async (dispatch, getState) => {
        dispatch({ type: TYPE_FETCH_ENTRIES_BUSY })

        const allKeys = await Storage.getAllKeys()
        allKeys.sort()

        // console.log("fetchEntries allKeys", allKeys)

        const { profile } = getState().settings
        const { keys, entries } = await fetchEntriesFromStorage(profile || "global")

        console.log("fetchEntries profile", profile)
        console.log("fetchEntries entries", entries)

        dispatch({
            type: TYPE_FETCH_ENTRIES_SUCCESS,
            payload: { keys, allKeys, entries },
        })
    }
}

const fetchEntriesFromStorage = async profile => {
    const keys = await getKeys(profile)
    const savedEntries = await getEntries(keys)
    const entries = await createMissingEntries(profile, savedEntries)

    console.log("fetchEntriesFromStorage keys", keys)
    console.log("fetchEntriesFromStorage savedEntries", savedEntries)
    console.log("fetchEntriesFromStorage entries", entries)

    return { keys, entries }
}

const getKeys = async profile => {
    let keys = await Storage.getItem(`${profile}-${STORAGE_KEY_KEYS}`)

    // console.log("getKeys key", `${profile}${STORAGE_KEY_KEYS}`)

    if (keys) {
        keys = JSON.parse(keys)
    }

    if (!keys) {
        keys = []
    }

    return keys
}

const getEntries = async keys => {
    const savedEntries = await Storage.multiGet(keys.map(key => key))

    // console.log("getEntries keys", keys)

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

const saveEntry = async (profile, key, entry) => {
    let keys = await getKeys(profile)

    keys = [...keys.filter(next => next !== `${profile}-${key}`), `${profile}-${key}`]

    // console.log("saveEntry keys key", `${profile}-${STORAGE_KEY_KEYS}`)
    // console.log("saveEntry keys value", keys)
    // console.log("saveEntry key", `${profile}${key}`)

    await Storage.setItem(`${profile}-${STORAGE_KEY_KEYS}`, JSON.stringify(keys))
    await Storage.setItem(`${profile}-${key}`, JSON.stringify(entry))
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

        // console.log("updateEntry entry", entry)

        entry[key] = value

        await saveEntry(profile || "global", date, entry)

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
            payload: JSON.parse(settings || "{}"),
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
    }
}

export const reset = () => {
    return async (dispatch, getState) => {
        dispatch({
            type: TYPE_RESET,
        })

        // Storage.clear()

        const { profile } = getState().settings
        const allKeys = await Storage.getAllKeys()
        const deleteKeys = []

        // console.log("allKeys", allKeys)

        for (let i in allKeys) {
            if (allKeys[i].startsWith(profile)) {
                // console.log("key matching prefix", allKeys[i])
                deleteKeys.push(allKeys[i])
            }
        }

        console.log("deleteKeys", deleteKeys)
        await Storage.multiRemove(deleteKeys)
    }
}

export const removeKey = key => {
    return async dispatch => {
        await Storage.removeItem(key)

        // refresh this list
        dispatch(fetchEntries())
    }
}
