import React from "react"
import { Text } from "react-native"
import { Link } from "react-router-native"
import { Screen } from "../components"

const Log = ({ style }) => {
    return (
        <Screen style={{ ...style, backgroundColor: "#0cf" }}>
            <Link to="/">
                <Text>Home</Text>
            </Link>
            <Text>Log</Text>
        </Screen>
    )
}

export { Log }
