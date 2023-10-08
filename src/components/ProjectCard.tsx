import React, { useEffect, useState } from "react";
import { Avatar, Card } from 'antd';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';

const { Meta } = Card;

type LanguageObject = {
  [language: string]: number;
};

export interface Repo {
  title: string
  description: string
  mainLanguage: string
  language: LanguageObject
  coverUrl: string
}

const ProjectCard: React.FC<Repo> = ({ title, description, language, mainLanguage, coverUrl }) => {
  return (
    <div>
      <Card
        style={{ width: 300}}
        cover={
          <img
            alt={title}
            src={coverUrl}
          />
        }
        actions={[
          <SettingOutlined key="setting" />,
          <EditOutlined key="edit" />,
          <EllipsisOutlined key="ellipsis" />,
        ]}
      >
        <Meta
          style={{height: '14vh', overflow: 'auto'}}
          avatar={<Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel" />}
          title={title}
          description={description}
        />
      </Card>
    </div>
  )
};


export default ProjectCard;