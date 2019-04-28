import React from "react"
import { SafeAreaView, View } from "react-native"
import { animated } from "react-spring/renderprops-native"

const AnimatedView = animated(View)
const AnimatedSafeAreaView = animated(SafeAreaView)

const Screen = ({ style, children }) => {
    const { opacity, transform, ...styles } = style

    return (
        <AnimatedView
            style={{
                opacity,
                ...styles,
                position: "absolute",
                top: 0,
                right: 0,
                bottom: 0,
                left: 0,
            }}
        >
            <AnimatedSafeAreaView
                style={{
                    transform,
                }}
            >
                {children}
            </AnimatedSafeAreaView>
        </AnimatedView>
    )
}

export { Screen }
