import React, { Component } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { Link } from "react-router-native"
import styled, { css } from "styled-components/native"
import { HomeEntry, LogButton, Navigation, Screen } from "../components"
import { ChartLine, Pencil, Tools } from "../icons"

const StyledScrollView = styled.ScrollView.attrs(() => ({
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

class Home extends Component {
    static propTypes = {
        styles: PropTypes.object,
        entries: PropTypes.array.isRequired,
        formattedDate: PropTypes.string.isRequired,
    }

    static defaultProps = {
        styles: {
            outer: {},
            inner: {},
        },
    }

    render() {
        const { styles, entries, formattedDate } = this.props

        const objects = Object.values(entries)

        objects.sort((a, b) => {
            if (a.date < b.date) {
                return 1
            }
            if (a.date > b.date) {
                return -1
            }

            return 0
        })

        styles.outer.backgroundColor = "#0cf"

        return (
            <Screen styles={styles}>
                <StyledHeading>
                    <StyledHeadingText>Overview</StyledHeadingText>
                </StyledHeading>
                <StyledScrollView>
                    {objects.map(entry => (
                        <HomeEntry key={entry.date} {...entry} />
                    ))}
                </StyledScrollView>
                <Navigation
                    buttons={[
                        {
                            to: `/log/${formattedDate}`,
                            key: "log",
                            icon: Pencil,
                        },
                        {
                            to: "/graphs",
                            key: "graphs",
                            icon: ChartLine,
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

const ConnectedHome = connect(
    state => ({
        entries: state.entries,
        formattedDate: state.formattedDate,
    }),
    undefined,
)(Home)

export { ConnectedHome as Home }
