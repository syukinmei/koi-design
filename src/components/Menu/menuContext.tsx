import React, { createContext } from "react";

export interface IMenuContext {
  /**
   * 默认 active 的菜单项的key
   */
  defaultKey?: string;
  /**
   * 初始展开的 SubMenu 菜单项 key 数组
   */
  defaultOpenKeys?: string[];
  /**
   * 点击事件，被选中时调用
   */
  onSelect?: (selectedIndex: string) => void;
  /**
   * 菜单模式
   */
  mode?: "vertical" | "horizontal";
}

const MenuContext = createContext<IMenuContext>({});

export default MenuContext;
