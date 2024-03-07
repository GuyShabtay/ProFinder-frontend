import React, { useState } from 'react';
import { BsArrowRight } from 'react-icons/bs';


import './CommentSection.css'

const CommentSection = ({comments,setComments,newComment,setNewComment,savedComment,setSavedComment,handleComment}) => {
  

  const handleInputChange = (event) => {
    setNewComment(event.target.value);
  };

  const handleAddComment = () => {
    if (newComment.trim() !== '') {
      setComments([...comments, newComment]);
      setSavedComment(newComment);
      setNewComment('');
      handleComment();
    }
  };

  return (
    <div>
      <h2>Comments</h2>
      <div>
        <textarea
          placeholder="Write a comment..."
          value={newComment}
          onChange={handleInputChange}
        />
        <button onClick={handleAddComment}>

<BsArrowRight className='arrow-right'/>
        </button>
      </div>
      <div>
        {comments.map((comment, index) => (
          <div key={index}>
            <p>{comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentSection;