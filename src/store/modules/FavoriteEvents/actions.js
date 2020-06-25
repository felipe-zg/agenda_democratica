export const startFavoriteEventsList = (favorites) => {
    return {
        type: '@FavoriteEvents/START_FAVORITE_EVENTS_LIST',
        favorites,
    };
};

export const addFavoriteEvent = (event) => {
    return {
        type: '@FavoriteEvents/ADD_FAVORITE_EVENT',
        event,
    };
};

export const deleteFavoriteEvent = (event) => {
    return {
        type: '@FavoriteEvents/DELETE_FAVORITE_EVENT',
        event,
    };
};
