import { X } from 'lucide-react';
import CommentItem from './CommentItem';
import React from 'react';


const RepliesModal = ({ isOpen, onClose, replies, onReply, activeReplyId, setActiveReplyId }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center  p-4">
      <div className='bg-white p-5 rounded-xl  shadow-xl w-full max-w-2xl max-h-[80vh]'>
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold text-lg">More Replies</h3>
          <button onClick={onClose}>
              <X className='cursor-pointer h-16 w-16 scale-[0.5] transition-all duration-300 hover:scale-[0.7]'/>
          </button>
        </div>
          <div className="bg-white  overflow-y-auto  max-h-[50vh] relative">


        <div className="space-y-4">
          {replies.map((reply) => (
            <CommentItem
              key={reply.com_id}
              comment={reply}
              depth={0}
              onReply={onReply}
              activeReplyId={activeReplyId}
              setActiveReplyId={setActiveReplyId}
              disableLimit // 👈 important
            />
          ))}
        </div>
      </div>
      </div>
    </div>
  );
};

export default RepliesModal;
