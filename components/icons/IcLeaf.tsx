import * as React from "react";
import type { SvgProps } from "react-native-svg";
import Svg, { Path } from "react-native-svg";

const SvgIcLeaf = (props: SvgProps) => (
  <Svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="none" {...props}>
    <Path
      fill="#000"
      d="M15.275.033c-.37.017-9.1.447-12.034 3.38a6.62 6.62 0 0 0-.447 8.854L0 15.06.943 16l2.794-2.79a6.62 6.62 0 0 0 8.854-.447C15.583 9.77 15.957 1.096 15.97.725L16 0zM11.648 11.82a5.29 5.29 0 0 1-6.963.441l6.425-6.424-.943-.943-6.424 6.425a5.286 5.286 0 0 1 .441-6.963c2.12-2.12 8.271-2.775 10.41-2.941-.156 2.128-.783 8.242-2.946 10.405"
    />
  </Svg>
);
export default SvgIcLeaf;
