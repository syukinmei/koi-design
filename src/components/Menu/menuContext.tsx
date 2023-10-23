import React, { createContext } from "react";

export interface IMenuContext {
  /**
   * 默认 active 的菜单项的索引值
   */
  defaultIndex?: number;
  /**
   * 点击事件，被选中时调用
   */
  onSelect?: (selectedIndex: number) => void;
}

const MenuContext = createContext<IMenuContext>({
  defaultIndex: 0,
});

export default MenuContext;
