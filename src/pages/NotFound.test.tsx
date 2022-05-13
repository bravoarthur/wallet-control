import {fireEvent, render,  screen} from "@testing-library/react"
import NotFound from "./NotFound"



const mockedUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedUsedNavigate,
}));


describe('Page Not Found', () => {
    it('Shows Text "Not Found"', () => {
        render(<NotFound/>)

        expect(screen.getByTestId('h1NotFound')).toBeInTheDocument()        
    })
    test('Function "back home" is called when click button', () => {

        render(<NotFound/>)
        const button = screen.getByText('Home Page')
        fireEvent.click(button)
        
        expect(mockedUsedNavigate).toHaveBeenCalled()

    })

})
