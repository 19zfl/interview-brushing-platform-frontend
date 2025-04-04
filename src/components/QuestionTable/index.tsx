"use client";

import {ActionType, ProColumns, ProTable} from "@ant-design/pro-components";
import {useRef, useState} from "react";
import TagList from "@/components/TagList";
import {listQuestionVoByPageUsingPost} from "@/api/questionController";

interface Props {
  // 默认值：展示服务端渲染数据
  defaultQuestionList?: API.QuestionVO[];
  defaultTotal?: number;
  defaultSearchParams?: API.QuestionQueryRequest;
}

/**
 * 题目表格组件
 * @param props
 * @constructor
 */
const QuestionTable: React.FC = (props: Props) => {
  const actionRef = useRef<ActionType>();
  const {defaultQuestionList, defaultTotal, defaultSearchParams={}} = props;
  // 题目列表
  const [questionList, setQuestionList] = useState<API.QuestionVO[]>(
      defaultQuestionList || [],
  );
  // 题目总数
  const [total, setTotal] = useState<number>(
      defaultTotal || 0,
  )
  // 初始化加载
  const [init, setInit] = useState<boolean>(true);
  /**
   * 表格列配置
   */
  const columns: ProColumns<API.Question>[] = [
    {
      title: "标题",
      dataIndex: "title",
      valueType: "text",
    },
    {
      title: "标签",
      dataIndex: "tags",
      valueType: "select",
      fieldProps: {
        mode: "tags",
      },
      render: (_, record) => {
        // @ts-ignore
        return <TagList tagList={record.tagList} />;
      },
    },
  ];
  return (
    <div className="question-table">
      <ProTable<API.QuestionVO>
        actionRef={actionRef}
        size="large"
        search={{
          labelWidth: "auto",
        }}
        form={{
          initialValues: defaultSearchParams
        }}
        dataSource={questionList}
        pagination={{
          pageSize: 12,
          showTotal: (total) => `总共${total}条`,
          showSizeChanger: false,
          total: total,
        }}
        // @ts-ignore
        request={async (params, sort, filter) => {
          if (init) {
            setInit(false);
            if (defaultQuestionList && defaultTotal) {
              return;
            }
          }
          const sortField = Object.keys(sort)?.[0] || "createTime";
          const sortOrder = sort?.[sortField] || "descend";

          // @ts-ignore
          const { data, code } = await listQuestionVoByPageUsingPost({
            ...params,
            sortField,
            sortOrder,
            ...filter,
          } as API.QuestionQueryRequest);
          // 更新结果
          // @ts-ignore
          const newData = data?.records || [];
          // @ts-ignore
          const newTotal = data?.total || 0;
          // 更新状态
          setQuestionList(newData);
          setTotal(newTotal);
          return {
            success: code === 0,
            data: newData,
            total: newTotal,
          };
        }}
        columns={columns}
      />
    </div>
  );
};
export default QuestionTable;
