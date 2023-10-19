import React, { useState } from "react";
import classNames from "classnames";
import type { IMenuContext } from "./menuContext";

export interface MemuProps extends IMenuContext {
  /**
   * 类名
   */
  className?: string;
  /**
   * 根节点样式
   */
  style?: React.CSSProperties;
  /**
   * 默认 active 的菜单项的索引值
   */
  //   defaultIndex?: number;
  /**
   * 菜单模式
   */
  mode?: "vertical" | "horizontal";
  /**
   *
   */
  //   onSelect?: (selectedIndex: number) => void;
  children: React.ReactNode;
}

export const Menu: React.FC<MemuProps> = (props) => {
  const { className, style, defaultIndex, mode, onSelect, children } = props;

  const [curActive, setCurActive] = useState(defaultIndex);

  const classes = classNames("menu", className, {
    "menu-vertical": mode === "vertical",
  });

  //   const passedContext

  return (
    <ul className={classes} style={style}>
      {children}
    </ul>
  );
};

Menu.defaultProps = {
  defaultIndex: 0,
  mode: "vertical",
};

export default Menu;
