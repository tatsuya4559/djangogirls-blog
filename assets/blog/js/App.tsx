import React, { useState } from 'react';
import classnames from 'classnames';
import styles from './App.module.css';

const App: React.FC = () => {
  const [isBlue, setBlue] = useState(false);
  const classes = classnames({ [styles.blue]: isBlue });
  return (
    <button className={classes} onClick={() => setBlue((prev) => !prev)}>
      REACT IS HERE!
    </button>
  );
};

export default App;
