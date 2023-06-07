import { useEffect, useState } from "react";

function TopArtists(){
    // const [userTopArtists, setUserTopArtists] = useState<any[]>();

    // useEffect(() =>{
    //     fetch("http://localhost:8080/api/get-top-artists")
    //     .then(response => response.json())
    //     .then(data => {
    //         console.log(data)
    //         setUserTopArtists(data)
    //     })
    // },  []);

    // return (
    //     <div>
    //         {userTopArtists ? (
    //             userTopArtists.map((artistResult) => {
    //                 return <h1 key={artistResult.name}>{artistResult.name}</h1>
    //             })
    //         ):
    //         (
    //             <h1>LOADING</h1>
    //         )}
    //     </div>
    // )

    return <h1>hi</h1>
}

export default TopArtists;