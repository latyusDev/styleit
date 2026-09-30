import { Ban, Eye, Loader2, MessageCircle, MoreHorizontal, Send, Trash2, Trash2Icon, X } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useComment } from '@/store/useComment';
import { useParams } from 'react-router-dom';
import RepliesModal from './RepliesModal';
import { useAdminStore } from '@/store/admin/useAdmin';
import { toast } from 'sonner';
import PostDescription from '../post/PostDescription';
import { roles } from '@/pages/ViewTrendingPost';
import { useAuth } from '@/store/useAuth';
import { safeDate } from '@/static/data';

const MAX_DEPTH = 3;
const INITIAL_VISIBLE_REPLIES = 3;

const CommentItem = ({
  comment,
  depth = 0,
  activeReplyId,
  setActiveReplyId,
}) => {
  const [replyText, setReplyText] = useState('');
  const [showAllReplies, setShowAllReplies] = useState(false);
  const [commentId, setCommentId] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const { storeReply,banComment,deleteComment } = useComment();
  const { id } = useParams();
  const {user} = useAuth();
  const queryClient = useQueryClient();

  const isReplying = activeReplyId === comment.com_id;
  const totalReplies = comment.children?.length || 0;

  /* ========================
     REPLY MUTATION
  ======================== */
  const { mutate,isPending } = useMutation({
    mutationFn: ({ postId, commentId, reply }) =>storeReply({ postId, commentId, reply }),
    onSettled: (data, error, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['view-trending-post', variables.postId],
      });
        setReplyText('');
        setActiveReplyId(null);
    },
  });

  const handleSubmit = () => {
    if (!replyText.trim()) return;
    mutate({
      postId: id,
      commentId: comment.com_id,
      reply: replyText,
    });

  };

  /* ========================
     DEPTH LIMIT LOGIC
  ======================== */
  if (depth > MAX_DEPTH) return null;

  const shouldOpenModal =
    depth === MAX_DEPTH && totalReplies > 0;

  const visibleReplies =
    showAllReplies || totalReplies <= INITIAL_VISIBLE_REPLIES
      ? comment.children
      : comment.children?.slice(0, INITIAL_VISIBLE_REPLIES);

  const remainingReplies =
    totalReplies > INITIAL_VISIBLE_REPLIES
      ? totalReplies - INITIAL_VISIBLE_REPLIES
      : 0;

  /* ========================
     RENDER
  ======================== */

  const handleAction = (id)=>{
    if(id === commentId){
      setCommentId(null)
    }else{
     setCommentId(id)

    }
  }


        const {mutate:_banComment,isPending:isBanPending} = useMutation({
            mutationFn:()=>banComment({comid:comment.com_id}),
            onSuccess:(response)=>{
              queryClient.invalidateQueries('view-trending-post')
               if(response.status === 200){
                 toast("Comment banned successfully", {
                    action: {
                    label: <X size={16} />,
                  },
                })
                setCommentId(null)
             }
              
            }
            
        })
        
        const {mutate:handleDeleteComment,isPending:isDeleting} = useMutation({
            mutationFn:()=>deleteComment({comid:comment.com_id}),
              onSuccess:(response)=>{
              queryClient.invalidateQueries('view-trending-post')
               if(response.status === 200){
                 toast("Comment deleted successfully", {
                    action: {
                    label: <X size={16} />,
                  },
                })
                setCommentId(null)
             }
              
            }
            
        })
    
        const handleCommentState = (value)=>{
          if(value === 'ban'){
            _banComment();
          }else{
              handleDeleteComment();
          }
          
        }
        const isAdmin = roles.includes(user?.role)
        const isDeleted = comment.delete === 'deleted' && isAdmin;
        const isSuspended = comment.suspend === 'suspended' && isAdmin;

  return (
    <>
      <div className="relative flex w-full">

        {/* LEFT THREAD */}
        <div className="relative flex flex-col items-center mr-2">

          <div className="
            w-6 h-6 md:w-9 md:h-9
            rounded-full bg-pink-400 text-white
            flex items-center justify-center
            text-[8px] md:text-sm
            font-bold z-10
          ">
            {comment.client_username?.slice(0, 2)?.toUpperCase() || comment.creator_businessname?.slice(0, 2)?.toUpperCase() || 'US'}
          </div>

          {totalReplies > 0 && (
            <div className="absolute top-6 md:top-9 w-px bg-gray-300 h-full" />
          )}
        </div>

        {/* RIGHT CONTENT */}
        <div className="flex-1 min-w-0">

          {/* Bubble */}
          <div className="bg-gray-100  rounded-lg md:rounded-xl px-2 py-1.5 md:px-3 md:py-2 relative">
             {
              isAdmin&&<MoreHorizontal
                            className='cursor-pointer absolute right-3 top-1 inline-block hover:text-primary transition-colors'
                            onClick={() => handleAction(comment.com_id)}
                        />
             }
                    {commentId === ( comment.com_id) && (
                   <div className="py-2 w-[200px] rounded-xl bg-white shadow-md absolute right-2 top-8 z-30">
                  <button
                    className="w-full px-4 py-1 text-left  flex items-center gap-3 transition-colors text-red-600"
                        onClick={()=>handleCommentState('delete')}
                  >
                    <Trash2Icon size={18} className="text-red-600" />

                    <span>Delete </span>
                    {isDeleting&&<Loader2 className='ml-auto w-[max-content] animate-spin'/>}
                  </button>

                  <hr className="my-2 border-gray-200" />

                  <button
                    className="w-full px-4 py-1 text-left  flex items-center gap-3 transition-colors"
                        onClick={()=>handleCommentState('ban')}
                  >
                    <Ban size={18} />
                    <span>Ban </span>
                    {isBanPending&&<Loader2 className='ml-auto w-[max-content] animate-spin'/>}
                  </button>
                </div>
            )}

                 
            <p className="font-semibold text-[11px] md:text-sm truncate">
              {comment.client_username || comment.creator_businessname}
            </p>
              {/* <p className="text-[11px] md:text-sm text-gray-800 break-words whitespace-pre-wrap">
              {comment.body}
              
            </p> */}

            <PostDescription description={comment.body}/>
          
            
            
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3 text-[10px] md:text-xs text-gray-500 mt-1 ml-1">
            <button
              onClick={() =>
                setActiveReplyId(isReplying ? null : comment.com_id)
              }

              className="flex items-center  gap-1 cursor-pointer outline-none hover:text-pink-500"
            >
              <MessageCircle size={12} />
              Reply
            </button>

            {comment.reply_date && (
              <span>
                {formatDistanceToNow(new Date(safeDate(comment.reply_date)), {
                  addSuffix: true },
                )}
              </span>
            )}
              {
              isDeleted&&<span className='text-red-600  rounded-md bg-sred-300 text-xs'>deleted</span>
            }
              {
              isSuspended&&<span className='  rounded-md text-black text-xs'>suspended</span>
            }
          </div>

          {/* Reply Input */}
          {isReplying && (
            <div className="mt-2 relative">
              <input
                type="text"
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSubmit();
                  }
                }}
                placeholder="Write a reply..."
                className="
                  w-full border rounded-full
                  px-3 py-1.5 pr-10
                  text-[11px] md:text-sm
                  outline-none focus:ring-1 focus:ring-pink-400
                "
              />
              <button
                onClick={handleSubmit}
                className="
                  absolute right-2 top-1/2 -translate-y-1/2
                  bg-pink-500 text-white
                  p-1.5 rounded-full
                "
              >
                 {
                  isPending ? <Loader2 className=" h-4 w-4 animate-spin" />:
                <Send size={12} className='cursor-pointer' />
                }
              </button>
            </div>
          )}

          {/* ========================
              CHILDREN THREAD
          ======================== */}

          {!shouldOpenModal && totalReplies > 0 && (
            <div className=' '>
              {/* Replies container WITH thread line */}
              <div className="relative mt-3 pl-6 md:pl-8 space-y-3">

                <div className="absolute left-0 top-0 w-4 md:w-6 h-6 border-l border-b border-gray-300 rounded-bl-lg" />

                {visibleReplies?.map((child) => (
                  <CommentItem
                    key={child.com_id}
                    comment={child}
                    depth={depth + 1}
                    activeReplyId={activeReplyId}
                    setActiveReplyId={setActiveReplyId}
                  />
                ))}
              </div>

              {/* Toggle OUTSIDE thread line */}
              {remainingReplies > 0 && (
                <div className="pl-6 md:pl-8 mt-5">
                  {!showAllReplies ? (
                    <button
                      onClick={() => setShowAllReplies(true)}
                      className="text-[15px] bg-white z-50 py-5 text-pink-500 hover:underline"
                    >
                      View {remainingReplies} more repl
                      {remainingReplies > 1 ? 'ies' : 'y'}
                    </button>
                  ) : (
                    <button
                      onClick={() => setShowAllReplies(false)}
                      className="text-[15px] bg-white z-50 py-5 text-gray-500 hover:underline"
                    >
                      Hide replies
                    </button>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Depth overflow → Modal */}
          {shouldOpenModal && (
            <div className="mt-2">
              <button
                onClick={() => setOpenModal(true)}
                className="text-[11px] text-pink-500 hover:underline"
              >
                View {totalReplies} more repl
                {totalReplies > 1 ? 'ies' : 'y'}
              </button>
            </div>
          )}
        </div>
      </div>

      <RepliesModal
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
        replies={comment.children || []}
        activeReplyId={activeReplyId}
        setActiveReplyId={setActiveReplyId}
      />
    </>
  );
};

export default CommentItem;
