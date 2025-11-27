import * as React from "react";
import Svg, { Path } from "react-native-svg";
import type { SvgProps } from "react-native-svg";
const SvgIcCompany = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={14}
    height={12}
    viewBox="0 0 14 12"
    fill="none"
    {...props}
  >
    <Path d="M12.996 10.667h1.333V12H-.33v-1.333h1.333v-10q0-.28.193-.474A.64.64 0 0 1 1.67 0h6.663q.28 0 .473.193a.64.64 0 0 1 .193.474v10h2.665V5.333H10.33V4h1.999q.28 0 .473.193a.64.64 0 0 1 .193.474zM2.336 1.333v9.334h5.33V1.333zm1.333 4h2.665v1.334H3.669zm0-2.666h2.665V4H3.669z" />
  </Svg>
);
export default SvgIcCompany;
