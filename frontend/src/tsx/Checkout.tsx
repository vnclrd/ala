import { useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

export default function Checkout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { plan } = useParams();

  useEffect(() => {
    if (!location.state?.allowed) {
      navigate('/plans');
    }
  }, [location.state, navigate]);

  return (
    <>
      {plan === 'standard' && (
        <div className='flex flex-col items-center justify-center w-screen h-screen'>
          {/* Title and Tagline */}
          <div
            className='
              flex flex-col items-center
            '
          >
            <h1 className='text-[#000] italic font-bold text-[4rem]'>Ala</h1>
            <div className='flex text-[0.6rem] text-[#000] mt-[-24px]'>
              <h1>Capture. &nbsp;</h1>
              <h1>Share. &nbsp;</h1>
              <h1>Gather.</h1>
            </div>
          </div>

          <div className='flex gap-24'>
            {/* Standard Plan Contents */}
            <div className='flex flex-col w-[300px]'>
              <div className='flex flex-col'>
                <p>Get</p>
                <h1 className='text-2xl mt-[-4px]'>Standard Plan</h1>
                <h1 className='text-sm'>
                  <span className='text-4xl font-bold'>₱1,000.00</span> for 1
                  event
                </h1>
                <div className='flex flex-col w-[275px] mt-4'>
                  <p>
                    <span className='font-bold'>500 MB</span> Photo Storage
                  </p>
                  <p className='text-xs'>Up to 500* Photos</p>
                  <p>
                    <span className='font-bold'>Standard Quality</span> Photos
                  </p>
                </div>
                <h1 className='mt-4'>What's next after availing?</h1>
                <p>
                  ✔{' '}
                  <span className='text-sm pl-1'>
                    Get your QR Code
                    <br />
                  </span>
                  ✔{' '}
                  <span className='text-sm pl-1'>
                    Get your Photo Gallery Code
                    <br />
                  </span>
                  ✔{' '}
                  <span className='text-sm pl-1'>
                    Share the codes to your guests <br />
                    on the day of your event
                  </span>
                  <br />
                  <br />
                  <span className='font-bold'>Note:</span> <br />
                  <div className='flex flex-col w-[275px] gap-2'>
                    <span className='text-xs'>
                      Photo gallery will expire after 7 days so make sure to
                      download the photos.
                    </span>
                    <span className='text-xs'>
                      Photos will automatically be compressed and sent to your
                      Google Drive if not downloaded before expiry.
                    </span>
                  </div>
                </p>
              </div>
            </div>
            {/* Payment Details */}
            <div className='flex items-center justify-center w-[400px] h-[600px] bg-amber-200'>
            <button
              className='p-4 bg-[#fff] rounded-2xl cursor-pointer'
            >
              Click to pay
            </button>
            </div>

          </div>
        </div>
      )}

      {plan === 'plus' && <p>You selected the Plus Plan</p>}
    </>
  );
}
