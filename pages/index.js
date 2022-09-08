import React from 'react';
import {getFeaturedEvents} from "../helpers/api-utils";
import EventList from "../components/events/event-list";

const HomePage = ({events}) => {

    return (
        <div>
            <EventList items={events}/>
        </div>
    );
};

export default HomePage;

export const getStaticProps = async () => {
    const featuredEvents = await getFeaturedEvents();
    return {
        props: {
            events: featuredEvents
        },
        revalidate: 1800
    }
}