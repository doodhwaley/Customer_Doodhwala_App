import React from "react"
import ContentLoader, { Rect, Circle, Path } from "react-content-loader/native"
import { Dimensions } from "react-native"

const {width,height} = Dimensions.get('window')

const MainLoader = (props) => (
  <ContentLoader 
    speed={2}
    width={width}
    height={height}
    viewBox={`0 0 ${width} ${height}`}
    backgroundColor="#fff"
    foregroundColor="#ecebeb"
    {...props}
  >
    <Rect x="21" y="32" rx="0" ry="0" width="85" height="12" /> 
    <Rect x="22" y="55" rx="0" ry="0" width="73" height="12" /> 
    <Rect x="174" y="57" rx="0" ry="0" width="119" height="13" /> 
    <Rect x="20" y="89" rx="12" ry="12" width={width*0.9} height="110" /> 
    <Rect x="110" y="216" rx="0" ry="0" width="149" height="24" /> 
    <Rect x="60" y="265" rx="0" ry="0" width="111" height="26" /> 
    <Rect x="60" y="303" rx="0" ry="0" width="111" height="26" /> 
    <Rect x="193" y="302" rx="0" ry="0" width="111" height="26" /> 
    <Rect x="193" y="264" rx="0" ry="0" width="111" height="26" /> 
    <Rect x="253" y="360" rx="8" ry="8" width={width*0.4} height="162" /> 
    <Rect x="20" y="359" rx="8" ry="8" width={width*0.6} height="162" /> 
    <Rect x="73" y="587" rx="0" ry="0" width="61" height="50" /> 
    <Rect x="20" y="663" rx="0" ry="0" width="38" height="9" /> 
    <Rect x="20" y="682" rx="0" ry="0" width="51" height="15" /> 
    <Rect x="20" y="708" rx="0" ry="0" width="11" height="21" /> 
    <Rect x="53" y="733" rx="18" ry="18" width="100" height="17" /> 
    <Rect x="52" y="764" rx="0" ry="0" width="102" height="24" /> 
    <Rect x="61" y="799" rx="0" ry="0" width="54" height="10" /> 
    <Rect x="201" y="587" rx="0" ry="0" width="61" height="50" /> 
    <Rect x="177" y="663" rx="0" ry="0" width="38" height="9" /> 
    <Rect x="177" y="682" rx="0" ry="0" width="51" height="15" /> 
    <Rect x="177" y="708" rx="0" ry="0" width="11" height="21" /> 
    <Rect x="181" y="733" rx="18" ry="18" width="100" height="17" /> 
    <Rect x="180" y="764" rx="0" ry="0" width="102" height="24" /> 
    <Rect x="189" y="799" rx="0" ry="0" width="54" height="10" />
  </ContentLoader>
)

export default MainLoader