import React, { Component } from "react"
import PropTypes from "prop-types"
import { NativeRouter, Route, Switch } from "react-router-native"
import { connect } from "react-redux"
import { Transition } from "react-spring/renderprops-native"
import { fetchEntries } from "./data"
import { Graphs, Log, Home, Settings } from "./screens"

class App extends Component {
    static propTypes = {
        fetchEntries: PropTypes.func.isRequired,
    }

    componentDidMount() {
        const { fetchEntries } = this.props
        fetchEntries()
    }

    render() {
        return (
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
                            {location => style => {
                                const styles = {
                                    outer: {
                                        opacity: style.opacity,
                                    },
                                    inner: {
                                        transform: [{ translateX: style.translateX }],
                                    },
                                }

                                return (
                                    <Switch location={location}>
                                        <Route
                                            exact
                                            path="/"
                                            render={({ match }) => <Home styles={styles} match={match} />}
                                        />
                                        <Route
                                            exact
                                            path="/graphs"
                                            render={({ match }) => <Graphs styles={styles} match={match} />}
                                        />
                                        <Route
                                            exact
                                            path="/settings"
                                            render={({ match }) => <Settings styles={styles} match={match} />}
                                        />
                                        <Route
                                            path="/log/:date"
                                            render={({ match }) => <Log styles={styles} match={match} />}
                                        />
                                    </Switch>
                                )
                            }}
                        </Transition>
                    )}
                />
            </NativeRouter>
        )
    }
}

const ConnectedApp = connect(
    undefined,
    dispatch => ({
        fetchEntries: () => dispatch(fetchEntries()),
    }),
)(App)

export { ConnectedApp as App }
