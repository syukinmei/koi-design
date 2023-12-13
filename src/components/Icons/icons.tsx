import { useMemo } from "react";
import ids from "virtual:svg-icons-names";
console.log("---ids---", ids);

interface SvgIconProps {
  /**
   * 图标名称--文件名称
   */
  name: string;
  /**
   * 图标大小
   */
  size?: string | number;
  /**
   * 图标颜色
   */
  color?: string;

  /**
   * 设置图标的样式
   */
  style?: React.CSSProperties;
}

/**
 * @Svg组件
 * @props  name 图标名称--文件名称
 * @props  size  图标大小
 * @props  color   图标颜色
 * @props  style 图标的样式
 */
const SvgIcon: React.FC<SvgIconProps> = (props) => {
  const { name, size, color, style } = props;

  const symbolId = useMemo(() => `#${name}`, [name]);

  return (
    <svg
      className="koi-icon"
      aria-hidden="true"
      width={size}
      height={size}
      fill={color}
      style={style}
    >
      <use href={symbolId} fill={color} />
    </svg>
  );
};

SvgIcon.defaultProps = {
  size: 16,
};
export default SvgIcon;
