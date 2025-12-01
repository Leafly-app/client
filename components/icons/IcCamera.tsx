import * as React from "react";
import type { SvgProps } from "react-native-svg";
import Svg, { Path } from "react-native-svg";

const SvgIcCamera = (props: SvgProps) => (
  <Svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" {...props}>
    <Path
      fill="#000"
      d="M21 4h-2.508l-3.086-4H8.593L5.508 4H3a3 3 0 0 0-3 3v17h24V7a3 3 0 0 0-3-3M9.577 2h4.847l1.542 2H8.034zM22 22H2V7a1 1 0 0 1 1-1h18a1 1 0 0 1 1 1z"
    />
    <Path
      fill="#000"
      d="M12 8a6 6 0 1 0 6 6 6.006 6.006 0 0 0-6-6m0 10a4 4 0 1 1 0-8 4 4 0 0 1 0 8"
    />
  </Svg>
);
export default SvgIcCamera;
