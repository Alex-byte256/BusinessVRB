import Container from "../Container/Container";
import {useState} from "react";
import css from "./AddNew.module.css"
import axios from "axios";
import host from "../../host/host";
import {useNavigate} from "react-router-dom";


function AddNew() {
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        rating: '',
        release_date: '',
        genre: [],
        actors: [],
        director: '',
        image: ''
    });

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
            axios.post(`${host}movies`, formData).then(()=>{
                setFormData({
                    title: '',
                    description: '',
                    rating: '',
                    release_date: '',
                    genre: [],
                    actors: [],
                    director: '',
                    image: ''
                });
                navigate("/")
            }).catch(err=>{
                console.log(err)
            })
        }


    return <section className={css.formSection}>
        <Container>
            <form className={css.Form} onSubmit={handleSubmit}>
                <label>Title:</label>
                <input placeholder={"Title..."} type="text" name="title" value={formData.title} onChange={handleChange} required />
                <label>Description:</label>
                <textarea placeholder={"Describe movie...."} name="description" value={formData.description} onChange={handleChange} required />
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
                <button type="submit">Add Movie</button>
            </form>
        </Container>
    </section>
}

export default AddNew