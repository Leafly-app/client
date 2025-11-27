import * as React from "react";
import Svg, { Path } from "react-native-svg";
import type { SvgProps } from "react-native-svg";
const SvgIcWrite = (props: SvgProps) => (
  <Svg xmlns="http://www.w3.org/2000/svg" width={15} height={16} fill="none" {...props}>
    <Path
      fill="#000"
      d="m2.736 11.168 8.112-8.112L9.712 1.92 1.6 10.048v1.12zm.656 1.6H0V9.376L9.152.224A.76.76 0 0 1 9.712 0a.76.76 0 0 1 .56.224l2.272 2.272q.24.224.24.56t-.24.576zM0 14.368h14.4v1.6H0z"
    />
  </Svg>
);
export default SvgIcWrite;
