import { useEffect, useState } from "react"

export function App(){
    const[fact,setFact] = useState('asjdoasd')

    useEffect(() => {
        fetch('https://catfact.ninja/fact')
        .then(res => res.json())
        .then(data => setFact(data.fact))
    }, [])

    return (
        <main>
            <h1>App gatos</h1>
            <p>{fact}</p>
        </main>
    )
}