import { useState } from 'react'
import { SiGmail } from 'react-icons/si'
import { FaFacebookMessenger, FaInstagram } from 'react-icons/fa'

export default function Header() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false)
  const [isOrganizerModalOpen, setIsOrganizerModalOpen] = useState(false)
  const [isGuestModalOpen, setIsGuestModalOpen] = useState(false)

  const handleOpenContactModal = () => setIsContactModalOpen(true)
  const handleCloseContactModal = () => setIsContactModalOpen(false)

  const handleOpenOrganizerModal = () => setIsOrganizerModalOpen(true)
  const handleCloseOrganizerModal = () => setIsOrganizerModalOpen(false)

  const handleOpenGuestModal = () => setIsGuestModalOpen(true)
  const handleCloseGuestModal = () => setIsGuestModalOpen(false)

  // ========== Show icon details when pressed ==========
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

  // Show proceed button if code is entered
  const handleShowProceedBtn = () => {
    const organizerInput = document.getElementById('organizerInput') as HTMLInputElement | null
    const organizerProceed = document.getElementById('organizerProceed') as HTMLButtonElement | null

    if (organizerInput && organizerProceed) {
      if (organizerInput.value.trim() === '') {
        organizerProceed.style.display = 'none'
      } else {
        organizerProceed.style.display = 'block'
      }
    }
  }

  // Enable proceed button if code is entered
  const handleEnableProceedBtn = () => {
    const guestInput = document.getElementById('guestInput') as HTMLInputElement | null
    const guestProceed = document.getElementById('guestProceed') as HTMLInputElement | null

    if (guestInput && guestProceed) {
      if (guestInput.value.trim() === '') {
        guestProceed.disabled = true
      } else {
        guestProceed.disabled = false
      }
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
          <button
            className='
            bg-[#ffc30b] text-[#fff] text-sm font-medium p-4
            rounded-[20px] cursor-pointer
            '
          >
            Plans
          </button>
          <button 
            onClick={handleOpenOrganizerModal}
            className='
            bg-[#ff6b6b] text-[#fff] text-sm font-medium p-4
            rounded-[20px] cursor-pointer
            '
          >
            Organizer
          </button>
          <button
            onClick={handleOpenGuestModal}
            className='
            bg-[#e0e0e0] text-[#000] text-sm font-medium p-4
            rounded-[20px] cursor-pointer
            '
          >
            Guest
          </button>
        </div>

        {/* Contact Modal */}
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
                <button
                  onClick={() => handleShowDetail('gmail')}
                >
                  <SiGmail
                    size={40}
                    color='#fff'
                    className='cursor-pointer'
                  />
                </button>
                <button
                  onClick={() => handleShowDetail('instagram')}
                >
                  <FaInstagram
                    size={40}
                    color='#fff'
                    className='cursor-pointer'
                  />
                </button>
                <button
                  onClick={() => handleShowDetail('messenger')}
                >
                  <FaFacebookMessenger
                    size={40}
                    color='#fff'
                    className='cursor-pointer'
                  />
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

        {/* Organizer Modal */}
        {isOrganizerModalOpen && (
          <div
            className='
              bg-[#000]/80 flex items-center justify-center fixed
              top-0 left-0 w-screen h-screen
            '
          >
            <div
              className='
              flex w-[800px] h-[400px] bg-[#fff] border-0 rounded-2xl
              '
            >
              {/* Left Part */}
              <div
                className='
                flex flex-col items-center justify-center w-[50%]
                h-full p-4 gap-4 relative
                '
              >
                <h1 className='text-4xl'>
                  Have you gotten <br /> your code for <br />
                  <span className='font-bold'>your event?</span>
                </h1>
                <input
                  onInput={handleShowProceedBtn}
                  id='organizerInput'
                  type="text"
                  placeholder='Enter your code here'
                  className='w-[300px] h-[40px] rounded-2xl bg-[#e0e0e0] p-4'
                />
                <button
                  id='organizerProceed'
                  className='
                  absolute bg-[#ff6b6b] text-[#fff] text-sm font-medium
                  p-4 rounded-[20px] cursor-pointer bottom-8 hidden
                  '
                >
                  Proceed
                </button>
              </div>

              {/* Right Part */}
              <div
                className='
                flex flex-col items-center justify-center w-[50%]
                h-full p-4 bg-[#ff6b6b] border-0 rounded-r-2xl
                gap-2 text-[#fff] relative
                '
              >
                <h1 className='text-4xl font-bold'>Not yet?</h1>
                <p className='text-xl'>
                  Check out our&nbsp;
                  <button className='font-bold cursor-pointer hover:underline text-[#ffc30b]'>
                    plans
                  </button>
                  .
                </p>

                {/* Close Organizer Modal Button */}
                <button
                  onClick={handleCloseOrganizerModal}
                  className='
                  absolute bottom-6 text-[#fff] text-sm font-medium
                  rounded-[20px] cursor-pointer p-4 hover:underline
                  '  
                >
                  Close
                </button>
              </div>

            </div>
            
          </div>
        )}

        {/* Guest Modal */}
        {isGuestModalOpen && (
          <div
            className='
              bg-[#000]/80 flex items-center justify-center fixed
              top-0 left-0 w-screen h-screen
            '
          >
            <div
              className='
              flex flex-col items-center justify-center w-[350px]
              h-[325px] bg-[#fff] border-0 rounded-2xl gap-6
              relative
              '
            >
              <h1 className='text-4xl'>
                Enter the code <br /> given by the <br />
                <span className='font-bold'>organizer.</span>
              </h1>
              <input
                onInput={handleEnableProceedBtn}
                id='guestInput'
                type="text"
                placeholder='Enter code here'
                className='w-[275px] h-[40px] rounded-2xl bg-[#e0e0e0] p-4'
              />
              <div className='flex gap-4'>
                <button
                  onClick={handleCloseGuestModal}
                  className='
                  bg-[#e0e0e0] text-[#000] text-sm font-medium
                  p-4 rounded-[20px] cursor-pointer
                  '
                >
                  Cancel
                </button>
                <button
                  id='guestProceed'
                  disabled
                  className='
                  bg-[#ff6b6b] text-[#fff] text-sm font-medium p-4
                  rounded-[20px]
                  disabled:cursor-not-allowed disabled:bg-gray-400
                  '
                >
                  Proceed
                </button>
              </div>
              
            </div>

          </div>
        )}

      </div>

    </div>
  );
}
