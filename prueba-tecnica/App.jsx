import { useEffect, useState } from "react"

const CAT_ENDPOINT_RANDOM_FACT = 'https://catfact.ninja/fact'
//const CAT_ENDPOINT_IMAGE_URL = `https://cataas.com/cat/says/${firstWord}`

export function App(){
    const[fact,setFact] = useState()
    const[imageUrl,setImageUrl] = useState()

    useEffect(() => {
        fetch(CAT_ENDPOINT_RANDOM_FACT)
        .then(res => res.json())
        .then(data => {
            const {fact} = data
            setFact(fact)

            const firstWord = fact.split(' ')[0]
            console.log(firstWord)
            //console.log(`https://cataas.com/cat/says/${firstWord}`)

            fetch(`https://cataas.com/cat/says/${firstWord}`)
                .then(res =>{
                    res.json()
                    console.log(res, 'json')
                })
                .then(response => {
                    console.log("Holi");
                    console.log(response.url, "url");
                  //  setImageUrl(`https://cataas.com${url}`);
                    console.log("Nuevo valor de imageUrl:", imageUrl);

                    // Puedes realizar acciones adicionales aquí, ya que este bloque se ejecuta después de que el estado se haya actualizado.
                })
                .catch(error => {
                    console.error("Error al obtener la imagen:", error);
                });
        });
        
    }, [])



    return (
        <main>
            <h1>App gatos</h1>
            {fact && <p>{fact}</p>}
            {imageUrl && <img src={imageUrl}/>}
        </main>
    )
}