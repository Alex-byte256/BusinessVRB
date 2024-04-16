import Container from "../../Container/Container";
import css from "./TopRatedFilms.module.css"
import {useEffect, useState} from "react";
import axios from "axios";
import posterNotFound from "../../../img/posterNotFound.png";
import star from "../../../img/star.png"
import FilmItem from "./FilmItem/FilmItem";

function TopRatedFilms() {
    const [topRatedList,setTopRatedList] = useState([])

    useEffect(()=>{

            axios.get("http://localhost:3001/movies?_sort=-ratingc&_limit=5").then(res =>{
                setTopRatedList(res.data)
                console.log(res.data)
            }).catch(err =>{
                console.log(err)
            })
    },[])

    return <section className={css.topRatedSection}>
        <Container>
            <h2 className={css.topTatedTitle}>Top rated films</h2>
            <ul className={css.topRatedList}>
                {topRatedList.map(el=>{
                    return <FilmItem el={el}/>
                })}
            </ul>
        </Container>
    </section>
}

export default TopRatedFilms