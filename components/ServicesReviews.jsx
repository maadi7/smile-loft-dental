import React from 'react';
import Image from 'next/image';
import qoutesTop from "../assets/“.png"
import qoutesBottom from "../assets/“ (1).png"

const ServicesReviews = () => {
  return (
    <div className='py-20 px-24 bg-bgbottom flex items-center justify-center text-center' >
        <div className='relative' >
        <h2 className='font-nunito text-2xl leading-10 max-w-[1000px]' >
        I recently had teeth whitening done at Smile Loft Dental, and I am thrilled with the results! The staff was friendly and professional, and the office was clean and modern. Dr. Rai explained everything clearly and made me feel comfortable. The procedure was quick and painless, and my teeth look amazing. Highly recommend Smile Loft Dental for a brighter smile!
        </h2>
        <Image src={qoutesTop} alt='"'  className='absolute -top-8 -left-28 h-[70px] w-[100px]' />
        <Image src={qoutesBottom} alt='"'  className='absolute -bottom-8 -right-28 h-[70px] w-[100px]' />
        </div>

        
    </div>
  )
}

export default ServicesReviews