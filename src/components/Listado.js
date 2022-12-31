import {useState, useEffect} from 'react';
import {Link, Navigate} from 'react-router-dom';
import axios from 'axios';
import swAlert from '@sweetalert/with-react';

function Listado ({addOrRemoveFromFavs}) {
    let token = sessionStorage.getItem('token');
  
    const [moviesList,setMoviesList] = useState([]);

    useEffect (() =>{
      const endPoint = 'https://api.themoviedb.org/3/discover/movie?api_key=8a9fcf981e62725f792fa17d1d2995d3&language=es-ES&page=1';
      axios.get(endPoint)
           .then(response => {
            const apiData = response.data;
            setMoviesList(apiData.results);
           })
           .catch(error =>{
              swAlert(<h2>Hubo errores, intentar más tarde</h2>)
           })
    }, [setMoviesList]);


   return (
    <>
     { !token && <Navigate to="/"/>}
    
       <div className='row'>
       {
        moviesList.map((oneMovie, idx)=>{
         return(
          <div className='col-3' key={idx}>
           <div className="card my-4">
            <img src={`https://image.tmdb.org/t/p/w500/${oneMovie.poster_path}`} className="card-img-top" alt="..."/>
            <button 
                className="favourite-btn"
                onClick={addOrRemoveFromFavs}
                data-movie-id={oneMovie.id}>🖤</button>
             <div className="card-body">
              <h5 className="card-title">{oneMovie.title.substring(0,30)}...</h5>
               <p className="card-text">{oneMovie.overview.substring(0,100)}...</p>
               <Link to={`/detalle?movieID=${oneMovie.id}`} className="btn btn-primary">View detail</Link>
            </div>
           </div>
         </div>
        )
      })
     }
     </div>
  </>
  )
};

export default Listado;