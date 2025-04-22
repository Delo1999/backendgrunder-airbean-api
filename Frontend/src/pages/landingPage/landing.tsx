import "./Landing.css";

type HomePageProps = {
  handleClick: () => void;
  home?: boolean; // optional på home.
};

const HomePage: React.FC<HomePageProps> = ({ handleClick, home }) => {
  return home ? <div className="wrapper" onClick={handleClick}></div> : null;
};

export default HomePage;
