import React, { useEffect, useState } from "react";

import ProjectCard, { Repo } from "./ProjectCard";

export interface ProjectBlockProps {
  language: string
  repos: Array<Repo>
}

const ProjectBlock: React.FC<ProjectBlockProps> = ({ language, repos }) => {
  return (
    <div>
      <h1>{language}</h1>
      <div>
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