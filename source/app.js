import React, { Component } from "react"
import { NativeEventEmitter } from "react-native"
import iCloudStorage from "react-native-icloudstore"
import PropTypes from "prop-types"
import { NativeRouter, Route, Switch } from "react-router-native"
import { connect } from "react-redux"
import { Transition } from "react-spring/renderprops-native"
import debounce from "lodash/debounce"
import { fetchEntries, fetchSettings } from "./data"
import { Graphs, Log, Home, Settings } from "./screens"

class App extends Component {
    static propTypes = {
        busy: PropTypes.object.isRequired,
        entries: PropTypes.array.isRequired,
        fetchEntries: PropTypes.func.isRequired,
        fetchSettings: PropTypes.func.isRequired,
    }

    componentDidUpdate() {
        const { fetchEntries, busy, entries } = this.props

        if (!busy.fetchSettings && !busy.fetchEntries && entries.length < 1) {
            fetchEntries()
        }
    }

    componentDidMount() {
        const { fetchEntries, fetchSettings } = this.props
        fetchSettings()

        this.eventEmitter = new NativeEventEmitter(iCloudStorage)
        this.eventEmitter.addListener("iCloudStoreDidChangeRemotely", debounce(fetchEntries))
    }

    componentWillUnmount() {
        this.eventEmitter.remove()
    }

    render() {
        return (
            <NativeRouter>
                <Route
                    render={({ location }) => (
                        <Transition
                            native
                            config={{
                                tension: 300,
                                friction: 20,
                            }}
                            items={location}
                            keys={location => location.pathname}
                            from={{ opacity: 0.0, translateX: 100 }}
                            enter={{ opacity: 1.0, translateX: 0 }}
                            leave={{ opacity: 0.0, translateX: -100 }}
                            ref={this.animation}
                            unique={true}
                            reset={true}
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
    state => ({
        busy: state.busy,
        entries: state.entries,
    }),
    dispatch => ({
        fetchEntries: debounce(() => dispatch(fetchEntries())),
        fetchSettings: debounce(() => dispatch(fetchSettings())),
    }),
)(App)

export { ConnectedApp as App }
