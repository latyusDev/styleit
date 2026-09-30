import React from 'react'
import setting from '@/images/setting-2.png'
import Image from '@/components/global/Image'
import logo from '@/images/logo.png'



const Settings = () => {
  return (
    <section data-testid="settings-page" className='pb-24 font-lato'>
      <div className='text-center'>
          <h1 className='mt-12 mb-16 text-3xl font-[700]'>Settings</h1>
          <Image src={setting} alt="setting" className="block mx-auto mb-8 md:mb-12 w-[80px]" />
          <Image src={logo} alt="logo" className="block mx-auto  w-[120px]" />
          <h2 className='text-4xl  font-[700] text-primary capitalize mt-4 md:mt-8'>coming soon</h2>
      </div>
    </section>
  )
}

export default Settings