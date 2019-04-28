import React from "react"
import { Text, TouchableWithoutFeedback, View } from "react-native"
import { Link } from "react-router-native"
import { Screen } from "../components"

const Log = ({ style }) => {
    return (
        <Screen style={{ ...style, backgroundColor: "#0fc" }}>
            <Link
                to="/"
                component={({ children, onPress }) => (
                    <TouchableWithoutFeedback onPress={onPress}>
                        <View style={{ padding: 10 }}>{children}</View>
                    </TouchableWithoutFeedback>
                )}
            >
                <Text>Go to home screen</Text>
            </Link>
            <Text>You're on the log screen</Text>
        </Screen>
    )
}

export { Log }
