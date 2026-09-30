import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { faqs } from "@/static/data"
import React from "react"
import { motion } from "motion/react"


const FrequentlyAskedQuestions = ()=> {
  return (
    <div className="max-w-[1000px] mx-auto ">
         <Accordion
      type="single"
      collapsible
      className="w-full  "
      defaultValue="item-1"
    >
        {
            faqs.map((faq, index)=>(
                <motion.div
                  key={faq.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, ease: "easeOut", delay: index * 0.1 }}
                  className="cursor-pointer"
                >
                    <AccordionItem value={faq.id} className='border-none shadow-md mb-3 rounded-sm py-2.5 px-7'>
                    <AccordionTrigger className='text-primary text-lg font-lato cursor-pointer'>{faq.question}</AccordionTrigger>
                    <AccordionContent className="flex flex-col gap-4 text-balance">
                    <p className="text-md md:text-[1rem]">
                      {faq.answer}
                    </p>
                  
                    </AccordionContent>
            </AccordionItem>
                </motion.div>
            ))
        }   
    </Accordion>
    </div>
  )
}

export default FrequentlyAskedQuestions