import React from "react";
import { fireEvent, render } from "@testing-library/react";
import Button, { BaseButtonProps } from "./button";

describe("Button", () => {
  it("render the correct default button", () => {
    const onClick = jest.fn();
    const wrapper = render(<Button onClick={onClick}>按钮</Button>);
    const element = wrapper.getByText("按钮") as HTMLButtonElement;
    expect(element).toBeInTheDocument();
    expect(element.tagName).toEqual("BUTTON");
    expect(element).toHaveClass("btn btn-type-default");
    expect(element.disabled).toBeFalsy();
    fireEvent.click(element);
    expect(onClick).toHaveBeenCalled();
  });

  it("render the correct className for the component base on different props", () => {
    const testProps: Partial<BaseButtonProps> = {
      className: "hello-class-name",
      size: "sm",
      type: "primary",
    };
    const wrapper = render(<Button {...testProps}>按钮</Button>);
    const element = wrapper.getByText("按钮");
    expect(element).toBeInTheDocument();
    expect(element).toHaveClass(
      "btn btn-type-primary btn-size-sm hello-class-name"
    );
  });

  it("should not be triggered event when the button is disabled", () => {
    const onClick = jest.fn();
    const wrapper = render(
      <Button onClick={onClick} disabled>
        按钮
      </Button>
    );
    const element = wrapper.getByText("按钮") as HTMLButtonElement;
    expect(element.disabled).toBeTruthy();

    fireEvent.click(element);
    expect(onClick).not.toHaveBeenCalled();
  });
});
