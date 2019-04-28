import React from "react"
import { Text, TouchableWithoutFeedback, View } from "react-native"
import { Link } from "react-router-native"
import { Screen } from "../components"

const Home = ({ style }) => {
    return (
        <Screen style={{ ...style, backgroundColor: "#0cf" }}>
            <Link
                to="/log"
                component={({ children, onPress }) => (
                    <TouchableWithoutFeedback onPress={onPress}>
                        <View style={{ padding: 10 }}>{children}</View>
                    </TouchableWithoutFeedback>
                )}
            >
                <Text>Go to log screen</Text>
            </Link>
            <Text>You're on the home screen</Text>
        </Screen>
    )
}

export { Home }
