import FrequentlyAskedQuestions from '@/components/global/FrequentlyAskedQuestions'
import SEO from '@/components/global/SEO'
import React from 'react'

const FrequentlyAskedQuestionsPage = () => {
  return (
    <div data-testid="faqs-page" className="py-20 px-4  font-lato bg-gradient-to-bl to-pink-50  to-[50%] from-[50%] md:to-[54.2%] from-gray-50 md:from-[54.7%] ">
         <SEO
          title="FAQ | Styleit Africa"
          description="Styleit Africa is a B2C social networking platforms for professional fashionistas. It is a home where user meet with professional designers in all forms of fashion world such as tailors, hair and hairstyles, cobblers, belt, hat and bags designers including bangles."
          image="https://styleit2-0.vercel.app/preview.png"
          url="https://styleit2-0.vercel.app/faq"
          />
        <h1 className='text-2xl font-lato font-bold text-center text-primary mb-7 capitalize'>frequently asked questions</h1>
        <FrequentlyAskedQuestions/>
    </div>
  )
}

export default FrequentlyAskedQuestionsPage