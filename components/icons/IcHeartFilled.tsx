import type { SvgProps } from "react-native-svg";
import Svg, { Path } from "react-native-svg";

const SvgIcHeartFilled = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={14}
    height={13}
    viewBox="0 0 14 13"
    fill="none"
    {...props}
  >
    <Path
      fill={props.fill}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.4}
      d="M11.953 1.64a3.207 3.207 0 0 0-4.538 0l-.618.619-.619-.619A3.21 3.21 0 1 0 1.64 6.18l5.157 5.156 5.156-5.156a3.21 3.21 0 0 0 0-4.539"
    />
  </Svg>
);
export default SvgIcHeartFilled;
