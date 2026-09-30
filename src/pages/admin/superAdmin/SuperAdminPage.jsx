import SuperAdmin from '@/components/admin/superAdmin/SupperAdmin'
import Avatar from '@/components/global/Avatar'
import { admins, period } from '@/static/adminData'
import React, { useState } from 'react'

const SuperAdminPage = () => {
  return (
    <section className='font-lato font-[700]'>
        <SuperAdmin />
    </section>
  )
}

export default SuperAdminPage