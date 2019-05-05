import React from "react"
import PropTypes from "prop-types"
import { SafeAreaView, Text, View } from "react-native"
import { animated } from "react-spring/renderprops-native"

const AnimatedView = animated(View)
const AnimatedSafeAreaView = animated(SafeAreaView)

const Screen = ({ style, children, forceInset }) => {
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
                forceInset={forceInset}
            >
                {children}
            </AnimatedSafeAreaView>
        </AnimatedView>
    )
}

Screen.propTypes = {
    style: PropTypes.object,
    children: PropTypes.node,
    forceInset: PropTypes.object,
}

Screen.defaultProps = {
    style: {},
    children: null,
    forceInset: undefined,
}

export { Screen }
