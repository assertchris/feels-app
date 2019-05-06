import React, { Component } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import styled, { css } from "styled-components/native"
import dayjs from "dayjs"
import { animated, Transition } from "react-spring/renderprops-native"
import { Navigation, Question, Screen } from "../components"
import { updateEntry } from "../data"
import { ArrowLeft, ArrowRight, Check } from "../icons"

const questions = [
    { key: "wokeUpAt", type: "string", inputType: "time", heading: "When did you wake up?" },
    { key: "wasGoodSleep", type: "boolean", inputType: "yes/no", heading: "Was it good sleep?" },
    {
        key: "feltWhenWokeUp",
        type: "string",
        inputType: "enum",
        options: ["good", "ok", "bad"],
        value: "ok",
        heading: "How did you feel when you woke up?",
    },
    { key: "wasGoodBreakfast", type: "boolean", inputType: "yes/no", heading: "Did you eat a good breakfast?" },
    { key: "breakfastBadThings", type: "string", inputType: "text", heading: "Did it have anything bad in it?" },
    { key: "wasStressedAboutWork", type: "boolean", inputType: "yes/no", heading: "Were you stressed about work?" },
    {
        key: "beforeWorkBadThings",
        type: "string",
        inputType: "text",
        heading: "Did bad things happen before you got to work?",
    },
    { key: "startedWorkAt", type: "string", inputType: "time", heading: "When did you start work?" },
    { key: "wasGoodLunch", type: "boolean", inputType: "yes/no", heading: "Did you eat a good lunch?" },
    { key: "lunchBadThings", type: "string", inputType: "text", heading: "Did it have anything bad in it?" },
    { key: "finishedWorkAt", type: "string", inputType: "time", heading: "When did you finish work?" },
    {
        key: "didCompleteEverything",
        type: "boolean",
        inputType: "yes/no",
        heading: "Did you get everything done that you wanted to?",
    },
    { key: "workDayFeelings", type: "string", inputType: "text", heading: "How do you feel about your work day?" },
    {
        key: "afterWorkBadThings",
        type: "string",
        inputType: "text",
        heading: "Did bad things happen after you went home from work?",
    },
    { key: "wasGoodDinner", type: "boolean", inputType: "yes/no", heading: "Did you eat a good dinner?" },
    { key: "dinnerBadThings", type: "string", inputType: "text", heading: "Did it have anything bad in it?" },
    { key: "didEatSnacks", type: "boolean", inputType: "yes/no", heading: "Did you eat any snacks during the day?" },
    { key: "snacksBadThings", type: "string", inputType: "text", heading: "Did the snacks have anything bad in them?" },
    { key: "workedOnSideProjects", type: "string", inputType: "text", heading: "What side projects did you work on?" },
    { key: "bestThing", type: "string", inputType: "text", heading: "What was the best thing that happened?" },
    { key: "worstThing", type: "string", inputType: "text", heading: "What was the worst thing that happened?" },
    {
        key: "feltWhenGoingToBed",
        type: "string",
        inputType: "enum",
        options: ["good", "ok", "bad"],
        value: "ok",
        heading: "How did you feel before bed?",
    },
    { key: "wentToBedAt", type: "string", inputType: "time", heading: "When did you go to bed?" },
    { key: "comments", type: "string", inputType: "text", heading: "Anything else?" },
]

const StyledQuestionsContainer = styled.View`
    flex-grow: 1;
    position: relative;
    width: 100%;
`

const StyledQuestions = animated(styled.View`
    flex-grow: 1;
    align-items: flex-start;
    justify-content: flex-start;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
`)

const StyledHeading = styled.View`
    padding: 10px 10px 0 10px;
`

const StyledHeadingText = styled.Text`
    font-size: 30px;
    color: #333;
`

const StyledConfirmation = styled.ScrollView.attrs(() => ({
    contentContainerStyle: () => css`
        flex-grow: 1;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
    `,
    showsVerticalScrollIndicator: false,
}))`
    flex-grow: 1;
    width: 100%;
    height: 100%;
`

