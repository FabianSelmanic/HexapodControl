import React, { useContext } from 'react'
import { TimelineContex, UserClickedAction } from '../../context.js'
import { useState, useEffect } from 'react'

const ac = (props) => {
  const action = useContext(UserClickedAction)
  const element = JSON.parse(action)
  const timelinedata = useContext(TimelineContex)
  const data = timelinedata
  const [type, setType] = useState()
  const [value, setValue] = useState()
  const testAnimation = []

  const handleSubmit = () => {
    console.log(element)
    const idofselectedelement = element
    for (let i = 0; i < 7; i++) {
      const selectedelements = data[i].actions
      for (let g = 0; g < selectedelements.length; g++) {
        const selectedobjects = selectedelements[g];
        testAnimation.push(selectedobjects)
        if (selectedobjects.id == idofselectedelement) {
          selectedobjects.effect.effectId = (typeof type === 'undefined') ? 'pitch' : type;
          selectedobjects.effect.effectValue = value
        }
      }
    }
    props.updateTimeline(data)
  }

  const handleDelete = () => {
    data.forEach((num) => {
    	num.actions.forEach((etd, index) => {
    		if(etd.id == element) {
            	console.log(etd)
                num.actions.splice(index, 1)
            }
      });
	  });
    props.updateTimeline(data)
    props.changeaction(null)
  }

  return (
    <div className='bg-primary rounded-md acstyle'>
        {action === null ? <h1 className='text-xl text-center mt-5'>Select an element to edit</h1> : 
        <div className='p-5 flex flex-col'>
          <h1 className='text-lg text-center'>Edit element {element}</h1>
          <label className='mb-2 text-lg' htmlFor="typeofelementselector">Type:</label>
          <select onChange={(ev) => {setType(ev.nativeEvent.target.value)}} className='h-10 mb-5 rounded-md bg-[#191b1d] p-2 text-white' id="typeofelementselector">
            <option value="stretch">Stretch</option>
            <option value="height">Height</option> 
            <option value="move">Movement</option> 
            <option value="rotate">Rotation</option>
            <option value="tilt">Tiltation</option>
            <option value="setLed">Light</option>
          </select>
          <label className='mb-2 text-lg' htmlFor="valueofelement">Value:</label>
          <input onChange={(ev) => {setValue(ev.nativeEvent.target.value)}} className='h-10 rounded-md bg-[#191b1d] p-2 text-white' type="number" name="" id="valueofelement" />
          <label className='mb-5 mt-1 text-xs text-blue' htmlFor="valueofelement"><a href='https://github.com/stemi-education/stemi-hexapod/blob/master/APIDocumentation.md' target='about:blank' className='text-blue'>Documentation</a></label>
          <button onClick={handleSubmit} className='h-10 mb-2 rounded-md hover:bg-[#2c2e31] bg-[#191b1d] p-2 tracking-wide text-white' type="button">Update</button>
          <button onClick={handleDelete} className='h-10 rounded-md hover:bg-[#b81c1d] bg-[#7f1d1d] p-2 tracking-wide text-white' type="button">Remove</button>
        </div>}
    </div>
  )
}

export default ac