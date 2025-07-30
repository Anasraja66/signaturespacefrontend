// utils/renderIcon.js
export const renderIcon = (iconName, size = 20, fill = "none") => {
  const iconProps = {
    width: String(size),
    height: String(size),
    viewBox: "0 0 24 24",
    fill: fill,
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
  }

  switch (iconName) {
    case "profile":
      return (
        <svg {...iconProps}>
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
          <circle cx="12" cy="7" r="4"></circle>
        </svg>
      )
    case "hamburger":
      return (
        <svg {...iconProps}>
          <line x1="4" y1="12" x2="20" y2="12"></line>
          <line x1="4" y1="6" x2="20" y2="6"></line>
          <line x1="4" y1="18" x2="20" y2="18"></line>
        </svg>
      )
    case "close":
      return (
        <svg {...iconProps}>
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      )
    case "chevron-left":
      return (
        <svg {...iconProps}>
          <polyline points="15,18 9,12 15,6"></polyline>
        </svg>
      )
    case "chevron-right":
      return (
        <svg {...iconProps}>
          <polyline points="9,18 15,12 9,6"></polyline>
        </svg>
      )
    case "location":
      return (
        <svg {...iconProps}>
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
          <circle cx="12" cy="10" r="3"></circle>
        </svg>
      )
    case "star":
      return (
        <svg {...iconProps}>
          <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"></polygon>
        </svg>
      )
    case "verified":
      return (
        <svg {...iconProps}>
          <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    case "search":
      return (
        <svg {...iconProps}>
          <circle cx="11" cy="11" r="8"></circle>
          <path d="m21 21-4.35-4.35"></path>
        </svg>
      )
    case "filter":
      return (
        <svg {...iconProps}>
          <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
        </svg>
      )
    case "navigation":
      return (
        <svg {...iconProps}>
          <polygon points="3,11 22,2 13,21 11,13 3,11"></polygon>
        </svg>
      )
    case "building":
      return (
        <svg {...iconProps}>
          <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"></path>
          <path d="M6 12h12"></path>
          <path d="M6 8h12"></path>
          <path d="M6 16h12"></path>
        </svg>
      )
    case "building-2":
      return (
        <svg {...iconProps}>
          <path d="M3 21h18"></path>
          <path d="M5 21V7l8-4v18"></path>
          <path d="M19 21V11l-6-4"></path>
        </svg>
      )
    case "anchor":
      return (
        <svg {...iconProps}>
          <circle cx="12" cy="5" r="3"></circle>
          <line x1="12" y1="22" x2="12" y2="8"></line>
          <path d="M5 12H2a10 10 0 0 0 20 0h-3"></path>
        </svg>
      )
    case "home":
      return (
        <svg {...iconProps}>
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
          <polyline points="9,22 9,12 15,12 15,22"></polyline>
        </svg>
      )
    case "briefcase":
      return (
        <svg {...iconProps}>
          <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
          <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
        </svg>
      )
    case "waves":
      return (
        <svg {...iconProps}>
          <path d="M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"></path>
          <path d="M2 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"></path>
          <path d="M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"></path>
        </svg>
      )
    case "mountain":
      return (
        <svg {...iconProps}>
          <path d="M8 3l4 8 5-5 5 15H2L8 3z"></path>
        </svg>
      )
    case "trees":
      return (
        <svg {...iconProps}>
          <path d="M12 1v6m0 6v6"></path>
          <path d="M17 5a5 5 0 0 0-10 0c0 6 2 8 5 8s5-2 5-8"></path>
          <path d="M20 10a2 2 0 0 0-4 0c0 3 1 4 2 4s2-1 2-4z"></path>
          <path d="M8 10a2 2 0 0 0-4 0c0 3 1 4 2 4s2-1 2-4z"></path>
        </svg>
      )
    case "calendar":
      return (
        <svg {...iconProps}>
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
          <line x1="16" y1="2" x2="16" y2="6"></line>
          <line x1="8" y1="2" x2="8" y2="6"></line>
          <line x1="3" y1="10" x2="21" y2="10"></line>
        </svg>
      )
    case "Users":
      return (
        <svg {...iconProps}>
          <path d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
          <circle cx="12" cy="7" r="4"></circle>
        </svg>
      )
    case "CreditCard":
      return (
        <svg {...iconProps}>
          <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
          <line x1="1" y1="10" x2="23" y2="10"></line>
        </svg>
      )
    case "Expand":
      return (
        <svg {...iconProps}>
          <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3m-18 0v3a2 2 0 0 0 2 2h3"></path>
        </svg>
      )
    case "Pool":
      return (
        <svg {...iconProps}>
          <path d="M12 22c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"></path>
          <path d="M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"></path>
          <path d="M12 2v2"></path>
          <path d="M22 12h-2"></path>
          <path d="M12 22v-2"></path>
          <path d="M2 12h2"></path>
          <path d="M19.07 4.93l-1.41 1.41"></path>
          <path d="M4.93 19.07l1.41-1.41"></path>
          <path d="M4.93 4.93l1.41 1.41"></path>
          <path d="M19.07 19.07l-1.41-1.41"></path>
        </svg>
      )
    case "Wifi":
      return (
        <svg {...iconProps}>
          <path d="M5 12.55a11 11 0 0 1 14.08 0"></path>
          <path d="M1.42 9a16 16 0 0 1 21.16 0"></path>
          <path d="M8.53 16.12a6 6 0 0 1 6.95 0"></path>
          <line x1="12" y1="20" x2="12.01" y2="20"></line>
        </svg>
      )
    case "Kitchen":
      return (
        <svg {...iconProps}>
          <path d="M18 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2z"></path>
          <path d="M12 18V8"></path>
          <path d="M8 12h8"></path>
          <path d="M12 4v4"></path>
        </svg>
      )
    case "TV":
      return (
        <svg {...iconProps}>
          <rect x="2" y="7" width="20" height="15" rx="2" ry="2"></rect>
          <polyline points="17 2 12 7 7 2"></polyline>
        </svg>
      )
    case "Fireplace":
      return (
        <svg {...iconProps}>
          <path d="M2 10h20"></path>
          <path d="M12 10v12"></path>
          <path d="M12 10c-2 0-4 2-4 4s2 4 4 4 4-2 4-4-2-4-4-4z"></path>
          <path d="M12 2v8"></path>
          <path d="M12 2c-2 0-4 2-4 4s2 4 4 4 4-2 4-4-2-4-4-4z"></path>
        </svg>
      )
    case "Dishwasher":
      return (
        <svg {...iconProps}>
          <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
          <path d="M12 7v14"></path>
          <path d="M6 7v14"></path>
          <path d="M18 7v14"></path>
          <path d="M2 14h20"></path>
        </svg>
      )
    case "AirConditioning":
      return (
        <svg {...iconProps}>
          <path d="M12 2v20"></path>
          <path d="M17 5H7"></path>
          <path d="M17 19H7"></path>
          <path d="M12 2a5 5 0 0 0-5 5v10a5 5 0 0 0 10 0V7a5 5 0 0 0-5-5z"></path>
        </svg>
      )
    case "WashingMachine":
      return (
        <svg {...iconProps}>
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
          <circle cx="12" cy="12" r="3"></circle>
          <path d="M12 15v6"></path>
          <path d="M12 3v3"></path>
          <path d="M18 6h3"></path>
          <path d="M3 6h3"></path>
        </svg>
      )
    case "Microwave":
      return (
        <svg {...iconProps}>
          <rect x="2" y="4" width="20" height="18" rx="2" ry="2"></rect>
          <path d="M12 4v18"></path>
          <path d="M6 10h6"></path>
          <path d="M6 14h6"></path>
          <path d="M6 18h6"></path>
        </svg>
      )
    case "NoPets":
      return (
        <svg {...iconProps}>
          <path d="M12 22c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"></path>
          <path d="M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"></path>
          <path d="M12 2v2"></path>
          <path d="M22 12h-2"></path>
          <path d="M12 22v-2"></path>
          <path d="M2 12h2"></path>
          <path d="M19.07 4.93l-1.41 1.41"></path>
          <path d="M4.93 19.07l1.41-1.41"></path>
          <path d="M4.93 4.93l1.41 1.41"></path>
          <path d="M19.07 19.07l-1.41-1.41"></path>
          <line x1="2" y1="2" x2="22" y2="22"></line>
        </svg>
      )
    case "Lock":
      return (
        <svg {...iconProps}>
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
          <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
        </svg>
      )
    case "Fishing":
      return (
        <svg {...iconProps}>
          <path d="M17 18a5 5 0 0 0-10 0"></path>
          <path d="M12 22v-4"></path>
          <path d="M12 22c-2 0-4-2-4-4s2-4 4-4 4 2 4 4-2 4-4 4z"></path>
          <path d="M12 2v12"></path>
          <path d="M12 2c-2 0-4 2-4 4s2 4 4 4 4-2 4-4-2-4-4-4z"></path>
        </svg>
      )
    default:
      return null
  }
}
