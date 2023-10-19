import React from "react";
import classNames from "classnames";

export interface MenuItemProps {
  /**
   * 类名
   */
  className?: string;
  /**
   * 是否禁用
   */
  disabled?: boolean;
  /**
   *
   */
  index?: number;
  /**
   * 子元素
   */
  children?: React.ReactNode;
}

export const MenuItem: React.FC<MenuItemProps> = (props) => {
  const { className, disabled, children } = props;
  const classes = classNames("menu-item", className, {
    "is-disabled": disabled,
  });
  return <li className={classes}>{children}</li>;
};
