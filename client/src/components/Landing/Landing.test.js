import {render} from '@testing-library/react';
import Landing from './Landing';
import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';
import configureStore from 'redux-mock-store';

describe('Landing page test', () => {
    const initialState = {};
    const mockStore = configureStore();
    let store;
    let landing;

    beforeEach(() => {
        store = mockStore(initialState);
        
        landing = (
            <Provider store={store}>
                <BrowserRouter>
                    <Landing />
                </BrowserRouter>
            </Provider>
        );
    });

    it('Should render a button to start the app', () => {
        const {getByText} = render(landing);
        expect(getByText('Explorar Dogs')).not.toBeNull();
    });

    it('should have a link to home', () => {
        const {getByRole} = render(landing);
        expect(getByRole('link' ,'/home')).not.toBeNull();
    })
});

