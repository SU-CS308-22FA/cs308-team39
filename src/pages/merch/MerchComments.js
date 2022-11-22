import React from "react"
import { useState } from "react"
import { timestamp } from "../../firebase/config"
import { useAuthContext } from "../../hooks/useAuthContext"
import { useFirestore } from "../../hooks/useFirestore"

export default function MerchComments({ merchandise }) {
  const { user } = useAuthContext()
  const { updateDocument, response } = useFirestore('merchandises')
  const [newComment, setNewComment] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault();

    const commentToAdd = {
      displayName: user.displayName,
      content: newComment,
      createdAt: timestamp.fromDate(new Date()),
      id: Math.random()
    }

    await updateDocument(merchandise.id, {
        comments: [...merchandise.data().comments, commentToAdd],
      })
      if (!response.error) {
        setNewComment('')
        console.log(merchandise.data())
        console.log(commentToAdd)
        console.log(response)
        
      }
      else if(response.error){
        console.log(response)
      }
      
  }

  return (
    <div className="merch-comments">
      <h4>Comments</h4>

      <form className="add-comment" onSubmit={handleSubmit}>
        <label>
          <span>Add new comment:</span>
          <textarea
            required
            onChange={(e) => setNewComment(e.target.value)}
            value={newComment}
          ></textarea>
        </label>
        <button className="btn">Add Comment</button>
      </form>
      <ul>
        {merchandise.data().comments.length > 0 && merchandise.data().comments.map(comment => (
          <li key={comment.id}>
            <div className="comment-author">
              <p>{comment.displayName}</p>
            </div>
            <div className="comment-date">
              <p>{/*comment.createdAt.toDate()*/}</p>
            </div>
            <div className="comment-content">
              <p>{comment.content}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}