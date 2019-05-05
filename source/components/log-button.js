import React from "react"
import PropTypes from "prop-types"
import { TouchableWithoutFeedback } from "react-native"
import styled from "styled-components/native"
import { ArrowRight } from "../icons"

const StyledButton = styled.View`
    flex-grow: 1;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    margin: 10px 10px 0 10px;
    padding: 10px;
    background-color: #fff;
`

const StyledButtonText = styled.Text`
    color: #333;
    margin-right: 10px;
`

const LogButton = ({ onPress }) => (
    <TouchableWithoutFeedback onPress={onPress}>
        <StyledButton>
            <StyledButtonText>Log Today</StyledButtonText>
            <ArrowRight width={16} height={16} />
        </StyledButton>
    </TouchableWithoutFeedback>
)

LogButton.propTypes = {
    onPress: PropTypes.func,
}

LogButton.defaultProps = {
    onPress: () => undefined,
}

export { LogButton }
