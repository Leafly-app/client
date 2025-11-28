import type { SvgProps } from "react-native-svg";
import Svg, { Path } from "react-native-svg";

const SvgIcChevronUp = ({ stroke, ...props }: SvgProps) => (
  <Svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="none" {...props}>
    <Path
      stroke={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.6}
      d="M12 10 8 6l-4 4"
    />
  </Svg>
);
export default SvgIcChevronUp;
