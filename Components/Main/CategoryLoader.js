import React from "react"
import ContentLoader, { Rect, Circle, Path } from "react-content-loader/native"
import { Dimensions } from "react-native"

const {width,height} = Dimensions.get('window')

const CategoryLoader = (props) => (
  <ContentLoader 
    speed={2}
    width={width}
    height={height}
    viewBox={`0 0 ${width} ${height}`}
    backgroundColor="#fff"
    foregroundColor="#ecebeb"
    {...props}
  >
    <Rect x="50" y="12" rx="0" ry="0" width="40" height="41" /> 
    <Rect x="16" y="70" rx="7" ry="7" width="41" height="10" /> 
    <Rect x="17" y="87" rx="4" ry="4" width="43" height="15" /> 
    <Rect x="17" y="117" rx="0" ry="0" width="54" height="14" /> 
    <Rect x="32" y="142" rx="19" ry="19" width="84" height="22" /> 
    <Rect x="20" y="175" rx="0" ry="0" width="111" height="21" /> 
    <Rect x="185" y="12" rx="0" ry="0" width="40" height="41" /> 
    <Rect x="151" y="70" rx="7" ry="7" width="41" height="10" /> 
    <Rect x="152" y="87" rx="4" ry="4" width="43" height="15" /> 
    <Rect x="152" y="117" rx="0" ry="0" width="54" height="14" /> 
    <Rect x="167" y="142" rx="19" ry="19" width="84" height="22" /> 
    <Rect x="155" y="175" rx="0" ry="0" width="111" height="21" /> 
    <Rect x="52" y="218" rx="0" ry="0" width="40" height="41" /> 
    <Rect x="18" y="276" rx="7" ry="7" width="41" height="10" /> 
    <Rect x="19" y="293" rx="4" ry="4" width="43" height="15" /> 
    <Rect x="19" y="323" rx="0" ry="0" width="54" height="14" /> 
    <Rect x="34" y="348" rx="19" ry="19" width="84" height="22" /> 
    <Rect x="22" y="381" rx="0" ry="0" width="111" height="21" /> 
    <Rect x="187" y="218" rx="0" ry="0" width="40" height="41" /> 
    <Rect x="153" y="276" rx="7" ry="7" width="41" height="10" /> 
    <Rect x="154" y="293" rx="4" ry="4" width="43" height="15" /> 
    <Rect x="154" y="323" rx="0" ry="0" width="54" height="14" /> 
    <Rect x="169" y="348" rx="19" ry="19" width="84" height="22" /> 
    <Rect x="157" y="381" rx="0" ry="0" width="111" height="21" />
  </ContentLoader>
)

export default CategoryLoader