import { Button } from '@/components/ui/button'
import { useAuth } from '@/store/useAuth'
import React, { memo, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

const PostFollowButton = ({ post, handleFollow, handleUnFollow}) => {
    const { user } = useAuth();
    const [isFollowing, setIsFollowing] = useState(false);
    const {id} = useParams();
    useEffect(() => {
        const following = post?.follows?.some(
            follow =>
                follow?.follower_custid == user?.id &&
                (post?.creator?.creator_id || post?.creator_id) == follow?.followed_desiid
        );
        setIsFollowing(following);
    }, [post?.follows]);
    const creator = id ? {creator_id:post?.creator_id}: post?.creator

    const onFollow = () => {
        setIsFollowing(true);   
        handleFollow(creator);
    };

    const onUnFollow = () => {
        setIsFollowing(false);  
        handleUnFollow(creator);
    };

    return (
        <div>
            {isFollowing ? (
                <Button
                    onClick={onUnFollow}
                    className="text-primary -mt-1.5 p-0 bg-white hover:bg-white shadow-none block text-lg"
                >
                    Unfollow
                </Button>
            ) : (
                <Button
                    onClick={onFollow}
                    className="text-primary -mt-1.5 p-0 bg-white hover:bg-white shadow-none block text-lg"
                >
                    Follow
                </Button>
            )}
        </div>
    );
};

export default memo(PostFollowButton);