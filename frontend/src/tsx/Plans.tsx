import { Link, useNavigate } from 'react-router-dom';
import { FaArrowLeftLong } from 'react-icons/fa6'

export default function Plans() {
  const navigate = useNavigate()

  function handleCheckout(plan: 'standard' | 'plus') {
    sessionStorage.setItem('checkoutAllowed', 'true')
    navigate(`/checkout/${plan}`, { state: { allowed: true } })
  }

  return (
    <div
      className='
        flex flex-col items-center justify-start w-screen
        h-screen bg-[#1d1d1d] z-99999 overflow-auto
        lg:justify-center lg:overflow-hidden
      '
    >
      {/* Title and Tagline */}
      <div
        className='
          flex items-center justify-center m-4 gap-2 w-[300px]
          lg:w-[700px]
        '
      >
        <div className='w-[25px]'>
          <Link to='/'>
            <button
              id='cancelTransaction'
              className='
                text-[#fff]/60 text-sm font-medium cursor-pointer
                lg:p-0
                hover:underline
              '
            >
              <FaArrowLeftLong className='w-6 h-6 mt-4' />
            </button>
          </Link>
        </div>
        <div
          className='
            flex flex-col mr-8 text-[#fff]
            lg:mr-10
          '
        >
          <h1 className='italic font-bold text-[4rem]'>Ala</h1>
          <div className='flex text-[0.6rem] mt-[-20px]'>
            <h1>Capture. &nbsp;</h1>
            <h1>Share. &nbsp;</h1>
            <h1>Gather.</h1>
          </div>
        </div>
      </div>
      {/* Plans */}
      <div 
        className='
          flex flex-col gap-4
          lg:flex lg:flex-row
        '
      >
        {/* Plan 1 */}
        <div
          className='
            flex flex-col items-left w-[350px] h-[500px]
            bg-[#fff] rounded-2xl p-8 gap-2 z-30
          '
        >
          <h1 className='font-bold text-2xl'>Standard</h1>
          <p className='text-xs mt-[-12px]'>Recommended for Small Events</p>
          <h1 className='text-xl'>
            ₱<span className='text-4xl'>1,000.00</span>/ event
          </h1>
          <p className='text-sm'>
            Avail the Standard Plan to let guests capture and share photos
            during your event.
          </p>
          <p className='mt-4'>
            ✔{' '}
            <span className='text-sm pl-1'>
              Special QR Code<br />
            </span>
            ✔{' '}
            <span className='text-sm pl-1'>
              Dedicated photo gallery<br />
            </span>
            ✔{' '}
            <span className='text-sm pl-1'>
              Real-time photo display<br />
            </span>
            ✔{' '}
            <span className='text-sm pl-1'>
              Standard quality photo uploads<br />
            </span>
            ✔{' '}
            <span className='text-sm pl-1'>
              Up to 500 MB of photo uploads {'(up to 500 photos)'}
              <br />
            </span>
            ✔{' '}
            <span className='text-sm pl-1'>
              Compress and download photos
              <br />
            </span>
            ✔{' '}
            <span className='text-sm pl-1'>
              Gallery expires after 7 days
              <br />
            </span>
          </p>
            <button
              onClick={() => handleCheckout('standard')}
              className='
                bg-[#ff6b6b] text-[#fff] p-2 rounded-2xl mt-4
                cursor-pointer w-full
              '
            >
              Get Standard
            </button>
        </div>
        {/* Plan 2 */}
        <div
          className='
            flex flex-col items-left w-[350px] h-[500px]
            bg-[#ff6b6b] rounded-2xl p-8 gap-2 z-30
            text-[#fff]
          '
        >
          <h1 className='font-bold text-2xl'>Plus</h1>
          <p className='text-xs mt-[-12px]'>Recommended for Big Events</p>
          <h1 className='text-xl'>
            ₱<span className='text-4xl '>1,500.00</span>/ event
          </h1>
          <p className='text-sm'>
            Upgrade to Plus to get high quality photo uploads while having
            more storage.
          </p>
          <p className='mt-4'>
            ✔{' '}
            <span className='text-sm pl-1'>
              Everything in Standard<br />
            </span>
            ✔{' '}
            <span className='text-sm pl-1'>
              <span className='font-bold'>High quality</span> photo uploads{' '}
              <br />
            </span>
            ✔{' '}
            <span className='text-sm pl-1'>
              Up to <span className='font-bold'>2 GB</span> of photo uploads{' '}
              {'(up to 1,000 photos)'}
              <br />
            </span>
            ✔{' '}
            <span className='text-sm pl-1'>
              Gallery expires after <span className='font-bold'>14 days</span>
              <br />
            </span>
            <br />
            <br />
            <br />
          </p>
          <button
            onClick={() => handleCheckout('plus')}
            className='
              bg-[#fff] p-2 rounded-2xl
              mt-4 cursor-pointer text-[#000]'
          >
            Get Plus
          </button>
        </div>
      </div>
    </div>
  );
}
