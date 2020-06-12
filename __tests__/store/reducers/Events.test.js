import reducer, {INITIAL_STATE} from '~/store/modules/Event/reducer';
import * as Event from '~/store/modules/Event/actions';

const eventList = [
    {
        title: 'test event',
        date: '01/01/2020',
        category: 'test category',
        address: '-64hgsy72gsaj4',
        eventKey: '-jkajhs63h7ga4h',
    },
    {
        title: 'test event 2',
        date: '01/01/2020',
        category: 'test category',
        address: '-64hgsy72gsyts',
        eventKey: '-jkajhs63h7ga32',
    },
];

describe('Event reducer', () => {
    it('START_EVENTS_LIST', () => {
        const state = reducer(INITIAL_STATE, Event.startEvents(eventList));
        expect(state).toStrictEqual(eventList);
    });

    it('ADD_EVENT', () => {
        const newEvent = {
            title: 'test event',
            date: '01/01/2020',
            category: 'test category',
            address: '-64hgsy72gsaj4',
            eventKey: '-jkajhs63h7ga4h',
        };
        const state = reducer(INITIAL_STATE, Event.addEvent(newEvent));
        expect(state).toStrictEqual([newEvent]);
    });

    it('UPDATE_EVENT', () => {
        const updatedEvent = {
            title: 'updated test event',
            date: '01/01/2020',
            category: 'test category',
            address: '-64hgsy72gsaj4',
            eventKey: '-jkajhs63h7ga4h',
        };
        const state = reducer(eventList, Event.updateEvent(updatedEvent));
        expect(state).toContainEqual(updatedEvent);
    });

    it('DELETE_EVENT', () => {
        const newEventList = [
            {
                title: 'test event',
                date: '01/01/2020',
                category: 'test category',
                address: '-64hgsy72gsaj4',
                eventKey: '-jkajhs63h7ga4h',
            },
        ];

        const state = reducer(eventList, Event.deleteEvent('jkajhs63h7ga32'));
        expect(state).toStrictEqual(newEventList);
    });

    it('CLEAR_EVENTS_LIST', () => {
        const state = reducer(eventList, Event.clearEventsList());
        expect(state).toStrictEqual(INITIAL_STATE);
    });
});
