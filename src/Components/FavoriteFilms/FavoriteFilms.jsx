import Container from "../Container/Container";
import {useEffect, useState} from "react";
import axios from "axios";
import css from "./FavoriteFilms.module.css"
import FilmItem from "../MainPage/TopRatedFilms/FilmItem/FilmItem";
import host from "../../host/host";

function FavoriteFilms() {
    const [movies, setMovies] = useState([]);
    const [filteredMovies, setFilteredMovies] = useState([]);

    useEffect(()=>{
        axios.get(`${host}movies`).then(res =>{
            setMovies(res.data);
        }).catch(err =>{
            console.log(err)
        })
    },[])

    useEffect(() => {
        const favoritesFilm = JSON.parse(localStorage.getItem("favorite")) || [];
        const filtered = movies.filter((movie) => favoritesFilm.includes(movie.title));
        setFilteredMovies(filtered);
    }, [movies]);

    return <section className={css.favoriteSection}>
        <Container>
            {filteredMovies.length>0?<>  <h2 className={css.title}>Favorite films:</h2>
                <ul className={css.filmList}>
                    {filteredMovies.map(el  =>{
                        return <FilmItem el={el}/>
                    })}
                </ul></>:<h2>You have no favorite movies</h2>}
        </Container>
    </section>
}

export default FavoriteFilms