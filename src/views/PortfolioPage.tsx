import React, { useEffect, useState } from "react";
import ParticlesBg from 'particles-bg';
import { getDataFromAPI, DataReceived } from "../utils/api";
import ProjectBlock, { ProjectBlockProps } from "../components/ProjectBlock";
import { Repo } from "../components/ProjectCard";

type RepoLanguageObject = {
  [language: string]: Array<Repo>;
}

type LanguageObject = {
  [language: string]: number;
};

interface ReceivedData {
  title: string
  description: string
  main_language: string
  language: LanguageObject
}

interface RepoLanguegeArrayItem {
  language: string,
  repos: Array<Repo>
}

const PortfolioPage: React.FC = () => {

  const [data, setData] = useState<DataReceived>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const query: object = { username: "yin-fr" };
      getDataFromAPI("http://localhost:8080/v1/project/repos", "GET", query).then((result) => {
        const modifiedData: Array<Repo> = (result as Array<ReceivedData>).map((eachRepo) => {
          return {
            title: eachRepo.title,
            description: eachRepo.description,
            mainLanguage: eachRepo.main_language,
            language: eachRepo.language,
            coverUrl: ""
          }
        })
        const repos: RepoLanguageObject = {};
        modifiedData.forEach((eachRepo) => {
          if (eachRepo.mainLanguage !== null) {
            if (!repos.hasOwnProperty(eachRepo.mainLanguage)) {
              repos[eachRepo.mainLanguage] = [eachRepo]
            } else {
              repos[eachRepo.mainLanguage].push(eachRepo)
            }
          }
        });
        const reposArray: Array<RepoLanguegeArrayItem> = Object.keys(repos).map((language: string) => {
          return {
            language: language,
            repos: repos[language]
          }
        })
        reposArray.sort((itemA, itemB) => {
          return (itemA.repos.length < itemB.repos.length)? 1: (itemA.repos.length > itemB.repos.length)? -1: 0
        })
        setData(reposArray);
        setLoading(false);
      }).catch((error) => {
        console.error('Error: ', error);
        setLoading(false);
      })
    };
    fetchData();
  }, []);

  return (
    <div>
      <ParticlesBg type="square" bg={true} />
      {loading ?
        <h1></h1> :
        (Array.isArray(data)) ?
          <div className="">
            {data.map((eachRepo) => {
              return (
                <ProjectBlock
                  key={eachRepo.language}
                  language={eachRepo.language}
                  repos={eachRepo.repos}
                />
              )
            })}
          </div>
          : <h1>Error</h1>}
    </div>
  )
}


export default PortfolioPage;