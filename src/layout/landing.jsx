import { Outlet } from "react-router-dom";
import PopOver from "../components/PopOver";
import { useUser } from "../context/UserContext";
import { WishCardFull } from "../components/wishPreview";

export default function LandingLayout() {
  const { download } = useUser();
  return (
    <div className="container">
      <Outlet />
      {download && (
        <PopOver title="Welcome!">
          <WishCardFull {...download} />
        </PopOver>
      )}
    </div>
  );
}
