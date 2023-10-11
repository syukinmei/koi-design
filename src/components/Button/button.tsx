import React from "react";
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
  type?: "primart" | "default" | "danger" | "link";
  /**
   * 子元素
   */
  children: React.ReactNode;
}
export const Button: React.FC<BaseButtonProps> = (props) => {
  const { className, disabled, size, type, children } = props;
  const classes = classNames("btn", className, {
    [`btn-type-${type}`]: type,
    [`btn-size-${size}`]: size,
    disabled: disabled,
  });
  return <button className={classes}>{children}</button>;
};

Button.defaultProps = {
  disabled: false,
  type: "default",
};

export default Button;
