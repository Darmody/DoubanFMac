import React from 'react';
import cx from 'classnames';
import { Signin } from 'containers';
import styles from './Navbar.scss';

function UserItem({ currentUser = {}, showSigninModal }) {
  const linkLabel = currentUser.name || '登录';
  const linkIcon = currentUser.id ? 'keyboard_arrow_down' : 'eject';

  return (
    <a href="#" className={styles.userLink} onClick={showSigninModal} >
    { linkLabel }
    <i className={cx('material-icons')} > { linkIcon } </i>
    <Signin />
    </a>
  );
}

export default ({ currentUser, showSigninModal }) => {
  return (
    <nav className={styles.navbar} >
      <a href="#logo" className={styles.navLogo} > Logo </a>
      <div className={styles.navItems} >
        <a href="#私人兆赫" className="navItem" > 私人兆赫 </a>
        <a href="#私人歌单" className="navItem" > 私人歌单 </a>
        <a href="#红心歌单" className="navItem" > 红心歌单 </a>
      </div>
      <div className={styles.userItem} >
        <UserItem currentUser={currentUser} showSigninModal={showSigninModal} />
      </div>
    </nav>
  );
};
