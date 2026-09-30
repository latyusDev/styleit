import React from 'react'
import UserLists from './UserLists'
import PeriodTabs from '../../shared/PeriodTabs'

const NewUsers = () => {
  return (
    <div className='mt-9'>
        <PeriodTabs requiredPeriod={2} />
        <UserLists/>
    </div>
  )
}

export default NewUsers