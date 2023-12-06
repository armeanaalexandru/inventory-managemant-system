import { NavLink } from "react-router-dom";
import styles from "./Navigation.module.css";

export function Nav() {
  return (
    <div className={styles.mainNavigation}>
      <ul className={styles.navigationItems}>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/inventory">Inventory</NavLink>
        </li>
        <li>
          <NavLink to="/dashboard">Dashboard</NavLink>
        </li>
        <li>
          <NavLink to="/log-in">Log In</NavLink>
        </li>
      </ul>
    </div>
  );
}
