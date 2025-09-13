import { useState } from 'react'
import { Link } from 'react-router-dom'
import { SiGmail } from 'react-icons/si'
import { FaFacebookMessenger, FaInstagram } from 'react-icons/fa'
import ModalButtons from './ModalButtons.tsx'

export default function Home() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false)

  const handleOpenContactModal = () => setIsContactModalOpen(true)
  const handleCloseContactModal = () => setIsContactModalOpen(false)

  const handleShowDetail = (id: string) => {
    const gmail = document.getElementById('gmail')
    const instagram = document.getElementById('instagram')
    const messenger = document.getElementById('messenger')

    if (gmail) gmail.style.display = 'none'
    if (instagram) instagram.style.display = 'none'
    if (messenger) messenger.style.display = 'none'

    const detail = document.getElementById(id)
    if (detail) {
      detail.style.display = 'block'
      setTimeout(() => {
        detail.style.display = 'none'
      }, 10000)
    }
  }

  return (
    <div 
      className='
      flex flex-col w-full h-screen bg-[#fff]
      overflow-hidden overscroll-none fixed
      lg:pt-30 
      '
    >
      <div
        className='
        flex flex-col items-center justify-center w-full
        h-full
        lg:flex lg:flex-col lg:items-center
        lg:justify-center lg:w-full lg:h-full
        '
      >
        {/* Title and Tagline */}
        <div
          className='
          flex flex-col w-full items-center justify-center
          lg:flex lg:flex-col lg:items-center lg:justify-center lg:w-[50%]
          lg:h-full lg:pb-80
          '
        >
          <h1
            className='
            text-[#ff6b6b] italic font-bold text-[10rem] z-10
            md:text-[10rem] md:text-[#ff6b6b]
            lg:text-[10rem] lg:text-[#ff6b6b] lg:z-0
            '
          >
            Ala
          </h1>
          <div
            className='
            flex font-normal text-2xl
            mt-[-50px] text-[#fff] z-10
            md:mt-[-50px] md:text-2xl md:text-[#fff]
            lg:mt-[-50px] lg:text-2xl lg:text-[#000] lg:z-0
            '
          >
            <h1>Capture. &nbsp;</h1>
            <h1>Share. &nbsp;</h1>
            <h1>Gather.</h1>
          </div>

          <Link
            to='/plans'
            className='z-10'
          >
            <button
              className='
              bg-[#ff6b6b] text-[#fff] text-lg font-normal p-2
              rounded-2xl cursor-pointer mt-4 w-[200px]
              hidden
              lg:block
              '
            >
              See Our Plans
            </button>
          </Link>
      
          <div className='lg:hidden flex z-10 mt-4 gap-2'>
            <ModalButtons />
          </div>
          
        </div>
      </div>

      {/* Images */}
      <div 
        className='
        flex flex-nowrap items-end justify-center w-full
        absolute linear-gradient
        sm:p-8 sm:gap-4 sm:bottom-[-225px]
        md:p-8 md:gap-4 md:bottom-[-225px]
        lg:p-8 lg:gap-4 lg:bottom-[-250px]
        '
      >
        {/* Column 1 */}
        <div className='flex flex-col gap-4'>
          {/* Filler Block */}
          <div
            className='
            hidden w-[250px] h-[350px] border-0 rounded-4xl
            opacity-50 bg-[#ff6b6b]/40
            sm:hidden
            md:hidden
            lg:block lg:opacity-100
            '
          ></div>
          {/* Top Image */}
          <img
            src='1.jpg'
            alt='Image 1'
            className='
            hidden w-[250px] h-[350px]
            border-0 rounded-4xl opacity-50
            sm:hidden
            md:hidden
            lg:block lg:opacity-100
            '
          />
          {/* Bottom Image */}
          <img
            src='2.jpg'
            alt='Image 2'
            className='
            hidden w-[250px] h-[350px]
            border-0 rounded-4xl opacity-50
            sm:hidden
            md:hidden
            lg:block lg:opacity-100 lg:mb-50
            '
          />
        </div>

        {/* Column 2 */}
        <div className='flex flex-col gap-4'>
          {/* Filler Block */}
          <div
            className='
            hidden w-[250px] h-[350px] border-0 rounded-4xl
            opacity-50 bg-[#ff6b6b]/15
            sm:hidden
            md:hidden
            lg:block lg:opacity-100
            '
          ></div>
          {/* Filler Block */}
          <div
            className='
            hidden w-[250px] h-[350px] border-0 rounded-4xl
            opacity-50 bg-[#ff6b6b]/30
            sm:hidden
            md:hidden
            lg:block lg:opacity-100
            '
          ></div>
          {/* Top Image */}
          <img
            src='1.jpg'
            alt='Image 1'
            className='
            hidden w-[250px] h-[350px]
            border-0 rounded-4xl opacity-50
            sm:hidden
            md:hidden
            lg:block lg:opacity-100
            '
          />
          {/* Bottom Image */}
          <img
            src='2.jpg'
            alt='Image 2'
            className='
            hidden w-[250px] h-[350px]
            border-0 rounded-4xl opacity-50
            sm:hidden
            md:hidden
            lg:block lg:opacity-100
            '
          />
        </div>
        
        {/* Column 3 */}
        <div 
          className='
          flex flex-col gap-4 mr-2
          sm:mb-25
          md:mb-25
          lg:mb-50
          '
        >
          {/* Filler Block */}
          <div
            className='
            hidden w-[250px] h-[350px] border-0 rounded-4xl
            opacity-50 bg-[#ff6b6b]/10
            sm:hidden
            md:hidden
            lg:block lg:opacity-100
            '
          ></div>
          {/* Filler Block */}
          <div
            className='
            hidden w-[250px] h-[350px] border-0 rounded-4xl
            opacity-50 bg-[#ff6b6b]/20
            sm:hidden
            md:hidden
            lg:block lg:opacity-100
            '
          ></div>
          {/* Top Image */}
          <img
            src='3.jpg'
            alt='Image 3'
            className='
            hidden min-w-[250px] h-[350px]
            border-0 rounded-4xl opacity-50
            sm:block sm:opacity-50
            md:block md:opacity-50
            lg:block lg:opacity-100
            '
          />

          {/* sm-md Top Image */}
          <img
            src='11.jpg'
            alt='sm-md Top Image'
            className='
            hidden w-[250px] h-[350px]
            border-0 rounded-4xl opacity-50
            sm:block
            md:block
            lg:hidden
            '
          />
          {/* sm-md Bottom Image */}
          <img
            src='12.jpg'
            alt='sm-md Bottom Image'
            className='
            hidden w-[250px] h-[350px]
            border-0 rounded-4xl opacity-50
            sm:block
            md:block
            lg:hidden
            '
          />
        </div>
        
        {/* Column 4 */}
        <div 
          className='
          flex flex-col mb-25 gap-2 mr-2
          sm:gap-4
          md:gap-4
          lg:mr-0
          '
        >
          {/* Filler Block */}
          <div
            className='
            hidden w-[250px] h-[350px] border-0 rounded-4xl
            sm:hidden
            md:hidden
            lg:block lg:opacity-100
            '
          ></div>
          {/* Filler Block */}
          <div
            className='
            hidden w-[250px] h-[350px] border-0 rounded-4xl
            sm:hidden
            md:hidden
            lg:block lg:opacity-100
            '
          ></div>
          <img
            src='4.jpg'
            alt='Image 4'
            className='
            min-w-[250px] h-[300px] border-0 rounded-xl opacity-50
            sm:w-[250px] sm:h-[350px] sm:rounded-4xl
            md:w-[250px] md:h-[350px] md:rounded-4xl
            lg:w-[250px] lg:h-[350px] lg:opacity-100 lg:rounded-4xl
            '
          />
          <img
            src='21.jpg'
            alt=''
            className='
            w-[250px] h-[300px] border-0 rounded-xl opacity-50
            sm:hidden sm:w-[250px] sm:h-[350px] sm:opacity-100
            md:hidden md:w-[250px] md:h-[350px] md:opacity-100
            lg:hidden lg:w-[250px] lg:h-[350px] lg:opacity-100
            '
          />
          <img
            src='22.jpg'
            alt=''
            className='
            w-[250px] h-[300px] border-0 rounded-xl opacity-50
            sm:hidden sm:w-[250px] sm:h-[350px] sm:opacity-100
            md:hidden md:w-[250px] md:h-[350px] md:opacity-100
            lg:hidden lg:w-[250px] lg:h-[350px] lg:opacity-100
            '
          />
          {/* sm-md Top Image */}
          <img
            src='13.jpg'
            alt=''
            className='
            hidden w-[250px] h-[350px]
            border-0 rounded-4xl opacity-50
            sm:block
            md:block
            lg:hidden
            '
          />
          {/* sm-md Bottom Image */}
          <img
            src='14.jpg'
            alt=''
            className='
            hidden w-[250px] h-[350px]
            border-0 rounded-4xl opacity-50
            sm:block
            md:block
            lg:hidden
            '
          />
        </div>
        
        {/* Column 5 */}
        {/* With Mobile View */}
        <div 
          className='
          flex flex-col mb-25 gap-2
          sm:gap-4
          md:gap-4
          lg:mr-0
          '
        >
          {/* Filler Block */}
          <div
            className='
            hidden w-[250px] h-[350px] border-0 rounded-4xl
            sm:hidden
            md:hidden
            lg:block lg:opacity-100
            '
          ></div>
          {/* Filler Block */}
          <div
            className='
            hidden w-[250px] h-[350px] border-0 rounded-4xl
            sm:hidden
            md:hidden
            lg:block lg:opacity-100
            '
          ></div>
          <img
            src='5.jpg'
            alt='Image 5'
            className='
            min-w-[250px] h-[300px] border-0 rounded-xl opacity-50
            sm:w-[250px] sm:h-[350px] sm:rounded-4xl
            md:w-[250px] md:h-[350px] md:rounded-4xl
            lg:w-[250px] lg:h-[350px] lg:opacity-100 lg:rounded-4xl
            '
          />
          <img
            src='23.jpg'
            alt=''
            className='
            w-[250px] h-[300px] border-0 rounded-xl opacity-50
            sm:hidden sm:w-[250px] sm:h-[350px] sm:opacity-100
            md:hidden md:w-[250px] md:h-[350px] md:opacity-100
            lg:hidden lg:w-[250px] lg:h-[350px] lg:opacity-100
            '
          />
          <img
            src='24.jpg'
            alt=''
            className='
            w-[250px] h-[300px] border-0 rounded-xl opacity-50
            sm:hidden sm:w-[250px] sm:h-[350px] sm:opacity-100
            md:hidden md:w-[250px] md:h-[350px] md:opacity-100
            lg:hidden lg:w-[250px] lg:h-[350px] lg:opacity-100
            '
          />
          {/* sm-md Top Image */}
          <img
            src='15.jpg'
            alt=''
            className='
            hidden w-[250px] h-[350px]
            border-0 rounded-4xl opacity-50
            sm:block
            md:block
            lg:hidden
            '
          />
          {/* sm-md Bottom Image */}
          <img
            src='16.jpg'
            alt=''
            className='
            hidden w-[250px] h-[350px]
            border-0 rounded-4xl opacity-50
            sm:block
            md:block
            lg:hidden
            '
          />
        </div>

        {/* Column 6 */}
        <div 
          className='
          flex flex-col gap-4
          sm:mb-25
          md:mb-25
          lg:mb-50
          '
        >
          {/* Filler Block */}
          <div
            className='
            hidden w-[250px] h-[350px] border-0 rounded-4xl
            opacity-50 bg-[#ff6b6b]/10
            sm:hidden
            md:hidden
            lg:block lg:opacity-100
            '
          ></div>
          {/* Filler Block */}
          <div
            className='
            hidden w-[250px] h-[350px] border-0 rounded-4xl
            opacity-50 bg-[#ff6b6b]/20
            sm:hidden
            md:hidden
            lg:block lg:opacity-100
            '
          ></div>
          <img
            src='6.jpg'
            alt='Image 6'
            className='
            hidden w-[250px] h-[350px] border-0 rounded-4xl
            opacity-50
            lg:block lg:opacity-100
            '
          />
        </div>

        {/* Column 7 */}
        <div className='flex flex-col gap-4'>
          {/* Filler Block */}
          <div
            className='
            hidden w-[250px] h-[350px] border-0 rounded-4xl
            opacity-50 bg-[#ff6b6b]/15
            sm:hidden
            md:hidden
            lg:block lg:opacity-100
            '
          ></div>
          {/* Filler Block */}
          <div
            className='
            hidden w-[250px] h-[350px] border-0 rounded-4xl
            opacity-50 bg-[#ff6b6b]/30
            sm:hidden
            md:hidden
            lg:block lg:opacity-100
            '
          ></div>
          {/* Top Image */}
          <img
            src='7.jpg'
            alt='Image 7'
            className='
            hidden w-[250px] h-[350px] border-0 rounded-4xl
            opacity-50
            lg:block lg:opacity-100
            '
          />
          {/* Bottom Image */}
          <img
            src='8.jpg'
            alt='Image 8'
            className='
            hidden w-[250px] h-[350px] border-0 rounded-4xl
            opacity-50
            lg:block lg:opacity-100
            '
          />
        </div>

        {/* Column 8 */}
        <div className='flex flex-col gap-4'>
          {/* Filler Block */}
          <div
            className='
            hidden w-[250px] h-[350px] border-0 rounded-4xl
            opacity-50 bg-[#ff6b6b]/40
            sm:hidden
            md:hidden
            lg:block lg:opacity-100
            '
          ></div>
          {/* Top Image */}
          <img
            src='1.jpg'
            alt='Image 1'
            className='
            hidden w-[250px] h-[350px]
            border-0 rounded-4xl opacity-50
            sm:hidden
            md:hidden
            lg:block lg:opacity-100
            '
          />
          {/* Bottom Image */}
          <img
            src='2.jpg'
            alt='Image 2'
            className='
            hidden w-[250px] h-[350px]
            border-0 rounded-4xl opacity-50
            sm:hidden
            md:hidden
            lg:block lg:opacity-100 lg:mb-50
            '
          />
        </div>
      </div>

      {/* Gradient Fade */}
      <div
        className='
          pointer-events-none absolute bottom-0 left-0 w-full
          h-40 bg-gradient-to-t from-white to-transparent
        '
      ></div>

      {/* Cover for sm/Mobile */}
      <div
        className='
        bg-black/60 pointer-events-none absolute left-0
        w-full h-full
        lg:hidden
        '
      >
      </div>

      <div
        className='
          fixed bottom-4 left-4
          flex items-center justify-center
          w-[100px] h-[40px]
          bg-white z-50 text-md rounded-2xl
          shadow-md
          lg:hidden
        '
      >
        <button
          onClick={handleOpenContactModal}
          className="w-full h-full">
          Contact
        </button>
      </div>

      {isContactModalOpen && (
        <div
          className='
            flex items-center justify-center bg-[#000]/80
            fixed top-0 left-0 w-screen h-screen z-10
          '
        >
          <div
            className='
              flex flex-col items-center justify-center w-[350px]
              h-[300px] bg-[#ff6b6b] border-0 rounded-2xl gap-6
              relative
            '
          >
            <h1 className='font-bold text-4xl text-[#fff]'>Contact Us</h1>
            <p className='text-xs mb-[-20px] text-[#fff]'>click any of the icons below</p>
            <div className='flex gap-4'>
              <button onClick={() => handleShowDetail('gmail')}>
                <SiGmail size={40} color='#fff' className='cursor-pointer' />
              </button>
              <button onClick={() => handleShowDetail('instagram')}>
                <FaInstagram size={40} color='#fff' className='cursor-pointer' />
              </button>
              <button onClick={() => handleShowDetail('messenger')}>
                <FaFacebookMessenger size={40} color='#fff' className='cursor-pointer' />
              </button>
            </div>
            <div
              className='
                flex items-center justify-center w-[250px] h-[25px]
                border-0 rounded-2xl text-[#fff] italic
              '
            >
              <p id='gmail' className='hidden'>miguel.calarde@gmail.com</p>
              <p id='instagram' className='hidden'>@vn.clrd</p>
              <p id='messenger' className='hidden'>ivan.calarde</p>
            </div>
            <button
              onClick={handleCloseContactModal}
              className='
                text-[#000] text-sm font-medium p-4 rounded-[20px]
                bg-[#e0e0e0] cursor-pointer
              '
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  )
}