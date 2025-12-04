import * as React from "react";
import type { SvgProps } from "react-native-svg";
import Svg, { Path } from "react-native-svg";

const SvgIcPlus = ({ color = "#000", ...props }: SvgProps) => (
  <Svg viewBox="0 0 14 14" fill="none" {...props}>
    <Path fill={color} d="M8.167 5.833V0H5.833v5.833H0v2.334h5.833V14h2.334V8.167H14V5.833z" />
  </Svg>
);
export default SvgIcPlus;
