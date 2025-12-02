import * as React from "react";
import Svg, { Path } from "react-native-svg";
import type { SvgProps } from "react-native-svg";
const SvgIcFilter = (props: SvgProps) => (
  <Svg xmlns="http://www.w3.org/2000/svg" width={15} height={10} fill="none" {...props}>
    <Path fill="#000" d="M5.6 9.602h3.2v-1.6H5.6zM0 0v1.6h14.4V0zm2.4 5.601H12v-1.6H2.4z" />
  </Svg>
);
export default SvgIcFilter;
