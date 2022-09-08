import React, {useEffect, useState} from 'react';
import {useRouter} from "next/router";
import useSWR from 'swr'
import EventList from "../../components/events/event-list";
import ResultsTitle from "../../components/events/results-title";
import Button from "../../components/ui/button";
import ErrorAlert from "../../components/ui/error-alert";
import Head from "next/head";


const FilteredEventsPage = () => {
    const [loadedEvents, setLoadedEvents] = useState();
    const router = useRouter();

    const filterData = router.query.slug;


    const fetcher = url => fetch(url).then(r => r.json()).then(data => data)

    const {data, error} = useSWR('https://nextjs-course-18b5a-default-rtdb.firebaseio.com/events.json', fetcher)

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


    let pageHeadData = (
        <Head>
            <title>Filtered Events</title>
            <meta name='description' content={`A list of filtered events`}/>
        </Head>
    )

    if (!filterData || !loadedEvents) {
        return <p className='center'>Loading...</p>
    }

    const filteredYear = filterData[0];
    const filteredMonth = filterData[1]


    const numYear = +filteredYear;
    const numMonth = +filteredMonth;

    pageHeadData = (
        <Head>
            <title>Filtered Events</title>
            <meta name='description' content={`All events for ${numMonth} / ${numYear}`}/>
        </Head>
    )


    if (isNaN(numYear) || isNaN(numMonth) || numYear > 2030 || numYear < 2021 || numMonth < 1 || numMonth > 12 || error) {
        return (
            <>
                {pageHeadData}
                <ErrorAlert>
                    <p>Invalid filter please adjust your values!</p>
                </ErrorAlert>
                <div className='center'>
                    <Button link='/events'>Show All Events</Button>
                </div>
            </>
        )
    }

    const filteredEvents = loadedEvents.filter((event) => {
        const eventDate = new Date(event.date);
        return eventDate.getFullYear() === numYear && eventDate.getMonth() === numMonth - 1;
    });


    if (!filteredEvents || filteredEvents.length === 0) {
        return (
            <>
                {pageHeadData}
                <ErrorAlert>
                    <p>No events found for the chosen filter!</p>
                </ErrorAlert>
                <div className='center'>
                    <Button link='/events'>Show All Events</Button>
                </div>
            </>
        )
    }

    const date = new Date(numYear, numMonth - 1);

    return (
        <>
            {pageHeadData}
            <ResultsTitle date={date}/>
            <EventList items={filteredEvents}/>
        </>
    );
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