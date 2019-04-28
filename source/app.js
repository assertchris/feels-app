import React from "react"
import { Provider, store } from "./data"
import { NativeRouter, Route, Link } from "react-router-native"
import { Home } from "./screens"

const App = () => {
    return (
        <Provider store={store}>
            <NativeRouter>
                <Route exact path="/" component={Home} />
                {/* <Route path="/about" component={About} /> */}
            </NativeRouter>
        </Provider>
    )
}

export { App }
