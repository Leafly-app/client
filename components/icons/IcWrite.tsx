import type { SvgProps } from "react-native-svg";
import Svg, { Path } from "react-native-svg";

const SvgIcWrite = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={15}
    height={16.64}
    fill="none"
    viewBox="0 0 15 16.64"
    {...props}
  >
    <Path
      stroke={props.stroke || "#000"}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M6.875 2.5H2.5a1.25 1.25 0 0 0-1.25 1.25v8.75a1.25 1.25 0 0 0 1.25 1.25h8.75a1.25 1.25 0 0 0 1.25-1.25V8.125"
    />
    <Path
      stroke={props.stroke || "#000"}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M11.563 1.563a1.326 1.326 0 0 1 1.875 1.875L7.5 9.375l-2.5.625.625-2.5 5.938-5.937z"
    />
  </Svg>
);
export default SvgIcWrite;
