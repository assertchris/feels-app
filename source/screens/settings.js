import React, { Component } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import styled from "styled-components/native"
import { Navigation, Screen } from "../components"
import { Check } from "../icons"
import { updateSetting } from "../data"

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

const StyledText = styled.TextInput`
    background-color: #fff;
    margin: 10px;
    padding: 10px;
`

class Settings extends Component {
    static propTypes = {
        settings: PropTypes.object.isRequired,
        updateSetting: PropTypes.func.isRequired,
    }

    render() {
        const { styles, settings, updateSetting } = this.props

        styles.outer.backgroundColor = "#0fc"

        return (
            <Screen styles={styles}>
                <StyledHeading>
                    <StyledHeadingText>Settings</StyledHeadingText>
                </StyledHeading>
                <StyledContent>
                    <StyledText value={settings.profile} onChangeText={text => updateSetting("profile", text)} />
                </StyledContent>
                <Navigation
                    buttons={[
                        {
                            key: "home",
                            to: "/",
                            icon: Check,
                        },
                    ]}
                />
            </Screen>
        )
    }
}

const ConnectedSettings = connect(
    state => ({
        settings: state.settings,
    }),
    dispatch => ({
        updateSetting: (key, value) => dispatch(updateSetting(key, value)),
    }),
)(Settings)

export { ConnectedSettings as Settings }
