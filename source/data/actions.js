import Storage from "react-native-icloudstore"

export const TYPE_FETCH_ENTRIES_BUSY = "TYPE_FETCH_ENTRIES_BUSY"
export const TYPE_FETCH_ENTRIES_SUCCESS = "TYPE_FETCH_ENTRIES_SUCCESS"

export const STORAGE_KEY_IDS = "STORAGE_KEY_IDS"

export const fetchEntries = () => {
    return async dispatch => {
        dispatch({
            type: TYPE_FETCH_ENTRIES_BUSY,
        })

        const { ids, entries } = await fetchEntriesFromStorage()

        dispatch({
            type: TYPE_FETCH_ENTRIES_SUCCESS,
            payload: { ids, entries },
        })
    }
}

const fetchEntriesFromStorage = async () => {
    let ids = await Storage.getItem(STORAGE_KEY_IDS)

    if (ids) {
        ids = JSON.parse(ids)
    }

    const entries = await Storage.multiGet(ids || [])

    return { ids, entries }
}
