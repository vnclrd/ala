import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import { FaArrowLeftLong } from 'react-icons/fa6'
import { FaCalendar } from 'react-icons/fa'
import Flatpickr from 'react-flatpickr'
import "flatpickr/dist/themes/light.css" // or "dark.css"
import { ImSpinner2 } from 'react-icons/im'
import { BiCopy } from 'react-icons/bi'

export default function Checkout() {
  const location = useLocation()
  const navigate = useNavigate()
  const { plan } = useParams()

  const [paymentComplete, setPaymentComplete] = useState(false)
  const [eventName, setEventName] = useState("")
  const [eventDate, setEventDate] = useState("")
  const [isButtonDisabled, setIsButtonDisabled] = useState(true)
  const [isEventNameDateDisabled, setIsEventNameDateDisabled] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isCopied, setIsCopied] = useState(false)

  interface GalleryData {
    qrCodeDataUrl: string
    sixDigitCode: string
    galleryUrl?: string
  }
  const [galleryData, setGalleryData] = useState<GalleryData | null>(null)

  useEffect(() => {
    if (!location.state?.allowed) {
      navigate('/plans')
    }
  }, [location.state, navigate])

  useEffect(() => {
    if (eventName.trim() !== '' && eventDate.trim() !== '') {
      setIsButtonDisabled(false)
    } else {
      setIsButtonDisabled(true)
    }
  }, [eventName, eventDate])

  useEffect(() => {
    if (eventName && eventDate) {
      setIsEventNameDateDisabled(true)
    } else {
      setIsEventNameDateDisabled(false)
    }
  })

  const handlePay = async () => {
    setIsLoading(true)
    setIsEventNameDateDisabled(true)
    
    try {
      const response = await fetch('http://localhost:4000/create-invoice', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan, eventDate, eventName }),
      })
      const data = await response.json()

      const checkoutUrl = data.invoice_url || data.checkout_url || null

      if (checkoutUrl) {
        window.open(checkoutUrl, '_blank')

        const encodedEventName = encodeURIComponent(eventName)
        const encodedEventDate = encodeURIComponent(eventDate)
      
        const poll = setInterval(async () => {
          try {
            const statusRes = await fetch(
              `http://localhost:4000/invoice/${data.id}?plan=${plan}&eventName=${encodedEventName}&eventDate=${encodedEventDate}`
            )
            const statusData = await statusRes.json()

            if (statusData.status === 'PAID') {
              clearInterval(poll)
              setPaymentComplete(true)
              setGalleryData(statusData)
              setIsLoading(false)
              setIsButtonDisabled(true)
              setIsEventNameDateDisabled(true)
            } else if (
              statusData.status === 'EXPIRED' ||
              statusData.status === 'CANCELLED'
            ) {
              clearInterval(poll)
              setIsLoading(false)
              setIsEventNameDateDisabled(false)
              alert('Payment expired or was cancelled.')
            }
          } catch (err) {
            console.error('Polling error:', err)
            clearInterval(poll)
            setIsLoading(false)
            setIsEventNameDateDisabled(false)
            alert('Something went wrong. Please try again.')
          }
        }, 5000)
      } else {
        setIsLoading(false)
        setIsEventNameDateDisabled(false)
        alert('No checkout link available. Please try again.')
      }
    } catch (err) {
      console.error('Payment error:', err)
      setIsLoading(false)
      setIsEventNameDateDisabled(false)
      alert('Something went wrong while creating invoice.')
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
      navigator.clipboard.writeText(galleryData.sixDigitCode)
      setIsCopied(true)
      setTimeout(() => {
        setIsCopied(false)
      }, 2000)
    }
  }

  return (
    <>
      {plan === 'standard' && (
        <div className='flex flex-col items-center justify-center bg-[#fff] lg:w-screen lg:h-screen'>
          {/* Title and Tagline */}
          <div className='flex items-center justify-center gap-2 m-4 w-[300px] lg:w-[700px] lg:justify-start'>
            <Link
              to='/plans'
              id='cancelTransaction'
              className='text-[#000]/60 text-sm font-medium cursor-pointer lg:p-0 hover:underline'
            >
              <FaArrowLeftLong className='w-6 h-6 mt-4' />
            </Link>
            <div className='flex flex-col mr-8 lg:mr-10'>
              <h1 className='italic font-bold text-[4rem] lg:mt-[-12px]'>Ala</h1>
              <div className='flex text-[0.6rem] mt-[-20px]'>
                <h1>Capture. &nbsp;</h1>
                <h1>Share. &nbsp;</h1>
                <h1>Gather.</h1>
              </div>
            </div>
          </div>
          {/* Panels Container */}
          <div className='flex flex-col items-center justify-center gap-6 lg:flex-row lg:gap-24'>
            {/* Left Panel */}
            <div className='flex w-[300px] h-[525px] relative'>
              <div className='flex flex-col'>
                <p>Get</p>
                <h1 className='text-xl mt-[-4px]'><span className='font-bold'>Standard</span> Plan</h1>
                <h1 className='text-sm'>
                  <span className='text-4xl font-bold'>₱1,000.00</span> for 1 event
                </h1>
                <div className='flex flex-col w-[275px] mt-2'>
                  <p>
                    <span className='font-bold'>500 MB</span> Photo Storage{' '}
                    <span className='text-[0.6rem]'>{'(up to 500 photos)'}</span>
                  </p>
                  <p>
                    <span className='font-bold'>Standard Quality</span> Photos
                  </p>
                </div>
                <h1 className='mt-2 text-sm'>What's next after availing?</h1>
                <p>
                  ✔ <span className='text-xs pl-1'>Get your QR Code<br /></span>
                  ✔ <span className='text-xs pl-1'>Get your Photo Gallery Code<br /></span>
                  ✔ <span className='text-xs pl-1'>Share the codes to your guests on the day of your event</span>
                  <br />
                  <span className='flex font-bold text-xs mt-2'>Note:</span>
                  <div className='flex flex-col w-[300px] gap-2'>
                    <span className='text-xs'>
                      Photo gallery will expire after 7 days so make sure to download the photos.
                    </span>
                  </div>
                </p>
                <div className='flex flex-col items-center justify-center gap-4 mt-2'>
                  <p className='flex text-xs mt-4 font-bold'>Enter the name and date of your event below.</p>
                  {/* Enter Event Name */}
                  <input
                    onChange={(e) => setEventName(e.target.value)}
                    type="text"
                    placeholder='Enter event name here'
                    value={eventName}
                    disabled={isLoading || isEventNameDateDisabled}
                    className='
                      w-[250px] h-[30px] bg-[#000]/20 rounded-2xl p-4 text-center
                      disabled:cursor-not-allowed
                    '
                  />
                  {/* Date Picker */}
                  <div className="flex relative items-center justify-start w-[225px] h-[40px] border rounded p-4">
                    <FaCalendar className="text-[#000]" />
                    <Flatpickr
                      options={{
                        minDate: "today",
                        dateFormat: "Y-m-d",
                        altInput: true,
                        altFormat: "F j, Y",
                      }}
                      value={eventDate}
                      onChange={([date]) => setEventDate(date instanceof Date ? date.toISOString().split("T")[0] : "")}
                      placeholder='Select date here'
                      disabled={isLoading || isEventNameDateDisabled}
                      className="
                        w-[160px] absolute right-4 cursor-pointer
                        disabled:cursor-not-allowed
                      "
                    />
                  </div>
                </div>
                {/* Pay Button */}
                <button
                  onClick={handlePay}
                  disabled={isButtonDisabled || isLoading}
                  className='
                    absolute bottom-0 w-[300px] h-[40px] p-2 bg-[#ff6b6b] rounded-2xl mt-4
                    cursor-pointer text-[#fff] items-center justify-center flex
                    disabled:bg-[#808080] disabled:cursor-not-allowed
                  '
                >
                  {isLoading ? <ImSpinner2 className='items-center w-6 h-6 animate-spin' /> : 'Click to Pay'}
                </button>
              </div>
            </div>

            {/* Payment Success Popup */}
            {paymentComplete && (
              <div className='w-[300px] p-4 bg-green-100 border border-green-400 rounded-lg text-center lg:absolute lg:bottom-4 lg:right-4'>
                <h2 className='text-lg font-bold text-green-700'>Payment Successful 🎉</h2>
                <p className='text-sm'>Your payment has been confirmed.</p>
              </div>
            )}
            {/* Right Panel - Codes House */}
            <div className='flex flex-col relative items-center w-[300px] h-[525px] gap-6'>
              <h1 className='text-center text-sm'>
                Your codes for your event will appear here after the payment has been successful.
              </h1>
              {galleryData && (
                <div className='flex flex-col items-center justify-start w-[250px] h-[325px] border-1 border-[#000] rounded-2xl p-4 gap-2'>
                  <h1 className='flex text-center justify-center w-[200px] font-bold overflow-hidden'>{eventName}</h1>
                  <h1 className='flex text-center text-xs justify-center w-[200px] mt-[-10px]'>{eventDate}</h1>
                  <div
                    className='w-[225px] h-[225px] rounded-2xl flex items-center justify-center overflow-hidden'
                  >
                    <img src={galleryData.qrCodeDataUrl} style={{ width: '100%', height: '100%', objectFit: 'contain' }} alt="QR Code" />
                  </div>
                  <div className='flex flex-col items-center justify-center'>
                    <p className='flex font-bold text-lg rounded'>
                      {galleryData.sixDigitCode}
                    </p>
                    {isCopied ? (
                      <p className='text-xs'>✔ Copied</p>
                    ) : (
                      <button
                        onClick={copyCodeToClipboard}
                        className='flex items-center justify-center text-xs cursor-pointer'
                      >
                        <BiCopy />&nbsp;Copy code
                      </button>
                    )}
                  </div>
                </div>
              )}
              {galleryData && (
                <div
                  className='flex flex-col items-center justify-center text-center text-xs w-[250px] gap-2'
                >
                  Save the codes and share them with your guests on the day of your event.
                  <div className='flex flex-col'>
                    <button
                      onClick={downloadQRCode}
                      className='text-blue-600 underline cursor-pointer hover:italic text-xs'
                    >
                      Download QR Code
                    </button>
                  </div>
                </div>
              )}
              {galleryData && (
                <Link
                  to='/'
                  className='
                    flex items-center justify-center absolute bottom-0 w-[300px]
                    p-2 bg-[#ff6b6b] rounded-2xl cursor-pointer text-[#fff]
                  '
                >
                  Return to Home
                </Link>
              )}
            </div>
          </div>
          <br />
        </div>
      )}
      
      {/* ================================================== */}

      {plan === 'plus' && (
        <div className='flex flex-col items-center justify-center bg-[#ff6b6b] text-[#fff] lg:w-screen lg:h-screen'>
          {/* Title and Tagline */}
          <div className='flex items-center justify-center gap-2 m-4 w-[300px] lg:w-[700px] lg:justify-start'>
            <Link
              to='/plans'
              id='cancelTransaction'
              className='text-[#fff]/60 text-sm font-medium cursor-pointer lg:p-0 hover:underline'
            >
              <FaArrowLeftLong className='w-6 h-6 mt-4' />
            </Link>
            <div className='flex flex-col mr-8 lg:mr-10'>
              <h1 className='italic font-bold text-[4rem] lg:mt-[-12px]'>Ala</h1>
              <div className='flex text-[0.6rem] mt-[-20px]'>
                <h1>Capture. &nbsp;</h1>
                <h1>Share. &nbsp;</h1>
                <h1>Gather.</h1>
              </div>
            </div>
          </div>
          {/* Panels Container */}
          <div className='flex flex-col items-center justify-center gap-6 lg:flex-row lg:gap-24'>
            {/* Left Panel */}
            <div className='flex w-[300px] h-[525px] relative'>
              <div className='flex flex-col'>
                <p>Get</p>
                <h1 className='text-xl mt-[-4px]'><span className='font-bold'>Plus</span> Plan</h1>
                <h1 className='text-sm'>
                  <span className='text-4xl font-bold'>₱1,500.00</span> for 1 event
                </h1>
                <div className='flex flex-col w-[275px] mt-2'>
                  <p>
                    <span className='font-bold'>2 GB</span> Photo Storage{' '}
                    <span className='text-[0.6rem]'>{'(up to 1,000 photos)'}</span>
                  </p>
                  <p>
                    <span className='font-bold'>High Quality</span> Photos
                  </p>
                </div>
                <h1 className='mt-2 text-sm'>What's next after availing?</h1>
                <p>
                  ✔ <span className='text-xs pl-1'>Get your QR Code<br /></span>
                  ✔ <span className='text-xs pl-1'>Get your Photo Gallery Code<br /></span>
                  ✔ <span className='text-xs pl-1'>Share the codes to your guests on the day of your event</span>
                  <br />
                  <span className='flex font-bold text-xs mt-2'>Note:</span>
                  <div className='flex flex-col w-[300px] gap-2'>
                    <span className='text-xs'>
                      Photo gallery will expire after 14 days so make sure to download the photos.
                    </span>
                  </div>
                </p>
                <div className='flex flex-col items-center justify-center gap-4 mt-2'>
                  <p className='flex text-xs mt-4 font-bold'>Enter the name and date of your event below.</p>
                  {/* Enter Event Name */}
                  <input
                    onChange={(e) => setEventName(e.target.value)}
                    type="text"
                    placeholder='Enter event name here'
                    value={eventName}
                    disabled={isLoading || isEventNameDateDisabled}
                    className='
                      w-[250px] h-[30px] bg-[#000]/20 rounded-2xl p-4 text-center
                      disabled:cursor-not-allowed
                    '
                  />
                  {/* Date Picker */}
                  <div className="flex relative items-center justify-start w-[225px] h-[40px] border rounded p-4">
                    <FaCalendar className="text-[#fff]" />
                    <Flatpickr
                      options={{
                        minDate: "today",
                        dateFormat: "Y-m-d",
                        altInput: true,
                        altFormat: "F j, Y",
                      }}
                      value={eventDate}
                      onChange={([date]) => setEventDate(date instanceof Date ? date.toISOString().split("T")[0] : "")}
                      placeholder='Select date here'
                      disabled={isLoading || isEventNameDateDisabled}
                      className="
                        w-[160px] absolute right-4 cursor-pointer
                        disabled:cursor-not-allowed
                      "
                    />
                  </div>
                </div>
                {/* Pay Button */}
                <button
                  onClick={handlePay}
                  disabled={isButtonDisabled || isLoading}
                  className='
                    absolute bottom-0 w-[300px] h-[40px] p-2 bg-[#fff] rounded-2xl mt-4
                    cursor-pointer text-[#000] items-center justify-center flex
                    disabled:bg-[#808080] disabled:cursor-not-allowed
                  '
                >
                  {isLoading ? <ImSpinner2 className='items-center w-6 h-6 animate-spin text-[#fff]' /> : 'Click to Pay'}
                </button>
              </div>
            </div>

            {/* Payment Success Popup */}
            {paymentComplete && (
              <div className='w-[300px] p-4 bg-green-100 border border-green-400 rounded-lg text-center lg:absolute lg:bottom-4 lg:right-4'>
                <h2 className='text-lg font-bold text-green-700'>Payment Successful 🎉</h2>
                <p className='text-sm text-[#000]'>Your payment has been confirmed.</p>
              </div>
            )}
            {/* Right Panel - Codes House */}
            <div className='flex flex-col relative items-center w-[300px] h-[525px] gap-6'>
              <h1 className='text-center text-sm'>
                Your codes for your event will appear here after the payment has been successful.
              </h1>
              {galleryData && (
                <div className='flex flex-col items-center justify-start w-[250px] h-[325px] border-1 border-[#fff] rounded-2xl p-4 gap-2'>
                  <h1 className='flex text-center justify-center w-[200px] font-bold overflow-hidden'>{eventName}</h1>
                  <h1 className='flex text-center text-xs justify-center w-[200px] mt-[-10px]'>{eventDate}</h1>
                  <div
                    className='w-[225px] h-[225px] rounded-2xl flex items-center justify-center overflow-hidden'
                  >
                    <img src={galleryData.qrCodeDataUrl} style={{ width: '100%', height: '100%', objectFit: 'contain' }} alt="QR Code" />
                  </div>
                  <div className='flex flex-col items-center justify-center'>
                    <p className='flex font-bold text-lg rounded'>
                      {galleryData.sixDigitCode}
                    </p>
                    {isCopied ? (
                      <p className='text-xs'>✔ Copied</p>
                    ) : (
                      <button
                        onClick={copyCodeToClipboard}
                        className='flex items-center justify-center text-xs cursor-pointer'
                      >
                        <BiCopy />&nbsp;Copy code
                      </button>
                    )}
                  </div>
                </div>
              )}
              {galleryData && (
                <div
                  className='flex flex-col items-center justify-center text-center text-xs w-[250px] gap-2'
                >
                  Save the codes and share them with your guests on the day of your event.
                  <div className='flex flex-col'>
                    <button
                      onClick={downloadQRCode}
                      className='text-blue-600 underline cursor-pointer hover:italic text-xs'
                    >
                      Download QR Code
                    </button>
                  </div>
                </div>
              )}
              {galleryData && (
                <Link
                  to='/'
                  className='
                    flex items-center justify-center absolute bottom-0 w-[300px]
                    p-2 bg-[#fff] rounded-2xl cursor-pointer text-[#000]
                  '
                >
                  Return to Home
                </Link>
              )}
            </div>
          </div>
          <br />
        </div>
      )}
    </>
  )
}
