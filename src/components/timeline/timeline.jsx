import React, { useEffect, useRef , useState } from 'react'
import { TimelineContex, UserClickedAction } from '../../context.js'
import { Timeline } from '@xzdarcy/react-timeline-editor';
import { useContext } from 'react';
import { CustomRender0, CustomRender1 } from "../timeline/custom.jsx";
import audioControl from '../audioControl.js';

const timeline = (props) => {

  const mockData = useContext(TimelineContex)
  const timelineState = useRef();
  useEffect(() => {
    window.timelineState = timelineState;
  }, [timelineState]);

  const mockEffect = {
    effect0: {
      id: "effect0",
      name: "standard",
    },
    effect1: {
      id: 'effect1',
      name: '播放音效',
      source: {
        start: ({ action, engine, isPlaying, time }) => {
          if (isPlaying) {
            const src = action.data.src;
            audioControl.start({ id: src, src, startTime: action.start, engine, time });
          }
        },
        enter: ({ action, engine, isPlaying, time }) => {
          if (isPlaying) {
            const src = action.data.src;
            audioControl.start({ id: src, src, startTime: action.start, engine, time });
          }
        },
        leave: ({ action, engine }) => {
          const src = action.data.src;
          audioControl.stop({ id: src, engine });
        },
        stop: ({ action, engine }) => {
          const src = action.data.src;
          audioControl.stop({ id: src, engine });
        },
      },
    }
  };

  const idRef = useRef ( 0 ) 
  const [ data , setData ] = useState ( mockData ) ;  
  const [ scaleSplitCount , setScaleSplitCount ] = useState ( 10 ) ;   
  const [ gridSnip , setGridSnip ] = useState ( true ) ;   

  useEffect(() => {
    props.updateTimeline(data)
  }, [data])

  return (
    <div className='bg-primary rounded-md tstyle'>
        <Timeline
        className='h-20'
        onChange= { setData }
        editorData= { data }
        effects= { mockEffect }
        gridSnap = { gridSnip }
        scaleSplitCount = { scaleSplitCount }
        hideCursor= { false }
        autoReRender= {true}
        ref= {timelineState}
        dragLine = { true }
        autoScroll = { true }
        onClickActionOnly={ (e, { action, row, time} ) => {
          props.changeaction(action.id)
        }}
        onDoubleClickRow= { ( e , { row , time } ) => {   
          setData ( ( pre ) => {  
            const rowIndex = pre . findIndex ( item => item . id === row . id ) ; 
            const newAction = {   
              id : ` ${ idRef . current ++ }` , 
              start : time - 0.30 ,
              end : time + 0.30 , 
              effect: {
                effectId: 'undefined',
                effectValue: 1,
              }
            }
            pre [ rowIndex ] = { ... row , actions : row . actions . concat ( newAction ) } ;  
            return [ ... pre ] ; 
          } )
          } }
        getActionRender={(action) => {
          //if (action.effect.effectId === 'pitch') {
            //return <CustomRender1 action={action}/>
          //}
          return <CustomRender0 action={action}/>
        }}
        />
    </div>
  )
}

export default timeline