import React, { useEffect, useState } from "react";
import { Divider, Progress } from 'antd';

interface SkillItem {
  title: string,
  value: number
}

interface Props {
  skillsArray: Array<SkillItem>
}

const randomHexColor = (): string => {
  const letters: string = '0123456789ABCDEF';
  let color: string = '#';
  for (let i: number = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

const SkillArray: React.FC<Props> = ({ skillsArray }) => {

  skillsArray.sort((skillItemA, skillItemB) => {
    return skillItemB.value - skillItemA.value
  })
  
  return (
    <div style={{ overflowY: 'auto', width: '' }}>
      <h1 style={{marginLeft: '2vw', marginBottom: '3vh'}}>Skills</h1>
      {skillsArray.map((skillItem) => {
        return (
          <div className="skill-line-block" key={skillItem.title}>
            <p>{skillItem.title}</p>
            <Progress
              className="skill-line-block-skillbar"
              percent={skillItem.value}
              showInfo={false}
              strokeColor={randomHexColor()}
              size={['100%', 20]}
              />
          </div>
        )
      })}
      <Divider style={{minWidth: '80%', width: '80%', margin: '0 auto'}}/>
      
    </div>
  )
}


export default SkillArray;