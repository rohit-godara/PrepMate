import React, { useRef, useState, useCallback, useEffect } from "react";
import { LogoIcon } from "../components/Logo";
import { FcGoogle } from "react-icons/fc";
import { motion } from "motion/react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUser } from "../redux/userSlice";
import { auth, provider } from "../utils/firebase";
import { signInWithPopup } from "firebase/auth";
import { ServerURL } from "../App";

const THUMB = 48;

function Auth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [fill, setFill] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const sliderRef = useRef(null);
  const dragging = useRef(false);

  const getPercent = useCallback((clientX) => {
    const rect = sliderRef.current.getBoundingClientRect();
    const max = rect.width - THUMB;
    const x = Math.min(Math.max(clientX - rect.left - THUMB / 2, 0), max);
    return (x / max) * 100;
  }, []);

  const handleGoogleLogin = async () => {
    try {
      const response = await signInWithPopup(auth, provider);
      const { displayName: name, email, photoURL: picture } = response.user;
      const res = await axios.post(`${ServerURL}/api/auth/google`, { name, email, picture }, { withCredentials: true });
      dispatch(setUser(res.data.user));
      navigate("/");
    } catch (error) {
      console.log("GOOGLE LOGIN ERROR", error);
      setFill(0);
    }
  };

  const onStart = useCallback(() => { dragging.current = true; setIsDragging(true); }, []);
  const onMove = useCallback((clientX) => { if (!dragging.current) return; setFill(getPercent(clientX)); }, [getPercent]);
  const onEnd = useCallback((clientX) => {
    if (!dragging.current) return;
    dragging.current = false; setIsDragging(false);
    const percent = getPercent(clientX);
    if (percent >= 88) { setFill(100); setTimeout(handleGoogleLogin, 200); }
    else setFill(0);
  }, [getPercent]);

  useEffect(() => {
    const move = (e) => onMove(e.clientX);
    const up = (e) => onEnd(e.clientX);
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseup", up);
    return () => { window.removeEventListener("mousemove", move); window.removeEventListener("mouseup", up); };
  }, [onMove, onEnd]);

  return (
    <div className="w-full min-h-screen flex items-center justify-center px-6 relative overflow-hidden"
      style={{ background: "linear-gradient(135deg, #f0fdf4, #dcfce7, #f8fafc)" }}>

      {/* Ambient blobs */}
      <div className="absolute top-[-15%] left-[-10%] w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(134,239,172,0.35) 0%, transparent 70%)" }} />
      <div className="absolute bottom-[-15%] right-[-10%] w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(74,222,128,0.2) 0%, transparent 70%)" }} />
      <div className="absolute top-[40%] right-[20%] w-[300px] h-[300px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(187,247,208,0.4) 0%, transparent 70%)" }} />

      <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}
        className="w-full max-w-md relative z-10">

        {/* Card */}
        <div className="rounded-3xl p-10 shadow-2xl"
          style={{ background: "rgba(255,255,255,0.85)", backdropFilter: "blur(24px)", border: "1px solid rgba(134,239,172,0.4)", boxShadow: "0 20px 60px rgba(74,222,128,0.15)" }}>

          {/* Logo */}
          <div className="flex items-center justify-center gap-3 mb-10">
            <div className="p-2.5 rounded-xl" style={{ background: "linear-gradient(135deg, #16a34a, #4ade80)" }}>
              <LogoIcon size={22} />
            </div>
            <span className="font-bold text-xl tracking-tight" style={{ color: "#15803d" }}>PrepMate</span>
          </div>

          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-2" style={{ color: "#14532d" }}>Welcome Back</h2>
            <p className="text-sm" style={{ color: "#6b7280" }}>Sign in to start your AI interview practice</p>
          </div>

          {/* Slider */}
          <div ref={sliderRef}
            className="relative w-full h-14 rounded-full overflow-hidden select-none"
            style={{ background: "#f0fdf4", border: "1px solid rgba(134,239,172,0.5)" }}>
            <div className="absolute top-0 left-0 h-full rounded-full"
              style={{
                width: `calc(${fill} * (100% - ${THUMB}px) / 100 + ${THUMB}px)`,
                background: "linear-gradient(90deg, #16a34a, #4ade80)",
                transition: isDragging ? "none" : "width 0.3s ease",
              }} />
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <span className="text-sm font-medium transition-colors" style={{ color: fill > 40 ? "white" : "#9ca3af" }}>
                {fill >= 88 ? "Signing in..." : "Slide to sign in →"}
              </span>
            </div>
            <div
              onMouseDown={onStart}
              onTouchStart={(e) => { onStart(); onMove(e.touches[0].clientX); }}
              onTouchMove={(e) => onMove(e.touches[0].clientX)}
              onTouchEnd={(e) => onEnd(e.changedTouches[0].clientX)}
              className="absolute top-1 h-12 w-12 bg-white rounded-full shadow-xl flex items-center justify-center cursor-grab active:cursor-grabbing z-10"
              style={{ left: `calc(${fill} * (100% - ${THUMB}px) / 100)`, transition: isDragging ? "none" : "left 0.3s ease" }}>
              <FcGoogle size={22} />
            </div>
          </div>

          <p className="text-center text-xs mt-4" style={{ color: "#9ca3af" }}>
            Drag the Google icon all the way to sign in
          </p>

          {/* Features row */}
          <div className="flex justify-center gap-6 mt-8 pt-8" style={{ borderTop: "1px solid rgba(134,239,172,0.3)" }}>
            {["AI Interview", "Resume Analysis", "Instant Feedback"].map((f, i) => (
              <div key={i} className="text-center">
                <p className="text-xs font-medium" style={{ color: "#16a34a" }}>{f}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default Auth;
