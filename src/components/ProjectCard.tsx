import React, { useEffect, useState } from "react";
import { Avatar, Card } from 'antd';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import PieEChart from "./PieEChart";

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
    <div className="project-card-div">
      <Card
        className="project-card"
        cover={
          <img
            alt={title}
            src={coverUrl}
            style={{
              height: '23vh',
            }}
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
          avatar={<PieEChart 
            renderedElementId={title}
            dataset={Object.keys(language).map((languageTitle) => {
              return {
                name: languageTitle,
                value: language[languageTitle]
              };
            })}
            />}
          title={title}
          description={description}
        />
      </Card>
    </div>
  )
};


export default ProjectCard;