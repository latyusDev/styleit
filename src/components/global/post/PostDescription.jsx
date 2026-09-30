import React, { memo, useState } from 'react'

const PostDescription = ({ description }) => {
    const [isOpened, setIsOpened] = useState(false);
    const slicedValue = description?.slice(0, 150)
    const isLong = description?.length > 152

    return (
        <p
            className={`mb-4 text-[11px] md:text-sm ${isLong && 'cursor-pointer'}`}
            onClick={() => setIsOpened(!isOpened)}
        >
            {isOpened ? description : (
                <span>{slicedValue} {isLong && '...'}</span>
            )}
        </p>
    )
}

export default memo(PostDescription)