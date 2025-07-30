export async function fetchPropertyData(propertyId) {
  try {
    const response = await fetch(`http://localhost:8000/api/properties/${propertyId}/`)
    if (!response.ok) {
      throw new Error('Network response was not ok')
    }
    const data = await response.json()
    return data
  } catch (error) {
    console.error('Failed to fetch property data:', error)
    throw error
  }
}

export async function fetchRentals(type = 'daily') {
  try {
    const response = await fetch(`http://localhost:8000/api/rentals/?type=${type}`)
    if (!response.ok) {
      throw new Error('Network response was not ok')
    }
    const data = await response.json()
    return data
  } catch (error) {
    console.error('Failed to fetch rentals:', error)
    throw error
  }
}

export async function fetchAllProperties() {
  try {
    const response = await fetch('http://localhost:8000/api/properties/')
    if (!response.ok) {
      throw new Error('Network response was not ok')
    }
    const data = await response.json()
    return data
  } catch (error) {
    console.error('Failed to fetch all properties:', error)
    throw error
  }
}
