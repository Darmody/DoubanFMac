import React from 'react';
import Dropdown from 'react-dropdowns';
import { Link } from 'react-router';
import cx from 'classnames';
import { Signin } from 'containers';
import styles from './styles.scss';

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

function NavItem({ title, link, active }) {
  const activeIcon = (<i className="material-icons" > volume_up </i>);
  return (
    <Link to={link} className="navItem" >
      { title }
      { active && activeIcon }
    </Link>
  );
}

export default ({ currentUser, currentLocation, showSigninModal, logoutUser }) => {
  return (
    <nav className={styles.navbar} >
      <div className={styles.navItems} >
        <NavItem
          title="私人 MHz"
          link="/channels/0"
          active={currentLocation === '/' || currentLocation === '/channels/0' }
        />
        <NavItem
          title="每日私人歌单"
          link="/daily"
          active={currentLocation === '/daily'}
        />
        <NavItem
          title="红心 MHz"
          link="/favorite"
          active={currentLocation === '/favorite'}
        />
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
