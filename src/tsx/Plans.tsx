import { Link } from 'react-router-dom'

export default function Plans() {
  return (
    <div className='flex items-center justify-center w-screen h-screen'>
      <div
        className='
          flex flex-col items-center justify-center w-screen
          h-screen bg-[#000]/60 gap-8 z-99999
          lg:pt-40
        '
      >
        <div className='flex flex-col items-center mt-[-100px]'>
          {/* Title */}
          <h1 className='text-[#fff] italic font-bold text-8xl'>
            Ala
          </h1>
          {/* Tagline */}
          <div className='flex text-sm text-[#fff] mt-[-6px]'>
            <h1>Capture. &nbsp;</h1>
            <h1>Share. &nbsp;</h1>
            <h1>Relive.</h1>
          </div>
        </div>

        {/* Plans */}
        <div className='flex gap-4'>
          {/* Plan 1 */}
          <div
            className='
              flex flex-col items-left w-[350px] h-[450px]
              bg-[#fff] rounded-2xl p-8 gap-2 z-30
            '
          >
            <h1 className='font-bold text-2xl'>Standard</h1>
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
                Special QR Code <br />
              </span>
              ✔{' '}
              <span className='text-sm pl-1'>
                Dedicated photo gallery <br />
              </span>
              ✔{' '}
              <span className='text-sm pl-1'>
                Real-time photo display <br />
              </span>
              ✔{' '}
              <span className='text-sm pl-1'>
                Standard quality photo uploads <br />
              </span>
              ✔{' '}
              <span className='text-sm pl-1'>
                Up to 1 GB of photo uploads {'(approx. 1,000* photos)'}
                <br />
              </span>
            </p>
            <button
              className='
                bg-[#ff6b6b] text-[#fff] p-2
                rounded-2xl mt-4 cursor-pointer
              '
            >
              Get Standard
            </button>
          </div>
          {/* Plan 2 */}
          <div
            className='
              flex flex-col items-left w-[350px] h-[450px]
              bg-[#ff6b6b] rounded-2xl p-8 gap-2 z-30
            '
          >
            <h1 className='font-bold text-2xl text-[#fff]'>Plus</h1>
            <h1 className='text-xl text-[#fff]'>
              ₱<span className='text-4xl '>1,500.00</span>/ event
            </h1>
            <p className='text-sm text-[#fff]'>
              Upgrade to Plus to get high quality photo uploads while having
              more storage.
            </p>
            <p className='mt-4 text-[#fff]'>
              ✔{' '}
              <span className='text-sm pl-1'>
                Everything in Standard <br />
              </span>
              ✔{' '}
              <span className='text-sm pl-1'>
                <span className='font-bold'>High quality</span> photo uploads{' '}
                <br />
              </span>
              ✔{' '}
              <span className='text-sm pl-1'>
                Up to <span className='font-bold'>5 GB</span> of photo uploads{' '}
                {'(approx. 2,500* photos)'}
                <br />
              </span>
              <br />
              <br />
            </p>
            <button className='bg-[#fff] p-2 rounded-2xl mt-4 cursor-pointer'>
              Get Plus
            </button>
          </div>
        </div>
        <Link to='/'>
          <button
            className='
              bg-[#fff] text-[#000] text-sm font-medium cursor-pointer
              p-4 rounded-2xl
            '
          >
            Close Plans
          </button>
        </Link>
        
      </div>
    </div>
  );
}
