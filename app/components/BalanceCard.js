"use client";

export default function BalanceCard({ balance }) {
  const isPositive = balance >= 0;
  return (
    <div style={{
      background: isPositive
        ? "linear-gradient(135deg, #1a2f1e 0%, #1a3a2a 50%, #0d2619 100%)"
        : "linear-gradient(135deg, #2f1a1a 0%, #3a1a1a 50%, #261009 100%)",
      borderRadius: 20,
      padding: "32px 32px 28px",
      marginBottom: 16,
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Decorative circle */}
      <div style={{
        position: "absolute", top: -40, right: -40,
        width: 180, height: 180, borderRadius: "50%",
        background: "rgba(255,255,255,0.03)",
        pointerEvents: "none",
      }}/>
      <div style={{
        position: "absolute", bottom: -20, right: 60,
        width: 100, height: 100, borderRadius: "50%",
        background: "rgba(255,255,255,0.02)",
        pointerEvents: "none",
      }}/>

      <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 12, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 8 }}>
        Current Balance
      </p>
      <p style={{
        fontSize: "clamp(40px, 8vw, 56px)",
        fontWeight: 700,
        color: isPositive ? "#6ee8a2" : "#f08080",
        lineHeight: 1,
        fontVariantNumeric: "tabular-nums",
        letterSpacing: "-0.02em",
      }}>
        {isPositive ? "" : "−"}${Math.abs(balance).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
      </p>
      <div style={{ marginTop: 16, display: "flex", alignItems: "center", gap: 6 }}>
        <div style={{
          width: 8, height: 8, borderRadius: "50%",
          background: isPositive ? "#6ee8a2" : "#f08080",
        }}/>
        <span style={{ color: "rgba(255,255,255,0.5)", fontSize: 12 }}>
          {isPositive ? "You're in the green" : "Spending exceeds income"}
        </span>
      </div>
    </div>
  );
}
