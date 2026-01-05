import '../../styles/Like.css'
import { useLikeAndDislikeMutation } from "../../features/itinerariesApi"
import { useState, useEffect } from "react"
import { useSelector } from 'react-redux'
import toast, { Toaster } from 'react-hot-toast';


export default function Like(props) {

    const [nroLike, setNrolike] = useState(props.itinerary.likes.length)
    const [like, setLike] = useState('white')
    const userID = useSelector( state => state.userr.id)

    let idItinerary = props.itinerary._id

    let [likeAndDislike] = useLikeAndDislikeMutation()

    useEffect(() => {
        if (props.itinerary.likes.includes(userID)) {
            setLike('red')
        }else{
          setLike('white')
        }
    }, [props.itinerary.likes.length])



    const clickLikeDislike = async () => {
        if(userID === null){
            toast.error("log in to like an itinerary",{
                duration: 3000,
                position: 'buttom-left',
            })
        } else {
            if (localStorage.getItem('token')) {
                try {
                    let res = await likeAndDislike(idItinerary)
                    if (res.data?.succes) {
                        setLike('red')
                        setNrolike(nroLike + 1)
                    } else {
                        setLike("white")
                        setNrolike(nroLike - 1)
                    }
                } catch (error) {
                    console.log(error)
                }
            }
        }
    }

    return (
        <div >
            <button className="b" onClick={clickLikeDislike}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className={like} viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z" />
                </svg>
                <p>
                    {nroLike}
                </p>
            </button>
            <Toaster />
        </div>
    )
}
