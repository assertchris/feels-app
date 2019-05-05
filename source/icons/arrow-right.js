import React from "react"
import { View } from "react-native"
import PropTypes from "prop-types"
import Svg, { Path } from "react-native-svg"

const ArrowRight = ({ color, width, height }) => (
    <View pointerEvents="none">
        <Svg width={width} height={height} viewBox="0 0 448 512">
            <Path
                fill={color}
                d="M218.101 38.101L198.302 57.9c-4.686 4.686-4.686 12.284 0 16.971L353.432 230H12c-6.627 0-12 5.373-12 12v28c0 6.627 5.373 12 12 12h341.432l-155.13 155.13c-4.686 4.686-4.686 12.284 0 16.971l19.799 19.799c4.686 4.686 12.284 4.686 16.971 0l209.414-209.414c4.686-4.686 4.686-12.284 0-16.971L235.071 38.101c-4.686-4.687-12.284-4.687-16.97 0z"
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
