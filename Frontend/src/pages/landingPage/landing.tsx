import "./Landing.css";

type HomePageProps = {
  handleClick: () => void;
  home: boolean;
};

const HomePage: React.FC<HomePageProps> = ({ handleClick, home }) => {
  return home ? <div className="wrapper" onClick={handleClick}></div> : null;
};

export default HomePage;
