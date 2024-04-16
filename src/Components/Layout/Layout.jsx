import Header from "../Header/Header";
import {Outlet} from "react-router-dom";

function Layout(props) {

    return  (
        <>
            <Header onExit={props.onExit} showLogin={props.showLogin} userName={props.userName} password={props.password} onSubmitLogin={props.onSubmitLogin} onChangeForm={props.onChangeForm}/>
            <Outlet/>
        </>
    )
}

export default Layout