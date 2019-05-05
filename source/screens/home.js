import React, { Component } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { Link } from "react-router-native"
import { HomeEntry, LogButton, Screen } from "../components"

class Home extends Component {
    static propTypes = {
        style: PropTypes.object,
        entries: PropTypes.array.isRequired,
        formattedDate: PropTypes.string.isRequired,
    }

    static defaultProps = {
        style: {},
    }

    render() {
        const { style, entries, formattedDate } = this.props

        const objects = Object.values(entries)

        objects.sort((a, b) => {
            if (a.date < b.date) {
                return 1
            }
            if (a.date > b.date) {
                return -1
            }

            return 0
        })

        return (
            <Screen style={{ ...style, backgroundColor: "#0cf" }}>
                <Link to={`/log/${formattedDate}`} component={LogButton} />
                {objects.map(entry => (
                    <HomeEntry key={entry.date} {...entry} />
                ))}
            </Screen>
        )
    }
}

const ConnectedHome = connect(
    state => ({
        entries: state.entries,
        formattedDate: state.formattedDate,
    }),
    undefined,
)(Home)

export { ConnectedHome as Home }
