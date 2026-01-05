import '../../../styles/Comments.css'
import DeleteComment from './DeleteComment'
import { useEffect, useState } from 'react'
import api from '../../../api'
import axios from 'axios'
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import { useSelector } from 'react-redux';
import TextEditor from './TextEditor'

export default function Comment(props) {

    const userID = useSelector(state => state.userr.id)
    const user = useSelector(state => state.userr.role)
    const logged = useSelector(state => state.userr.logged)

    const [message, setMessage] = useState({
        comment: "",
        user: "",
        itinerary: ""
    })

    const [edit, setEdit] = useState(false);
    const [comment, setComment] = useState(props.data)

    const editChange = () => {
        setEdit(!edit);
    }

    const saveData = event => {
        event.preventDefault()
        const patchComment = {
            comment: message.comment,
            user: comment.user._id,
            itinerary: comment.itinerary._id
        }
        editChange()
        axios.put(api + `/comments/${comment._id}`, patchComment)
    }

    useEffect(() => {
        setComment(comment);
    }, [comment]);

    const userLogic = () => {
        if (logged) {
            if (comment.user._id === userID) {
                return (
                    edit ? <div className='Comment-form' >
                        <div className='Comment-andButton'>
                            {/* <textarea className='Comment-p' name="comment" onChange={handleChange} /> */}
                            <TextEditor setMessage={setMessage} />
                            <div className='Comment-ButtonContainer'>
                                <button className='Comment-Button' onClick={saveData} >send</button>
                                <DeleteComment data={comment._id} />
                            </div>
                        </div>
                    </div> :
                        <div className='Comment-form' >
                            <div className='Comment-andButton'>
                                <div className='Comment-p'>
                                    <div>
                                        {/* {`${comment.comment}`} */}
                                        <ReactMarkdown children={comment.comment} rehypePlugins={[rehypeRaw]} />
                                    </div>
                                </div>
                                <div className='Comment-ButtonContainer'>
                                    <button className='Comment-Button' onClick={editChange}>edit</button>
                                    <DeleteComment data={comment._id} />
                                </div>
                            </div>
                        </div>
                )
            }
            else if (user === 'admin') {
                return (
                    <div className='Comment-form' >
                        <div className='Comment-andButton' >
                            <div className='Comment-p'>
                                <div>
                                    {/* {`${comment.comment}`} */}
                                    <ReactMarkdown children={comment.comment} rehypePlugins={[rehypeRaw]} />
                                </div>
                            </div>
                            <div className='Comment-ButtonContainer'>
                                <DeleteComment data={comment._id} />
                            </div>
                        </div>
                    </div>
                )
            }
            else {
                return (
                    <div className='Comment-p'>
                        <div>
                            {/* {`${comment.comment}`} */}
                            <ReactMarkdown children={comment.comment} rehypePlugins={[rehypeRaw]} />
                        </div>
                    </div>
                )
            }
        }
        else {
            return (
                <div className='Comment-p'>
                    <div>
                        {/* {`${comment.comment}`} */}
                        <ReactMarkdown children={comment.comment} rehypePlugins={[rehypeRaw]} />
                    </div>
                </div>
            )
        }
    }


    return (
        <div className='Comment-container'>
            <div className='Comment-user'>
                <div className='Comment-containerimg'>
                    <img className='Comment-img' src={comment.user.photo} alt={comment.user.name} />
                </div>
            </div>
            <div className='CommentAndUserName my-2'>
                <p className='m-0 px-1 fw-bold'>{comment.user.name}</p>
                {userLogic()}
            </div>
        </div>
    )

}