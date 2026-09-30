import React, { memo, useMemo } from 'react';
import { useLocation } from "react-router-dom";
import PostCard from './PostCard';
import { useAuth } from '@/store/useAuth';

const PostContainer = ({ pages, follow }) => {
    const { pathname } = useLocation();
    const location = pathname.endsWith('trending');
    const { user } = useAuth();
     const userProfile = useMemo(() => ({
        firstName: user?.first_name,
        lastName: user?.last_name
    }), [user?.first_name, user?.last_name])
    
    return (
        <div>
            {/* for trending page */}
            {location ? (
                <div>
                    {pages?.map((page, pageIndex) => (
                        <React.Fragment key={pageIndex}>
                            {page?.posts?.map(post => (
                                <PostCard
                                    follow={follow} 
                                    post={post} 
                                    key={post.id}
                                />
                            ))}
                        </React.Fragment>
                    ))}
                </div>
            ) : (
                <div>
                    {/* for creator profile */}
                    {pages?.map(post => (
                        <PostCard
                            follow={follow} 
                            userProfile={userProfile}
                            post={post} 
                            key={post.id}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

export default memo(PostContainer);