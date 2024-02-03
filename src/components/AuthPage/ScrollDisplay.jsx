import Marquee from "react-fast-marquee";
import ItemCard from "../ItemCard";

export default function ScrollDisplay() {
  return (
    <div className="flex">
      <Marquee autoFill pauseOnHover>
        <div className="flex m-10 rounded-xl">
          <ItemCard />
        </div>
        <div className="flex m-10 rounded-xl">
          <ItemCard />
        </div>
        <div className="flex m-10 rounded-xl ">
          <ItemCard />
        </div>
      </Marquee>
    </div>
  );
}
