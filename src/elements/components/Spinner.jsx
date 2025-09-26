function Spinner({ width = "100px", height = "100px", marginTop = "15dvh" }) {
  return (
    <div className="h-full flex items-center justify-center">
      <div
        className="rounded-full animate-spin"
        style={{
          width,
          height,
          marginTop,
          background: "conic-gradient(#0000 10%, rgba(255, 64, 0, 1))",
          WebkitMask:
            "radial-gradient(farthest-side, #0000 calc(100% - 12px), #000 0)",
          mask: "radial-gradient(farthest-side, #0000 calc(100% - 8px), #000 0)",
          animationDuration: "1.5s",
          animationTimingFunction: "linear",
          animationIterationCount: "infinite",
        }}
      />
    </div>
  );
}

export default Spinner;
