import ApiAuthorzationRoutes from './components/api-authorization/ApiAuthorizationRoutes';
import { Counter } from "./components/Counter";
import { FetchData } from "./components/FetchData";
import { Home } from "./components/Home";
import Game from "./components/Game";
import Profile from "./components/Profile";
import Score from "./components/Score";


const AppRoutes = [
    {
        index: true,
        element: <Home />
    },
    {
        path: '/counter',
        element: <Counter />
    },
    {
        path: '/fetch-data',
        requireAuth: true,
        element: <FetchData />
    },
    {
        path: '/game',
        requireAuth: true,
        element: <Game />
    },
    {
        path: '/profile',
        requireAuth: true,
        element: <Profile />
    },
    {
        path: '/score',
        //requireAuth: true,
        element: <Score />
    },
    ...ApiAuthorzationRoutes
];

export default AppRoutes;