const StyledConfirmationValue = styled.View`
    flex-grow: 1;
    background-color: #fff;
    margin: 10px 10px 0 10px;
    padding: 10px;
`

const StyledConfirmationValueText = styled.Text`
    color: #333;
`

const StyledConfirmationValueTextHeading = styled(StyledConfirmationValueText)`
    font-weight: bold;
    padding-bottom: 10px;
`

class Log extends Component {
    static propTypes = {
        styles: PropTypes.object,
        entries: PropTypes.array.isRequired,
        match: PropTypes.object.isRequired,
        updateEntry: PropTypes.func.isRequired,
    }

    static defaultProps = {
        styles: {
            outer: {},
            inner: {},
        },
    }

    state = {
        question: 0,
    }

    onChange = (key, value) => {
        const { match, updateEntry } = this.props
        updateEntry(match.params.date, key, value)
    }

    onPrevious = () => {
        const { question } = this.state

        this.setState({
            question: question - 1,
        })
    }

    onNext = () => {
        const { question } = this.state

        this.setState({
            question: question + 1,
        })
    }

    render() {
        const { styles, match, entries } = this.props
        const { question } = this.state
        const { onPrevious, onNext } = this

        const entry = entries.find(entry => entry.date === match.params.date)

        styles.outer.backgroundColor = "#0fc"

        return (
            <Screen styles={styles}>
                <StyledHeading>
                    <StyledHeadingText>Journal, {dayjs(match.params.date).format("D MMM")}</StyledHeadingText>
                </StyledHeading>
                <StyledQuestionsContainer>
                    <Transition
                        native
                        config={{
                            tension: 200,
                            friction: 20,
                        }}
                        keys={() => question}
                        from={{ opacity: 0.0, translateX: 100 }}
                        enter={{ opacity: 1.0, translateX: 0 }}
                        leave={{ opacity: 0.0, translateX: -100 }}
                    >
                        {() => style => (
                            <StyledQuestions
                                style={{ opacity: style.opacity, transform: [{ translateX: style.translateX }] }}
                            >
                                {question >= questions.length ? (
                                    <StyledConfirmation>
                                        {questions.map(question =>
                                            entry[question.key] !== undefined &&
                                            (question.inputType !== "text" || entry[question.key]) ? (
                                                <StyledConfirmationValue key={question.key}>
                                                    <StyledConfirmationValueTextHeading>
                                                        {question.heading}
                                                    </StyledConfirmationValueTextHeading>
                                                    <StyledConfirmationValueText>
                                                        {question.inputType === "time" && entry[question.key]}
                                                        {question.inputType === "text" && entry[question.key]}
                                                        {question.inputType === "yes/no" &&
                                                            (entry[question.key] ? "yes" : "no")}
                                                        {question.inputType === "enum" && entry[question.key]}
                                                    </StyledConfirmationValueText>
                                                </StyledConfirmationValue>
                                            ) : null,
                                        )}
                                    </StyledConfirmation>
                                ) : (
                                    <Question
                                        {...questions[question]}
                                        number={question + 1}
                                        value={entry[questions[question].key]}
                                        onChange={value => this.onChange(questions[question].key, value)}
                                    />
                                )}
                            </StyledQuestions>
                        )}
                    </Transition>
                </StyledQuestionsContainer>
                <Navigation
                    buttons={[
                        {
                            key: "home",
                            to: "/",
                            icon: Check,
                        },
                        {
                            key: "previous",
                            disabled: question <= 0,
                            onPress: onPrevious,
                            icon: ArrowLeft,
                        },
                        {
                            key: "next",
                            disabled: question >= questions.length,
                            onPress: onNext,
                            icon: ArrowRight,
                        },
                    ]}
                />
            </Screen>
        )
    }
}

const ConnectedLog = connect(
    state => ({
        entries: state.entries,
    }),
    dispatch => ({
        updateEntry: (date, key, value) => dispatch(updateEntry(date, key, value)),
    }),
)(Log)

export { ConnectedLog as Log }
