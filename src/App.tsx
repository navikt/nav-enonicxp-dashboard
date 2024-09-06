import { useState } from 'react';
import styles from './App.module.scss';

const App = () => {
    const [myState] = useState('initial state');
    return <div className={styles.app}>I am app: {myState}</div>;
};

export { App };

export default App;
