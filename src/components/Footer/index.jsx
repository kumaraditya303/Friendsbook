import React, { Component } from "react";
import styles from "./style.module.scss";

class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="container">
        <hr className={styles.hr} />
        <footer>
          <p>&copy; {new Date().getFullYear()} - Friendsbook</p>
        </footer>
      </div>
    );
  }
}
export default Footer;
