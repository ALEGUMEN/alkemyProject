 import {useEffect, useState} from 'react';
 import {Link} from 'react-router-dom';
 import axios from 'axios';
 import swAlert from '@sweetalert/with-react';
 
 function Resultados () {

    let query = new URLSearchParams(window.location.search);
    let keyword = query.get('keyword');

    const [moviesResults, setMoviesResults] = useState ([]);

    useEffect(() => {
        
     const endPoint = `https://api.themoviedb.org/3/search/movie?api_key=8a9fcf981e62725f792fa17d1d2995d3&language=es-ES&query=${keyword}`;

     axios.get(endPoint).then(response => {
        const moviesArray = response.data.results;

        if(moviesArray.length === 0 ){
             swAlert(<h4>Tu búsqueda no arrojo resultados</h4>)
        }

        setMoviesResults(moviesArray);
     })
       .catch(error => console.log(error));
    }, [keyword])

    return(
      <>
       <h2>Buscaste: <em>{keyword}</em></h2>
       {moviesResults.length === 0 && <h3>No hay resultados</h3>}
       <div className='row'>
       {/*Estructura base*/}
       {
        moviesResults.map((oneMovie, idx)=>{
         return(
          <div className='col-3' key={idx}>
           <div className="card my-4">
            <img src={`https://image.tmdb.org/t/p/w500/${oneMovie.poster_path}`} className="card-img-top" alt="..."/>
             <div className="card-body">
              <h5 className="card-title">{oneMovie.title.substring(0,30)}...</h5>
               {<Link to={`/detalle?movieID=${oneMovie.id}`} className="btn btn-primary">View detail</Link>}
             </div>
            </div>
           </div>
          )
         })
       }
      </div>
      </>
    )
 }

 export default Resultados;