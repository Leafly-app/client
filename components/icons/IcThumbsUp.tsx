import * as React from "react";
import type { SvgProps } from "react-native-svg";
import Svg, { Path } from "react-native-svg";

const SvgIcThumbsUp = (props: SvgProps) => (
  <Svg xmlns="http://www.w3.org/2000/svg" width={20} height={18} fill="none" {...props}>
    <Path
      fill={props.fill || "#000"}
      d="m12.518 4.647.28-1.701A2.537 2.537 0 0 0 9.29.206a2.62 2.62 0 0 0-1.306 1.295L6.431 4.647H2.5a2.5 2.5 0 0 0-2.5 2.5v7.5a2.5 2.5 0 0 0 2.5 2.5h15.848L20 7.949l.013-3.302zm-10.851 10v-7.5a.833.833 0 0 1 .833-.834h3.333v9.167H2.5a.833.833 0 0 1-.833-.833M18.333 7.73l-1.391 7.75H7.5V6.238l2.016-4.084a.892.892 0 0 1 1.435-.174.85.85 0 0 1 .194.7l-.6 3.633h7.788z"
    />
  </Svg>
);
export default SvgIcThumbsUp;
