import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function ModalButtons() {
  const [isOrganizerModalOpen, setIsOrganizerModalOpen] = useState(false);
  const [isGuestModalOpen, setIsGuestModalOpen] = useState(false);
  const [guestCode, setGuestCode] = useState('');
  const navigate = useNavigate();

  const handleOpenOrganizerModal = () => setIsOrganizerModalOpen(true);
  const handleCloseOrganizerModal = () => setIsOrganizerModalOpen(false);

  const handleOpenGuestModal = () => setIsGuestModalOpen(true);
  const handleCloseGuestModal = () => setIsGuestModalOpen(false);

  const handleEnableOrganizerProceedBtn = () => {
    const organizerInput = document.getElementById('organizerInput') as HTMLInputElement | null
    const organizerProceed = document.getElementById('organizerProceed') as HTMLButtonElement | null

    if (organizerInput && organizerProceed) {
      if (organizerInput.value.trim() === '') {
        organizerProceed.disabled = true
      } else {
        organizerProceed.disabled = false
      }
    }
  }

  const handleGuestProceed = async () => {
    // The state variable 'guestCode' now holds the input value.
    const code = guestCode.trim();

    if (!code) {
      alert('Please enter a code.');
      return;
    }

    try {
      const response = await fetch('http://localhost:4000/verify-code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code }),
      });

      const data = await response.json();
      if (response.ok) {
        navigate(data.galleryUrl);
        setIsGuestModalOpen(false)
      } else {
        alert(data.error || 'Invalid or expired code.');
      }
    } catch (error) {
      console.error('Network or server error:', error);
      alert('Failed to connect to the server. Please try again.');
    }
  };

  return (
    <>
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

      {isOrganizerModalOpen && (
        <div
          className='
            bg-[#000]/80 flex items-center justify-center fixed
            top-0 left-0 w-screen h-screen z-99999
          '
        >
          <div
            className='
              flex flex-col bg-[#fff]
              w-[300px] h-[600px] rounded-2xl
              md:flex md:flex-row md:w-[800px] md:h-[400px]
              lg:flex lg:flex-row lg:w-[800px] lg:h-[400px]
            '
          >
            <div
              className='
                flex flex-col items-center p-4 gap-4
                justify-center w-full h-[50%] relative border-0
                rounded-t-2xl pb-12
                md:w-[50%] md:h-full md:border-0 md:rounded-l-2xl md:rounded-t-none md:pb-12
                lg:w-[50%] lg:h-full lg:border-0 lg:rounded-l-2xl lg:rounded-t-none lg:pb-12
              '
            >
              <h1
                className='
                  text-2xl text-center
                  md:text-4xl md:text-left
                  lg:text-4xl lg:text-left
                '
              >
                Have you gotten <br /> your code for <br />
                <span className='font-bold'>your event?</span>
              </h1>
              <input
                onInput={handleEnableOrganizerProceedBtn}
                id='organizerInput'
                type='text'
                placeholder='Enter your code here'
                className='
                  rounded-2xl bg-[#000]/10 p-4
                  w-[200px] h-[40px] text-sm text-center
                  md:w-[300px] md:h-[40px] md:text-md md:text-left
                  lg:w-[300px] lg:h-[40px] lg:text-md lg:text-left
                '
              />
              <button
                id='organizerProceed'
                disabled
                className='
                  absolute bg-[#ff6b6b] text-[#fff] text-sm font-medium
                  rounded-xl cursor-pointer bottom-8 p-2
                  md:p-4 md:rounded-2xl md:bottom-10
                  lg:p-4 lg:rounded-2xl lg:bottom-10
                  disabled:cursor-not-allowed disabled:bg-[#808080]
                '
              >
                Proceed
              </button>
            </div>
            <div
              className='
                flex flex-col bg-[#ff6b6b] items-center justify-center
                w-full h-[50%] relative text-[#fff]
                rounded-b-2xl gap-2
                md:w-[50%] md:h-full md:rounded-r-2xl md:rounded-l-none md:pb-0
                lg:w-[50%] lg:h-full lg:rounded-r-2xl lg:rounded-l-none lg:pb-0
              '
            >
              <h1 className='text-4xl font-bold mt-4'>Not yet?</h1>
              <p className='flex flex-col text-xl'>Check out our</p>
              <Link to='/plans'>
                <button
                  onClick={handleCloseOrganizerModal}
                  className='
                    font-bold text-sm cursor-pointer text-[#ff6b6b] p-2
                    w-[150px] bg-[#fff] rounded-2xl italic
                  '
                >
                  Plans
                </button>
              </Link>
              <button
                onClick={handleCloseOrganizerModal}
                className='
                  absolute bottom-4 text-[#fff] text-sm font-medium
                  rounded-[20px] cursor-pointer p-4 hover:underline
                  md:bottom-6
                  lg:bottom-6
                '
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {isGuestModalOpen && (
        <div
          id='guestModal'
          className='
            bg-[#000]/80 flex items-center justify-center fixed
            top-0 left-0 w-screen h-screen
          '
        >
          <div
            className='
              flex flex-col items-center justify-center w-[350px]
              h-[325px] bg-[#fff] rounded-2xl gap-6
              relative
            '
          >
            <h1 className='text-4xl'>
              Enter the code <br /> given by the <br />
              <span className='font-bold'>organizer.</span>
            </h1>
            <input
              // Use React state to manage the input value.
              onChange={(e) => setGuestCode(e.target.value)}
              id='guestInput'
              type='text'
              placeholder='Enter code here'
              className='w-[275px] h-[40px] rounded-2xl bg-[#e0e0e0] p-4'
            />
            <div className='flex w-[275px] gap-4'>
              <button
                onClick={handleCloseGuestModal}
                className='w-[50%] h-[50px]
                  bg-[#e0e0e0] text-[#000] text-sm font-medium
                  rounded-[20px] cursor-pointer
                '
              >
                Cancel
              </button>
              <button
                onClick={handleGuestProceed}
                id='guestProceed'
                // The button is disabled if the guestCode state is empty.
                disabled={guestCode.trim() === ''}
                className='w-[50%]
                  bg-[#ff6b6b] text-[#fff] text-sm font-medium
                  rounded-[20px] cursor-pointer
                  disabled:cursor-not-allowed disabled:bg-[#808080]
                '
              >
                Proceed
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}