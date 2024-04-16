import css from "./AllFilms.module.css"
import Container from "../../Container/Container";
import {useEffect, useState} from "react";
import axios from "axios";
import FilmItem from "../TopRatedFilms/FilmItem/FilmItem";
import host from "../../../host/host";


function AllFilms() {
    const [movieList,setMovieList] = useState([])
    const [filteredMovieList, setFilteredMovieList] = useState([]);
    const [searchParams,setSearchParams] = useState("")


    useEffect(()=>{
        axios.get(`${host}movies`).then(res =>{
            setMovieList(res.data)
            setFilteredMovieList(res.data)
        }).catch(err =>{
            console.log(err)
        })
    },[])

    const handleSearch = (e) => {
        setSearchParams(e.target.value.toLowerCase());
        const filteredMovies = movieList.filter(movie => movie.title.toLowerCase().includes(e.target.value.toLowerCase()));
        setFilteredMovieList(filteredMovies);
    }

    return <section className={css.allFilmsSection}>
        <Container>
            <div className={css.headSection}>
                <h2 className={css.allFilmsTitle}>All films</h2>
                <input className={css.inputName} type="text" placeholder={"Type movie name..."} value={searchParams}
                       onChange={handleSearch}/>
            </div>
            <div>
                <ul className={css.allFIlmList}>
                    {filteredMovieList.map(el =>{
                        return <FilmItem key={el.id} el={el}/>
                    })}
                </ul>
            </div>
        </Container>
    </section>
}

export default AllFilms