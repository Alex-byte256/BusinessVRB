import css from "./FilmItem.module.css";
import posterNotFound from "../../../../img/posterNotFound.png";
import star from "../../../../img/star.png";
import {NavLink} from "react-router-dom";

function FilmItem({el}) {
    return  <li className={css.filmItem}> <NavLink to={`/movie/${el.id}`}><div className={css.imgWrap}>
        <img height={375} width={200} src={el.image}  onError={(e) => { e.target.src = posterNotFound }} alt="filmPoster"/>
        <div className={css.ratingWrap}><img width={20} src={star} alt="star"/> <span>{el.rating}</span></div>
    </div></NavLink>
        <div className={css.filmInfoWrap}>
            <h3 className={css.filmName}>{el.title}</h3>
            <p className={css.filmDate}>{new Date(el.release_date).getFullYear()}</p>
        </div>
    </li>
}

export default FilmItem