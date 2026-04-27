export default function WaveDivider({ flip = false, className = "" }) {
  return (
    <div className={`w-full overflow-hidden leading-none ${flip ? "rotate-180" : ""} ${className}`}
      style={{ height: 64, marginBottom: flip ? undefined : -2, marginTop: flip ? -2 : undefined }}>
      <svg viewBox="0 0 1200 64" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full">
        <path
          d="M0,32 C100,60 200,4 300,32 C400,60 500,4 600,32 C700,60 800,4 900,32 C1000,60 1100,4 1200,32 L1200,64 L0,64 Z"
          className="fill-[#0e0e0e] dark:fill-[#f0ede6] opacity-[0.07]"
        />
        <path
          d="M0,40 C150,10 300,60 450,30 C600,0 750,56 900,28 C1050,0 1150,50 1200,36 L1200,64 L0,64 Z"
          className="fill-[#0e0e0e] dark:fill-[#f0ede6] opacity-[0.04]"
        />
      </svg>
    </div>
  );
}
