// A tileable 8-point Islamic star (khatam) pattern, used as a very low
// opacity texture behind key sections instead of flat colour — the detail
// most generic "wedding site" builds skip entirely.
export default function GeoPattern({ id, color = '#cf9f52', opacity = 0.08, size = 84 }) {
  const patternId = `geo-${id}`
  return (
    <svg className="geo-pattern" aria-hidden="true" style={{ opacity }}>
      <defs>
        <pattern id={patternId} width={size} height={size} patternUnits="userSpaceOnUse" patternTransform="rotate(0)">
          <g fill="none" stroke={color} strokeWidth="1">
            <path d={`M${size / 2} 4 L${size - 4} ${size / 2} L${size / 2} ${size - 4} L4 ${size / 2} Z`} />
            <path
              d={`M${size / 2} 4
                  L${size * 0.68} ${size * 0.32}
                  L${size - 4} ${size / 2}
                  L${size * 0.68} ${size * 0.68}
                  L${size / 2} ${size - 4}
                  L${size * 0.32} ${size * 0.68}
                  L4 ${size / 2}
                  L${size * 0.32} ${size * 0.32} Z`}
            />
            <circle cx={size / 2} cy={size / 2} r={size * 0.1} />
          </g>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${patternId})`} />
    </svg>
  )
}
