
import React, { useRef, useState } from "react";
import "../styles/AgentSection.css"

export default function AgentCard({
  agents,
  cardsVisible,
  getItemDelay,
  renderIcon,
  handleContactAgent,
}) {

  return (
    <>

      {/* Existing agents */}
      {agents.map((agent, index) => {
        console.log(agent);
        return (
          <div
            key={agent.id}
            className={`agent-card animate-card ${cardsVisible ? "visible" : ""}`}
            style={{ transitionDelay: `${getItemDelay(index + 1)}ms` }}
          >
            <img
              src={
                agent.image
                  ? agent.image.startsWith('http')
                    ? agent.image
                    : `http://localhost:8000/media/${agent.image.replace(/^media[\\/]/, '')}`
                  : "/placeholder.svg?height=120&width=120&query=agent profile"
              }
              alt={agent.name}
              className="agent-image"
            />
            <div className="agent-rating">
              <span className="rating-number">{agent.rating}</span>
              {renderIcon("star", 16, "currentColor")}
            </div>
            <h3 className="agent-name">{agent.name}</h3>
            <p className="agent-properties">{agent.propertiesSold}</p>
            <button
              className="contact-agent-btn"
              style={{
                zIndex: 100001,
                position: 'relative',
                background: '#e6b13b',
                color: '#fff',
                border: 'none',
                borderRadius: '20px',
                padding: '12px 32px',
                fontWeight: 'bold',
                fontSize: '1rem',
                cursor: 'pointer',
                marginTop: '16px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                transition: 'background 0.2s, box-shadow 0.2s',
              }}
              onMouseOver={e => e.currentTarget.style.background = '#c89c2b'}
              onMouseOut={e => e.currentTarget.style.background = '#e6b13b'}
              onClick={() => handleContactAgent(agent)}
            >
              Contact
            </button>
          </div >
        );
      })}
    </>
  )
}