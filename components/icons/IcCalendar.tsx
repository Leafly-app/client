import * as React from "react";
import Svg, { Path } from "react-native-svg";
import type { SvgProps } from "react-native-svg";
const SvgIcCalendar = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={14}
    height={14}
    viewBox="0 0 14 14"
    fill="none"
    {...props}
  >
    <Path d="M4.664 0v1.333H8.66V0h1.333v1.333h2.665q.28 0 .473.194a.64.64 0 0 1 .193.473v10.667a.64.64 0 0 1-.193.473.64.64 0 0 1-.473.193H.666a.64.64 0 0 1-.473-.193.64.64 0 0 1-.193-.473V2q0-.28.193-.473a.64.64 0 0 1 .473-.194h2.665V0zm7.329 6.667H1.332V12h10.66zm-8.662-4H1.333v2.666h10.66V2.667h-2V4H8.662V2.667H4.664V4H3.33z" />
  </Svg>
);
export default SvgIcCalendar;
