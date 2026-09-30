import React, { memo } from 'react'
import OneImage from './OneImage';
import TwoImages from './TwoImages';
import ThreeImages from './ThreeImages';
import FourImages from './FourImages';
import MoreThanFiveImages from './MoreThanFiveImages';

  export const ImageLayout = memo(({images,openModal}) => {
    const imageCount = images?.length;

    switch(imageCount){
        case 1:
         return <OneImage image={images[0]}
         openModal={openModal}/>
        case 2:
           return <TwoImages images={images} openModal={openModal}/>
        case 3:
            return <ThreeImages images={images} openModal={openModal}/>
        case 4:
          return <FourImages images={images} openModal={openModal}/>
        default:
            if(imageCount >= 5){
                return <MoreThanFiveImages imageCount={imageCount} 
                images={images} openModal={openModal}/>
            }
            return null
           
    }
   
})
