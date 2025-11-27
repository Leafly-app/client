import * as React from "react";
import Svg, { Rect, Path } from "react-native-svg";
import type { SvgProps } from "react-native-svg";
const SvgIcFeed = (props: SvgProps) => (
  <Svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="none" {...props}>
    <Rect
      width={14.222}
      height={14.222}
      x={0.667}
      y={0.667}
      stroke="#000"
      strokeWidth={1.333}
      rx={1.556}
    />
    <Rect width={5.556} height={1.111} x={7.778} y={2.222} fill="#000" rx={0.556} />
    <Rect width={5.556} height={1.111} x={7.778} y={4.444} fill="#000" rx={0.556} />
    <Path stroke="#000" strokeWidth={0.556} d="M1.389 6.944h12.778V7.5H1.389z" />
    <Rect
      width={2.222}
      height={2.222}
      x={2.778}
      y={2.778}
      fill="#000"
      stroke="#000"
      strokeWidth={1.111}
      rx={1.111}
    />
  </Svg>
);
export default SvgIcFeed;
