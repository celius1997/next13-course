import { Review } from '@prisma/client'
import ReviewCard from './ReviewCard'

interface Props {
  reviews: Review[]
}
export default function Reviews({reviews}: Props) {
  return (
    <div>
        <h1 className='font-bold text-3xl mt-10 mb-7 border-p pb-5'>
            What {reviews.length} {reviews.length === 1 ? 'person is':'people are'} saying
        </h1>
        <div>
        {reviews.map(review => (
            <ReviewCard review={review} key={review.id}/>
        ))}
        </div>
    </div>
  )
}
