import React from "react";
import "./Home.css";
import Navbar from "../../components/Navbar/Navbar";
import hero_banner from "../../assets/hero_banner.jpg";
import hero_title from "../../assets/hero_title.png";
import play_icon from "../../assets/play_icon.png";
import info_icon from "../../assets/info_icon.png";
import TitileCards from "../../components/TitileCards/TitileCards";
import Footer from "../../components/Footer/Footer";

const Home = () => {
  return (
    <div className="home">
      <Navbar />
      <div className="hero">
        <img src={hero_banner} alt="hero" className="banner-img" />
        <div className="hero-caption">
          <img src={hero_title} alt="hero" className="caption-img" />
          <p>
            Movies move us like nothing else can, whether they’re scary, funny,
            dramatic, romantic or anywhere in-between. So many titles, so much
            to experience.
          </p>
          <div className="hero-btns">
            <button className="btn">
              {" "}
              <img src={play_icon} alt=""></img>Play
            </button>
            <button className="btn dark-btn">
              {" "}
              <img src={info_icon} alt=""></img>More Info
            </button>
          </div>
          <TitileCards/>
        </div>
      </div>
      <div className="more-cards">
      <TitileCards title={"Blockbuster Movies"} category={"top_rated"}/>
      <TitileCards title={"Only on Netflix"} category={"popular"}/>
      <TitileCards title={"Upcoming"} category={"upcoming"}/>
      <TitileCards title={"Top Pics for you "} category={"now_playing"}/>
      </div>
      <Footer/>
    </div>
  );
};

export default Home;
