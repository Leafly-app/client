import * as React from "react";
import type { SvgProps } from "react-native-svg";
import Svg, { Path } from "react-native-svg";

const SvgIcStarFilled = (props: SvgProps) => (
  <Svg xmlns="http://www.w3.org/2000/svg" width={13} height={13} fill="none" {...props}>
    <Path
      fill="#000"
      d="m6.395 9.95-3.953 2.218.884-4.448L0 4.65l4.502-.538L6.395 0l1.893 4.112 4.502.538-3.326 3.07.885 4.448z"
    />
  </Svg>
);
export default SvgIcStarFilled;
