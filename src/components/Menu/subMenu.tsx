import React, { useState } from "react";
import classNames from "classnames";
import MenuContext from "./menuContext";
import type { MenuItemProps } from "./menuItem";

export interface ISubMenuProps {
  index?: string;
  title: string;
  className?: string;
  children: React.ReactNode;
}

const SubMenu: React.FC<ISubMenuProps> = (props) => {
  const { index, title, children, className } = props;

  const context = React.useContext(MenuContext);

  const isOpend = !!(
    context.mode === "vertical" && context.defaultOpenKeys?.includes(index!)
  );

  const [menuOpen, setMenuOpen] = useState<boolean>(isOpend);

  const classes = classNames("submenu-item", "menu-item", className, {
    "is-active": context.defaultKey === index,
  });

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setMenuOpen(!menuOpen);
  };

  let timer: any;
  const handleMouse = (e: React.MouseEvent, toggle: boolean) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      setMenuOpen(toggle);
    }, 200);
  };

  const clickEvents =
    context.mode === "vertical" ? { onClick: handleClick } : {};

  const hoverEvents =
    context.mode === "horizontal"
      ? {
          onMouseEnter: (e: React.MouseEvent) => {
            handleMouse(e, true);
          },
          onMouseLeave: (e: React.MouseEvent) => {
            handleMouse(e, false);
          },
        }
      : {};

  const renderChildren = () => {
    const subMenuClasses = classNames("submenu", {
      "submenu-open": menuOpen,
    });
    const childrenComponent = React.Children.map(children, (child, i) => {
      const childElement =
        child as React.FunctionComponentElement<MenuItemProps>;

      const { displayName } = childElement.type;

      // Confirm the type of a child component to allow only nested MenuItem components within it
      if (displayName === "MenuItem") {
        return React.cloneElement(childElement, { index: `${index}-${i}` });
      } else {
        console.error(
          "Warning: SubMenu has a child which is not a MenuItem component"
        );
      }
    });
    return <ul className={subMenuClasses}>{childrenComponent}</ul>;
  };

  return (
    <li key={index} className={classes} {...hoverEvents}>
      <div className="submenu-title" {...clickEvents}>
        <span>{title}</span>
      </div>
      {renderChildren()}
    </li>
  );
};

SubMenu.displayName = "MenuItem";

export default SubMenu;
