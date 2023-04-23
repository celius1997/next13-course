import { calculateReviewRatingAverage } from '@/utils/calculateReviewRatingAverage';
import { Review } from '@prisma/client'

interface Props {
  reviews: Review[]
}

export default function Rating({reviews}: Props) {
  const rating_avg = calculateReviewRatingAverage(reviews).toFixed(1);
  return (
    <div className='flex items-end'>
        <div className='ratings mt-2 flex items-center'>
            <p>*****</p>
            <p className='text-reg ml-3'>{rating_avg}</p>
        </div>
        <div>
            <p className='text-reg ml-4'>{reviews.length} {reviews.length === 1 ? 'Review' : 'Reviews'}</p>
        </div>
    </div>
  )
}
