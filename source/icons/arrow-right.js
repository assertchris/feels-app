import React from "react"
import { View } from "react-native"
import PropTypes from "prop-types"
import Svg, { Path } from "react-native-svg"

const ArrowRight = ({ color, width, height }) => (
    <View pointerEvents="none">
        <Svg width={width} height={height} viewBox="0 0 448 512">
            <Path
                fill={color}
                d="M190.5 66.9l22.2-22.2c9.4-9.4 24.6-9.4 33.9 0L441 239c9.4 9.4 9.4 24.6 0 33.9L246.6 467.3c-9.4 9.4-24.6 9.4-33.9 0l-22.2-22.2c-9.5-9.5-9.3-25 .4-34.3L311.4 296H24c-13.3 0-24-10.7-24-24v-32c0-13.3 10.7-24 24-24h287.4L190.9 101.2c-9.8-9.3-10-24.8-.4-34.3z"
            />
        </Svg>
    </View>
)

ArrowRight.propTypes = {
    color: PropTypes.string,
    width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
}

ArrowRight.defaultProps = {
    color: "#333",
    width: "100%",
    height: "100%",
}

export { ArrowRight }
