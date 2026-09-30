import { z } from "zod"

const joinSchema = z.object({
  join:z.enum(['designer','client'],{
    required_error:'Please choose a role'
    
  })
})

export {joinSchema}