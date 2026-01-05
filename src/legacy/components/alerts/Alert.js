import '../../styles/Alert.css'
import { useEffect } from 'react'
import { useCallback } from 'react'

export default function Alert({ toastlist, setList }) {
    const list = toastlist

    const deleteToast = useCallback(id => {
        const toastListItem = toastlist.filter(e => e.id !== id);
        setList(toastListItem);
    }, [toastlist, setList]);


    useEffect(() => {
        const interval = setInterval(() => {
            if (toastlist.length) {
                deleteToast(toastlist[0].id);
            }
        }, 5000);
        return () => {
            clearInterval(interval);
        }
    }, [toastlist, deleteToast]);

    return (
        <div>
            {list.map((toast, i) => (
                <div className='Alert' key={i} style={{ backgroundColor: toast.backgroundColor }}>
                    <img className='Alert-icon' src={toast.icon} />
                    <div className='Alert-information' >
                        <h5 className='Alert-title' >{toast.title}</h5>
                        <p className='Alert-text' >{toast.description}</p>
                    </div>
                </div>
            )
            )}
        </div>
    )
}