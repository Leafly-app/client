import * as React from "react";
import Svg, { Path } from "react-native-svg";
import type { SvgProps } from "react-native-svg";
const SvgIcHome = (props: SvgProps) => (
  <Svg xmlns="http://www.w3.org/2000/svg" width={15} height={15} fill="none" {...props}>
    <Path
      fill="#000"
      d="M14.4 14.176a.77.77 0 0 1-.232.568.77.77 0 0 1-.568.232H.8a.77.77 0 0 1-.568-.232.77.77 0 0 1-.232-.568v-8.4q0-.4.304-.64L6.704.16A.83.83 0 0 1 7.2 0q.272 0 .496.16l6.4 4.976q.304.24.304.64zm-1.6-.8V6.16L7.2 1.808 1.6 6.16v7.216z"
    />
  </Svg>
);
export default SvgIcHome;
