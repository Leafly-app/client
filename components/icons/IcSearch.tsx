import Svg, { Path } from "react-native-svg";
import type { SvgProps } from "react-native-svg";

const SvgIcSearch = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={17}
    height={17}
    viewBox="0 0 17 17"
    fill="none"
    {...props}
  >
    <Path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="m16 16-3.625-3.625M14.333 7.667a6.666 6.666 0 1 1-13.333 0 6.666 6.666 0 0 1 13.333 0"
    />
  </Svg>
);
export default SvgIcSearch;
