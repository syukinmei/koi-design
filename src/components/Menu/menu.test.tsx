import React from "react";
import { cleanup, fireEvent, render, waitFor } from "@testing-library/react";
import type { RenderResult } from "@testing-library/react";
import Menu, { MemuProps } from "./menu";
import MenuItem from "./menuItem";
import SubMenu from "./subMenu";

const generateMenu = (props: MemuProps) => {
  return (
    <Menu {...props}>
      <MenuItem index={"0"}>active</MenuItem>
      <MenuItem index={"1"} disabled>
        disabled
      </MenuItem>
      <MenuItem index={"2"}>MenuItem-2</MenuItem>
      <SubMenu title="dropdown">
        <MenuItem>sub-Menu-Item-0</MenuItem>
      </SubMenu>
      <li>一个不支持 Menu 的子节点</li>
    </Menu>
  );
};

const testProps: MemuProps = {
  defaultKey: "0",
  mode: "horizontal",
  className: "hello-koi-class-name",
  onSelect: jest.fn(),
};

const createStyleFile = () => {
  const cssFile: string = `
    .submenu {
      display: none;
    }

    .submenu.submenu-open{
      display: block;
    }
  `;
  const style = document.createElement("style");
  style.type = "text/css";
  style.innerHTML = cssFile;
  return style;
};

let wrapper: RenderResult,
  menuElement: HTMLElement,
  activeElement: HTMLElement,
  disabledElement: HTMLElement;

describe("Menu", () => {
  beforeEach(() => {
    wrapper = render(generateMenu(testProps));
    wrapper.container.append(createStyleFile());
    menuElement = wrapper.getByTestId("test-menu");
    activeElement = wrapper.getByText("active");
    disabledElement = wrapper.getByText("disabled");
  });

  it("render the correct className for the component base on different props", () => {
    expect(menuElement).toBeInTheDocument();
    expect(menuElement).toHaveClass("menu hello-koi-class-name");
    expect(menuElement.querySelectorAll(":scope > li").length).toEqual(4);
    expect(activeElement).toHaveClass("menu-item is-active");
    expect(disabledElement).toHaveClass("menu-item is-disabled");
  });

  it("click items should change active and call the right callback", () => {
    const MenuItem2Item = wrapper.getByText("MenuItem-2");
    fireEvent.click(MenuItem2Item);
    expect(MenuItem2Item).toHaveClass("is-active");
    expect(testProps.onSelect).toHaveBeenCalledWith("2");

    fireEvent.click(disabledElement);
    expect(disabledElement).not.toHaveClass("is-active");
    expect(testProps.onSelect).not.toHaveBeenCalledWith("1");
  });

  it("should horizontal mode be rendered when mode is set to horizontal", () => {
    cleanup();
    const wrapper = render(generateMenu(testProps));
    const menuElement = wrapper.getByTestId("test-menu");
    expect(menuElement).toHaveClass("menu-mode-horizontal");
  });

  it("should show dropdown items when hovering over the submenu", async () => {
    expect(wrapper.queryByText("sub-Menu-Item-0")).not.toBeVisible();

    const dropdownElement = wrapper.getByText("dropdown");
    fireEvent.mouseEnter(dropdownElement);
    await waitFor(() => {
      expect(wrapper.queryByText("sub-Menu-Item-0")).toBeVisible();
    });

    fireEvent.click(wrapper.getByText("sub-Menu-Item-0"));
    expect(testProps.onSelect).toHaveBeenCalledWith("3-0");

    fireEvent.mouseLeave(dropdownElement);
    await waitFor(() => {
      expect(wrapper.queryByText("sub-Menu-Item-0")).not.toBeVisible();
    });
  });
});
