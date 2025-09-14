import { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'

export default function Checkout() {
  const location = useLocation()
  const navigate = useNavigate()
  const { plan } = useParams()

  const [paymentComplete, setPaymentComplete] = useState(false)

  useEffect(() => {
    if (!location.state?.allowed) {
      navigate('/plans')
    }
  }, [location.state, navigate])

  const handlePay = async () => {
    const payButton = document.getElementById('payButton') as HTMLInputElement | null

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
    
    disablePayButton()

    try {
      const response = await fetch('http://localhost:4000/create-invoice', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan }),
      })
      const data = await response.json()

      const checkoutUrl = data.invoice_url || data.checkout_url || null

      if (checkoutUrl) {
        // Open checkout page
        window.open(checkoutUrl, '_blank')

        // Start polling every 5s
        const poll = setInterval(async () => {
          try {
            const statusRes = await fetch(
              `http://localhost:4000/invoice/${data.id}`
            )
            const statusData = await statusRes.json()
            console.log('Invoice status:', statusData.status)

            if (statusData.status === 'PAID') {
              clearInterval(poll)
              setPaymentComplete(true)
              disablePayButton()
            } else if (
              statusData.status === 'EXPIRED' ||
              statusData.status === 'CANCELLED'
            ) {
              clearInterval(poll)
              alert('Payment expired or was cancelled.')
              enablePayButton()
            }
          } catch (err) {
            console.error('Polling error:', err)
            clearInterval(poll)
            alert('Something went wrong. Please try again.')
            enablePayButton()
          }
        }, 5000)
      } else {
        alert('No checkout link available. Please try again.')
        enablePayButton()
      }
    } catch (err) {
      console.error('Payment error:', err)
      alert('Something went wrong while creating invoice.')
      enablePayButton()
    }
  }

  return (
    <>
      {plan === 'standard' && (
        <div className='flex flex-col items-center justify-center w-screen h-screen'>
          {/* Title and Tagline */}
          <div className='flex flex-col items-center'>
            <h1 className='text-[#000] italic font-bold text-[4rem]'>Ala</h1>
            <div className='flex text-[0.6rem] text-[#000] mt-[-24px]'>
              <h1>Capture. &nbsp;</h1>
              <h1>Share. &nbsp;</h1>
              <h1>Gather.</h1>
            </div>
          </div>

          <div className='flex gap-24 mt-12'>
            {/* Standard Plan Contents */}
            <div className='flex w-[300px]'>
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

                <button
                  onClick={handlePay}
                  id='payButton'
                  className='p-2 bg-[#ff6b6b] rounded-2xl cursor-pointer text-[#fff] mt-4'
                >
                  Click to pay
                </button>
              </div>
            </div>

            <div className='flex flex-col items-center w-[300px]'>
              <h1 className='text-center text-sm font-bold'>Your codes for your event will appear here after successful payment.</h1>
              {paymentComplete && (
                <div className='mt-6 p-4 bg-green-100 border border-green-400 rounded-lg text-center'>
                  <h2 className='text-lg font-bold text-green-700'>
                    Payment Successful 🎉
                  </h2>
                  <p>Thank you! Your payment has been confirmed.</p>
                </div>
              )}
            </div>
            
          </div>
        </div>
      )}

      {plan === 'plus' && <p>You selected the Plus Plan</p>}
    </>
  )
}
