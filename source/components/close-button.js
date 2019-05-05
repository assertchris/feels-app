import React, { Component } from "react"
import PropTypes from "prop-types"
import { TouchableWithoutFeedback, NativeModules, StatusBarIOS } from "react-native"
import styled from "styled-components/native"
import { Times } from "../icons"

const { StatusBarManager } = NativeModules

const StyledButton = styled.View`
    position: absolute;
    justify-content: center;
    align-items: center;
    top: ${props => props.statusBarHeight}px;
    right: 0;
    padding: ${props => props.padding}px;
    z-index: 999;
`

class CloseButton extends Component {
    static propTypes = {
        onPress: PropTypes.func,
    }

    static defaultProps = {
        onPress: () => undefined,
    }

    state = {
        statusBarHeight: 0,
    }

    componentDidMount() {
        StatusBarManager.getHeight(response => this.setState({ statusBarHeight: response.height }))

        this.listener = StatusBarIOS.addListener("statusBarFrameWillChange", data =>
            this.setState({ statusBarHeight: data.frame.height }),
        )
    }

    componentWillUnmount() {
        this.listener.remove()
    }

    render() {
        const { onPress } = this.props
        const { statusBarHeight } = this.state

        return (
            <TouchableWithoutFeedback onPress={onPress}>
                <StyledButton statusBarHeight={statusBarHeight} padding={10}>
                    <Times width={24} height={24} />
                </StyledButton>
            </TouchableWithoutFeedback>
        )
    }
}

export { CloseButton }
