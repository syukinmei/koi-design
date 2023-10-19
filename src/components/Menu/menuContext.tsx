import React, { createContext } from "react";

export interface IMenuContext {
  defaultIndex: number;
  onSelect?: (selectedIndex: number) => void;
}

const MenuContext = createContext<IMenuContext>({
  defaultIndex: 0,
});

export default MenuContext;
