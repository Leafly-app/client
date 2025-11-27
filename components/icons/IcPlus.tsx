import * as React from "react";
import Svg, { Path } from "react-native-svg";
import type { SvgProps } from "react-native-svg";
const SvgIcPlus = (props: SvgProps) => (
  <Svg xmlns="http://www.w3.org/2000/svg" width={14} height={14} fill="none" {...props}>
    <Path fill="#000" d="M8.167 5.833V0H5.833v5.833H0v2.334h5.833V14h2.334V8.167H14V5.833z" />
  </Svg>
);
export default SvgIcPlus;
