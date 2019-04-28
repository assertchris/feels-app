import React from "react"
import { SafeAreaView, View } from "react-native"
import { animated } from "react-spring/renderprops-native"

const AnimatedView = animated(View)

const Screen = ({ style, children }) => {
    return (
        <AnimatedView
            style={{
                ...style,
                position: "absolute",
                top: 0,
                right: 0,
                bottom: 0,
                left: 0,
            }}
        >
            <SafeAreaView>{children}</SafeAreaView>
        </AnimatedView>
    )
}

export { Screen }
