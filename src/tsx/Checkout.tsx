import { useEffect } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'

export default function Checkout() {
  const location = useLocation()
  const navigate = useNavigate()
  const { plan } = useParams()

  useEffect(() => {
    if (!location.state?.allowed) {
      navigate("/plans");
    }
  }, [location.state, navigate]);

  return (
    <div>
      <h1>Checkout Page</h1>
      {plan === "standard" && <p>You selected the Standard Plan</p>}
      {plan === "plus" && <p>You selected the Plus Plan</p>}
      <p>Payment details here...</p>
    </div>
  )
}