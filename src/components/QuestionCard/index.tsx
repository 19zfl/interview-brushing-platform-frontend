"use client";
import { Card } from "antd";
import Title from "antd/es/typography/Title";
import MdViewer from "@/components/MdViewer";
import "./index.css";
import TagList from "@/components/TagList";
import useAddUserSignInRecord from "@/hooks/useAddUserSignInRecord";

interface Props {
  question: API.QuestionVO;
}

/**
 * 题目卡片组件
 * @param props
 * @constructor
 */
const QuestionCard = (props: Props) => {
  const { question } = props;

  // 执行刷题签到
  useAddUserSignInRecord();

  return (
    <div className="question-card">
      <Card bordered={false}>
        <Title level={1} style={{ fontSize: 24 }}>
          {question.title}
        </Title>
        <TagList tagList={question.tagList} />
        <div style={{ marginBottom: 16 }} />
        <MdViewer value={question.content} />
      </Card>
      <div style={{ marginBottom: 16 }} />
      <Card title="推荐答案" bordered={false}>
        <MdViewer value={question.answer} />
      </Card>
    </div>
  );
};

export default QuestionCard;
