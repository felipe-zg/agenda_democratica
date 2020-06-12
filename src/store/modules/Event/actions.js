export const startEvents = (events) => {
    return {
        type: '@Event/START_EVENTS_LIST',
        events,
    };
};
export const addEvent = (event) => {
    return {
        type: '@Event/ADD_EVENT',
        event,
    };
};

export const updateEvent = (event) => {
    return {
        type: '@Event/UPDATE_EVENT',
        event,
    };
};

export const deleteEvent = (key) => {
    return {
        type: '@Event/DELETE_EVENT',
        key,
    };
};

export const cleanEventsList = () => {
    return {
        type: '@Event/CLEAN_EVENTS_LIST',
    };
};
