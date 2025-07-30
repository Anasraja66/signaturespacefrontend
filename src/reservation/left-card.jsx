"use client"

import { CreditCard, Shield, Headphones, CheckCircle } from "lucide-react"

function LeftCard({ data, onNext, onStepClick }) {
  const { step, title, subtitle } = data

  const getStepStatus = (stepName) => {
    const stepOrder = ["personal-details", "payment-method", "payment-details", "confirmation"]
    const currentIndex = stepOrder.indexOf(step)
    const stepIndex = stepOrder.indexOf(stepName)

    if (stepIndex === currentIndex) return "active"
    if (stepIndex < currentIndex) return "completed"
    return "inactive"
  }

  const renderStepIndicator = () => (
    <div className="step-indicator">
      <div className={`step ${getStepStatus("personal-details")}`} onClick={() => onStepClick("personal-details")}>
        Personal details
      </div>
      <div className={`step ${getStepStatus("payment-method")}`} onClick={() => onStepClick("payment-method")}>
        Payment method
      </div>
      <div className={`step ${getStepStatus("payment-details")}`} onClick={() => onStepClick("payment-details")}>
        Payment details
      </div>
      <div className={`step ${getStepStatus("confirmation")}`} onClick={() => onStepClick("confirmation")}>
        Done
      </div>
    </div>
  )

  const renderPaymentMethod = () => (
    <div className="payment-method-content">
      <div className="payment-option">
        <div className="payment-option-left">
          <input type="radio" id="credit-card" name="payment" defaultChecked />
          <label htmlFor="credit-card">
            <div className="payment-info">
              <h3>Credit or debit card</h3>
              <p>Pay by providing your card details on the next page</p>
            </div>
          </label>
        </div>
        <CreditCard className="payment-icon" size={24} />
      </div>

      <div className="terms-section">
        <h2>Terms and conditions</h2>
        <div className="cancellation-policy">
          <h3>Cancellation policy</h3>
          <p>
            The rental contract is concluded directly with the provider. By clicking the button below, you accept our{" "}
            <a href="#" className="link">
              Terms of Service
            </a>{" "}
            and the{" "}
            <a href="#" className="link">
              provider's T&Cs
            </a>
            , and acknowledge our{" "}
            <a href="#" className="link">
              Privacy Policy
            </a>
            .
          </p>
        </div>
        <button className="primary-button" onClick={onNext}>
          Book and pay
        </button>
      </div>

      <div className="security-info">
        <div className="security-item">
          <Shield className="security-icon" size={20} />
          <div>
            <h4>Secure data transmission</h4>
            <p>Your payment data is always protected</p>
          </div>
        </div>
        <div className="security-item">
          <Headphones className="security-icon" size={20} />
          <div>
            <h4>We're here to help</h4>
            <p>Award-winning customer service trusted worldwide</p>
          </div>
        </div>
      </div>

      <div className="data-policy">
        <p>
          We only use your data to process bookings and to inform you about our own products. You can object to the use
          of your email address for sending product recommendations at any time.
        </p>
      </div>
    </div>
  )

  const renderPaymentDetails = () => (
    <div className="payment-details-content">
      <div className="payment-methods-section">
        <h3>Payment methods</h3>
        <div className="payment-method-icons">
          <div className="payment-method-icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M111.4 295.9c-3.5 19.2-17.4 108.7-21.5 134-.3 1.8-1 2.5-3 2.5H12.3c-7.6 0-13.1-6.6-12.1-13.9L58.8 46.6c1.5-9.6 10.1-16.9 20-16.9 152.3 0 165.1-3.7 204 11.4 60.1 23.3 65.6 79.5 44 140.3-21.5 62.6-72.5 89.5-140.1 90.3-43.4 .7-69.5-7-75.3 24.2zM357.1 152c-1.8-1.3-2.5-1.8-3 1.3-2 11.4-5.1 22.5-8.8 33.6-39.9 113.8-150.5 103.9-204.5 103.9-6.1 0-10.1 3.3-10.9 9.4-22.6 140.4-27.1 169.7-27.1 169.7-1 7.1 3.5 12.9 10.6 12.9h63.5c8.6 0 15.7-6.3 17.4-14.9 .7-5.4-1.1 6.1 14.4-91.3 4.6-22 14.3-19.7 29.3-19.7 71 0 126.4-28.8 142.9-112.3 6.5-34.8 4.6-71.4-23.8-92.6z"/></svg></div>
          <div className="payment-method-icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M482.9 410.3c0 6.8-4.6 11.7-11.2 11.7-6.8 0-11.2-5.2-11.2-11.7 0-6.5 4.4-11.7 11.2-11.7 6.6 0 11.2 5.2 11.2 11.7zm-310.8-11.7c-7.1 0-11.2 5.2-11.2 11.7 0 6.5 4.1 11.7 11.2 11.7 6.5 0 10.9-4.9 10.9-11.7-.1-6.5-4.4-11.7-10.9-11.7zm117.5-.3c-5.4 0-8.7 3.5-9.5 8.7h19.1c-.9-5.7-4.4-8.7-9.6-8.7zm107.8 .3c-6.8 0-10.9 5.2-10.9 11.7 0 6.5 4.1 11.7 10.9 11.7 6.8 0 11.2-4.9 11.2-11.7 0-6.5-4.4-11.7-11.2-11.7zm105.9 26.1c0 .3 .3 .5 .3 1.1 0 .3-.3 .5-.3 1.1-.3 .3-.3 .5-.5 .8-.3 .3-.5 .5-1.1 .5-.3 .3-.5 .3-1.1 .3-.3 0-.5 0-1.1-.3-.3 0-.5-.3-.8-.5-.3-.3-.5-.5-.5-.8-.3-.5-.3-.8-.3-1.1 0-.5 0-.8 .3-1.1 0-.5 .3-.8 .5-1.1 .3-.3 .5-.3 .8-.5 .5-.3 .8-.3 1.1-.3 .5 0 .8 0 1.1 .3 .5 .3 .8 .3 1.1 .5s.2 .6 .5 1.1zm-2.2 1.4c.5 0 .5-.3 .8-.3 .3-.3 .3-.5 .3-.8 0-.3 0-.5-.3-.8-.3 0-.5-.3-1.1-.3h-1.6v3.5h.8V426h.3l1.1 1.4h.8l-1.1-1.3zM576 81v352c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V81c0-26.5 21.5-48 48-48h480c26.5 0 48 21.5 48 48zM64 220.6c0 76.5 62.1 138.5 138.5 138.5 27.2 0 53.9-8.2 76.5-23.1-72.9-59.3-72.4-171.2 0-230.5-22.6-15-49.3-23.1-76.5-23.1-76.4-.1-138.5 62-138.5 138.2zm224 108.8c70.5-55 70.2-162.2 0-217.5-70.2 55.3-70.5 162.6 0 217.5zm-142.3 76.3c0-8.7-5.7-14.4-14.7-14.7-4.6 0-9.5 1.4-12.8 6.5-2.4-4.1-6.5-6.5-12.2-6.5-3.8 0-7.6 1.4-10.6 5.4V392h-8.2v36.7h8.2c0-18.9-2.5-30.2 9-30.2 10.2 0 8.2 10.2 8.2 30.2h7.9c0-18.3-2.5-30.2 9-30.2 10.2 0 8.2 10 8.2 30.2h8.2v-23zm44.9-13.7h-7.9v4.4c-2.7-3.3-6.5-5.4-11.7-5.4-10.3 0-18.2 8.2-18.2 19.3 0 11.2 7.9 19.3 18.2 19.3 5.2 0 9-1.9 11.7-5.4v4.6h7.9V392zm40.5 25.6c0-15-22.9-8.2-22.9-15.2 0-5.7 11.9-4.8 18.5-1.1l3.3-6.5c-9.4-6.1-30.2-6-30.2 8.2 0 14.3 22.9 8.3 22.9 15 0 6.3-13.5 5.8-20.7 .8l-3.5 6.3c11.2 7.6 32.6 6 32.6-7.5zm35.4 9.3l-2.2-6.8c-3.8 2.1-12.2 4.4-12.2-4.1v-16.6h13.1V392h-13.1v-11.2h-8.2V392h-7.6v7.3h7.6V416c0 17.6 17.3 14.4 22.6 10.9zm13.3-13.4h27.5c0-16.2-7.4-22.6-17.4-22.6-10.6 0-18.2 7.9-18.2 19.3 0 20.5 22.6 23.9 33.8 14.2l-3.8-6c-7.8 6.4-19.6 5.8-21.9-4.9zm59.1-21.5c-4.6-2-11.6-1.8-15.2 4.4V392h-8.2v36.7h8.2V408c0-11.6 9.5-10.1 12.8-8.4l2.4-7.6zm10.6 18.3c0-11.4 11.6-15.1 20.7-8.4l3.8-6.5c-11.6-9.1-32.7-4.1-32.7 15 0 19.8 22.4 23.8 32.7 15l-3.8-6.5c-9.2 6.5-20.7 2.6-20.7-8.6zm66.7-18.3H408v4.4c-8.3-11-29.9-4.8-29.9 13.9 0 19.2 22.4 24.7 29.9 13.9v4.6h8.2V392zm33.7 0c-2.4-1.2-11-2.9-15.2 4.4V392h-7.9v36.7h7.9V408c0-11 9-10.3 12.8-8.4l2.4-7.6zm40.3-14.9h-7.9v19.3c-8.2-10.9-29.9-5.1-29.9 13.9 0 19.4 22.5 24.6 29.9 13.9v4.6h7.9v-51.7zm7.6-75.1v4.6h.8V302h1.9v-.8h-4.6v.8h1.9zm6.6 123.8c0-.5 0-1.1-.3-1.6-.3-.3-.5-.8-.8-1.1-.3-.3-.8-.5-1.1-.8-.5 0-1.1-.3-1.6-.3-.3 0-.8 .3-1.4 .3-.5 .3-.8 .5-1.1 .8-.5 .3-.8 .8-.8 1.1-.3 .5-.3 1.1-.3 1.6 0 .3 0 .8 .3 1.4 0 .3 .3 .8 .8 1.1 .3 .3 .5 .5 1.1 .8 .5 .3 1.1 .3 1.4 .3 .5 0 1.1 0 1.6-.3 .3-.3 .8-.5 1.1-.8 .3-.3 .5-.8 .8-1.1 .3-.6 .3-1.1 .3-1.4zm3.2-124.7h-1.4l-1.6 3.5-1.6-3.5h-1.4v5.4h.8v-4.1l1.6 3.5h1.1l1.4-3.5v4.1h1.1v-5.4zm4.4-80.5c0-76.2-62.1-138.3-138.5-138.3-27.2 0-53.9 8.2-76.5 23.1 72.1 59.3 73.2 171.5 0 230.5 22.6 15 49.5 23.1 76.5 23.1 76.4 .1 138.5-61.9 138.5-138.4z"/></svg></div>
          <div className="payment-method-icon"></div>
        </div>
      </div>

      <div className="credit-card-form">
        <div className="form-group full-width">
          <label className="form-label">CREDIT CARD NUMBER</label>
          <input type="text" placeholder="CREDIT CARD NUMBER" className="form-input" />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label className="form-label">EXPIRATION DATE</label>
            <input type="text" placeholder="MM/YY" className="form-input" />
          </div>
          <div className="form-group">
            <label className="form-label">CVV (SECURITY CODE)</label>
            <input type="text" placeholder="CVV (SECURITY CODE)" className="form-input" />
          </div>
        </div>

        <button className="primary-button" onClick={onNext}>
          Pay
        </button>
      </div>

      <div className="security-info">
        <div className="security-item">
          <Shield className="security-icon" size={20} />
          <div>
            <h4>Secure data transmission</h4>
            <p>Your payment data is always protected</p>
          </div>
        </div>
        <div className="security-item">
          <Headphones className="security-icon" size={20} />
          <div>
            <h4>We're here to help</h4>
            <p>Award-winning customer service trusted worldwide</p>
          </div>
        </div>
      </div>

      <div className="data-policy">
        <p>
          We only use your data to process bookings and to inform you about our own products. You can object to the use
          of your email address for sending product recommendations at any time.
        </p>
      </div>
    </div>
  )

  const renderConfirmation = () => {
    const handleGoHome = () => {
      window.location.href = "/";
    };

    return (
      <div className="confirmation-content">
        <div className="confirmation-icon">
          <CheckCircle size={80} className="success-icon" />
        </div>
        <h1>Booking Confirmed!</h1>
        <p>Your booking has been successfully completed. A confirmation email has been sent.</p>
        <button className="primary-button" onClick={handleGoHome}>
          Go to Home
        </button>
      </div>
    );
  }

  const renderPersonalDetails = () => (
    <div className="personal-details-content">
      <div className="title-selection">
        <div className="radio-group">
          <div className="radio-option">
            <input type="radio" id="mr" name="title" defaultChecked />
            <label htmlFor="mr">Mr.</label>
          </div>
          <div className="radio-option">
            <input type="radio" id="ms" name="title" />
            <label htmlFor="ms">Ms.</label>
          </div>
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <input type="text" placeholder="First name *" className="form-input" />
        </div>
        <div className="form-group">
          <input type="text" placeholder="Last name *" className="form-input" />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <input type="email" placeholder="Email address *" className="form-input" />
          <p className="helper-text">We'll send your confirmation to this email address</p>
        </div>
        <div className="form-group">
          <input type="tel" placeholder="Phone number *" className="form-input" />
          <p className="helper-text">We'll only call if we need to</p>
        </div>
      </div>

      <div className="form-group full-width">
        <input type="text" placeholder="Address *" className="form-input" />
      </div>

      <div className="form-row">
        <div className="form-group">
          <input type="text" placeholder="ZIP code *" className="form-input" />
        </div>
        <div className="form-group">
          <input type="text" placeholder="City *" className="form-input" />
        </div>
        <div className="form-group">
          <select className="form-select">
            <option>United States</option>
            <option>Canada</option>
            <option>United Kingdom</option>
          </select>
        </div>
      </div>

      <div className="form-group full-width">
        <select className="form-select">
          <option>Washington</option>
          <option>California</option>
          <option>New York</option>
          <option>Texas</option>
        </select>
      </div>

      <div className="checkbox-group">
        <input type="checkbox" id="deals" defaultChecked />
        <label htmlFor="deals">Yes, I wish to receive exclusive deals by email</label>
      </div>

      <button className="primary-button" onClick={onNext}>
        Next
        <span className="button-arrow">›</span>
      </button>

      <p className="no-charge-text">You won't be charged yet</p>
    </div>
  )

  return (
    <div className="left-card">
      {renderStepIndicator()}

      <div className="card-content">
        <div className="content-header">
          <h1>{title}</h1>
          {subtitle && <p className="subtitle">{subtitle}</p>}
        </div>

        {step === "personal-details" && renderPersonalDetails()}
        {step === "payment-method" && renderPaymentMethod()}
        {step === "payment-details" && renderPaymentDetails()}
        {step === "confirmation" && renderConfirmation()}
      </div>
    </div>
  )
}

export default LeftCard
