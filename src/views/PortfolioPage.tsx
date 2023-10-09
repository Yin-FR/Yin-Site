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
  cover_url: string
  demo_url: string,
  url: string
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
      getDataFromAPI("https://api.yincodeworld.com/v1/project/repos", "GET", query).then((result) => {
        const modifiedData: Array<Repo> = (result as Array<ReceivedData>).map((eachRepo) => {
          return {
            title: eachRepo.title,
            description: eachRepo.description,
            mainLanguage: eachRepo.main_language,
            language: eachRepo.language,
            coverUrl: eachRepo.cover_url,
            demoUrl: eachRepo.demo_url,
            url: eachRepo.url
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
          return (itemA.repos.length < itemB.repos.length) ? 1 : (itemA.repos.length > itemB.repos.length) ? -1 : 0
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

  useEffect(() => {
    const backGroundElement: HTMLElement | null = (document.getElementsByClassName("particles-bg-canvas-self") as HTMLCollectionOf<HTMLElement>)[0];
      backGroundElement.style.height = "250%";
  }, []);



  useEffect(() => {
    const backGroundElement: HTMLElement | null = (document.getElementsByClassName("particles-bg-canvas-self") as HTMLCollectionOf<HTMLElement>)[0];
    const mainElement: HTMLElement | null = document.getElementById('portfolio-page');
    console.log((mainElement as HTMLElement).clientHeight);
    if ((mainElement as HTMLElement).clientHeight) {
      backGroundElement.style.height = (mainElement as HTMLElement).clientHeight + 164 + "px";
    }
  }, [data]);

  return (
    <div id="portfolio-page">

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

      <ParticlesBg type="square" bg={true} />
    </div>
  )
}


export default PortfolioPage;