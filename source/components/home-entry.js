import React from "react"
import { TouchableWithoutFeedback } from "react-native"
import { Link } from "react-router-native"
import styled from "styled-components/native"
import dayjs from "dayjs"

const StyledEntryContainer = styled.View`
    margin: 10px 10px 0 10px;
    padding: 10px;
    background-color: #fff;
    flex-grow: 1;
    flex-direction: row;
`

const StyledLeftCell = styled.View`
    width: 15%;
    flex-shrink: 1;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

const StyledDay = styled.Text`
    font-size: 30px;
`

const StyledMonth = styled.Text`
    font-size: 15px;
`

const StyledRightCell = styled.View`
    width: 85%;
    flex-grow: 1;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
`

const StyledComments = styled.Text`
    font-size: 15px;
`

const HomeEntry = ({ date, comments }) => {
    const dateObject = dayjs(date)

    return (
        <Link
            to={`/log/${date}`}
            component={({ onPress }) => (
                <TouchableWithoutFeedback onPress={onPress}>
                    <StyledEntryContainer>
                        <StyledLeftCell>
                            <StyledDay>{dateObject.format("D")}</StyledDay>
                            <StyledMonth>{dateObject.format("MMM")}</StyledMonth>
                        </StyledLeftCell>
                        <StyledRightCell>
                            <StyledComments>{comments}</StyledComments>
                        </StyledRightCell>
                    </StyledEntryContainer>
                </TouchableWithoutFeedback>
            )}
        />
    )
}

export { HomeEntry }
