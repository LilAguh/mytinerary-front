import { usePostCommentMutation } from '../../../features/commentsApi'
import { useState } from 'react'
import { useSelector } from 'react-redux';
import TextEditor from './TextEditor';

export default function CreateComment(props) {

    const [newComment] = usePostCommentMutation()

    const user = useSelector(state => state.userr)
    const itineraryId = props.data

    const [message, setMessage] = useState({
        comment: "",
        user: "",
        itinerary: ""
    })

    const handleChange = event => {
        const { name, value } = event.target
        setMessage({ ...message, [name]: value })
    }

    const saveData = event => {
        event.preventDefault()
        const patchComment = {
            comment: message.comment,
            user: user.id,
            itinerary: itineraryId
        }
        newComment(patchComment)

        setMessage({
            comment: "",
            user: "",
            itinerary: ""
        })
    }


    return (
        <div className='Comment-form'>
            <div className='Comment-andButton'>
                <TextEditor setMessage={setMessage} />
                <button className='Comment-Button' onClick={saveData}>Post</button>
            </div>
        </div>
    )

}