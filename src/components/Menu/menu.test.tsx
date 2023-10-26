import React from "react";
import { cleanup, fireEvent, render } from "@testing-library/react";
import type { RenderResult } from "@testing-library/react";
import Menu, { MemuProps } from "./menu";
import MenuItem from "./menuItem";

const generateMenu = (props: MemuProps) => {
  return (
    <Menu {...props}>
      <MenuItem index={0}>active</MenuItem>
      <MenuItem index={1} disabled>
        disabled
      </MenuItem>
      <MenuItem index={2}>MenuItem-2</MenuItem>
      <li>一个不支持 Menu 的子节点</li>
    </Menu>
  );
};

const testProps: MemuProps = {
  defaultIndex: 0,
  mode: "horizontal",
  className: "hello-koi-class-name",
  onSelect: jest.fn(),
};

let wrapper: RenderResult,
  menuElement: HTMLElement,
  activeElement: HTMLElement,
  disabledElement: HTMLElement;

describe("Menu", () => {
  beforeEach(() => {
    wrapper = render(generateMenu(testProps));
    menuElement = wrapper.getByTestId("test-menu");
    activeElement = wrapper.getByText("active");
    disabledElement = wrapper.getByText("disabled");
  });

  it("render the correct className for the component base on different props", () => {
    expect(menuElement).toBeInTheDocument();
    expect(menuElement).toHaveClass("menu hello-koi-class-name");
    expect(menuElement.getElementsByTagName("li").length).toEqual(3);
    expect(activeElement).toHaveClass("menu-item is-active");
    expect(disabledElement).toHaveClass("menu-item is-disabled");
  });

  it("click items should change active and call the right callback", () => {
    const MenuItem2Item = wrapper.getByText("MenuItem-2");
    fireEvent.click(MenuItem2Item);
    expect(MenuItem2Item).toHaveClass("is-active");
    expect(testProps.onSelect).toHaveBeenCalledWith(2);

    fireEvent.click(disabledElement);
    expect(disabledElement).not.toHaveClass("is-active");
    expect(testProps.onSelect).not.toHaveBeenCalledWith(1);
  });

  it("should horizontal mode be rendered when mode is set to horizontal", () => {
    cleanup();
    const wrapper = render(generateMenu(testProps));
    const menuElement = wrapper.getByTestId("test-menu");
    expect(menuElement).toHaveClass("menu-mode-horizontal");
  });
});
