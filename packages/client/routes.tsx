import React, { useEffect } from 'react';
import { useLocation, useParams, useRoutes } from 'react-router-dom';

// Import your components here
import { FrontPage } from './pages/Front';
import { basePath } from './config';
import { Page404 } from './pages/404Page';
import { GlobalValuesPage } from './pages/GlobalValuesPage';
import { fetchXPContent } from './utils/fetchPage';

export const Routes: React.FC = () => {
    const location = useLocation();

    useEffect(() => {
        fetchXPContent(location.pathname);
    }, [location]);

    const routes = useRoutes([
        {
            path: `${basePath}/site-info`,
            element: <FrontPage />,
        },
        {
            path: `${basePath}/globalvalues/:path`,
            element: <GlobalValuesPage />,
        },
    ]);

    if (!routes) {
        return <Page404 />;
    }

    return routes;
};
