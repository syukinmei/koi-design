import React from "react";
import { CSSTransition } from "react-transition-group";
import { CSSTransitionProps } from "react-transition-group/CSSTransition";

type AnimationName =
  | "zoom-in-top"
  | "zoom-in-left"
  | "zoom-in-right"
  | "zoom-in-bottom";

type TransitionProps = CSSTransitionProps & {
  animation?: AnimationName; // 动画名称
  wrapper?: boolean;
};

const Transition: React.FC<TransitionProps> = (props) => {
  const { children, classNames, animation, wrapper, ...restProps } = props;
  return (
    <CSSTransition
      classNames={classNames ? classNames : animation}
      {...restProps}
    >
      {/* @ts-ignore */}
      {wrapper ? <div>{children}</div> : children}
    </CSSTransition>
  );
};

Transition.defaultProps = {
  unmountOnExit: true, // 进入时挂载, 离开时卸载
  appear: true, // 初次加载时也有动画
  timeout: 300,
};

export default Transition;
