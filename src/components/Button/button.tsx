import React, { useState } from "react";
import classNames from "classnames";

interface BaseButtonProps {
  /**
   * 类名
   */
  className?: string;
  /**
   * 是否禁用
   */
  disabled?: boolean;
  /**
   * 尺寸
   */
  size?: "lg" | "sm";
  /**
   * 类型
   */
  type?: "primary" | "link" | "danger" | "default";
  /**
   * 点击事件
   */
  onClick?: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void | Promise<any>;
  /**
   * 子元素
   */
  children: React.ReactNode;
}
export const Button: React.FC<BaseButtonProps> = (props) => {
  const { className, disabled, size, type, onClick, children } = props;

  const [loading, setLoading] = useState<boolean>(false);

  const classes = classNames("btn", className, {
    [`btn-type-${type}`]: type,
    [`btn-size-${size}`]: size,
  });

  const handleClick = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    if (!onClick || loading) return;
    setLoading(true);
    await onClick(event);
    setLoading(false);
  };

  return (
    <button className={classes} disabled={disabled} onClick={handleClick}>
      {loading ? "加载中..." : children}
    </button>
  );
};

Button.defaultProps = {
  disabled: false,
  type: "default",
};

export default Button;
