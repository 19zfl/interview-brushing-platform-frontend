"use server";

import Title from "antd/es/typography/Title";
import {message} from "antd";
import "./index.css";
import QuestionTable from "@/components/QuestionTable";
import {searchQuestionVoByPageUsingPost} from "@/api/questionController";

/**
 * 题目列表页面
 * @constructor
 */
// @ts-ignore
export default async function QuestionsPage({ searchParams }) {
  let questionList = [];
  let total = 0;
  // 获取url中查询参数
  const {q:searchText} = searchParams;

  try {
    const questionBankRes = await searchQuestionVoByPageUsingPost({
      searchText,
      pageSize: 12,
      sortField: "createTime",
      sortOrder: "descend",
    });
    // @ts-ignore
    questionList = questionBankRes.data.records ?? [];
    // @ts-ignore
    total = questionBankRes.data.total;
  } catch (e) {
    // @ts-ignore
    message.error("获取题目列表失败，" + e.message);
  }

  return (
    <div id="questionsPage" className="max-width-content">
      <Title level={3}>题目大全</Title>
      {/*@ts-ignore*/}
      <QuestionTable defaultQuestionList={questionList} defaultTotal={total} defaultSearchParams={{title: searchText}} />
    </div>
  );
}
