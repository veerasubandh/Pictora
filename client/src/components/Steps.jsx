import 'react'
import { stepsData } from '../assets/assets'
import {motion} from 'framer-motion'

const Steps = () => {
  return (
    <motion.div 
    initial={{opacity:0.2,y:100}}
    transition={{duration:1}}
    whileInView={{opacity:1,y:0}}
    viewport={{once:true}}
    className='flex flex-col items-center justify-center my-32'>
      <h1 className='font-[Outfit] text-3xl sm:text-4xl font-semibold mb-2'>How it Works?</h1>
      <p className='font-[Outfit] text-lg text-gray-600 mb-8'>Transform Words Into Stunning Images</p>
      <div className='space-y-4 w-full max-w-3xl text-sm'>
        {stepsData.map((step,index)=>(
            <div key={index} className='flex items-center gap-4 p-5 px-8 bg-white/20 shadow-md  cursor-pointer hover:scale-[1.02] transition-all duration-300 rounded-lg'>
                <img width={40} src={step.icon} alt="" />
                <div>
                   <h2 className='font-[Outfit] text-xl font-medium'>{step.title}</h2> 
                   <p className='font-[Outfit] text-gray-500'>{step.description}</p>
                </div>
            </div>
        )
        )}
      </div>
    </motion.div>
  )
}

export default Steps
