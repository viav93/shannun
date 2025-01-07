import {
    createBrowserRouter,
    Link
} from "react-router-dom";
import { FSPStepper } from './molecules/FSPStepper';
import CalendarContainer from 'molecules/Calendar/Container/CalendarContainer';
import FSPRecentSearchComponent from "atoms/FSPRecentSearch";
import { FSPProfileTabs } from 'organisms/FSPProfileTabs';

const ComponentList = () => {
    return (
        <div>
            <h5 className='ey-heading-5 ey-font__bold'>Component List</h5>
            <ul className='ey-list'>
                <li>
                    <Link to="/flightsearch">Flight Search</Link>
                </li>
                <li>
                    <Link to="/calendar">Calendar</Link>
                </li>
                <li>
                    <Link to="/recentsearch">Recent Search</Link>
                </li>
                <li>
                    <Link to="/profiletabs">Profile Tabs</Link>
                </li>
            </ul>
        </div>
    )
}

const Home = () => {
    return (
        <div>
            <a href="/"> &lt; Home</a>
        </div>
    )
}

export const router = createBrowserRouter([
    {
        path: "/",
        element: <ComponentList />
    }, {
        path: "/flightsearch",
        element: <><Home /><FSPStepper /></>
    }, {
        path: "/calendar",
        element: <><Home /><CalendarContainer /></>
    }, {
        path: "/recentsearch",
        element: <><Home /><FSPRecentSearchComponent /></>
    }, {
        path: "/profiletabs",
        element: <><Home /><FSPProfileTabs /></>
    }
]);