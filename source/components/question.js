import React from "react"
import { Picker, Switch } from "react-native"
import PropTypes from "prop-types"
import styled from "styled-components/native"

const StyledContainer = styled.View``

const StyledHeading = styled.View`
    padding: 10px 10px 0 10px;
`

const StyledHeadingText = styled.Text`
    font-size: 20px;
    color: #333;
`

const StyledText = styled.TextInput`
    background-color: #fff;
    margin: 10px;
    padding: 10px;
`

const Question = ({ number, heading, inputType, options, value, onChange }) => {
    return (
        <StyledContainer>
            <StyledHeading>
                <StyledHeadingText>
                    {number}. {heading}
                </StyledHeadingText>
            </StyledHeading>
            {inputType === "text" && <StyledText value={value} onChangeText={onChange} />}
            {inputType === "yes/no" && <Switch value={value} onValueChange={onChange} />}
            {inputType === "enum" && (
                <Picker selectedValue={value} onValueChange={onChange}>
                    {options.map(option => (
                        <Picker.Item key={option} label={option} value={option} />
                    ))}
                </Picker>
            )}
        </StyledContainer>
    )
}

Question.propTypes = {
    heading: PropTypes.string.isRequired,
    inputType: PropTypes.string.isRequired,
    value: PropTypes.any,
    onChange: PropTypes.func.isRequired,
}

Question.defaultProps = {
    value: undefined,
}

export { Question }
