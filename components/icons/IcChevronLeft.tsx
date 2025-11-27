import type { SvgProps } from "react-native-svg";
import Svg, { Path } from "react-native-svg";

const SvgIcChevronLeft = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    viewBox="0 0 16 16"
    fill="none"
    {...props}
  >
    <Path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M10 12 6 8l4-4" />
  </Svg>
);
export default SvgIcChevronLeft;
