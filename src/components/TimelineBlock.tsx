import React, { useEffect, useState } from "react";
import { Timeline, Divider } from 'antd';

interface Props {
  header: string;
  experiences: Array<Experience>;
};

interface Experience {
  logoUrl: string;
  organization: string;
  role: string;
  startTime: string;
  endTime: string;
  desc: string;
}

const TimelineBlock: React.FC<Props> = ({ header, experiences }) => {
  return (
    <div style={{ overflowY: 'auto', width: '' }}>
      <h1 style={{marginLeft: '2vw', marginBottom: '3vh'}}>{header}</h1>
      <Timeline
        mode="left"
        items={
          experiences.map((exp) => {
            return {
              label: exp.startTime,
              children: (
                <div className="experience-line-block" style={{display: "flex"}}>
                  <div><img style={{ bottom: 10 }} src={exp.logoUrl} alt={exp.organization} /></div>
                  <div className="experience-line-block-content">
                    <h2>{exp.organization}</h2>
                    <p><span style={{fontStyle: "italic"}}>{exp.role}</span> · {exp.startTime} - {exp.endTime}</p>
                    <p>{exp.desc}</p>
                  </div>
                </div>
              )
            }
          })
        }
      />
      <Divider style={{minWidth: '80%', width: '80%', margin: '0 auto'}}/>
      
    </div>
  )
}


export default TimelineBlock;