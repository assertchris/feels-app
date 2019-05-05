import React from "react"
import { TouchableWithoutFeedback } from "react-native"
import PropTypes from "prop-types"
import styled from "styled-components/native"
import { Link } from "react-router-native"
import { ChartLine, Home, Tools } from "../icons"

const StyledNavigationContainer = styled.View`
    flex-shrink: 1;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 7.5%;
`

const StyledNavigationButton = styled.View`
    flex-grow: 1;
    align-items: center;
    justify-content: center;
`

const Navigation = ({ buttons }) => (
    <StyledNavigationContainer>
        {buttons.map(button => {
            if (button.icon) {
                const Icon = button.icon

                return (
                    <Link
                        key={button.key}
                        to={button.to}
                        component={({ onPress }) => (
                            <TouchableWithoutFeedback onPress={onPress}>
                                <StyledNavigationButton>
                                    <Icon width={24} height={24} />
                                </StyledNavigationButton>
                            </TouchableWithoutFeedback>
                        )}
                    />
                )
            }

            return <Link key={button.key} to={button.to} component={button.component} />
        })}
    </StyledNavigationContainer>
)

Navigation.propTypes = {
    buttons: PropTypes.array.isRequired,
}

export { Navigation }
