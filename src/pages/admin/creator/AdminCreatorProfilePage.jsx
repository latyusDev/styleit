import LastSeen from '@/components/admin/shared/LastSeen';
import UserInformation from '@/components/admin/shared/userInfo/UserInformation';
import React from 'react'

const AdminCreatorProfilePage = () => {
  return (
    <section  data-testid="admin-creator-profile">
        <UserInformation/>
    </section>
  )
}

export default AdminCreatorProfilePage