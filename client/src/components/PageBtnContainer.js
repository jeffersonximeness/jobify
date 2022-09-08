import { useAppContext } from '../context/appContext'
import Wrapper from '../assets/wrappers/PageBtnContainer'
import { HiChevronDoubleLeft, HiChevronDoubleRight } from 'react-icons/hi'


function PageBtnContainer() {
    const { numOfPages, page, changePage } = useAppContext()

    const pages = Array.from({ length: numOfPages }, (_, index) => {
        return index + 1
    })

    const nextPage = () => {
        let newPage = page + 1

        if (newPage > numOfPages) {
            newPage = 1
        }
        changePage(newPage)
    }

    const previousPage = () => {
        let newPage = page - 1 

        if (newPage < 1) {
            newPage = numOfPages
        }
        changePage(newPage)
    }

    return (
        <Wrapper>
            <button className='prev-btn' onClick={previousPage}>
                <HiChevronDoubleLeft />
                prev
            </button>
            <div className='btn-container'>
                {pages.map((pageNumber) => {
                    return (
                        <button 
                            type='button' 
                            key={pageNumber} 
                            className={pageNumber === page ? 'pageBtn active' : 'pageBtn'}
                            onClick={() => changePage(pageNumber)}
                        >
                            {pageNumber}
                        </button>
                    )
                })}
            </div>
            <button className='next-btn' onClick={nextPage}>
                next
                <HiChevronDoubleRight />
            </button>
        </Wrapper>
    )
}

export default PageBtnContainer