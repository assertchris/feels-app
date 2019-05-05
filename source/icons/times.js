import React from "react"
import { View } from "react-native"
import PropTypes from "prop-types"
import Svg, { Path } from "react-native-svg"

const Times = ({ color, width, height }) => (
    <View pointerEvents="none">
        <Svg width={width} height={height} viewBox="0 0 320 512">
            <Path
                fill={color}
                d="M207.6 256l107.72-107.72c6.23-6.23 6.23-16.34 0-22.58l-25.03-25.03c-6.23-6.23-16.34-6.23-22.58 0L160 208.4 52.28 100.68c-6.23-6.23-16.34-6.23-22.58 0L4.68 125.7c-6.23 6.23-6.23 16.34 0 22.58L112.4 256 4.68 363.72c-6.23 6.23-6.23 16.34 0 22.58l25.03 25.03c6.23 6.23 16.34 6.23 22.58 0L160 303.6l107.72 107.72c6.23 6.23 16.34 6.23 22.58 0l25.03-25.03c6.23-6.23 6.23-16.34 0-22.58L207.6 256z"
            />
        </Svg>
    </View>
)

Times.propTypes = {
    color: PropTypes.string,
    width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
}

Times.defaultProps = {
    color: "#333",
    width: "100%",
    height: "100%",
}

export { Times }
