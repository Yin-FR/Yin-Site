import React, { useEffect, useState } from "react";
import { Avatar, Card, Divider } from 'antd';
import { GithubOutlined, CodeSandboxOutlined, LikeOutlined } from '@ant-design/icons';
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
  demoUrl: string,
  url: string
}

const ProjectCard: React.FC<Repo> = ({ title, description, language, mainLanguage, coverUrl, demoUrl, url }) => {
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
          <a key="code" href={url} target="_blank" ><GithubOutlined /> source</a>,
          demoUrl === "" ? <span><CodeSandboxOutlined style={{cursor: "not-allowed", pointerEvents: "none"}}/> demo</span>: <a key="demo" href={demoUrl} target="_blank" ><CodeSandboxOutlined key="demo" /> demo</a>,
          <a key="like" href={url} target="_blank" ><LikeOutlined /></a>
        ]}
      >
        <Divider style={{margin: "0 0 1.5vh 0"}}/>
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