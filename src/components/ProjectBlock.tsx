import React, { useEffect, useState } from "react";

import ProjectCard, { Repo } from "./ProjectCard";

export interface ProjectBlockProps {
  language: string
  repos: Array<Repo>
}

const ProjectBlock: React.FC<ProjectBlockProps> = ({ language, repos }) => {
  return (
    <div className="project-line-block">
      <h1 style={{color: "white"}}>{language}</h1>
      <div className="project-line-block-div">
        {repos.map((repo) => {
          return (
            <ProjectCard
              key={repo.title}
              title={repo.title}
              description={repo.description}
              coverUrl={repo.coverUrl}
              language={repo.language}
              mainLanguage={repo.mainLanguage}
            />
          )
        })}
      </div>
    </div>
  )
}

export default ProjectBlock;