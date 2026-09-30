import React, { memo } from 'react'

const Followers = ({followers,styles}) => {
  return (
    <p className={styles}> {followers}</p>

  )
}

export default memo(Followers)