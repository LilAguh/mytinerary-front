import '../../styles/Comments.css'
import { useEffect, useState } from 'react'
import Comment from './comments/Comment'
import CreateComment from './comments/CreateComment'
import { useGetCommentQuery } from '../../features/commentsApi'
import { useSelector } from 'react-redux'


export default function Comments(props) {

    const user = useSelector(state => state.userr)
    const logged = useSelector(state => state.userr.logged)

    const id = props.data._id

    const [open, setOpen] = useState(false)

    const HandleOpen = () => {
        if (open) {
            setOpen(false)
        } else {
            setOpen(true)
        }
    }

    const { data: comments } = useGetCommentQuery(id)

    const [comment, setComment] = useState(comments)

    useEffect(() => {
        setComment(comment);
    }, [comment]);

    const userLogic = () => {
        if (logged) {
            return (
                <div className='Comment-container'>
                    <div className='Comment-user'>
                        <div className='Comment-containerimg'>
                            <img className='Comment-img' src={user.photo} alt="user" />
                        </div>
                        <p>{user.name}</p>
                    </div>
                    <CreateComment data={id} />
                </div>
            )
        }
        else {
            return <div></div>
        }
    }



    return (

        <div className='Comment-full'>
        <div className='commentTitle'>
            <h3 className='Comment-h3' onClick={HandleOpen}>See comments</h3>
            <svg onClick={HandleOpen} className="commetSvg" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
            </svg>
        </div>
        <div className='C' >
            {
                open
                    ?
                    <div className="Comment-Container2">
                        {comments?.map(comments => <Comment data={comments} key={comments._id} name={comments._id} />)}
                        {userLogic()}
                    </div>
                    : null
            }
        </div>
    </div>
    )

}