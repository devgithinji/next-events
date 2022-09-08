import React, {useEffect, useState} from 'react';
import {useRouter} from "next/router";
import useSWR from 'swr'
import EventList from "../../components/events/event-list";
import ResultsTitle from "../../components/events/results-title";
import Button from "../../components/ui/button";
import ErrorAlert from "../../components/ui/error-alert";


const FilteredEventsPage = () => {
    const [loadedEvents, setLoadedEvents] = useState([]);
    const router = useRouter();

    const filterData = router.query.slug;

    const {data, error} = useSWR('https://nextjs-course-18b5a-default-rtdb.firebaseio.com/events.json')

    useEffect(() => {
        if (data) {
            const allEvents = [];
            for (const key in data) {
                allEvents.push({
                    id: key,
                    ...data[key]
                })
            }
            setLoadedEvents(allEvents)
        }
    }, [data])



    if (!filterData ) {
        return <p className='center'>Loading...</p>
    }

    const filteredYear = filterData[0];
    const filteredMonth = filterData[1]

    const numYear = +filteredYear;
    const numMonth = +filteredMonth;


    if (isNaN(numYear) || isNaN(numMonth) || numYear > 2030 || numYear < 2021 || numMonth < 1 || numMonth > 12 || error) {
        return (<>
            <ErrorAlert>
                <p>Invalid filter please adjust your values!</p>
            </ErrorAlert>
            <div className='center'>
                <Button link='/events'>Show All Events</Button>
            </div>
        </>)
    }

    const filteredEvents = loadedEvents.filter((event) => {
        const eventDate = new Date(event.date);
        return eventDate.getFullYear() === numYear && eventDate.getMonth() === numMonth - 1;
    });


    if (!filteredEvents || filteredEvents.length === 0) {
        return (<>
            <ErrorAlert>
                <p>No events found for the chosen filter!</p>
            </ErrorAlert>
            <div className='center'>
                <Button link='/events'>Show All Events</Button>
            </div>
        </>)
    }

    const date = new Date(numYear, numMonth - 1);

    return (<>
        <ResultsTitle date={date}/>
        <EventList items={filteredEvents}/>
    </>);
};

export default FilteredEventsPage;

// export const getServerSideProps = async (context) => {
//     const {params} = context;
//
//     const filteredData = params.slug;
//
//     const filteredYear = filteredData[0];
//     const filteredMonth = filteredData[1]
//
//     const numYear = +filteredYear;
//     const numMonth = +filteredMonth;
//
//     if (isNaN(numYear) || isNaN(numMonth) || numYear > 2030 || numYear < 2021 || numMonth < 1 || numMonth > 12) {
//         return {
//             props: {hasError: true}
//             // notFound: true
//         }
//     }
//
//     const filteredEvents = await getFilteredEvents({
//         year: numYear, month: numMonth
//     });
//
//     return {
//         props: {
//             events: filteredEvents,
//             date: {
//                 year: numYear,
//                 month: numMonth
//             }
//         }
//     }
// }