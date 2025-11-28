import type { SvgProps } from "react-native-svg";
import Svg, { Circle, Path, Rect } from "react-native-svg";

const SvgIcFeed = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    fill="none"
    viewBox="0 0 16 16"
    {...props}
  >
    <Rect
      width={14}
      height={14}
      x={1}
      y={1}
      stroke={props.stroke || "#000"}
      strokeWidth={1.5}
      rx={1.5}
      fill="none"
    />
    <Path
      stroke={props.stroke || "#000"}
      strokeLinecap="round"
      strokeWidth={1.5}
      d="M8 4h4M8 7h4"
    />
    <Path stroke={props.stroke || "#000"} strokeWidth={0.8} d="M1 10h14" />
    <Circle
      cx={4.5}
      cy={5.5}
      r={1.5}
      stroke={props.stroke || "#000"}
      strokeWidth={1.2}
      fill={props.fill && props.fill !== "none" ? props.fill : "none"}
    />
  </Svg>
);
export default SvgIcFeed;
