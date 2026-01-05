import { useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import "../../../styles/TextEditor.css"


export default function TextEditor({ setMessage }) {
    const [bold, setBold] = useState(false);
    const [italic, setItalic] = useState(false);
    const [underline, setUnderline] = useState(false);
    const [strikethrough, setStrikethrough] = useState(false);

    const button = useRef(null)

    const selectBold = () => {
        setBold(!bold);
        document.execCommand('bold', false, null);
    }
    const selectItalic = () => {
        setItalic(!italic);
        document.execCommand('italic', false, null);
    }
    const selectUnderline = () => {
        setUnderline(!underline);
        document.execCommand('underline', false, null);
    }
    const selectStrikethrough = () => {
        setStrikethrough(!strikethrough);
        document.execCommand('strikethrough', false, null);
    }

    const handleChange = event => {
        const value = event.target.innerHTML
        setMessage({ comment: "<p>" + value + "</p>" })
    }



    return (
        <div className="Text-Container" >
            <div className="Text-ButtonContainer">
            </div>
            <div className="Text-AreaContainer">
                <button ref={button} className={`Text-Button ${bold ? "active" : ""} `} onClick={selectBold}><b>b</b></button>
                <button ref={button} className={`Text-Button ${italic ? "active" : ""} `} onClick={selectItalic}><i>i</i></button>
                <button ref={button} className={`Text-Button ${underline ? "active" : ""} `} onClick={selectUnderline}><u>u</u></button>
                <button ref={button} className={`Text-Button ${strikethrough ? "active" : ""} `} onClick={selectStrikethrough}><s>s</s></button>
            </div>
            <div contentEditable={true} className="Text-Area" onInput={handleChange} name="comment" ></div>
        </div>
    );
}