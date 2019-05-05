import React, { Component } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import styled from "styled-components/native"
import dayjs from "dayjs"
import { Navigation, Question, Screen } from "../components"
import { updateEntry } from "../data"
import { Check, Tools } from "../icons"

const questions = [
    { key: "wokeUpAt", type: "string", inputType: "text", heading: "When did you wake up?" },
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
    { key: "startedWorkAt", type: "string", inputType: "text", heading: "When did you start work?" },
    { key: "wasGoodLunch", type: "boolean", inputType: "yes/no", heading: "Did you eat a good lunch?" },
    { key: "lunchBadThings", type: "string", inputType: "text", heading: "Did it have anything bad in it?" },
    { key: "finishedWorkAt", type: "string", inputType: "text", heading: "When did you finish work?" },
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
    { key: "wentToBedAt", type: "string", inputType: "text", heading: "When did you go to bed?" },
    { key: "comments", type: "string", inputType: "text", heading: "Anything else?" },
]

const StyledQuestions = styled.ScrollView.attrs(() => ({
    contentContainerStyle: () => css`
        flex: 1;
        align-items: center;
        justify-content: center;
    `,
    showsVerticalScrollIndicator: false,
}))`
    flex: 1;
`

const StyledHeading = styled.View`
    padding: 10px 10px 0 10px;
`

const StyledHeadingText = styled.Text`
    font-size: 30px;
    color: #333;
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

    constructor(...params) {
        super(...params)

        for (let i in questions) {
            const question = questions[i]

            if (["string"].includes(question.type)) {
                this.state[question.key] = ""
            }

            if (["boolean"].includes(question.type)) {
                this.state[question.key] = false
            }
        }

        console.log("state", this.state)
    }

    componentDidMount() {
        const { entries, match } = this.props
        const entry = entries.find(entry => entry.date === match.params.date)

        this.setState({ ...entry })
    }

    onChange = (key, value) => {
        const { match, updateEntry } = this.props

        this.setState({
            [key]: value,
        })

        updateEntry(match.params.date, key, value)
    }

    render() {
        const { styles, match } = this.props

        styles.outer.backgroundColor = "#0fc"

        return (
            <Screen styles={styles}>
                <StyledHeading>
                    <StyledHeadingText>Journal, {dayjs(match.params.date).format("D MMM")}</StyledHeadingText>
                </StyledHeading>
                <StyledQuestions>
                    {questions.map((question, i) => (
                        <Question
                            {...question}
                            number={i + 1}
                            value={this.state[question.key]}
                            onChange={value => this.onChange(question.key, value)}
                        />
                    ))}
                </StyledQuestions>
                <Navigation
                    buttons={[
                        {
                            to: "/",
                            key: "home",
                            icon: Check,
                        },
                        {
                            to: "/settings",
                            key: "settings",
                            icon: Tools,
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
