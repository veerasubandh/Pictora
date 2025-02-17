import 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div className='flex items-center justify-between gap-4 py-3 mt-20'>
      <img src={assets.logo2} alt="" width={150} className='border'/>
      <p className='font-[Outfit] flex-1 text-center border-l border-r border-gray-400 pl-4 text-sm text-gray-500 max-sm:hidden'>© 2025 Pictora. | All rights reserved.</p>
      <div className='flex gap-2.5'>
        <img src={assets.facebook_icon} alt="" width={35}/>
        <img src={assets.twitter_icon} alt="" width={35}/>
        <img src={assets.instagram_icon} alt="" width={35}/>
      </div>
    </div>
  )
}

export default Footer
