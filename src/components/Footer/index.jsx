import React from 'react';
import styles from './style.module.scss';
const Footer = (props) => (
	<div className="container">
		<hr className={styles.hr} />
		<footer>
			<p>&copy; {new Date().getFullYear()} - Friendsbook</p>
		</footer>
	</div>
);

export default Footer;
