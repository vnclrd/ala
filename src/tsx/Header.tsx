import { useState } from 'react'
import { SiGmail } from 'react-icons/si'
import { FaFacebookMessenger, FaInstagram } from 'react-icons/fa'
import ModalButtons from './ModalButtons.tsx'

export default function Header() {
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
        hidden z-9999
        lg:block lg:absolute lg:bg-[#fff] lg:shadow-lg
        lg:w-full lg:h-20
      '
    >
      {/* Header Content */}
      <div className='flex items-center w-full h-20'>
        {/* Left Part */}
        <div
          className='
            flex items-center justify-start md:w-[50%] pl-8
            md:h-full
            lg:w-[50%] lg:h-full
          '
        >
          <h1 className='text-4xl font-bold italic text-[#ff6b6b]'>
            Ala
          </h1>
        </div>
        {/* Right Part */}
        <div
          className='
            flex items-center justify-end w-[50%] h-full
            pr-8 gap-2
          '
        >
          <button
            onClick={handleOpenContactModal}
            className='
              text-[#000] text-sm font-medium
              cursor-pointer m-4 hover:underline
            '
          >
            Contact
          </button>
          <ModalButtons />
        </div>

        {isContactModalOpen && (
          <div
            className='
              flex items-center justify-center bg-[#000]/80
              fixed top-0 left-0 w-screen h-screen
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
    </div>
  );
}