import Marquee from "react-fast-marquee";
import DonateCard from "../DonateCard";
import debug from "debug";

const log = debug("catneed:component:ScrollDisplay");
localStorage.debug = "catneed:*";

export default function ScrollDisplay({ browseItems }) {
  log("browseItems %o", browseItems);
  return (
    <div className="flex h-dvh">
      <Marquee autoFill pauseOnHover>
        {browseItems.map((browseItem) => (
          <div className="m-5" key={browseItem._id}>
            <DonateCard browseItem={browseItem} />
          </div>
        ))}
      </Marquee>
    </div>
  );
}
