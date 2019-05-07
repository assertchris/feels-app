import React, { Component } from "react"
import { Alert } from "react-native"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import styled, { css } from "styled-components/native"
import debounce from "lodash/debounce"
import { Navigation, Screen } from "../components"
import { Check, PowerOff } from "../icons"
import { fetchEntries, updateSetting, reset, removeKey } from "../data"

const StyledHeading = styled.View`
    padding: 10px 10px 0 10px;
`

const StyledHeadingText = styled.Text`
    font-size: 30px;
    color: #333;
`

const StyledContent = styled.ScrollView.attrs(() => ({
    contentContainerStyle: () => css`
        flex: 1;
        align-items: center;
        justify-content: center;
    `,
    showsVerticalScrollIndicator: false,
}))`
    flex: 1;
`

const StyledLabel = styled.View`
    flex: 1;
    margin: 10px 10px 0 10px;
`

const StyledLabelText = styled.Text`
    color: #333;
    font-weight: bold;
`

const StyledText = styled.TextInput`
    background-color: #fff;
    margin: 10px;
    padding: 10px;
`

const StyledKey = styled.TouchableOpacity.attrs(() => ({
    activeOpacity: 0.75,
}))`
    flex-grow: 1;
    width: 100%;
    margin: 10px 10px 0 10px;
`

const StyledKeyText = styled.Text`
    color: #333;
`

class Settings extends Component {
    static propTypes = {
        styles: PropTypes.object.isRequired,
        settings: PropTypes.object.isRequired,
        allKeys: PropTypes.array.isRequired,
        fetchEntries: PropTypes.func.isRequired,
        updateSetting: PropTypes.func.isRequired,
        reset: PropTypes.func.isRequired,
        removeKey: PropTypes.func.isRequired,
    }

    onRemoveKey = key => {
        const { removeKey } = this.props

        Alert.alert(
            "Remove key",
            "Are you sure you want to remove this key?",
            [
                {
                    text: "Cancel",
                    style: "cancel",
                },
                { text: "OK", onPress: () => removeKey(key) },
            ],
            { cancelable: false },
        )
    }

    render() {
        const { styles, settings, allKeys, fetchEntries, updateSetting, reset } = this.props
        const { onRemoveKey } = this

        styles.outer.backgroundColor = "#0fc"

        return (
            <Screen styles={styles}>
                <StyledHeading>
                    <StyledHeadingText>Settings</StyledHeadingText>
                </StyledHeading>
                <StyledContent>
                    <StyledLabel>
                        <StyledLabelText>Profile name</StyledLabelText>
                    </StyledLabel>
                    <StyledText
                        value={settings.profile}
                        onEndEditing={() => fetchEntries()}
                        onChangeText={text => updateSetting("profile", text.toLowerCase())}
                    />
                    <StyledLabel>
                        <StyledLabelText>Stored keys</StyledLabelText>
                    </StyledLabel>
                    {allKeys.map(key => (
                        <StyledKey key={key} onPress={() => onRemoveKey(key)}>
                            <StyledKeyText>Remove key {key}</StyledKeyText>
                        </StyledKey>
                    ))}
                </StyledContent>
                <Navigation
                    buttons={[
                        {
                            key: "home",
                            to: "/",
                            icon: Check,
                        },
                        {
                            key: "reset",
                            onPress: () => {
                                Alert.alert(
                                    "Remove all data",
                                    "Are you sure you want to remove all data?",
                                    [
                                        {
                                            text: "Cancel",
                                            style: "cancel",
                                        },
                                        { text: "OK", onPress: reset },
                                    ],
                                    { cancelable: false },
                                )
                            },
                            icon: PowerOff,
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
        allKeys: state.allKeys,
    }),
    dispatch => ({
        fetchEntries: debounce(() => dispatch(fetchEntries())),
        updateSetting: (key, value) => dispatch(updateSetting(key, value)),
        reset: debounce(() => dispatch(reset())),
        removeKey: key => dispatch(removeKey(key)),
    }),
)(Settings)

export { ConnectedSettings as Settings }
