import L from 'leaflet';

// Create marker icons
export const markerIcon = L.divIcon({
  html: `<svg width="25" height="41" viewBox="0 0 25 41" xmlns="http://www.w3.org/2000/svg">
    <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
      <path d="M12.5,0 C5.59644063,0 0,5.59644063 0,12.5 C0,19.4035594 12.5,41 12.5,41 C12.5,41 25,19.4035594 25,12.5 C25,5.59644063 19.4035594,0 12.5,0 Z" fill="#4DABF7"/>
      <circle fill="#FFFFFF" cx="12.5" cy="12.5" r="6.5"/>
    </g>
  </svg>`,
  className: 'custom-marker',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34]
});

// Create a custom marker icon with a different color
export const customMarkerIcon = L.divIcon({
  html: `<svg width="25" height="41" viewBox="0 0 25 41" xmlns="http://www.w3.org/2000/svg">
    <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
      <path d="M12.5,0 C5.59644063,0 0,5.59644063 0,12.5 C0,19.4035594 12.5,41 12.5,41 C12.5,41 25,19.4035594 25,12.5 C25,5.59644063 19.4035594,0 12.5,0 Z" fill="#FF6B6B"/>
      <circle fill="#FFFFFF" cx="12.5" cy="12.5" r="6.5"/>
    </g>
  </svg>`,
  className: 'custom-marker',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34]
}); 