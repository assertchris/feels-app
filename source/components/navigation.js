import React from "react"
import { TouchableWithoutFeedback } from "react-native"
import styled from "styled-components/native"
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

const Navigation = () => (
    <StyledNavigationContainer>
        <TouchableWithoutFeedback onPress={() => alert("home")}>
            <StyledNavigationButton>
                <Home width={24} height={24} />
            </StyledNavigationButton>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => alert("graphs")}>
            <StyledNavigationButton>
                <ChartLine width={24} height={24} />
            </StyledNavigationButton>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => alert("settings")}>
            <StyledNavigationButton>
                <Tools width={24} height={24} />
            </StyledNavigationButton>
        </TouchableWithoutFeedback>
    </StyledNavigationContainer>
)

export { Navigation }
