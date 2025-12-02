import * as React from "react";
import Svg, { Path } from "react-native-svg";
import type { SvgProps } from "react-native-svg";
const SvgIcUser = (props: SvgProps) => (
  <Svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} fill="none" {...props}>
    <Path
      fill="#fff"
      d="M7.112 10.058a.833.833 0 1 1 .61 1.55 2.98 2.98 0 0 0-1.889 2.775v1.45a.833.833 0 0 0 .834.834h6.666a.833.833 0 0 0 .834-.834v-1.372a3.05 3.05 0 0 0-1.964-2.85.834.834 0 1 1 .594-1.556 4.715 4.715 0 0 1 3.036 4.406v1.372a2.5 2.5 0 0 1-2.5 2.5H6.667a2.5 2.5 0 0 1-2.5-2.5v-1.45a4.65 4.65 0 0 1 2.945-4.325M10 1.667A3.333 3.333 0 0 1 13.333 5v1.667a3.333 3.333 0 0 1-6.666 0V5A3.333 3.333 0 0 1 10 1.667m0 1.666A1.667 1.667 0 0 0 8.333 5v1.667a1.667 1.667 0 0 0 3.334 0V5A1.667 1.667 0 0 0 10 3.333"
    />
  </Svg>
);
export default SvgIcUser;
