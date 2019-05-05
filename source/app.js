import React, { Component } from "react"
import PropTypes from "prop-types"
import { NativeRouter, Route, Switch } from "react-router-native"
import { connect } from "react-redux"
import { Transition } from "react-spring/renderprops-native"
import { fetchEntries } from "./data"
import { Log, Home } from "./screens"

const styles = style => ({
    opacity: style.opacity,
    transform: [{ translateX: style.translateX }],
})

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
                            {location => style => (
                                <Switch location={location}>
                                    <Route
                                        exact
                                        path="/"
                                        render={({ match }) => <Home style={styles(style)} match={match} />}
                                    />
                                    <Route
                                        path="/log/:date"
                                        render={({ match }) => <Log style={styles(style)} match={match} />}
                                    />
                                </Switch>
                            )}
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
