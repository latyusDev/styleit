import LastSeen from '@/components/admin/shared/LastSeen';
import UserInformation from '@/components/admin/shared/userInfo/UserInformation';
import React from 'react'

const AdminClientProfilePage = () => {
  return (
    <section  data-testid="admin-client-profile">
        <UserInformation/>
    </section>
  )
}

export default AdminClientProfilePage