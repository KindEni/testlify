import { render, screen, waitFor } from '@testing-library/react';
import Hotels from './Hotels';
import HotelsContext from '../context/HotelsContext';
import { BrowserRouter } from 'react-router-dom';

// Test for the availability of the main component that 
// displays items

test('The Hotels component should render', async () => {
    const wrapper = ({ children }) => (
        <HotelsContext.Provider value={{
            loading: true,
            error: '',
            hotels: [],
            fetchHotels: jest.fn(),
        }}>
            {children}
        </HotelsContext.Provider>
    );

    render(<Hotels />, { wrapper });

    expect(await screen.findByText(
        'Loading...')).toBeVisible
})

// Check for the availabiility of the component displayed by the 
// main component
test('The Hotels component should render a list of component', async () => {
    const wrapper = ({ children }) => (
        <BrowserRouter>
            <HotelsContext.Provider value={{
                loading: false,
                error: '',
                hotels: [{ id: 1, title: 'Test hotel 1', thumbnail: '' },
                { id: 2, title: 'Test hotel 2', thumbnail: '' },
                ],
                fetchHotels: jest.fn(),
            }}>{children}
            </HotelsContext.Provider>
        </BrowserRouter>
    );
    
     render(<Hotels />, { wrapper });

    expect(screen.queryByText('Loading...')).toBeNull();    
    expect(screen.getAllByRole('link').length).toBe(2);

    

    // expect(await screen.findByText(
    //     'Loading...')).toBeVisible
})

// Check if the useEffect function calls fetchItems in the 
// Hotels component, even when there are no hotel data available
// if it does it have failed

test('The Hotels component should render', async () => {

    const mockFunction = jest.fn()

    const wrapper = ({ children }) => (
        <HotelsContext.Provider value={{
            loading: true,
            error: '',
            hotels: [],
            fetchHotels: mockFunction,
        }}>
            {children}
        </HotelsContext.Provider>
    );

    render(<Hotels />, { wrapper });

    expect(await screen.findByText(
        'Loading...')).toBeVisible


        // waiting for the useEffect Function to be called
        // if it gets called the test have failed
    await waitFor(() => 
    expect(mockFunction).toHaveBeenCalledTimes(1))
})