import React from "react"
import { Provider, store } from "./data"
import { App } from "./app"

const Container = function() {
    return (
        <Provider store={store}>
            <App />
        </Provider>
    )
}

export { Container }
