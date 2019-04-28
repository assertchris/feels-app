import React from "react"
import { Text } from "react-native"
import { Link } from "react-router-native"
import { Screen } from "../components"

const Home = ({ style }) => {
    return (
        <Screen style={{ ...style, backgroundColor: "#0fc" }}>
            <Link to="/log">
                <Text>Log today</Text>
            </Link>
            <Text>Home</Text>
        </Screen>
    )
}

export { Home }
