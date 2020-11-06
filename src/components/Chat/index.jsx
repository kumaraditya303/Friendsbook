import classnames from 'classnames';
import React, { useEffect, useState } from 'react';
import style from './Chat.module.scss';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
function Chat({ user }) {
  const [message, setMessage] = useState('');

  useEffect(() => {
    console.log(user);
  }, []);
  return (
    <div className={style.container}>
      <div className={style.sidebar}>
        <div className={style.profile}>
          <img src={user.image} alt="Avatar" />
          <h2>
            {user.first_name} {user.last_name}
          </h2>
          <small>{user.email}</small>
        </div>
        <ul>
          <li>
            <a href="/">Test 1</a>
          </li>
          <li>
            <a href="/">Test 2</a>
          </li>
        </ul>
      </div>
      <div className={style.chats}>
        <div className={style.avatar}>
          <img
            src="https://www.w3schools.com/howto/img_avatar.png"
            alt="avatar"
          />
          <div className={style.avatar__username}>
            <h2>Test User</h2>
            <small>Last Active...</small>
          </div>
        </div>
        <div className={style.chat__container}>
          <div className={classnames(style.chat, style['chat--opposite'])}>
            <img
              src="https://www.w3schools.com/howto/img_avatar.png"
              alt="avatar"
            />
            <div className={style.chat__user}>
              <h3>Test User</h3>
              <small>{new Date().toUTCString()}</small>
              <p>Hello World</p>
            </div>
          </div>
          <div className={classnames(style.chat, style['chat--opposite'])}>
            <img
              src="https://www.w3schools.com/howto/img_avatar.png"
              alt="avatar"
            />
            <div className={style.chat__user}>
              <h3>Test User</h3>
              <small>{new Date().toUTCString()}</small>
              <p>Hello World</p>
            </div>
          </div>
          <div className={classnames(style.chat, style['chat--opposite'])}>
            <img
              src="https://www.w3schools.com/howto/img_avatar.png"
              alt="avatar"
            />
            <div className={style.chat__user}>
              <h3>Test User</h3>
              <small>{new Date().toUTCString()}</small>
              <p>Hello World</p>
            </div>
          </div>
          <div className={classnames(style.chat, style['chat--opposite'])}>
            <img
              src="https://www.w3schools.com/howto/img_avatar.png"
              alt="avatar"
            />
            <div className={style.chat__user}>
              <h3>Test User</h3>
              <small>{new Date().toUTCString()}</small>
              <p>Hello World</p>
            </div>
          </div>
          <div className={classnames(style.chat, style['chat--opposite'])}>
            <img
              src="https://www.w3schools.com/howto/img_avatar.png"
              alt="avatar"
            />
            <div className={style.chat__user}>
              <h3>Test User</h3>
              <small>{new Date().toUTCString()}</small>
              <p>Hello World</p>
            </div>
          </div>
          <div className={style.chat}>
            <img
              src="https://www.w3schools.com/howto/img_avatar.png"
              alt="avatar"
            />
            <div className={style.chat__user}>
              <h3>Test User</h3>
              <small>{new Date().toUTCString()}</small>
              <p>Hello World</p>
            </div>
          </div>
        </div>
        <form className={style.message}>
          <input
            type="text"
            name="message"
            placeholder="Write something"
            value={message}
            required
            onChange={(event) => {
              setMessage(event.target.value);
            }}
          />
        </form>
      </div>
    </div>
  );
}

Chat.propTypes = {
  user: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({ user: state.auth.user });

export default connect(mapStateToProps)(Chat);
