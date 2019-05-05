import React from "react"
import PropTypes from "prop-types"
import { animated } from "react-spring/renderprops-native"
import styled, { css } from "styled-components/native"

const AnimatedView = animated(
    styled.View`
        flex-grow: 1;
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
    `,
)

const AnimatedSafeAreaView = animated(styled.SafeAreaView`
    flex-grow: 1;
`)

const Screen = ({ styles: { outer, inner }, children, forceInset, onLayout }) => {
    return (
        <AnimatedView style={{ ...outer }}>
            <AnimatedSafeAreaView style={{ ...inner }} forceInset={forceInset} onLayout={onLayout}>
                {children}
            </AnimatedSafeAreaView>
        </AnimatedView>
    )
}

Screen.propTypes = {
    style: PropTypes.object,
    children: PropTypes.node,
    forceInset: PropTypes.object,
    onLayout: PropTypes.func,
}

Screen.defaultProps = {
    style: {},
    children: null,
    forceInset: undefined,
    onLayout: () => undefined,
}

export { Screen }
