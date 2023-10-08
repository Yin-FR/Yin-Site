import React, { useEffect, useState } from "react";
import TimelineBlock from "../components/TimelineBlock";
import { getDataFromAPI, DataReceived } from "../utils/api";
import SkillArray from "../components/SkillArray";


const ResumePage: React.FC = () => {

  const [educationData, setEducationData] = useState<DataReceived>([]);
  const [workData, setWorkData] = useState<DataReceived>([]);
  const [skillData, setSkillData] = useState<DataReceived>([]);
  const [educationDataloading, setEducationDataLoading] = useState(true);
  const [workDataloading, setWorkDataLoading] = useState(true);
  const [skillDataloading, setSkillDataLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      getDataFromAPI("https://api.yincodeworld.com/v1/resume/educations", "GET").then((result) => {
        setEducationData(result);
        setEducationDataLoading(false);
      }).catch((error) => {
        console.error('Error: ', error);
        setEducationDataLoading(false);
      })
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      getDataFromAPI("https://api.yincodeworld.com/v1/resume/works", "GET").then((result) => {
        setWorkData(result);
        setWorkDataLoading(false);
      }).catch((error) => {
        console.error('Error: ', error);
        setWorkDataLoading(false);
      })
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      getDataFromAPI("https://api.yincodeworld.com/v1/resume/skills", "GET").then((result) => {
        setSkillData(result);
        setSkillDataLoading(false);
      }).catch((error) => {
        console.error('Error: ', error);
        setSkillDataLoading(false);
      })
    };
    fetchData();
  }, []);

  return (
    <div className="resume-page">
      {educationDataloading && workDataloading && skillDataloading ?
        <h1></h1> :
        (Array.isArray(educationData) && Array.isArray(workData)) && Array.isArray(skillData) ?
          <div>
            < TimelineBlock
              header="Education"
              experiences={
                educationData.map((data) => {
                  return {
                    logoUrl: "https://api.yincodeworld.com/v1/image?name=" + data.school_pic,
                    organization: data.school_name,
                    role: data.diploma,
                    startTime: data.start_time,
                    endTime: data.graduation_time,
                    desc: ''
                  }
                })
              }
            />
            < TimelineBlock
              header="Experience"
              experiences={
                workData.map((data) => {
                  return {
                    logoUrl: "https://api.yincodeworld.com/v1/image?name=" + data.company_pic,
                    organization: data.company_name,
                    role: data.role,
                    startTime: data.start_time,
                    endTime: data.end_time,
                    desc: data.desc
                  }
                })
              }
            />
            <SkillArray 
              skillsArray={
                skillData.map((data) => {
                  return {
                    title: data.skill_name,
                    value: data.skill_value
                  }
                })
              }
            />
            
          </div>

          : <h1>Error</h1>}

    </div>
  )
}


export default ResumePage;