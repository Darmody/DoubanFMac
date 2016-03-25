import React from 'react';
import Dropdown from 'react-dropdowns';
import { Link } from 'react-router';
import cx from 'classnames';
import { Signin } from 'containers';
import styles from './Navbar.scss';

function UserItem({ currentUser = {}, showSigninModal, logoutUser }) {
  if (currentUser.id !== 0) {
    return (
      <div>
        <Dropdown
          className={styles.dropdown}
          toggle={
            <button className={styles.userLink} >
              { currentUser.name }
              <i className={cx('material-icons')} > keyboard_arrow_down </i>
              <Signin />
            </button>
          }
        >
          <Dropdown.Item label="退出" onClick={logoutUser} />
        </Dropdown>
      </div>
    );
  }

  return (
    <button className={styles.userLink} onClick={showSigninModal} >
      登录
      <i className={cx('material-icons')} > eject </i>
      <Signin />
    </button>
  );
}

export default ({ currentUser, currentLocation, showSigninModal, logoutUser }) => {
  const activeIcon = (<i className="material-icons" > volume_up </i>);
  return (
    <nav className={styles.navbar} >
      <div className={styles.navItems} >
        <button className="navItem disabled" > 更多 MHz </button>
        <Link to="channels/0" className="navItem" >
          私人 MHz
          {
            (currentLocation === '/channels/0' || currentLocation === '/') && activeIcon
          }
        </Link>
        <Link to="favorite" className="navItem" >
          红心 MHz
          {
            (currentLocation === '/favorite') && activeIcon
          }
        </Link>
      </div>
      <div className={styles.userItem} >
        <UserItem
          currentUser={currentUser}
          showSigninModal={showSigninModal}
          logoutUser={logoutUser}
        />
      </div>
    </nav>
  );
};
