"use client"

import { useState } from "react"
import { renderIcon } from "../../utils/renderIcon"
import { faqs } from "../../utils/dummyData"

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null)

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="faq-section">
      <div className="container">
        <h2>Frequently Asked Questions</h2>
        <div className="faq-list">
          {faqs.map((faq, index) => (
            <div key={index} className="faq-item">
              <div className={`faq-question ${openIndex === index ? "open" : ""}`} onClick={() => toggleFAQ(index)}>
                {faq.question}
                {renderIcon("ChevronDown", { className: "icon" })}
              </div>
              <div className={`faq-answer ${openIndex === index ? "open" : ""}`}>
                <p>{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
