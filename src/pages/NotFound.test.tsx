import {render,  screen} from "@testing-library/react"
import NotFound from "./NotFound"



const mockedUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedUsedNavigate,
}));


describe('Page Not Found', () => {
    it('Shows Text "Not Found"', () => {
        render(<NotFound/>)


        
    })

})