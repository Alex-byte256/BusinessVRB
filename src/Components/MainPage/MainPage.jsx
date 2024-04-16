import Container from "../Container/Container";
import css from "./MainPage.module.css"
import popcorn from "../../img/popcorn.gif"
import TopRatedFilms from "./TopRatedFilms/TopRatedFilms";
import AllFIlms from "./AllFilms/AllFIlms";

function MainPage() {
    return<>
        <section className={css.heroSection}>
            <Container>
                <div className={css.wrapHero}>
                    <div className={css.titleHeroWrap}>
                        <h1>Lorem ipsum dolor.</h1>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Culpa cupiditate doloribus ducimus eligendi illo itaque, magnam optio quam quod vero.</p>
                    </div>
                    <img width={300} src={popcorn} alt="heroImg"/>
                </div>
            </Container>
        </section>
        <TopRatedFilms/>
        <AllFIlms/>
    </>
}

export default MainPage