"use client";

import React from "react";
import { LoginForm, ProForm, ProFormText } from "@ant-design/pro-form";
import { message } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import Link from "next/link";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";
import { setLoginUser } from "@/store/loginUser";

import { userLoginUsingPost } from "@/api/userController";

import "./index.css";
import {useRouter} from "next/navigation";

/**
 * 用户登录页面
 * @param props
 */
const UserLoginPage: React.FC = (props) => {
  const [form] = ProForm.useForm();
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  // 提交表单
  const doSubmit = async (values: API.UserLoginRequest) => {
    try {
      const res = await userLoginUsingPost(values);
      if (res.data) {
        message.success("登录成功");
        // @ts-ignore
        // 保存登录用户信息
        dispatch(setLoginUser(res.data));
        router.replace("/");
        // 清空表单
        form.resetFields();
      }
    } catch (e) {
      // @ts-ignore
        message.error("登录失败："+e.message);
    }
  };

  return (
    <div id="userLoginPage">
      <LoginForm
        form={form}
        logo={
          <Image
            src="/assets/logo.png"
            alt="智能面试刷题平台"
            width={44}
            height={44}
          />
        }
        title="用户登录"
        subTitle="智能面试刷题平台-程序员面试刷题网站"
        onFinish={doSubmit}
      >
        <ProFormText
          name="userAccount"
          fieldProps={{
            size: "large",
            prefix: <UserOutlined />,
          }}
          placeholder={"请输入用户账号"}
          rules={[
            {
              required: true,
              message: "请输入用户账号!",
            },
          ]}
        />
        <ProFormText.Password
          name="userPassword"
          fieldProps={{
            size: "large",
            prefix: <LockOutlined />,
          }}
          placeholder={"请输入密码"}
          rules={[
            {
              required: true,
              message: "请输入密码！",
            },
          ]}
        />
        <div
          style={{
            marginBlockEnd: 24,
            textAlign: "end",
          }}
        >
          还没有账号？
          <Link prefetch={false} href={"/user/register"}>
            去注册
          </Link>
        </div>
      </LoginForm>
    </div>
  );
};

export default UserLoginPage;
