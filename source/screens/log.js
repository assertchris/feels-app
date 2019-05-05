import React, { Component } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { Link } from "react-router-native"
import styled from "styled-components/native"
import { CloseButton, Screen } from "../components"
import { updateEntry } from "../data"

const StyledDateText = styled.Text`
    color: #333;
`

const StyledTextInput = styled.TextInput`
    background-color: #fff;
    margin: 10px;
    padding: 10px;
`

class Log extends Component {
    static propTypes = {
        style: PropTypes.object,
        entries: PropTypes.array.isRequired,
        match: PropTypes.object.isRequired,
        updateEntry: PropTypes.func.isRequired,
    }

    static defaultProps = {
        style: {},
    }

    state = {
        comments: "",
    }

    componentDidMount() {
        const { entries, match } = this.props
        const entry = entries.find(entry => entry.date === match.params.date)

        this.setState({ ...entry })
    }

    onChange = (key, value) => {
        const { match, updateEntry } = this.props

        this.setState({
            [key]: value,
        })

        updateEntry(match.params.date, key, value)
    }

    render() {
        const { style, match } = this.props
        const { comments } = this.state

        return (
            <Screen style={{ ...style, backgroundColor: "#0fc" }}>
                <Link to="/" component={CloseButton} />
                <StyledDateText>{match.params.date}</StyledDateText>
                <StyledTextInput value={comments} onChangeText={text => this.onChange("comments", text)} />
            </Screen>
        )
    }
}

const ConnectedLog = connect(
    state => ({
        entries: state.entries,
    }),
    dispatch => ({
        updateEntry: (date, key, value) => dispatch(updateEntry(date, key, value)),
    }),
)(Log)

export { ConnectedLog as Log }
