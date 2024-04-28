import React, { useContext, useState } from 'react'
import { TimelineContex, UserClickedAction } from '../../context.js'
import ClipboardIcon from '../../assets/icons/clipboard.svg'

const player = () => {

  const timelinedata = useContext(TimelineContex)
  const [isPlaying, setPlayingStatus] = useState(false)

  const CleanedUpTimeline = timelinedata
  .filter(item => item.actions && item.actions.length > 0)
  .flatMap(item => item.actions)
  .sort((a, b) => a.start - b.start)
  .reduce((acc, current, index, array) => {
    acc.push({
      "effectId": current.effect ? current.effect.effectId : undefined,
      "effectValue": current.effect ? current.effect.effectValue : undefined
    });

    if (index < array.length - 1) {
      const timeDifference = array[index + 1].start - current.start;
      acc.push({ difference: timeDifference });
    }

    return acc;
  }, []);

  const ConvertToCode = () => {
    const code = []
    CleanedUpTimeline.forEach((item) => {
      if('effectId' in item || !('effect1' in item)) {
        const newobj = item.effectId +'(' + item.effectValue + ')'
        code.push(newobj)
      } else if(!('effectId' in item) || !('effect1' in item)) {
        const newobj = 'delay(' + item.difference + ')'
        code.push(newobj)
      }
    })
    const result = code.toString().replace(/,/g, '\n')
    console.log(result)
    return result
  }

  const CopyToClipboard = () => {
    navigator.clipboard.writeText(ConvertToCode());
  }

  return (
    <div className='bg-primary rounded-md p-5 flex flex-col items-center'>
      <h1 className='text-white text-xl text-center mb-5'>Player</h1>
      <div className='flex flex-row w-full items-center text-center'>
        <button className='h-10 w-5/6 rounded-md hover:bg-[#2c2e31] ml-auto text-center bg-[#252729] p-2 tracking-wide text-white' onClick={ConvertToCode}>Convert to Code</button>
        <button className='h-10 rounded-md hover:bg-[#2c2e31] mr-0 ml-auto bg-[#252729] p-2 tracking-wide text-white' onClick={CopyToClipboard}><img src={ClipboardIcon} className='w-[25px]' alt='Copy' /></button>
      </div>
      <div className='mt-2 flex flex-row w-full items-center text-center'>
        <h1>Time</h1>
        { !isPlaying ? <button onClick={() => { setPlayingStatus(true) }} className='h-10 w-2/6 rounded-md hover:bg-green-500 ml-auto text-center bg-[#ffffff]] p-2 tracking-wide text-white'>Play</button> : <button className='h-10 w-2/6 rounded-md hover:bg-[#2c2e31] ml-auto text-center bg-[#252729] p-2 tracking-wide text-white' onClick={() => { setPlayingStatus(false) }}>Pause</button> }
      </div>
    </div>
  )
}

export default player