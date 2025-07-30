// app/home/utils.js

export const renderIcon = (iconName, size = 24, fill = "none") => {
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
          <line x1="3" y1="12" x2="21" y2="12"></line>
          <line x1="3" y1="6" x2="21" y2="6"></line>
          <line x1="3" y1="18" x2="21" y2="18"></line>
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
        <svg {...iconProps} fill="currentColor">
          <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"></polygon>
        </svg>
      )
    case "verified":
      return (
        <svg {...iconProps}>
          <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    default:
      return null
  }
}
