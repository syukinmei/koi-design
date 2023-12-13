import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
// vite-plugin-svg-icons 文档 https://github.com/vbenjs/vite-plugin-svg-icons/blob/main/README.zh_CN.md
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    createSvgIconsPlugin({
      // 指定需要缓存的svg图标文件夹，即需要识别的svg都应该放在这个文件夹下
      iconDirs: [path.resolve(process.cwd(), "src/components/Icons/assets")],
      // 指定symbolId格式（这里的配置与6.2步骤中的引入svg组件的name配置项写法有关）
      symbolId: "[name]",
    }),
  ],
});
