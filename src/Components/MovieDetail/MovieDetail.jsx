import css from "./MovieDetail.module.css"
import Container from "../Container/Container";
import posterNotFound from "../../img/posterNotFound.png";
import deleteIcon from "../../img/delete.png"
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import host from "../../host/host";


function MovieDetail({el}) {
    const navigate = useNavigate()
    const [isFavorite,setIsFavorite] = useState(false)
    const [showEditForm,setShowEditForm] = useState(false)
    const [formData, setFormData] = useState({
        title: el.title,
        description: el.description,
        rating: el.rating,
        release_date: el.release_date,
        genre: [],
        actors: el.actors,
        director: el.director,
        image: el.image
    });

    useEffect(()=>{
        const favoritesFilm = JSON.parse(localStorage.getItem("favorite"))
        if(favoritesFilm.includes(el.title)){
            setIsFavorite(true)
        }
    },[])

    const onDelete = () =>{
        axios.delete(`${host}movies/${el.id}`).then(res=>{
            navigate('/')
        }).catch(err=>{
            console.log(err)
        })
    }

    const addToFavorite = () =>{
        const favoritesFilm = JSON.parse(localStorage.getItem("favorite"))
        if(favoritesFilm.includes(el.title)){
            return
        }
        favoritesFilm.push(el.title)
        localStorage.setItem("favorite",JSON.stringify(favoritesFilm))
        setIsFavorite(true)
    }

    const onRemoveFromFavorite = () =>{
        const favoritesFilm = JSON.parse(localStorage.getItem("favorite"))
        const  newList = favoritesFilm.filter(item=> item !== el.title)
        localStorage.setItem("favorite",JSON.stringify(newList))
        setIsFavorite(false)
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleGenreChange = (e) => {
        const { value } = e.target;
        setFormData({
            ...formData,
            genre: [...formData.genre, value]
        });
    };

    const handleActorChange = (e) => {
        const { value } = e.target;
        setFormData({
            ...formData,
            actors: [ ...value.split(",")]
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put(`${host}movies/${el.id}`, formData).then(()=>{
            window.location.reload()
        }).catch(err=>{
            console.log(err)
        })
    }

    return (
        <section>
            <Container>
                <div className={css.filmCard}>
                    <div className={css.imgWrap}>
                        <img src={el.image}  onError={(e) => { e.target.src = posterNotFound }} alt="filmPoster" />
                        {isFavorite?<button onClick={()=>onRemoveFromFavorite()} className={css.favoriteBtnRemove}>Remove from favorite.</button> : <button onClick={()=>addToFavorite()} className={css.favoriteBtn}>Add to favorite</button>}
                    </div>
                    <div className={css.filmInfo}>
                        <div className={css.nameInfo}>
                            <h2>{el.title}</h2>
                            <div className={css.date}><span>Release date: {el.release_date}</span>
                                <span>Rating: {el.rating}</span>
                            </div>
                        </div>
                        <div className={css.description}>
                            <h3>Description</h3>
                            <p>{el.description}</p>
                        </div>
                        <div className={css.actors}>
                            <h3>Actors:</h3>
                            <p>{el.actors.join(", ")}.</p>
                        </div>
                        <div className={css.genre}>
                            <h3>Genre:</h3>
                            <p> {el.genre.join(", ")}.</p>
                        </div>
                        <div className={css.director}>
                            <h3>Director: </h3>
                            <p>{el.director}</p>
                        </div>
                    </div>
                    <img onClick={onDelete} width={40} className={css.deleteIcon} src={deleteIcon} alt="deleteIcon"/>
                </div>
                <button onClick={()=>setShowEditForm(!showEditForm)} className={css.btnEdit}>{!showEditForm?"Edit Movie":"Close edit form"}</button>
                {showEditForm&&  <form className={css.Form} onSubmit={handleSubmit}>
                    <label>Title:</label>
                    <input placeholder={"Title..."} type="text" name="title" value={formData.title} onChange={handleChange} required />
                    <label>Description:</label>
                    <textarea rows={5} placeholder={"Describe movie...."} name="description" value={formData.description} onChange={handleChange} required />
                    <label>Rating:</label>
                    <input placeholder={"0.0"} type="number" name="rating" value={formData.rating} onChange={handleChange} min="0" max="10" step="0.1" required />
                    <label>Release Date:</label>
                    <input type="date" name="release_date" value={formData.release_date} onChange={handleChange} required />
                    <label>Genre:</label>
                    <select onChange={handleGenreChange} required>
                        <option value="">Select Genre</option>
                        <option value="drama">Drama</option>
                        <option value="crime">Crime</option>
                    </select>
                    <label>Actors:</label>
                    <input placeholder={"Actor1, Actor2....."} type="text" name="actors" value={formData.actors.join(",")} onChange={handleActorChange} required />
                    <label>Director:</label>
                    <input placeholder={"Director..."} type="text" name="director" value={formData.director} onChange={handleChange} required />
                    <label>Image URL:</label>
                    <input placeholder={"https://....."} type="url" name="image" value={formData.image} onChange={handleChange} required />
                    <button type="submit">Edit</button>
                </form>}
            </Container>
        </section>
    )
}

export default MovieDetail