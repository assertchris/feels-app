import Storage from "react-native-icloudstore"
import dayjs from "dayjs"

export const TYPE_FETCH_ENTRIES_BUSY = "TYPE_FETCH_ENTRIES_BUSY"
export const TYPE_FETCH_ENTRIES_SUCCESS = "TYPE_FETCH_ENTRIES_SUCCESS"
export const TYPE_UPDATE_ENTRY_BUSY = "TYPE_UPDATE_ENTRY_BUSY"
export const TYPE_UPDATE_ENTRY_SUCCESS = "TYPE_UPDATE_ENTRY_SUCCESS"

export const STORAGE_KEY_IDS = "STORAGE_KEY_IDS"

export const fetchEntries = () => {
    return async dispatch => {
        dispatch({
            type: TYPE_FETCH_ENTRIES_BUSY,
        })

        const { ids, entries } = await fetchEntriesFromStorage()

        console.log("fetchEntries entries", entries)

        dispatch({
            type: TYPE_FETCH_ENTRIES_SUCCESS,
            payload: { ids, entries },
        })
    }
}

const fetchEntriesFromStorage = async () => {
    const ids = await getIds()
    const savedEntries = await getEntries(ids)
    const entries = await createMissingEntries(savedEntries)

    return { ids, entries }
}

const getIds = async () => {
    let ids = await Storage.getItem(STORAGE_KEY_IDS)

    if (ids) {
        ids = JSON.parse(ids)
    }

    if (!ids) {
        ids = []
    }

    return ids
}

const getEntries = async ids => {
    const savedEntries = await Storage.multiGet(ids)

    for (let i in savedEntries) {
        savedEntries[i] = JSON.parse(savedEntries[i])
    }

    return savedEntries
}

const createMissingEntries = async entries => {
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

            await saveEntry(formattedDate, entry)
        }
    }

    return entries
}

const saveEntry = async (id, entry) => {
    let ids = await getIds()

    ids = [...ids.filter(next => next !== id), id]

    await Storage.setItem(STORAGE_KEY_IDS, JSON.stringify(ids))
    await Storage.setItem(id, JSON.stringify(entry))
}

export const updateEntry = (date, key, value) => {
    return async (dispatch, getState) => {
        dispatch({
            type: TYPE_UPDATE_ENTRY_BUSY,
            payload: { date, key, value },
        })

        const entries = getState().entries
        const entry = entries.find(entry => entry.date === date)

        entry[key] = value
        console.log("updateEntry entry", entry)

        await saveEntry(date, entry)

        dispatch({
            type: TYPE_UPDATE_ENTRY_SUCCESS,
        })
    }
}
