import React from "react";
import Menu from "./components/Menu/menu";
import MenuItem from "./components/Menu/menuItem";
import SubMenu from "./components/Menu/subMenu";
import Button from "./components/Button/button";

function App() {
  return (
    <div className="App">
      <Button type="primary">加载中</Button>
      <header className="App-header">
        <Menu mode="horizontal" defaultKey="3" onSelect={(i) => console.log(i)}>
          <MenuItem>cool link</MenuItem>
          <MenuItem disabled>cool link2</MenuItem>
          <SubMenu title="dropdown">
            <MenuItem>dropdown 1</MenuItem>
            <MenuItem>dropdown 2</MenuItem>
          </SubMenu>
          <MenuItem>cool link3</MenuItem>
          {/* <li>一个不支持 Menu 的子节点</li> */}
        </Menu>
        <Menu mode="vertical" defaultKey="3" onSelect={(i) => console.log(i)}>
          <MenuItem>cool link</MenuItem>
          <MenuItem disabled>cool link2</MenuItem>
          <SubMenu title="dropdown">
            <MenuItem>dropdown 1</MenuItem>
            <MenuItem>dropdown 2</MenuItem>
          </SubMenu>
          <MenuItem>cool link3</MenuItem>
          {/* <li>一个不支持 Menu 的子节点</li> */}
        </Menu>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
