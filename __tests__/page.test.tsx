import { render, screen } from '@testing-library/react'
import InspectorPage from '@/app/page'
import InspectorContainer from '@/app/components/inspectorContainer'

describe('Inspector page', () => {
    it('renders the header', () => {
        render(<InspectorPage />)

        const header = screen.getByRole('banner')

        expect(header).toBeInTheDocument()
    })

    it('renders the file dropzone', () => {
        render(<InspectorContainer />)

        const dropzone = screen.getByTestId('dropzone')

        expect(dropzone).toBeInTheDocument()
    })
})