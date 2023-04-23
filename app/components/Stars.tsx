import fullStar from '../../public/icons/icons/full-star.png'
import emptyStar from '../../public/icons/icons/empty-star.png'
import halfStar from '../../public/icons/icons/half-star.png'
import Image from 'next/image'
import { Review } from '@prisma/client'
import { calculateReviewRatingAverage } from '@/utils/calculateReviewRatingAverage'

export default function Stars({reviews, rating}: {reviews: Review[], rating?: number}) {
 var r = 0;
 if(!rating) r = parseFloat(calculateReviewRatingAverage(reviews).toFixed(1));
 else r=rating
  const renderStars = () => {
    const stars = [];
    for (let i = 0; i<5; i++) {
      const difference = r -i;
      if(difference>0.6) stars.push(fullStar)
      else if(difference <1 && difference > 0) {
        if(difference <= 0.2) stars.push (emptyStar)
        else if (difference > 0.2 && difference <= 0.6) stars.push(halfStar)
      }
      else stars.push(emptyStar)
    }
    return stars.map(star => { return (<Image src={star} alt = '' className='w-4 h-4 mr-1'></Image>)})
  }
  
  return (
    <div className='flex items-center'>{renderStars()}</div>
  )
}
