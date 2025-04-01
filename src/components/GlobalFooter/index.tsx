import React from "react";
import './index.css'

/**
 * 全局底部栏组件
 * @constructor
 */
export default function GlobalFooter() {
  const currentYear = new Date().getFullYear();
  return (
    <div
      className="global-footer"
      style={{
        textAlign: "center",
        paddingBlockStart: 12,
      }}
    >
      <div>© { currentYear } 智能面试刷题平台</div>
      <div>
        <a href="https://github.com/19zfl" target="_blank">
          author:19zfl
        </a>
      </div>
    </div>
  );
}
