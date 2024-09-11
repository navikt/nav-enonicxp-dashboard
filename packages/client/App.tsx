import { useParams } from 'react-router-dom';
import styles from './App.module.scss';
import { Routes } from './routes';

const App = () => {
    const params = useParams();

    return (
        <div className={styles.app}>
            <Routes />
        </div>
    );
};

export { App };
