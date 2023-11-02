import React from "react";
import classNames from "classnames";
import MenuContext from "./menuContext";
import type { MenuItemProps } from "./menuItem";

export interface ISubMenuProps {
    index?: number;
    title: string;
    className?: string;
    children: React.ReactNode;
}

const SubMenu: React.FC<ISubMenuProps> = (props) => {
    const { index, title, children, className } = props;
    const context = React.useContext(MenuContext);

    const classes = classNames("submenu-item",'menu-item', className, {
        "is-active": context.defaultIndex === index,
    });

    const renderChildren = () => {
        const childrenComponent = React.Children.map(children, (child) => {
            const childElement =
                child as React.FunctionComponentElement<MenuItemProps>;

            const { displayName } = childElement.type;

            // Confirm the type of a child component to allow only nested MenuItem components within it
            if (displayName === "MenuItem") {
                return childElement;
            } else {
                console.error(
                    "Warning: SubMenu has a child which is not a MenuItem component"
                );
            }
        });
        return <ul className="submenu">{childrenComponent}</ul>;
    };

    return (
        <li key={index} className={classes}>
            <div className="submenu-title"><span>{title}</span></div>
            {renderChildren()}
        </li>
    );
};

SubMenu.displayName = "MenuItem";

export default SubMenu;
