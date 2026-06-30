import { useState, useEffect } from "react";
import { Cloud, Camera, Cpu, Server, Factory } from "lucide-react";

export default function ArchitectureDiagram() {
  const [selected, setSelected] = useState(1);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const nodes = [
    {
      title: "Cloud\nArchive",
      x: 50, y: 12,
      color: "#9C6BFF",
      icon: <Cloud size={28} />,
      description: "Stores historical production records, alarms, machine states and analytics. Synchronizes edge data securely for long-term reporting while keeping all real-time operations independent of the cloud.",
    },
    {
      title: "Jetson\nOrin Nano",
      x: 50, y: 35,
      color: "#4FC3F7",
      icon: <Cpu size={28} />,
      description: "Runs the complete AI pipeline locally. Executes YOLOv8 inference, communicates with the PLC through OPC UA, and hosts the FastAPI backend.",
    },
    {
      title: "IP\nCamera",
      x: 18, y: 68,
      color: "#42A5F5",
      icon: <Camera size={28} />,
      description: "Industrial Dahua IP camera providing a 1080p RTSP stream for real-time inference.",
    },
    {
      title: "Siemens\nS7-1200",
      x: 82, y: 68,
      color: "#29B6F6",
      icon: <Server size={28} />,
      description: "Controls the conveyor, sensors and actuators while exchanging data with the Jetson over OPC UA.",
    },
    {
      title: "Production\nLine",
      x: 50, y: 92,
      color: "#00BCD4",
      icon: <Factory size={28} />,
      description: "Physical conveyor where metal and plastic parts are detected, classified and counted.",
    },
  ];

  return (
    <div style={{
      width: "100%",
      display: "flex",
      flexDirection: isMobile ? "column" : "row",
      alignItems: "center",
      justifyContent: "center",
      gap: isMobile ? "24px" : "60px",
      boxSizing: "border-box",
      overflow: "hidden",
    }}>
      <svg viewBox="0 0 100 105" style={{
        width: isMobile ? "100%" : "650px",
        height: isMobile ? "300px" : "450px",
        flexShrink: 0,
      }}>
        <defs>
          <linearGradient id="lineGlow" x1="0" x2="1">
            <stop offset="0%" stopColor="#4FC3F7" />
            <stop offset="100%" stopColor="#7B1FA2" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <line x1="50" y1="16" x2="50" y2="29" stroke="url(#lineGlow)" strokeWidth="0.7" />
        <line x1="50" y1="41" x2="18" y2="61" stroke="#4FC3F7" strokeWidth="0.6" />
        <line x1="50" y1="41" x2="82" y2="61" stroke="#4FC3F7" strokeWidth="0.6" />
        <line x1="18" y1="75" x2="50" y2="88" stroke="#4FC3F7" strokeWidth="0.6" />
        <line x1="82" y1="75" x2="50" y2="88" stroke="#4FC3F7" strokeWidth="0.6" />

        {nodes.map((node, index) => (
          <g key={index} style={{ cursor: "pointer" }} onClick={() => setSelected(index)}>
            <rect
              x={node.x - 13} y={node.y - 9}
              width="26" height="18" rx="3"
              fill="#081321" stroke={node.color}
              strokeWidth="0.8" filter="url(#glow)"
            />
            <foreignObject x={node.x - 4} y={node.y - 8} width="8" height="8">
              <div style={{
                display: "flex", justifyContent: "center",
                alignItems: "center", color: node.color,
                width: "100%", height: "100%",
              }}>
                {node.icon}
              </div>
            </foreignObject>
            <text x={node.x} y={node.y + 2} textAnchor="middle" fill="white" fontSize="2.2">
              {node.title.split("\n").map((line, i) => (
                <tspan key={i} x={node.x} dy={i === 0 ? 0 : 3}>{line}</tspan>
              ))}
            </text>
          </g>
        ))}
      </svg>

      <div style={{
        width: isMobile ? "100%" : 400,
        minHeight: 250,
        background: "#081321",
        border: "1px solid rgba(79,195,247,.25)",
        borderRadius: 12,
        padding: isMobile ? 20 : 30,
        boxShadow: "0 0 20px rgba(79,195,247,.15)",
        flexShrink: 0,
        boxSizing: "border-box",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 18, marginBottom: 20 }}>
          <div style={{
            width: 56, height: 56,
            display: "flex", justifyContent: "center", alignItems: "center",
            background: "rgba(79,195,247,.08)",
            borderRadius: 12, flexShrink: 0,
            color: nodes[selected].color,
          }}>
            {nodes[selected].icon}
          </div>
          <div style={{ color: "#fff", fontWeight: 700, fontSize: 22 }}>
            {nodes[selected].title.replace("\n", " ")}
          </div>
        </div>
        <div style={{ color: "#9FB6D4", fontSize: 15, lineHeight: 1.8 }}>
          {nodes[selected].description}
        </div>
      </div>
    </div>
  );
}