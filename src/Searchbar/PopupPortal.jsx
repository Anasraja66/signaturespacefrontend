import React from "react"
import ReactDOM from "react-dom"

export default function PopupPortal({ children }) {
    if (typeof document === "undefined") {
        return null
    }
    return ReactDOM.createPortal(children, document.body)
}