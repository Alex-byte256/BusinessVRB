import Container from "../Container/Container";
import {useEffect, useState} from "react";
import axios from "axios";
import css from "./MovieList.module.css"
import posterNotFound from "../../img/posterNotFound.png"

function MovieList() {
    const [movieList,setMovieList] = useState([])

    useEffect(()=>{
        axios.get("http://localhost:3001/movies").then(res =>{
            setMovieList(res.data)
            console.log(res.data)
        }).catch(err =>{
            console.log(err)
        })
    },[])

    return(
        <div>
            <Container>
                <h2>MovieList</h2>
                <ul className={css.movieList}>
                    {movieList.map(el => {
                        return <li key={el.id} className={css.movieItem}>
                            <div className={css.movieImgWrap}>
                                <img height={375} width={250} src={el.image}  onError={(e) => { e.target.src = posterNotFound }} alt="filmPoster"/>
                                <div className={css.filmInfoBox}>
                                    <h2>{el.title}</h2>
                                </div>
                            </div>
                        </li>
                    })}
                </ul>
            </Container>
        </div>
    )
}

export default MovieList