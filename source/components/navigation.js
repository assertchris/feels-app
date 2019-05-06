import React, { createElement } from "react"
import { TouchableWithoutFeedback } from "react-native"
import PropTypes from "prop-types"
import styled from "styled-components/native"
import { Link } from "react-router-native"

const StyledNavigationContainer = styled.View`
    flex-shrink: 1;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 7.5%;
`

export const StyledNavigationButton = styled.View`
    flex-grow: 1;
    align-items: center;
    justify-content: center;
`

const LinkButton = ({ component, icon, ...rest }) => (
    <Link
        {...rest}
        component={({ style, disabled, ...rest }) => (
            <TouchableWithoutFeedback disabled={disabled} {...rest}>
                <StyledNavigationButton style={{ ...style, opacity: disabled ? 0.5 : 1.0 }}>
                    {component ? createElement(component) : createElement(icon, { width: 24, height: 24 })}
                </StyledNavigationButton>
            </TouchableWithoutFeedback>
        )}
    />
)

const PressButton = ({ component, icon, style, disabled, ...rest }) => (
    <TouchableWithoutFeedback disabled={disabled} {...rest}>
        <StyledNavigationButton style={{ ...style, opacity: disabled ? 0.5 : 1.0 }}>
            {component ? createElement(component) : createElement(icon, { width: 24, height: 24 })}
        </StyledNavigationButton>
    </TouchableWithoutFeedback>
)

const Navigation = ({ buttons }) => (
    <StyledNavigationContainer>
        {buttons.map(button => {
            if (button.icon || button.component) {
                if (button.to) {
                    return <LinkButton {...button} />
                }

                if (button.onPress) {
                    return <PressButton {...button} />
                }
            }

            throw new Error("Navigation buttons need to/onPress and icon/component props")
        })}
    </StyledNavigationContainer>
)

Navigation.propTypes = {
    buttons: PropTypes.array.isRequired,
}

export { Navigation }
