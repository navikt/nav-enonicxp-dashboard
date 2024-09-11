export const initialState = {
    foo: 0,
};

export type Locale = 'nb' | 'en' | 'nn';

export interface Store {
    foo: number;
}

export type Action = {
    type: 'SET_FOO';
    payload: number;
};

export const reducer = (state: Store, action: Action) => {
    switch (action.type) {
        case 'SET_FOO':
            return {
                ...state,
                foo: action.payload,
            };
        default:
            return state;
    }
};
