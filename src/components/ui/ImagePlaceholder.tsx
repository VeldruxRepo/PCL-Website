type ImagePlaceholderProps = { label?: string; className?: string };

export function ImagePlaceholder({ label = "PLACE IMAGE HERE", className = "" }: ImagePlaceholderProps) {
  return <div className={`image-placeholder ${className}`.trim()} role="img" aria-label={label}>{label}</div>;
}
