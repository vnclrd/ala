import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import { FaArrowLeftLong } from 'react-icons/fa6'

export default function Checkout() {
  const location = useLocation()
  const navigate = useNavigate()
  const { plan } = useParams()

  const [paymentComplete, setPaymentComplete] = useState(false)
  const [eventDate, setEventDate] = useState<string>("") // store selected date
  const [eventName, setEventName] = useState<string>("")

  interface GalleryData {
    qrCodeDataUrl: string;
    sixDigitCode: string;
    galleryUrl?: string;
  }
  const [galleryData, setGalleryData] = useState<GalleryData | null>(null)

  useEffect(() => {
    if (!location.state?.allowed) {
      navigate('/plans')
    }
  }, [location.state, navigate])

  const handlePay = async () => {
    if (!eventDate || !eventName || eventName === '') {
      alert("Please enter the details above before proceeding.")
      return
    }

    const payButton = document.getElementById('payButton') as HTMLInputElement | null
    const returnHomeButton = document.getElementById('returnHomeButton') as HTMLInputElement | null
    const qrCode = document.getElementById('qrCode') as HTMLInputElement | null
    const code = document.getElementById('code') as HTMLInputElement | null
    const codesDescription = document.getElementById('codesDescription') as HTMLInputElement | null
    const downloadQRButton = document.getElementById('downloadQRButton')

    const enablePayButton = () => {
      if (payButton) {
        payButton.disabled = false
        payButton.style.backgroundColor = ''
        payButton.style.cursor = 'pointer'
      }
    }

    const disablePayButton = () => {
      if (payButton) {
        payButton.disabled = true
        payButton.style.backgroundColor = 'gray'
        payButton.style.cursor = 'not-allowed'
      }
    }

    interface GalleryData {
      qrCodeDataUrl: string;
      sixDigitCode: string;
    }

    const successfulTransaction = (data: GalleryData) => {
      if (returnHomeButton && qrCode && code && codesDescription && downloadQRButton) {
        const img = document.createElement('img')
        img.src = data.qrCodeDataUrl
        img.style.width = '100%'
        img.style.height = '100%'
        img.style.objectFit = 'contain'
        qrCode.innerHTML = ''
        qrCode.appendChild(img)

        code.textContent = data.sixDigitCode

        returnHomeButton.hidden = false
        qrCode.hidden = false
        code.hidden = false
        codesDescription.hidden = false
        downloadQRButton.hidden = false

        setGalleryData(data)
      }
    }

    disablePayButton()

    try {
      const response = await fetch('http://localhost:4000/create-invoice', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan, eventDate, eventName }), // Make sure eventName is a string
      });
      const data = await response.json();

      const checkoutUrl = data.invoice_url || data.checkout_url || null;

      if (checkoutUrl) {
        window.open(checkoutUrl, '_blank');

        const encodedEventName = encodeURIComponent(eventName); // Encode the event name
        const encodedEventDate = encodeURIComponent(eventDate);
      
        const poll = setInterval(async () => {
          try {
            // Update this line to include eventName in the query
            const statusRes = await fetch(
              `http://localhost:4000/invoice/${data.id}?plan=${plan}&eventName=${encodedEventName}&eventDate=${encodedEventDate}`
            );
            const statusData = await statusRes.json();
            console.log('Invoice status:', statusData.status);

            if (statusData.status === 'PAID') {
              clearInterval(poll);
              setPaymentComplete(true);
              disablePayButton();
              successfulTransaction(statusData);

              // The backend now handles saving the event date
            } else if (
              statusData.status === 'EXPIRED' ||
              statusData.status === 'CANCELLED'
            ) {
              clearInterval(poll);
              alert('Payment expired or was cancelled.');
              enablePayButton();
            }
          } catch (err) {
            console.error('Polling error:', err);
            clearInterval(poll);
            alert('Something went wrong. Please try again.');
            enablePayButton();
          }
        }, 5000);
      } else {
        alert('No checkout link available. Please try again.');
        enablePayButton();
      }
    } catch (err) {
      console.error('Payment error:', err);
      alert('Something went wrong while creating invoice.');
      enablePayButton();
    }
  }

  const downloadQRCode = () => {
    if (galleryData && galleryData.qrCodeDataUrl) {
      const link = document.createElement('a')
      link.download = `ala-qr-code-${galleryData.sixDigitCode}.png`
      link.href = galleryData.qrCodeDataUrl
      link.click()
    }
  }

  const copyCodeToClipboard = () => {
    if (galleryData && galleryData.sixDigitCode) {
      navigator.clipboard.writeText(galleryData.sixDigitCode).then(() => {
        alert('Code copied to clipboard!')
      }).catch(() => {
        alert('Failed to copy code')
      })
    }
  }

  const copyGalleryLink = () => {
    if (galleryData && galleryData.galleryUrl) {
      navigator.clipboard.writeText(galleryData.galleryUrl).then(() => {
        alert('Gallery link copied to clipboard!')
      }).catch(() => {
        alert('Failed to copy link')
      })
    }
  }

  return (
    <>
      {plan === 'standard' && (
        <div className='flex flex-col relative items-center justify-center lg:w-screen lg:h-screen'>
          {/* Title and Tagline */}
          <div className='flex items-center justify-center m-4 gap-2 w-[300px] lg:w-[700px] lg:justify-start'>
            <Link
              to='/plans'
              id='cancelTransaction'
              className='text-[#808080] text-sm font-medium cursor-pointer lg:p-0 hover:underline'
            >
              <FaArrowLeftLong className='w-6 h-6 mt-4' />
            </Link>
            <div className='flex flex-col mr-8 text-[#fff] lg:mr-10'>
              <h1 className='text-[#000] italic font-bold text-[4rem]'>Ala</h1>
              <div className='flex text-[0.6rem] text-[#000] mt-[-20px]'>
                <h1>Capture. &nbsp;</h1>
                <h1>Share. &nbsp;</h1>
                <h1>Gather.</h1>
              </div>
            </div>
          </div>
          {/* Panels Container */}
          <div className='flex flex-col items-center justify-center gap-6 lg:flex-row lg:gap-24'>
            {/* Left Panel */}
            <div className='flex relative w-[300px] h-[600px]'>
              <div className='flex flex-col'>
                <p>Get</p>
                <h1 className='text-2xl mt-[-4px]'><span className='font-bold'>Standard</span> Plan</h1>
                <h1 className='text-sm'>
                  <span className='text-4xl font-bold'>₱1,000.00</span> for 1 event
                </h1>
                <div className='flex flex-col w-[275px] mt-4'>
                  <p>
                    <span className='font-bold'>500 MB</span> Photo Storage{' '}
                    <span className='text-[0.6rem]'>{'(up to 500 photos)'}</span>
                  </p>
                  <p>
                    <span className='font-bold'>Standard Quality</span> Photos
                  </p>
                </div>
                <h1 className='mt-4'>What's next after availing?</h1>
                <p>
                  ✔ <span className='text-sm pl-1'>Get your QR Code<br /></span>
                  ✔ <span className='text-sm pl-1'>Get your Photo Gallery Code<br /></span>
                  ✔ <span className='text-sm pl-1'>Share the codes to your guests on the day of your event</span>
                  <br />
                  <span className='flex font-bold mt-2'>Note:</span>
                  <div className='flex flex-col w-[300px] gap-2'>
                    <span className='text-xs'>
                      Photo gallery will expire after 7 days so make sure to download the photos.
                    </span>
                    <span className='text-xs'>
                      Photos will automatically be compressed and sent to your Google Drive if not downloaded before expiry.
                    </span>
                  </div>
                </p>
                <div className='flex flex-col items-center justify-center gap-4'>
                  <p className='flex text-xs mt-4'>Enter the name and date of your event below.</p>
                  <input
                    onChange={(e) => setEventName(e.target.value)}
                    type="text"
                    placeholder='Enter event name here'
                    className='w-[250px] h-[30px] bg-[#fff]/60 rounded-2xl p-4'
                  />
                  {/* Date Picker */}
                  <input
                    onChange={(e) => setEventDate(e.target.value)}
                    type="date"
                    name="eventDate"
                    min={new Date().toISOString().split("T")[0]} // disables past dates
                    value={eventDate}
                    className="w-[150px] h-[40px] border rounded p-2"
                  />
                </div>
                <button
                  onClick={handlePay}
                  id='payButton'
                  className='
                    absolute bottom-0 w-[300px] p-2 bg-[#ff6b6b] rounded-2xl
                    cursor-pointer text-[#fff] mt-4
                  '
                >
                  Click to pay
                </button>
              </div>
            </div>
            {/* Payment Success Popup */}
            {paymentComplete && (
              <div className='w-[350px] p-4 bg-green-100 border border-green-400 rounded-lg text-center lg:absolute lg:bottom-4 lg:right-4'>
                <h2 className='text-lg font-bold text-green-700'>Payment Successful 🎉</h2>
                <p>Your payment has been confirmed.</p>
              </div>
            )}
            {/* Right Panel */}
            <div className='flex flex-col relative items-center w-[300px] h-[500px] gap-4'>
              <h1 className='text-black text-center text-sm'>
                Your codes for your event will appear here after the payment has been successful.
              </h1>
              {/* Codes House */}
              <div className='flex flex-col items-center justify-start w-[250px] h-[275px] border-1 border-black rounded-2xl'>
                <div
                  id='qrCode'
                  hidden
                  className='w-[225px] h-[225px] mt-4 bg-gray-100 rounded-2xl flex items-center justify-center overflow-hidden'
                ></div>
                <p id='code' hidden className='text-black p-2 font-bold text-lg cursor-pointer hover:bg-gray-100 rounded' onClick={copyCodeToClipboard}>
                  123456
                </p>
              </div>
              <div
                id='codesDescription'
                hidden
                className='flex flex-col items-center justify-center text-center text-xs w-[250px] h-[100px] gap-2'
              >
                Save the codes and share them with your guests on the day of your event.
                <div className='flex flex-col gap-2'>
                  <button
                    id='downloadQRButton'
                    hidden
                    onClick={downloadQRCode}
                    className='text-blue-600 underline cursor-pointer hover:italic text-xs'
                  >
                    Download QR Code
                  </button>
                  <button
                    onClick={copyGalleryLink}
                    className='text-blue-600 underline cursor-pointer hover:italic text-xs'
                  >
                    Copy Gallery Link
                  </button>
                </div>
              </div>
              <Link
                to='/'
                id='returnHomeButton'
                hidden
                className='
                  flex items-center justify-center absolute bottom-0 w-[300px]
                  p-2 bg-[#ff6b6b] rounded-2xl cursor-pointer text-[#fff]
                '
              >
                Return to Home
              </Link>
            </div>
          </div>
          <br />
        </div>
      )}
      
      {/* ================================================== */}

      {plan === 'plus' && (
        <div
          className='
            flex flex-col relative items-center justify-center bg-[#ff6b6b]
            lg:w-screen lg:h-screen
          '
        >
          {/* Title and Tagline */}
          <div
            className='
              flex items-center justify-center m-4 gap-2 w-[300px]
              lg:w-[700px] lg:justify-start
            '
          >
            <Link
              to='/plans'
              id='cancelTransaction'
              className='text-[#808080] text-sm font-medium cursor-pointer lg:p-0 hover:underline'
            >
              <FaArrowLeftLong className='w-6 h-6 mt-4' />
            </Link>
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
          {/* Panels Container */}
          <div
            className='
              flex flex-col items-center justify-center gap-6 text-[#fff]
              lg:flex-row lg:gap-24
            '
          >
            {/* Left Panel */}
            <div className='flex relative w-[300px] h-[500px]'>
              <div className='flex flex-col'>
                <p>Get</p>
                <h1 className='text-2xl mt-[-4px]'><span className='font-bold'>Plus</span> Plan</h1>
                <h1 className='text-sm'>
                  <span className='text-4xl font-bold'>₱1,500.00</span> for 1
                  event
                </h1>
                <div className='flex flex-col w-[275px] mt-4'>
                  <p>
                    <span className='font-bold'>2 GB</span> Photo Storage{' '}
                    <span className='text-[0.6rem]'>
                      {'(up to 1,000 photos)'}
                    </span>
                  </p>
                  <p>
                    <span className='font-bold'>High Quality</span> Photos
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
                    Share the codes to your guests on the day of your event
                  </span>
                  <br />
                  <br />
                  <span className='font-bold'>Note:</span> <br />
                  <div className='flex flex-col w-[300px] gap-2'>
                    <span className='text-xs'>
                      Photo gallery will expire after 14 days so make sure to
                      download the photos.
                    </span>
                    <span className='text-xs'>
                      Photos will automatically be compressed and sent to your
                      Google Drive if not downloaded before expiry.
                    </span>
                  </div>
                </p>
                <button
                  onClick={handlePay}
                  id='payButton'
                  className='
                    absolute bottom-0 w-[300px] p-2 bg-[#fff]
                    rounded-2xl cursor-pointer text-[#000] mt-4
                  '
                >
                  Click to pay
                </button>
              </div>
            </div>
            {/* Payment Success Popup */}
            {paymentComplete && (
              <div
                className='
                  w-[350px] p-4 bg-green-100 border border-green-400
                  rounded-lg text-center text-[#000]
                  lg:absolute lg:bottom-4 lg:right-4
                '
              >
                <h2 className='text-lg font-bold text-green-700'>
                  Payment Successful 🎉
                </h2>
                <p>Your payment has been confirmed.</p>
              </div>
            )}
            {/* Right Panel */}
            <div
              className='
                flex flex-col relative items-center
                w-[300px] h-[500px] gap-4 text-[#fff]
              '
            >
              {/* Codes */}
              <h1 className='text-center text-sm'>
                Your codes for your event will appear here after the payment has
                been successful.
              </h1>
              {/* Codes House */}
              <div
                className='
                  flex flex-col items-center justify-start w-[250px]
                  h-[275px] border-1 border-[#fff] rounded-2xl
                '
              >
                <div
                  id='qrCode'
                  hidden
                  className='w-[225px] h-[225px] mt-4 bg-[#fff] rounded-2xl'
                ></div>
                <p id='code' hidden className='p-2'>
                  123456
                </p>
              </div>
              <div
                id='codesDescription'
                hidden
                className='
                  flex flex-col items-center justify-center text-center
                  text-xs w-[250px] h-[100px] gap-2
                '
              >
                Save the codes and share it to your guests on the day of your
                event.
                <p>
                  <button>
                    <span className='underline cursor-pointer hover:italic'>
                      Click here
                    </span>
                  </button>
                  &nbsp;to save the QR code
                </p>
              </div>
              <Link
                to='/'
                id='returnHomeButton'
                hidden
                className='
                  flex items-center justify-center absolute bottom-0 w-[300px]
                  p-2 bg-[#fff] rounded-2xl cursor-pointer text-[#000]
                '
              >
                Return to Home
              </Link>
            </div>
          </div>
          <br />
        </div>
      )}
    </>
  )
}
