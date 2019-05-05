import React from "react"
import { View } from "react-native"
import PropTypes from "prop-types"
import Svg, { Path } from "react-native-svg"

const Times = ({ color, width, height }) => (
    <View pointerEvents="none">
        <Svg width={width} height={height} viewBox="0 0 352 512">
            <Path
                fill={color}
                d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"
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
