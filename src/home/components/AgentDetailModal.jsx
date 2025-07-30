"use client"

import { renderIcon } from "../utils"

export default function AgentDetailModal({ agent, onClose }) {
  if (!agent) return null

  return (
    <div className="agent-modal-overlay" onClick={onClose}>
      <div className="agent-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="agent-modal-close" onClick={onClose}>
          {renderIcon("close", 24)}
        </button>
        <img
          src={agent.image ? `http://localhost:8000/media/${agent.image}` : "/placeholder.svg?height=80&width=80&query=agent profile"}
          alt={agent.name}
          className="modal-agent-image"
        />
        <h2>{agent.name}</h2>
        <p className="modal-agent-rating">
          <span className="rating-number">{agent.rating}</span>
          {renderIcon("star", 16, "currentColor")}
        </p>
        <p className="modal-agent-properties">{agent.propertiesSold}</p>
        <p className="modal-agent-bio">{agent.bio}</p>
        <div className="modal-contact-info">
          <p>
            <strong>Phone:</strong> <a href={`tel:${agent.phone}`}>{agent.phone}</a>
          </p>
          <p>
            <strong>Email:</strong> <a href={`mailto:${agent.email}`}>{agent.email}</a>
          </p>
        </div>
      </div>
    </div>
  )
}
