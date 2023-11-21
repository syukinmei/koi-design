import React, { createContext } from "react";

export interface IMenuContext {
  /**
   * 默认 active 的菜单项的key
   */
  defaultKey?: string;
  /**
   * 点击事件，被选中时调用
   */
  onSelect?: (selectedIndex: string) => void;
  /**
   * 菜单模式
   */
  mode?: "vertical" | "horizontal";
}

const MenuContext = createContext<IMenuContext>({
  defaultKey: "0",
});

export default MenuContext;
