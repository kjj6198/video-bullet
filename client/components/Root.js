import React from 'react';
import { connect } from 'react-redux';
import { hot } from 'react-hot-loader'; // eslint-disable-line
import BulletVideo from './Video';
import BulletCanvas from './BulletCanvas';

const Root = () =>
  (
    <div>
      <BulletCanvas />
    </div>
  );

export default hot(module)(connect()(Root));
