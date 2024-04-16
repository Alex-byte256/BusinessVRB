import './App.css';
import {Route, Routes} from "react-router-dom";
import Layout from "./Components/Layout/Layout";
import MainPage from "./Components/MainPage/MainPage";
import FavoriteFilms from "./Components/FavoriteFilms/FavoriteFilms";
import AddNew from "./Components/Add new/AddNew";
import {useEffect, useState} from "react";
import axios from "axios";
import MovieDetail from "./Components/MovieDetail/MovieDetail";
import host from "./host/host";

function App() {
    const [movieList,setMovieList] = useState([])

    useEffect(()=>{
        const favorite = localStorage.getItem("favorite")
        if(!favorite){
            localStorage.setItem("favorite","[]")
        }

        axios.get(`${host}movies`).then(res =>{
            setMovieList(res.data)
            console.log(res.data)
        }).catch(err =>{
            console.log(err)
        })
    },[])

  return (
    <div className="App">
        <Routes>
            <Route path={"*"} element={<Layout/>}>
                <Route index element={<MainPage/>}></Route>
                <Route path={"Favorite"} element={<FavoriteFilms/>}></Route>
                <Route path={"addNew"} element={<AddNew/>}></Route>
                {movieList.map(el=>{
                    return <Route path={`movie/${el.id}`} element={<MovieDetail el={el} />}></Route>
                })}
            </Route>
        </Routes>
        {/*<MovieList/>*/}
    </div>
  );
}

export default App;
