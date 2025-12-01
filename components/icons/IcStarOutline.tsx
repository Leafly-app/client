import * as React from "react";
import type { SvgProps } from "react-native-svg";
import Svg, { Path } from "react-native-svg";

const SvgIcStarOutline = (props: SvgProps) => (
  <Svg xmlns="http://www.w3.org/2000/svg" width={13} height={13} fill="none" {...props}>
    <Path
      stroke="#000"
      d="m6.15 9.513.246-.137.244.137L9.646 11.2l-.672-3.383-.055-.274.206-.19 2.53-2.335-3.426-.41-.278-.033-.117-.254-1.438-3.124L4.957 4.32l-.117.254-.278.033-3.426.41 2.529 2.334.206.19-.055.275-.673 3.384z"
    />
  </Svg>
);
export default SvgIcStarOutline;
