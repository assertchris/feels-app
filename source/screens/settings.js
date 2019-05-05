import React, { Component } from "react"
import { connect } from "react-redux"
import styled from "styled-components/native"
import { Navigation, Screen } from "../components"
import { Check } from "../icons"

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

class Settings extends Component {
    render() {
        const { styles } = this.props

        styles.outer.backgroundColor = "#0fc"

        return (
            <Screen styles={styles}>
                <StyledHeading>
                    <StyledHeadingText>Settings</StyledHeadingText>
                </StyledHeading>
                <StyledContent />
                <Navigation
                    buttons={[
                        {
                            to: "/",
                            key: "home",
                            icon: Check,
                        },
                    ]}
                />
            </Screen>
        )
    }
}

const ConnectedSettings = connect(
    state => ({}),
    dispatch => ({}),
)(Settings)

export { ConnectedSettings as Settings }
