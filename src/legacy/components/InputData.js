import Input from "./Input"

export default function InputData() {

    const info = [
        { dato: "city", tipo: "text" },
        { dato: "country", tipo: "text" },
        { dato: "photo", tipo: "text" },
        { dato: "population", tipo: "number" },
        { dato: "fundation", tipo: "text" },
    ]


    return (
        <div>
            <Input data={info} />
        </div>
    )
}


