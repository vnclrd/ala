import { useState } from 'react'

export default function Home() {
  const [isOrganizerModalOpen, setIsOrganizerModalOpen] = useState(false)
  const [isGuestModalOpen, setIsGuestModalOpen] = useState(false)

  const handleOpenOrganizerModal = () => setIsOrganizerModalOpen(true)
  const handleCloseOrganizerModal = () => setIsOrganizerModalOpen(false)

  const handleOpenGuestModal = () => setIsGuestModalOpen(true)
  const handleCloseGuestModal = () => setIsGuestModalOpen(false)

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
      flex flex-col w-full h-screen bg-[#fff]
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
        {/* Title */}
        <div 
          className='
          flex flex-col w-full items-center justify-center
          lg:flex lg:flex-col lg:items-center lg:justify-center lg:w-[50%]
          lg:h-full lg:pb-80
          '
        >
          <h1
            className='
            text-[#ff6b6b] italic font-bold text-[10rem] drop-shadow-[0_0_20px_rgba(255,255,255,0.25)]

            md:text-[10rem] md:text-[#ff6b6b]
            lg:text-[10rem] lg:text-[#ff6b6b]
            '
          >
            Ala
          </h1>

          {/* Tagline */}
          <div
            className='
            flex font-normal text-2xl mt-[-50px] text-[#fff]
            md:mt-[-50px] md:text-2xl md:text-[#fff]
            lg:mt-[-50px] lg:text-2xl lg:text-[#000]
            '
          >
            <h1>Capture. &nbsp;</h1>
            <h1>Share. &nbsp;</h1>
            <h1>Relive.</h1>
          </div>         

          {/* Buttons */}
          <div
            className='
            flex gap-2 mt-4
            md:flex
            lg:hidden
            [@media(min-width:1440px)]:flex
            '
          >
            <button 
              onClick={handleOpenOrganizerModal}
              className='
              bg-[#ff6b6b] text-[#fff] text-sm font-medium p-4
              rounded-[20px] cursor-pointer z-1000
              '
            >
              Organizer
            </button>

            <button
              onClick={handleOpenGuestModal}
              className='
              bg-[#e0e0e0] text-[#000] text-sm font-medium p-4
              rounded-[20px] cursor-pointer z-1000
              '
            >
              Guest
            </button>
          </div>

          {/* Organizer Modal */}
          {isOrganizerModalOpen && (
            <div
              className='
                bg-[#000]/80 flex items-center justify-center fixed
                top-0 left-0 w-screen h-screen z-99999
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
                top-0 left-0 w-screen h-screen z-99999
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
          flex flex-col mb-25 mr-2 gap-2
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
    </div>
  )
}