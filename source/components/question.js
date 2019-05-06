import React, { Component } from "react"
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

class Question extends Component {
    static propTypes = {
        heading: PropTypes.string.isRequired,
        inputType: PropTypes.string.isRequired,
        value: PropTypes.any,
        onChange: PropTypes.func.isRequired,
    }

    static defaultProps = {
        value: undefined,
    }

    onChange = value => {
        const { inputType, onChange } = this.props

        if (inputType === "time") {
            const hours = value
                .getHours()
                .toString()
                .padStart(2, "0")

            const minutes = value
                .getMinutes()
                .toString()
                .padStart(2, "0")

            onChange(`${hours}:${minutes}`)
        } else {
            onChange(value)
        }
    }

    render() {
        const { number, heading, inputType, options, value } = this.props
        const { onChange } = this

        let date = new Date()

        if (inputType === "time" && value) {
            if (!value.match(/^\d{2}:\d{2}$/)) {
                value = "12:00"
            }

            const [hours, minutes] = value.split(":")

            date.setHours(hours)
            date.setMinutes(minutes)
        }

        return (
            <StyledContainer>
                <StyledHeading>
                    <StyledHeadingText>
                        {number}. {heading}
                    </StyledHeadingText>
                </StyledHeading>
                {inputType === "time" && <DatePickerIOS date={date} onDateChange={onChange} mode="time" />}
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
}

export { Question }
