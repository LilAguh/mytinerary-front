import { useDeleteCommentMutation } from '../../../features/commentsApi'
import '../../../styles/Comments.css'

export default function DeleteComment(props) {
    const [deleteComment] = useDeleteCommentMutation()
    const id = props.data

    const handleDelete = () => {
        deleteComment(id)
    }

    return (
        <div>
            <button className='Comment-Button' onClick={handleDelete}>delete</button>
        </div>
    )

}