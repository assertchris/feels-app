import React from "react"
import { Text, TouchableWithoutFeedback, View } from "react-native"
import { Link } from "react-router-native"

const HomeEntry = ({ date }) => {
    return (
        <View>
            <Link
                to={`/log/${date}`}
                component={({ children, onPress }) => (
                    <TouchableWithoutFeedback onPress={onPress}>
                        <View style={{ padding: 10, paddingBottom: 0 }}>{children}</View>
                    </TouchableWithoutFeedback>
                )}
            >
                <Text>{date}</Text>
            </Link>
        </View>
    )
}

export { HomeEntry }
