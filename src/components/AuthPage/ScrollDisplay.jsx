import Marquee from "react-fast-marquee";
import ItemCard from "../ItemCard";
import debug from "debug";

const log = debug("catneed:component:ScrollDisplay");
localStorage.debug = "catneed:*";

export default function ScrollDisplay({ browseItems }) {
  log("browseItems %o", browseItems);
  return (
    <div className="flex">
      <Marquee autoFill pauseOnHover>
        {browseItems.map((browseItem) => (
          <ItemCard key={browseItem._id} browseItem={browseItem} />
        ))}
      </Marquee>
    </div>
  );
}
