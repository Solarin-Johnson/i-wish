import { Outlet } from "react-router-dom";
import PopOver from "../components/PopOver";
import { useUser } from "../context/UserContext";
import { WishCardFull } from "../components/wishPreview";
import Alert from "../components/Alert";

export default function LandingLayout() {
  const { download, msg, setMsg } = useUser();

  return (
    <div className="container">
      <Outlet />
      {download && (
        <PopOver title="Welcome!">
          <WishCardFull {...download} />
        </PopOver>
      )}

      {msg && <Alert message={msg} onClose={() => setMsg(false)} />}
    </div>
  );
}
