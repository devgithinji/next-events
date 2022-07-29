import classes from './event-content.module.css';

const EventContent = ({children}) => (
    <section className={classes.content}>
        {children}
    </section>
);

export default EventContent;
