import type { SvgProps } from "react-native-svg";
import Svg, { Path } from "react-native-svg";

const SvgIcCategoryLifestyle = (props: SvgProps) => (
  <Svg width={15} height={13} viewBox="0 0 15 13" fill="none" {...props}>
    <Path
      fill={props.color || "#000"}
      d="M12.195 11.964a.62.62 0 0 1-.186.456.62.62 0 0 1-.456.186H2.567a.62.62 0 0 1-.455-.186.62.62 0 0 1-.186-.456V6.188H0L6.624.167A.65.65 0 0 1 7.06 0q.245 0 .437.167l6.624 6.02h-1.926zm-1.283-.642V5.007L7.06 1.502 3.21 5.007v6.315zM7.06 10.04 4.904 7.882a1.33 1.33 0 0 1-.379-.642 1.46 1.46 0 0 1 0-.744q.096-.373.379-.649.282-.276.655-.378.372-.104.744 0 .372.102.642.372l.115.115.116-.115a1.43 1.43 0 0 1 1.386-.372q.373.102.655.378t.379.649 0 .744-.379.642z"
    />
  </Svg>
);
export default SvgIcCategoryLifestyle;
