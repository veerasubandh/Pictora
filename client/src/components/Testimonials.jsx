import 'react'
import { assets, testimonialsData } from '../assets/assets'
import {motion} from 'framer-motion'

const Testimonials = () => {
  return (
    <motion.div 
    initial={{opacity:0.2,y:100}}
    transition={{duration:1}}
    whileInView={{opacity:1,y:0}}
    viewport={{once:true}}
    className="flex flex-col items-center justify-center my-20 p-12 ">
      <h1 className="font-[Outfit] text-3xl sm:text-4xl font-semibold mb-2">
        Customer Testimonials
      </h1>
      <p className="font-[Outfit] text-gray-500 mb-12">
        What Our Users Say About Us
      </p>
      <div className='flex flex-wrap gap-6'>
        {testimonialsData.map((testimonial,index)=>(
            <div key={index} className='bg-white/20 p-12 rounded-lg shadow-md order w-80 m-auto cursor-pointer hover:scale-[1.02] transition-all'>
                <div className='flex flex-col items-center'>
                    <img src={testimonial.image} alt="" className='rounded-full w-14'/>
                    <h2 className='font-[Outfit] text-xl font-semibold mt-3'>{testimonial.name}</h2>
                    <p className='font-[Outfit] text-gray-500 mb-4'>{testimonial.role}</p>
                    <div className='flex mb-4'>
                        {Array(testimonial.stars).fill().map((item,index)=>(
                            <img key={index} src={assets.rating_star} alt="" className=''/>
                        ))}
                    </div>
                    <p className='font-[Outfit] text-center text-sm text-gray-600'>{testimonial.text}</p>
                </div>
            </div>
        ))}
      </div>
    </motion.div>
  )
}

export default Testimonials
