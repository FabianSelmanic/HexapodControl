import React, { useEffect, useState } from 'react'
import { UserClickedAction, TimelineContex } from '../src/context.js'
import TDM from '../src/components/3dmodel/tdm.jsx';
import Timeline from '../src/components/timeline/timeline.jsx'
import Ac from '../src/components/actioneditor/ac.jsx'
import Player from '../src/components/player/player.jsx'

function App() {

  const mockData = [{
      id: "0",
      actions: [],
    },
    {
      id: "1",
      actions: [],
    },
    {
      id: "2",
      actions: [],
    },
    {
      id: "3",
      actions: [],
    },
    {
      id: "4",
      actions: [],
    },
    {
      id: "5",
      actions: [],
    },
    {
      id: "6",
      actions: [
        {
          id: 'action3',
          start: 0,
          end: 258,
          effectId: 'effect1',
          data: {
            src: 'src/assets/song.mp3',
            name: '背景音乐',
          },
        },
      ],
    }
  ]

  const [action, SetAction] = useState(null)
  const [timeline, SetTimeline] = useState(mockData)

  return (
    <TimelineContex.Provider value={timeline}>
      <UserClickedAction.Provider value={action}>
        <div className='w-screen h-screen maingridlayout'>
          <TDM></TDM>
          <Timeline changeaction={(value) => {
            SetAction(value)
          }} updateTimeline={(data) => { SetTimeline([...data]) }}></Timeline>
          <Ac updateTimeline={(data) => { SetTimeline([...data]) }} changeaction={(value) => { SetAction(value) }}></Ac>
          <Player></Player>
        </div>
      </UserClickedAction.Provider>
    </TimelineContex.Provider>
  )
}

export default App
