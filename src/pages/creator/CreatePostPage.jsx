import PostForm from '@/components/dashboard/profile/creator/PostForm'
import React from 'react'

const CreatePostPage = () => {
  return (
        <section data-testid="create-post-page" className='p-8'>
                <PostForm/>
        </section>
  )
}

export default CreatePostPage