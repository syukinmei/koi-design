import React, { useState } from "react";
import classNames from "classnames";
import MenuContext from "./menuContext";
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
   * 菜单模式
   */
  mode?: "vertical" | "horizontal";
  /**
   * 子元素
   */
  children?: React.ReactNode;
}

export const Menu: React.FC<MemuProps> = (props) => {
  const { className, style, defaultIndex, mode, onSelect, children } = props;

  const [curActive, setCurActive] = useState(defaultIndex);

  const classes = classNames("menu", className, {
    [`menu-mode-${mode}`]: mode,
  });

  const handleClick = (index: number) => {
    if (index === curActive) return;
    setCurActive(index);
    onSelect?.(index);
  };

  const contextVal: IMenuContext = {
    defaultIndex: curActive,
    onSelect: handleClick,
  };

  return (
    <ul className={classes} style={style} data-testid="test-menu">
      <MenuContext.Provider value={contextVal}>{children}</MenuContext.Provider>
    </ul>
  );
};

Menu.defaultProps = {
  defaultIndex: 0,
  mode: "vertical",
};

export default Menu;
