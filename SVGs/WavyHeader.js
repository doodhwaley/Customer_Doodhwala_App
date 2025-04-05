import * as React from "react"
import Svg, { Path } from "react-native-svg"
import { Config } from "../Constants"

function WavyHeader(props) {
  return (
    <Svg xmlns="http://www.w3.org/2000/svg" viewBox={`0 0 1600 1200`}  {...props}>
      <Path
        fill={Config.secondColor}
        d="M0 256l21.8-16C43.6 224 87 192 131 192c43.5 0 87 32 131 26.7 43.5-5.7 87-47.7 131-74.7 43.4-27 87-37 131-21.3 43.3 16.3 87 58.3 131 48 43.2-10.7 87-74.7 130-69.4C829.1 107 873 181 916 224c44 43 88 53 131 64 43.9 11 88 21 131 26.7 43.8 5.3 87 5.3 131 0 43.7-5.7 87-15.7 109-21.4l22-5.3v32H0z"
      />
    </Svg>
  )
}

export default WavyHeader