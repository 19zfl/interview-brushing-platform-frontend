"use client";

import "./globals.css";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import BasicLayout from "@/layouts/BasicLayout";
import React, { useEffect, useCallback } from "react";
import store, {AppDispatch} from "@/store";
import {Provider, useDispatch} from "react-redux";
import {getLoginUserUsingGet} from "@/api/userController";
import {setLoginUser} from "@/store/loginUser";

/**
 * 执行初始化逻辑的布局（多封装一层）
 * @param children
 * @constructor
 */
const InitLayout: React.FC<
  Readonly<{
    children: React.ReactNode;
  }>
> = ({ children }) => {
  /**
   * 全局初始化函数，有全局单次调用的代码，都可以写到这里
   */
  const dispatch = useDispatch<AppDispatch>()
  const doInitLoginUser = useCallback(async () => {
    const res = await getLoginUserUsingGet()
    if (res.data) {
      // 更新登录用户信息
    } else {

    }
  }, []);

  // 只执行一次
  useEffect(() => {
    doInitLoginUser();
  }, []);

  return children;
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh">
      <body>
        <AntdRegistry>
          <Provider store={store}>
            <InitLayout>
              <BasicLayout>{children}</BasicLayout>
            </InitLayout>
          </Provider>
        </AntdRegistry>
      </body>
    </html>
  );
}
