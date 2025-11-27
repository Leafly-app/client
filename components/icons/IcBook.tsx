import * as React from "react";
import Svg, { Path } from "react-native-svg";
import type { SvgProps } from "react-native-svg";
const SvgIcBook = (props: SvgProps) => (
  <Svg xmlns="http://www.w3.org/2000/svg" width={15} height={17} fill="none" {...props}>
    <Path
      fill="#000"
      d="M0 13.75V2.5q0-.684.32-1.258a2.4 2.4 0 0 1 .872-.909Q1.744 0 2.4 0h11.2q.336 0 .568.242a.82.82 0 0 1 .232.591v15q0 .35-.232.592a.76.76 0 0 1-.568.242H2.8q-.768 0-1.408-.392A2.934 2.934 0 0 1 0 13.75M12.8 15v-2.5h-10q-.495 0-.848.367a1.23 1.23 0 0 0-.352.883q0 .517.352.883.352.367.848.367zM1.6 11.117a2.6 2.6 0 0 1 1.2-.284h10V1.667H2.4a.76.76 0 0 0-.568.241.82.82 0 0 0-.232.592z"
    />
  </Svg>
);
export default SvgIcBook;
