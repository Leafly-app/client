import * as React from "react";
import Svg, { Path } from "react-native-svg";
import type { SvgProps } from "react-native-svg";
const SvgIcClose = (props: SvgProps) => (
  <Svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} fill="none" {...props}>
    <Path
      fill="#000"
      d="m10 8.864 3.952-3.953 1.136 1.136L11.136 10l3.952 3.953-1.136 1.136L10 11.136 6.048 15.09l-1.136-1.136L8.864 10 4.912 6.047l1.136-1.136z"
    />
  </Svg>
);
export default SvgIcClose;
