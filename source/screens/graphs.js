import React, { Component } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import styled from "styled-components/native"
import { Navigation, Screen } from "../components"
import { ClipboardList, Pencil, Tools } from "../icons"

const StyledHeading = styled.View`
    padding: 10px 10px 0 10px;
`

const StyledHeadingText = styled.Text`
    font-size: 30px;
    color: #333;
`

const StyledContent = styled.View`
    flex: 1;
`

class Graphs extends Component {
    static propTypes = {
        styles: PropTypes.object,
        formattedDate: PropTypes.string.isRequired,
    }

    static defaultProps = {
        styles: {},
    }

    render() {
        const { styles, formattedDate } = this.props

        styles.outer.backgroundColor = "#0fc"

        return (
            <Screen styles={styles}>
                <StyledHeading>
                    <StyledHeadingText>Graphs</StyledHeadingText>
                </StyledHeading>
                <StyledContent />
                <Navigation
                    buttons={[
                        {
                            to: `/log/${formattedDate}`,
                            key: "log",
                            icon: Pencil,
                        },
                        {
                            to: "/",
                            key: "home",
                            icon: ClipboardList,
                        },
                        {
                            to: "/settings",
                            key: "settings",
                            icon: Tools,
                        },
                    ]}
                />
            </Screen>
        )
    }
}

const ConnectedGraphs = connect(
    state => ({
        formattedDate: state.formattedDate,
    }),
    dispatch => ({}),
)(Graphs)

export { ConnectedGraphs as Graphs }
