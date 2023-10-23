import React from "react";
import classNames from "classnames";
import MenuContext from "./menuContext";

// DetailedHTMLProps<LiHTMLAttributes<HTMLLIElement>
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
  index: number;
  /**
   * 子元素
   */
  children?: React.ReactNode;
}

export const MenuItem: React.FC<MenuItemProps> = (props) => {
  const { className, disabled, index, children } = props;
  const context = React.useContext(MenuContext);
  console.log("?", context);
  const classes = classNames("menu-item", className, {
    "is-disabled": disabled,
    "is-active": context.defaultIndex === index,
  });

  const handleClick = () => {
    if (context.onSelect && !disabled) {
      console.log("??????");
      context.onSelect(index);
    }
  };
  return (
    <li className={classes} onClick={handleClick}>
      {children}
    </li>
  );
};
