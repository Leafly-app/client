
import type { SvgProps } from "react-native-svg";
import Svg, { Path } from "react-native-svg";

const SvgIcHome = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={15}
    height={15.6}
    fill="none"
    viewBox="0 0 15 15.6"
    {...props}
  >
    <Path
      stroke={props.stroke || "#000"}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M1.875 5.85l5.625-4.55 5.625 4.55v7.15a1.3 1.3 0 0 1-1.25 1.3h-8.75a1.3 1.3 0 0 1-1.25-1.3z"
    />
    <Path
      stroke={props.stroke || "#000"}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M5.625 14.3V7.8h3.75v6.5"
    />
  </Svg>
);
export default SvgIcHome;
