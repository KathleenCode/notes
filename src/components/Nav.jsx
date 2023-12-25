import NavStyles from "./Nav.module.css";
import { Link } from "react-router-dom";

export default function Nav() {

  return (
    <>
    <nav className={NavStyles.nav}>
        <span className={NavStyles.logo}>LogoName</span>
            <ul className={NavStyles.menu}>
                <li>
                  <Link to="/create-post">New Post</Link>
                </li>
            </ul>
    </nav>
    </>
  )
}
