import React from "react"
import { DatePickerIOS, Picker, Switch } from "react-native"
import PropTypes from "prop-types"
import styled from "styled-components/native"

const StyledContainer = styled.View`
    flex-grow: 1;
    width: 100%;
    height: 100%;
`

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
    let date = undefined
    let newOnChange = onChange

    if (inputType === "time") {
        date = new Date()

        if (value) {
            if (!value.match(/^\d{2}:\d{2}$/)) {
                alert(value)
                value = "12:00"
            }

            const [hours, minutes] = value.split(":")

            date.setHours(hours)
            date.setMinutes(minutes)
        }

        newOnChange = value => {
            const hours = value
                .getHours()
                .toString()
                .padStart(2, "0")

            const minutes = value
                .getMinutes()
                .toString()
                .padStart(2, "0")

            onChange(`${hours}:${minutes}`)
        }
    }

    return (
        <StyledContainer>
            <StyledHeading>
                <StyledHeadingText>
                    {number}. {heading}
                </StyledHeadingText>
            </StyledHeading>
            {inputType === "time" && <DatePickerIOS date={date} onDateChange={newOnChange} mode="time" />}
            {inputType === "text" && <StyledText value={value} onChangeText={newOnChange} />}
            {inputType === "yes/no" && <Switch value={value} onValueChange={newOnChange} />}
            {inputType === "enum" && (
                <Picker selectedValue={value} onValueChange={newOnChange}>
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
