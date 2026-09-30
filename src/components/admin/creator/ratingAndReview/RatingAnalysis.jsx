import Stars from "@/components/global/Stars";
import { Progress } from "@/components/ui/progress"
import { Star } from "lucide-react"

const ratingStars = ['','one','two','three','four','five']

const RatingAnalysis = ({ratingAnalysis})=>{

  const totalRaters = ratingAnalysis.reduce((accumulator,summary)=>accumulator+summary.count,0);
  const weightedSum = ratingAnalysis.reduce((sum, rating) => {
  return sum + (rating.star * rating.count);
}, 0);
  const averageRating = (weightedSum / totalRaters).toFixed(1);
  
    return(
      <div className="flex flex-col-reverse md:flex-row gap-5 font-lato items-center mb-5">
          <div className=" w-full md:w-auto md:flex-[0.5]">
            {ratingAnalysis
            .map((item, index) => (
  <div key={index} className="flex items-center gap-3">
    <div className="w-12 text-xs  mb-5 font-[700] uppercase">
      {ratingStars[item.star]}
    </div>
    
    {/* Stars */}
         <Star
          className='w-5 h-5 fill-yellow-400 text-yellow-400 mb-5'/>
    
    {/* Progress Bar */}
    <Progress value={item.percentage} className="flex-1 mx-3 h-3.5 mb-5 bg-sidebar" />
    
    {/* Value */}
    <div className="w-8 text-sm font-medium text-black mb-5">
      {item.count}
    </div>
  </div>
))}
        </div>

        <div className="w-full md:w-auto md:flex-[0.5] mb-5 text-center bg-gradient-to-tr rounded-lg text-lightGray p-10 from-primary to-sidebar to-[35%] ">
            <h3 className="font-[700] text-3xl">{isNaN(averageRating) ? 0 : averageRating}</h3>
            <div className="mx-auto w-[max-content]">

                <Stars rating={4} className='gap-5 my-4'/>
            </div>
            <p className="capitalize">{totalRaters} ratings</p>
        </div>
      </div>
    )
}

export default RatingAnalysis