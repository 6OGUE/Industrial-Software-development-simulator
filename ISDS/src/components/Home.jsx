import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Frontend from "./Frontend.jsx";
import Backend from "./Backend.jsx";
import Testing from "./Testing.jsx";
import MachineLearning from "./MachineLearning.jsx";

const containerStyle = {
  minHeight: "100vh",
  background: "linear-gradient(135deg, #0c0c0c 0%, #1a1a2e 50%, #16213e 100%)",
  padding: "10px",
  fontFamily: "'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  overflow: "hidden",
  position: "relative"
};

const backgroundAnimationStyle = {
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: `
    radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 40% 40%, rgba(120, 219, 255, 0.05) 0%, transparent 50%)
  `,
  zIndex: 0
};

const headerStyle = {
  textAlign: "center",
  padding: "60px 20px 40px",
  color: "white",
  position: "relative",
  zIndex: 1
};

const titleStyle = {
  fontSize: "3.5rem",
  fontWeight: "800",
  marginBottom: "16px",
  background: "linear-gradient(135deg, #ffffff 0%, #a8b9ff 100%)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "white",
  backgroundClip: "text",
  letterSpacing: "-0.02em"
};

const subtitleStyle = {
  fontSize: "1.3rem",
  fontWeight: "400",
  opacity: "0.85",
  maxWidth: "700px",
  margin: "0 auto",
  lineHeight: "1.7",
  color: "#e0e0e0"
};

const domainsContainerStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(2, 1fr)", 
  gap: "20px",
  maxWidth: "800px", 
  margin: "0 auto",
  padding: "60px 20px",
  position: "relative",
  zIndex: 1
};

const domainCardStyle = {
  width: "100%", 
  height: "280px",
  background: "transparent",
  borderRadius: "16px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  color: "white",
  fontSize: "22px",
  fontWeight: "700",
  textDecoration: "none",
  border: "2px solid white",
  transition: "transform 0.3s ease",
  cursor: "pointer",
  padding: "30px",
  textAlign: "center",
  position: "relative",
  overflow: "hidden",
  boxSizing: "border-box", 
};


const domainCardHoverStyle = {
  transform: "translateY(-10px) scale(1.02)",
  border: "2px solid #ffffff",
  backgroundColor: "rgba(255, 255, 255, 0.05)"
};

const domainIconStyle = {
  fontSize: "4rem",
  marginBottom: "20px",
  opacity: "0.95",
  filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.2))",
  transition: "transform 0.3s ease"
};

const domainDescriptionStyle = {
  fontSize: "0.95rem",
  fontWeight: "400",
  opacity: "0.8",
  marginTop: "12px",
  lineHeight: "1.5",
  maxWidth: "200px"
};


const FrontendIcon = () => (
  <svg width="60" height="60" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
  </svg>
);

const BackendIcon = () => (
  <svg width="60" height="60" viewBox="0 0 24 24" fill="currentColor">
    <path d="M3 3h18v18H3V3zm16 16V5H5v14h14zM7 7h10v2H7V7zm0 4h10v2H7v-2zm0 4h7v2H7v-2z" />
  </svg>
);

const TestingIcon = () => (
  <svg width="60" height="60" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
  </svg>
);

const MLIcon = () => (
  <svg width="60" height="60" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-5-9h10v2H7z" />
  </svg>
);

const DomainCard = ({ to, title, icon, description, customStyle = {} }) => {
  const handleMouseEnter = (e) => {
    const card = e.currentTarget;
    const icon = card.querySelector('.domain-icon');
    Object.assign(card.style, domainCardHoverStyle);
    if (icon) icon.style.transform = "scale(1.1)";
  };

  const handleMouseLeave = (e) => {
    const card = e.currentTarget;
    const icon = card.querySelector('.domain-icon');
    Object.assign(card.style, domainCardStyle, customStyle);
    if (icon) icon.style.transform = "scale(1)";
  };

  return (
    <Link
      to={to}
      style={{ ...domainCardStyle, ...customStyle }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="domain-icon" style={domainIconStyle}>{icon}</div>
      <div>{title}</div>
      <div style={domainDescriptionStyle}>{description}</div>
    </Link>
  );
};

const FeaturesSection = () => (
  <div style={{
    textAlign: "center",
    padding: "80px 20px",
    color: "white",
    position: "relative",
    zIndex: 1,
    background: "rgba(0, 0, 0, 0.2)",
    marginTop: "40px",
    borderTop: "1px solid rgba(255, 255, 255, 0.05)"
  }}>
  </div>
);

const FiveBoxes = () => (
  <div style={containerStyle}>
    <div style={backgroundAnimationStyle} />
    <div style={headerStyle}>
      <h1 style={titleStyle}>Software Development Simulator</h1>
      <p style={subtitleStyle}>
        Experience real-world industrial software development through immersive, 
        hands-on simulations that bridge the gap between learning and professional practice.
      </p>
    </div>

    <div style={domainsContainerStyle}>
      <DomainCard
        to="/Frontend"
        title="Frontend Development"
        icon={<FrontendIcon />}
        description="Master modern UI/UX design and development with cutting-edge frameworks"
      />
      <DomainCard
        to="/Backend"
        title="Backend Engineering"
        icon={<BackendIcon />}
        description="Build scalable server architecture and robust API systems"
      />
      <DomainCard
        to="/Testing"
        title="Quality Assurance"
        icon={<TestingIcon />}
        description="Ensure software quality through comprehensive testing strategies"
      />
      <DomainCard
        to="/MachineLearning"
        title="Machine Learning"
        icon={<MLIcon />}
        description="Develop intelligent systems with AI and machine learning technologies" 
      />
    </div>
  </div>
);

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FiveBoxes />} />
        <Route path="/Frontend" element={<Frontend />} />
        <Route path="/Backend" element={<Backend />} />
        <Route path="/Testing" element={<Testing />} />
        <Route path="/MachineLearning" element={<MachineLearning />} />
      </Routes>
    </Router>
  );
}
