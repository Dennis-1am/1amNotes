import "./template-styles/Layout.css";
import { Outlet } from "react-router-dom";
import HomeIcon from "../assets/icons8-home.svg";
import SearchIcon from "../assets/icons8-search.svg";
import LightBulb from "../assets/icons8-lightbulb.svg";
import NewPost from "../assets/icons8-new-post-50.png";
import { useState, useEffect } from "react";
import OverlayCreate from "./Overlay.jsx";
import dbFunctions from "../database/firebase_func.js";
import { useNavigate } from "react-router-dom";

function Layout() {

    const navigate = useNavigate();

    const [time, setTime] = useState(new Date().toLocaleTimeString());
    const [showSearch, setShowSearch] = useState(false);
    const [searchText, setSearchText] = useState("");
    const [reqSearch, setReqSearch] = useState(false);
    const [reqNewPost, setReqNewPost] = useState(false);
    const [searchResult, setSearchResult] = useState([]);

    useEffect(() => {

        dbFunctions.searchNotes(searchText).then((res) => {
            if(res != null) {
                setSearchResult([...res]);
            } else {
                setSearchResult("No Results Found");
            }
        } , (err) => {
            console.log(err);
        });
        
      }, [searchText]);
      

    // this is the function that will be called when the user hits enter to search with the text in the search bar
    useEffect(() => { 
        if(reqSearch == true) {
            console.log("Requesting Search", searchText);
            setReqSearch(false);
        }
    } , [reqSearch, searchText]);

    const handleMenuOptions = (option) => {
        switch(option) {
            case "Home":
                setShowSearch(false);
                setReqNewPost(false);
                navigate("/");
                // refresh page here
                
                break;
            case "Search":
                setShowSearch((prevReqSearch) => !prevReqSearch);
                setReqSearch((prevReqSearch) => !prevReqSearch);
                setReqNewPost(false);
                break;
            case "Explore":
                setShowSearch(false);
                setReqNewPost(false);
                break;
            case "New Note":  // <-- Should be "New Note"
                setShowSearch(false);
                setReqNewPost((prevReqNewPost) => !prevReqNewPost);
                console.log("New Note", reqNewPost);
                navigate("/")
                break;
            default:
                setShowSearch(false);
                setReqNewPost(false);
                break;
        }
    }

    useEffect(() => {
        setInterval(() => {
            setTime(new Date().toLocaleTimeString());
        }, 10);
    }, []);

    return (
        <div className="OuterLayout">
            <div className={`menu ${showSearch ? "menu-width-transition" : ""}`}>
                <div className="header">
                    <h1 id="appName"> 1am Notes</h1>
                    <h2 id="time"> {time} </h2>
                </div>
                <div className="menu-option" onClick={() => handleMenuOptions("Home")}>
                    <img src={HomeIcon} alt="Home Icon" className="icon" />
                    <h3> Home </h3>
                </div>
                <div className="menu-option" onClick={() => handleMenuOptions("Search")}>
                    <img src={SearchIcon} alt="Search Icon" className="icon" />
                    <h3> Search </h3>
                </div>
                <div className="menu-option" onClick={() => handleMenuOptions("Explore")}>
                    <img src={LightBulb} alt="Light Bulb Icon" className="icon lightbulb" />
                    <h3> Explore </h3>
                </div>
                <div className="menu-option" onClick={() => handleMenuOptions("New Note")}>
                    <img src={NewPost} alt="Light Bulb Icon" className="icon lightbulb" />
                    <h3> New Note </h3>
                </div>
            </div>
            <div>
                {
                    <div className={`${showSearch ? "overlay-transition" : "overlay"}`}>
                        <div className={`${showSearch ? "search-bar-transition" : "search-bar"}`}>
                            < input type="text" placeholder="Search" onChange={ (e) => {
                                    setSearchText(e.target.value);
                                }
                            } className={`${showSearch ? "search-input-transition" : "search-input"}`} />
                        </div>
                        <div className={`${showSearch ? "search-result" : "show-result-transition"}`}>
                            {
                                showSearch && searchResult.map((post) => (
                                    <div className="search-result-item" key={post.id}>
                                        <h3> {post.title} </h3>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                }
            </div>
            <div>
                {
                    reqNewPost ? <OverlayCreate /> : null
                }
            </div>
            <div className="app-space">
                <Outlet />
            </div>
        </div>
    );
}

export default Layout;