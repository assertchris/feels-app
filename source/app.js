import React from "react"
import { Text, View } from "react-native"
import { NativeRouter, Route, Switch } from "react-router-native"
import { Transition } from "react-spring/renderprops-native"
import { Provider, store } from "./data"
import { Log, Home } from "./screens"

const styles = style => ({
    opacity: style.opacity,
    transform: [{ translateX: style.translateX }],
})

const App = () => {
    return (
        <Provider store={store}>
            <NativeRouter>
                <Route
                    render={({ location }) => (
                        <Transition
                            native
                            config={{
                                tension: 200,
                                friction: 20,
                            }}
                            items={location}
                            keys={location => location.pathname}
                            from={{ opacity: 0.0, translateX: 100 }}
                            enter={{ opacity: 1.0, translateX: 0 }}
                            leave={{ opacity: 0.0, translateX: -100 }}
                        >
                            {location => style => (
                                <Switch location={location}>
                                    <Route exact path="/" render={() => <Home style={styles(style)} />} />
                                    <Route exact path="/log" render={() => <Log style={styles(style)} />} />
                                </Switch>
                            )}
                        </Transition>
                    )}
                />
            </NativeRouter>
        </Provider>
    )
}

export { App }
