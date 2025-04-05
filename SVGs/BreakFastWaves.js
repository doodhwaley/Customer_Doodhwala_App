import * as React from "react"
import Svg, { Path } from "react-native-svg"
import { Config } from "../Constants"

function BreakFastWaves(props) {
  return (
    <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" {...props}>
      <Path
        fill={Config.secondColor}
        d="M0 160l21.8-5.3C43.6 149 87 139 131 154.7 174.5 171 218 213 262 224c43.5 11 87-11 131-37.3C436.4 160 480 128 524 112c43.3-16 87-16 131 10.7C698.2 149 742 203 785 208c44.1 5 88-37 131-37.3 44 .3 88 42.3 131 53.3 43.9 11 88-11 131-26.7 43.8-16.3 87-26.3 131-37.3 43.7-11 87-21 109-26.7l22-5.3V0H0z"
      />
    </Svg>
  )
}

export default BreakFastWaves
