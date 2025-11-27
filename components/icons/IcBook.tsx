import type { SvgProps } from "react-native-svg";
import Svg, { Path } from "react-native-svg";

const SvgIcBook = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={15}
    height={17.36}
    fill="none"
    viewBox="0 0 15 17.36"
    {...props}
  >
    <Path
      stroke={props.stroke || "#000"}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M2.5 12.9A1.56 1.56 0 0 1 4.06 11.34H12.5"
    />
    <Path
      stroke={props.stroke || "#000"}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M4.06 1.25H12.5v12.5H4.06A1.56 1.56 0 0 1 2.5 12.19v-9.38A1.56 1.56 0 0 1 4.06 1.25z"
    />
  </Svg>
);
export default SvgIcBook;
