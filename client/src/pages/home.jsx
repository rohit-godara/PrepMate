import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { LogoIcon, LogoIconGreen } from "../components/Logo";
import { MdOutlineUploadFile, MdOutlineAnalytics, MdSecurity, MdArrowForward, MdArrowBack, MdCheck } from "react-icons/md";
import { BsCameraVideo } from "react-icons/bs";
import { motion, AnimatePresence } from "motion/react";
import resumeImg from "../assets/resume.png";
import aiImg from "../assets/ai-ans.png";
import confiImg from "../assets/confi.png";

const careerData = {
  "Engineering": {
    icon: "⚙️",
    subcategories: {
      "Internship": {
        branches: {
          "Computer Science": ["Google", "Microsoft", "Amazon", "Meta", "Adobe", "Flipkart", "Uber", "Other"],
          "AI / ML": ["OpenAI", "DeepMind", "Anthropic", "Google DeepMind", "NVIDIA", "Tesla", "Other"],
          "Mechanical": ["Tesla", "SpaceX", "Tata Motors", "Mahindra", "L&T", "Bosch", "Other"],
          "Civil": ["L&T", "DLF", "Shapoorji", "NHAI", "AECOM", "Other"],
          "Electrical": ["Siemens", "ABB", "Schneider", "BHEL", "Power Grid", "Other"],
          "Electronics": ["Qualcomm", "Intel", "Samsung", "Texas Instruments", "ISRO", "Other"],
          "Biotechnology": ["Biocon", "Dr. Reddy's", "Cipla", "Serum Institute", "Other"],
        }
      },
      "Full-Time Job": {
        branches: {
          "Computer Science": ["Google", "Microsoft", "Amazon", "Apple", "Meta", "Netflix", "Adobe", "Other"],
          "AI / ML": ["OpenAI", "Anthropic", "DeepMind", "NVIDIA", "Tesla", "Cohere", "Other"],
          "Mechanical": ["Tesla", "SpaceX", "Tata Motors", "Mahindra", "Bosch", "Caterpillar", "Other"],
          "Civil": ["L&T", "Shapoorji", "AECOM", "Jacobs", "DLF", "Other"],
          "Electrical": ["Siemens", "ABB", "GE", "Schneider", "BHEL", "Other"],
          "Electronics": ["Qualcomm", "Intel", "Samsung", "ISRO", "DRDO", "Other"],
          "Biotechnology": ["Biocon", "Cipla", "Sun Pharma", "Pfizer", "Other"],
        }
      },
      "Placement Preparation": {
        branches: {
          "Computer Science": ["Google", "Microsoft", "Amazon", "Infosys", "TCS", "Wipro", "Cognizant", "Other"],
          "AI / ML": ["Google", "Microsoft", "Amazon", "NVIDIA", "OpenAI", "Other"],
          "Mechanical": ["Tata Motors", "Mahindra", "L&T", "Bosch", "Maruti", "Other"],
          "Civil": ["L&T", "NHAI", "DLF", "Shapoorji", "Other"],
          "Electrical": ["BHEL", "Siemens", "ABB", "Power Grid", "Other"],
          "Electronics": ["Qualcomm", "Samsung", "Intel", "ISRO", "Other"],
          "Biotechnology": ["Biocon", "Dr. Reddy's", "Cipla", "Other"],
        }
      },
      "Off-Campus Hiring": {
        branches: {
          "Computer Science": ["Flipkart", "Zomato", "CRED", "Razorpay", "PhonePe", "Meesho", "Other"],
          "AI / ML": ["Sarvam AI", "Krutrim", "Ola", "Flipkart", "Other"],
          "Mechanical": ["Ola Electric", "Tata Motors", "Hero", "Other"],
          "Electronics": ["Ola Electric", "ISRO", "DRDO", "Other"],
        }
      },
      "Startup Jobs": {
        branches: {
          "Computer Science": ["Zomato", "Swiggy", "CRED", "Razorpay", "PhonePe", "Zepto", "Other"],
          "AI / ML": ["Sarvam AI", "Krutrim", "Ola", "Other"],
          "Mechanical": ["Ola Electric", "Simple Energy", "Other"],
          "Electronics": ["Ola Electric", "Other"],
        }
      },
    }
  },
  "Government Jobs": {
    icon: "🏛️",
    subcategories: {
      "Haryana Government": { branches: ["Teacher", "Police", "Clerk", "D Group", "Patwari", "Judiciary", "Health Department", "HSSC Jobs"], companies: [] },
      "Central Government": { branches: ["IAS", "IPS", "IFS", "IRS", "UPSC CSE"], companies: [] },
      "Banking": { branches: ["SBI PO", "IBPS PO", "RBI Grade B", "SBI Clerk", "IBPS Clerk"], companies: [] },
      "Railway": { branches: ["RRB NTPC", "RRB Group D", "RRB JE", "RRB ALP"], companies: [] },
      "Defence": { branches: ["NDA", "CDS", "AFCAT", "Indian Army", "Indian Navy", "Indian Air Force"], companies: [] },
      "SSC": { branches: ["SSC CGL", "SSC CHSL", "SSC MTS", "SSC GD", "SSC CPO"], companies: [] },
      "State PSC": { branches: ["UPPSC", "MPPSC", "BPSC", "RPSC", "KPSC"], companies: [] },
    }
  },
  "Medical": {
    icon: "🏥",
    subcategories: {
      "NEET UG": { branches: ["MBBS", "BDS", "BAMS", "BHMS", "BUMS"], companies: [] },
      "NEET PG": { branches: ["MD", "MS", "MDS", "DNB"], companies: [] },
      "Hospital Jobs": { branches: ["Doctor", "Nurse", "Pharmacist", "Lab Technician", "Radiologist"], companies: ["AIIMS", "Apollo", "Fortis", "Max Hospital", "Other"] },
      "UPSC Medical": { branches: ["UPSC CMS", "State Medical Services"], companies: [] },
    }
  },
  "Law": {
    icon: "⚖️",
    subcategories: {
      "CLAT": { branches: ["LLB", "LLM", "BA LLB", "BBA LLB"], companies: [] },
      "Judiciary": { branches: ["Civil Judge", "Magistrate", "District Judge"], companies: [] },
      "Law Firms": { branches: ["Corporate Law", "Criminal Law", "IPR", "Tax Law"], companies: ["Cyril Amarchand", "AZB & Partners", "Trilegal", "Other"] },
      "AIBE": { branches: ["Bar Council Exam"], companies: [] },
    }
  },
  "MBA / Management": {
    icon: "📊",
    subcategories: {
      "CAT Preparation": { branches: ["IIM Ahmedabad", "IIM Bangalore", "IIM Calcutta", "IIM Lucknow", "Other IIMs"], companies: [] },
      "Campus Placements": { branches: ["Finance", "Marketing", "Operations", "HR", "Consulting"], companies: ["McKinsey", "BCG", "Bain", "Goldman Sachs", "JP Morgan", "Other"] },
      "GMAT / GRE": { branches: ["Harvard", "Wharton", "Stanford GSB", "INSEAD", "Other"], companies: [] },
    }
  },
  "Teaching": {
    icon: "📚",
    subcategories: {
      "School Teaching": { branches: ["Primary Teacher", "TGT", "PGT", "Special Educator"], companies: [] },
      "College Professor": { branches: ["Assistant Professor", "Associate Professor", "NET/SET"], companies: [] },
      "Coaching Institute": { branches: ["JEE", "NEET", "UPSC", "Banking", "SSC"], companies: ["Allen", "Aakash", "Unacademy", "BYJU'S", "Other"] },
      "CTET / STET": { branches: ["Paper 1", "Paper 2", "State TET"], companies: [] },
    }
  },
  "Startup / Business": {
    icon: "🚀",
    subcategories: {
      "Founding Team": { branches: ["Co-Founder", "CTO", "CPO", "CMO"], companies: [] },
      "Early Stage Jobs": { branches: ["Product Manager", "Growth Hacker", "Full Stack Dev", "Data Scientist"], companies: ["Y Combinator", "Sequoia", "Other Startups"] },
      "Freelancing": { branches: ["Web Development", "Design", "Content", "Marketing", "Consulting"], companies: [] },
    }
  },
  "General Corporate": {
    icon: "🏢",
    subcategories: {
      "Sales & Marketing": { branches: ["Business Development", "Digital Marketing", "Brand Manager", "Sales Executive"], companies: ["HUL", "P&G", "Nestle", "ITC", "Other"] },
      "Finance & Accounts": { branches: ["CA", "CFA", "Financial Analyst", "Accountant"], companies: ["Deloitte", "PwC", "EY", "KPMG", "Other"] },
      "HR": { branches: ["HR Executive", "Talent Acquisition", "HR Business Partner"], companies: [] },
      "Operations": { branches: ["Supply Chain", "Logistics", "Project Manager"], companies: [] },
    }
  },
};

const categoryGraphics = {
  "Engineering": {
    bg: "linear-gradient(135deg, #d1fae5, #a7f3d0)",
    icon: (
      <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <circle cx="40" cy="40" r="40" fill="url(#eng_bg)" />
        <defs><radialGradient id="eng_bg" cx="50%" cy="50%" r="50%"><stop offset="0%" stopColor="#bbf7d0"/><stop offset="100%" stopColor="#86efac"/></radialGradient></defs>
        <rect x="22" y="34" width="36" height="22" rx="3" fill="#16a34a" opacity="0.15"/>
        <rect x="26" y="38" width="28" height="14" rx="2" fill="white" opacity="0.7"/>
        <circle cx="40" cy="28" r="8" fill="#16a34a" opacity="0.8"/>
        <path d="M36 28 L40 24 L44 28" stroke="white" strokeWidth="2" strokeLinecap="round"/>
        <rect x="38" y="28" width="4" height="5" rx="1" fill="white"/>
        <rect x="29" y="41" width="6" height="2" rx="1" fill="#16a34a" opacity="0.6"/>
        <rect x="29" y="45" width="10" height="2" rx="1" fill="#16a34a" opacity="0.4"/>
        <rect x="45" y="41" width="6" height="6" rx="1" fill="#4ade80" opacity="0.7"/>
        <circle cx="40" cy="56" r="3" fill="#16a34a" opacity="0.3"/>
      </svg>
    )
  },
  "Government Jobs": {
    bg: "linear-gradient(135deg, #dbeafe, #bfdbfe)",
    icon: (
      <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <circle cx="40" cy="40" r="40" fill="url(#govt_bg)" />
        <defs><radialGradient id="govt_bg" cx="50%" cy="50%" r="50%"><stop offset="0%" stopColor="#bfdbfe"/><stop offset="100%" stopColor="#93c5fd"/></radialGradient></defs>
        <rect x="20" y="42" width="40" height="18" rx="2" fill="#2563eb" opacity="0.15"/>
        <rect x="24" y="46" width="32" height="10" rx="1" fill="white" opacity="0.6"/>
        <polygon points="40,20 52,38 28,38" fill="#2563eb" opacity="0.7"/>
        <rect x="36" y="52" width="8" height="8" rx="1" fill="#3b82f6" opacity="0.5"/>
        <rect x="27" y="49" width="5" height="7" rx="1" fill="#2563eb" opacity="0.4"/>
        <rect x="48" y="49" width="5" height="7" rx="1" fill="#2563eb" opacity="0.4"/>
        <rect x="18" y="58" width="44" height="3" rx="1.5" fill="#2563eb" opacity="0.3"/>
      </svg>
    )
  },
  "Medical": {
    bg: "linear-gradient(135deg, #fee2e2, #fecaca)",
    icon: (
      <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <circle cx="40" cy="40" r="40" fill="url(#med_bg)" />
        <defs><radialGradient id="med_bg" cx="50%" cy="50%" r="50%"><stop offset="0%" stopColor="#fecaca"/><stop offset="100%" stopColor="#fca5a5"/></radialGradient></defs>
        <rect x="28" y="22" width="24" height="36" rx="12" fill="#ef4444" opacity="0.15"/>
        <rect x="36" y="26" width="8" height="28" rx="4" fill="#ef4444" opacity="0.7"/>
        <rect x="26" y="36" width="28" height="8" rx="4" fill="#ef4444" opacity="0.7"/>
        <circle cx="40" cy="40" r="5" fill="white" opacity="0.8"/>
      </svg>
    )
  },
  "Law": {
    bg: "linear-gradient(135deg, #fef3c7, #fde68a)",
    icon: (
      <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <circle cx="40" cy="40" r="40" fill="url(#law_bg)" />
        <defs><radialGradient id="law_bg" cx="50%" cy="50%" r="50%"><stop offset="0%" stopColor="#fde68a"/><stop offset="100%" stopColor="#fcd34d"/></radialGradient></defs>
        <rect x="39" y="20" width="2" height="40" rx="1" fill="#d97706" opacity="0.6"/>
        <rect x="24" y="30" width="32" height="3" rx="1.5" fill="#d97706" opacity="0.7"/>
        <ellipse cx="28" cy="36" rx="6" ry="3" fill="#d97706" opacity="0.4"/>
        <ellipse cx="52" cy="36" rx="6" ry="3" fill="#d97706" opacity="0.4"/>
        <rect x="34" y="58" width="12" height="3" rx="1.5" fill="#d97706" opacity="0.5"/>
        <rect x="37" y="55" width="6" height="4" rx="1" fill="#d97706" opacity="0.3"/>
      </svg>
    )
  },
  "MBA / Management": {
    bg: "linear-gradient(135deg, #ede9fe, #ddd6fe)",
    icon: (
      <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <circle cx="40" cy="40" r="40" fill="url(#mba_bg)" />
        <defs><radialGradient id="mba_bg" cx="50%" cy="50%" r="50%"><stop offset="0%" stopColor="#ddd6fe"/><stop offset="100%" stopColor="#c4b5fd"/></radialGradient></defs>
        <rect x="20" y="50" width="8" height="14" rx="2" fill="#7c3aed" opacity="0.5"/>
        <rect x="32" y="40" width="8" height="24" rx="2" fill="#7c3aed" opacity="0.6"/>
        <rect x="44" y="30" width="8" height="34" rx="2" fill="#7c3aed" opacity="0.7"/>
        <rect x="56" y="22" width="8" height="42" rx="2" fill="#7c3aed" opacity="0.8"/>
        <path d="M24 48 L36 38 L48 28 L60 20" stroke="#7c3aed" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="3 2"/>
      </svg>
    )
  },
  "Teaching": {
    bg: "linear-gradient(135deg, #ecfdf5, #d1fae5)",
    icon: (
      <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <circle cx="40" cy="40" r="40" fill="url(#teach_bg)" />
        <defs><radialGradient id="teach_bg" cx="50%" cy="50%" r="50%"><stop offset="0%" stopColor="#d1fae5"/><stop offset="100%" stopColor="#a7f3d0"/></radialGradient></defs>
        <rect x="18" y="24" width="44" height="28" rx="3" fill="#059669" opacity="0.15"/>
        <rect x="22" y="28" width="36" height="20" rx="2" fill="white" opacity="0.6"/>
        <rect x="26" y="32" width="20" height="2" rx="1" fill="#059669" opacity="0.6"/>
        <rect x="26" y="37" width="14" height="2" rx="1" fill="#059669" opacity="0.4"/>
        <rect x="26" y="42" width="17" height="2" rx="1" fill="#059669" opacity="0.4"/>
        <circle cx="52" cy="36" r="5" fill="#059669" opacity="0.5"/>
        <rect x="36" y="52" width="8" height="6" rx="1" fill="#059669" opacity="0.3"/>
        <rect x="24" y="57" width="32" height="2" rx="1" fill="#059669" opacity="0.2"/>
      </svg>
    )
  },
  "Startup / Business": {
    bg: "linear-gradient(135deg, #fff7ed, #fed7aa)",
    icon: (
      <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <circle cx="40" cy="40" r="40" fill="url(#startup_bg)" />
        <defs><radialGradient id="startup_bg" cx="50%" cy="50%" r="50%"><stop offset="0%" stopColor="#fed7aa"/><stop offset="100%" stopColor="#fdba74"/></radialGradient></defs>
        <path d="M40 18 C40 18 55 26 55 40 C55 50 48 56 40 58 C32 56 25 50 25 40 C25 26 40 18 40 18Z" fill="#ea580c" opacity="0.2"/>
        <path d="M40 22 C40 22 52 29 52 40 C52 49 46 54 40 56 C34 54 28 49 28 40 C28 29 40 22 40 22Z" fill="#ea580c" opacity="0.3"/>
        <circle cx="40" cy="40" r="7" fill="#ea580c" opacity="0.7"/>
        <circle cx="40" cy="40" r="3" fill="white" opacity="0.9"/>
        <path d="M40 22 L40 33" stroke="#ea580c" strokeWidth="2" strokeLinecap="round"/>
        <path d="M40 47 L40 58" stroke="#ea580c" strokeWidth="2" strokeLinecap="round" opacity="0.5"/>
      </svg>
    )
  },
  "General Corporate": {
    bg: "linear-gradient(135deg, #f0f9ff, #bae6fd)",
    icon: (
      <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <circle cx="40" cy="40" r="40" fill="url(#corp_bg)" />
        <defs><radialGradient id="corp_bg" cx="50%" cy="50%" r="50%"><stop offset="0%" stopColor="#bae6fd"/><stop offset="100%" stopColor="#7dd3fc"/></radialGradient></defs>
        <rect x="22" y="28" width="36" height="30" rx="3" fill="#0284c7" opacity="0.15"/>
        <rect x="26" y="32" width="28" height="22" rx="2" fill="white" opacity="0.6"/>
        <rect x="30" y="22" width="20" height="12" rx="2" fill="#0284c7" opacity="0.3"/>
        <circle cx="40" cy="28" r="4" fill="#0284c7" opacity="0.6"/>
        <rect x="30" y="38" width="8" height="2" rx="1" fill="#0284c7" opacity="0.5"/>
        <rect x="30" y="43" width="12" height="2" rx="1" fill="#0284c7" opacity="0.4"/>
        <rect x="30" y="48" width="6" height="2" rx="1" fill="#0284c7" opacity="0.3"/>
        <rect x="44" y="38" width="6" height="12" rx="1" fill="#0284c7" opacity="0.3"/>
      </svg>
    )
  },
};

const features = [
  { icon: <MdOutlineUploadFile size={28} />, title: "Upload Resume", desc: "AI generates personalized interview questions from your resume" },
  { icon: <BsCameraVideo size={28} />, title: "AI Interview", desc: "Face-to-face AI interview with real-time proctoring" },
  { icon: <MdSecurity size={28} />, title: "Proctored", desc: "Tab switch, face detection, noise alerts" },
  { icon: <MdOutlineAnalytics size={28} />, title: "Detailed Analysis", desc: "Confidence score, correctness, strong/weak topics" },
];

function CareerSelector({ onStart }) {
  const [step, setStep] = useState(0); // 0=category, 1=subcategory, 2=branch, 3=company
  const [selected, setSelected] = useState({ category: "", subcategory: "", branch: "", company: "" });

  const category = careerData[selected.category];
  const subcategory = category?.subcategories[selected.subcategory];
  // Engineering has branch->companies map, others have flat branches+companies
  const isEngineeringStyle = subcategory?.branches && !Array.isArray(subcategory.branches);
  const branchList = isEngineeringStyle ? Object.keys(subcategory.branches) : (subcategory?.branches || []);
  const companyList = isEngineeringStyle
    ? (subcategory?.branches[selected.branch] || [])
    : (subcategory?.companies || []);
  const hasCompanies = companyList.length > 0;

  const steps = ["Category", "Type", "Specialization", hasCompanies ? "Dream Company" : null].filter(Boolean);

  const handleCategory = (cat) => {
    setSelected({ category: cat, subcategory: "", branch: "", company: "" });
    setStep(1);
  };

  const handleSubcategory = (sub) => {
    setSelected(p => ({ ...p, subcategory: sub, branch: "", company: "" }));
    setStep(2);
  };

  const handleBranch = (branch) => {
    setSelected(p => ({ ...p, branch }));
    const hasCo = isEngineeringStyle
      ? (subcategory?.branches[branch]?.length > 0)
      : (subcategory?.companies?.length > 0);
    if (hasCo) setStep(3);
    else setStep(4);
  };

  const handleCompany = (company) => {
    setSelected(p => ({ ...p, company }));
    setStep(4);
  };

  const reset = () => { setStep(0); setSelected({ category: "", subcategory: "", branch: "", company: "" }); };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
      <div className="text-center mb-8 sm:mb-10">
        <h2 className="text-2xl sm:text-3xl font-bold mb-3" style={{ color: "#14532d" }}>Choose Your Path</h2>
        <p className="text-gray-500">Select your goal and we'll prepare a personalized interview experience</p>
      </div>

      {/* Step indicator */}
      <div className="flex items-center justify-center flex-wrap gap-2 mb-8 sm:mb-10">
        {steps.map((s, i) => (
          <React.Fragment key={i}>
            <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${i < step ? "bg-green-600 text-white" : i === step ? "bg-green-700 text-white" : "bg-green-50 text-green-400"}`}>
              {i < step ? <MdCheck size={12} /> : <span>{i + 1}</span>}
              {s}
            </div>
            {i < steps.length - 1 && <div className={`w-6 h-px ${i < step ? "bg-green-500" : "bg-green-100"}`} />}
          </React.Fragment>
        ))}
      </div>

      <AnimatePresence mode="wait">

        {/* Step 0 — Category */}
        {step === 0 && (
          <motion.div key="step0" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
              {Object.entries(careerData).map(([cat, val]) => (
                <button key={cat} onClick={() => handleCategory(cat)}
                  className="bg-white border border-green-100 rounded-2xl overflow-hidden hover:border-green-400 hover:shadow-md transition-all cursor-pointer group text-left">
                  <div className="w-full h-28 overflow-hidden flex items-center justify-center" style={{ background: categoryGraphics[cat]?.bg || "#f0fdf4" }}>
                    <div className="w-20 h-20">{categoryGraphics[cat]?.icon}</div>
                  </div>
                  <div className="p-3 flex items-center gap-2">
                    <span className="text-lg">{val.icon}</span>
                    <p className="text-sm font-semibold text-gray-800 group-hover:text-green-700">{cat}</p>
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Step 1 — Subcategory */}
        {step === 1 && (
          <motion.div key="step1" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>
            <p className="text-center text-sm text-gray-500 mb-6">You selected: <span className="font-semibold text-green-700">{selected.category}</span></p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
              {Object.keys(category?.subcategories || {}).map((sub) => (
                <button key={sub} onClick={() => handleSubcategory(sub)}
                  className="bg-white border border-green-100 rounded-2xl p-5 text-left hover:border-green-400 hover:shadow-md transition-all cursor-pointer">
                  <p className="text-sm font-semibold text-gray-800">{sub}</p>
                </button>
              ))}
            </div>
            <button onClick={reset} className="flex items-center gap-1 text-sm text-gray-400 hover:text-green-600 mt-6 mx-auto cursor-pointer transition">
              <MdArrowBack size={16} /> Back
            </button>
          </motion.div>
        )}

        {/* Step 2 — Branch */}
        {step === 2 && (
          <motion.div key="step2" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>
            <p className="text-center text-sm text-gray-500 mb-6">
              <span className="font-semibold text-green-700">{selected.category}</span> → <span className="font-semibold text-green-700">{selected.subcategory}</span>
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {subcategory?.branches && branchList.map((branch) => (
                <button key={branch} onClick={() => handleBranch(branch)}
                  className="bg-white border border-green-100 rounded-xl p-4 text-sm font-medium text-gray-700 hover:border-green-400 hover:shadow-md transition-all cursor-pointer text-center">
                  {branch}
                </button>
              ))}
            </div>
            <button onClick={() => setStep(1)} className="flex items-center gap-1 text-sm text-gray-400 hover:text-green-600 mt-6 mx-auto cursor-pointer transition">
              <MdArrowBack size={16} /> Back
            </button>
          </motion.div>
        )}

        {/* Step 3 — Company */}
        {step === 3 && (
          <motion.div key="step3" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>
            <p className="text-center text-sm text-gray-500 mb-6">Which company are you targeting?</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {companyList.map((co) => (
                <button key={co} onClick={() => handleCompany(co)}
                  className="bg-white border border-green-100 rounded-xl p-4 text-sm font-medium text-gray-700 hover:border-green-400 hover:shadow-md transition-all cursor-pointer text-center">
                  {co}
                </button>
              ))}
            </div>
            <button onClick={() => setStep(2)} className="flex items-center gap-1 text-sm text-gray-400 hover:text-green-600 mt-6 mx-auto cursor-pointer transition">
              <MdArrowBack size={16} /> Back
            </button>
          </motion.div>
        )}

        {/* Step 4 — Final CTA */}
        {step === 4 && (
          <motion.div key="step4" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4 }}
            className="bg-white border border-green-200 rounded-2xl p-8 text-center max-w-lg mx-auto shadow-sm">
            <div className="text-4xl mb-4">🎯</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Your Path is Ready!</h3>
            <div className="flex flex-wrap justify-center gap-2 mb-6">
              {[selected.category, selected.subcategory, selected.branch, selected.company].filter(Boolean).map((s, i) => (
                <span key={i} className="bg-green-50 text-green-700 text-xs px-3 py-1 rounded-full font-medium border border-green-200">{s}</span>
              ))}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-6 text-left">
              {["Mock Interview", "Interview Questions", "Resume Guidance", "Preparation Roadmap", "Eligibility Guidance", "Improvement Suggestions"].map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-sm text-gray-600">
                  <MdCheck size={14} className="text-green-500 flex-shrink-0" /> {item}
                </div>
              ))}
            </div>
            <button onClick={() => onStart(selected)}
              className="w-full text-white py-3 rounded-xl font-medium transition cursor-pointer flex items-center justify-center gap-2" style={{ background: "linear-gradient(135deg, #16a34a, #4ade80)" }}>
              Start My Interview Preparation <MdArrowForward size={18} />
            </button>
            <button onClick={reset} className="text-sm text-gray-400 hover:text-green-600 mt-3 cursor-pointer transition block mx-auto">
              ← Change Selection
            </button>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
}

function Home() {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);

  const handleCareerStart = (selected) => {
    if (!user) { navigate("/auth"); return; }
    navigate("/upload-resume", { state: { careerPath: selected } });
  };

  return (
    <div className="w-full min-h-screen" style={{ background: "linear-gradient(180deg, #f0fdf4 0%, #ffffff 50%, #f0fdf4 100%)" }}>

      {/* Navbar */}
      <nav className="w-full px-4 sm:px-8 py-4 flex items-center justify-between bg-white sticky top-0 z-40" style={{ borderBottom: "1px solid #dcfce7", boxShadow: "0 1px 12px rgba(74,222,128,0.08)" }}>
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl" style={{ background: "linear-gradient(135deg, #16a34a, #4ade80)" }}>
            <LogoIcon size={20} />
          </div>
          <span className="font-bold text-lg" style={{ color: "#15803d" }}>PrepMate</span>
        </div>
        <div className="flex items-center gap-2 sm:gap-4">
          {user && <span className="hidden sm:inline text-sm text-gray-500">Credits: <span className="font-bold text-green-700">{user.credits}</span></span>}
          {user && (
            <div onClick={() => navigate("/profile")}
              className="w-9 h-9 rounded-full text-white flex items-center justify-center text-sm font-bold cursor-pointer overflow-hidden" style={{ background: "linear-gradient(135deg, #16a34a, #4ade80)" }}>
              {user.picture ? <img src={user.picture} alt="avatar" className="w-full h-full object-cover" /> : (user.name?.[0] || "U").toUpperCase()}
            </div>
          )}
          <button onClick={() => navigate(user ? "/upload-resume" : "/auth")}
            className="text-white px-4 sm:px-5 py-2 rounded-full text-sm font-semibold transition cursor-pointer" style={{ background: "linear-gradient(135deg, #16a34a, #4ade80)" }}>
            {user ? "Start" : "Get Started"}
          </button>
        </div>
      </nav>

      {/* Hero */}
      <motion.section initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}
        className="max-w-5xl mx-auto px-4 sm:px-6 pt-16 sm:pt-24 pb-12 sm:pb-20 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold mb-6" style={{ background: "#dcfce7", color: "#15803d" }}>
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          AI-Powered · Proctored · Personalized
        </div>
        <h1 className="text-4xl sm:text-6xl font-extrabold leading-tight mb-5" style={{ color: "#14532d" }}>
          Ace Your Next<br />
          <span style={{ background: "linear-gradient(135deg, #16a34a, #4ade80)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            Interview
          </span>{" "}with AI
        </h1>
        <p className="text-gray-500 text-base sm:text-lg mb-10 max-w-xl mx-auto leading-relaxed">
          Upload your resume, get tailored questions, practice with a live AI interviewer, and receive a detailed performance report.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button onClick={() => navigate(user ? "/upload-resume" : "/auth")}
            className="text-white px-8 py-3.5 rounded-full text-base font-semibold transition cursor-pointer shadow-lg" style={{ background: "linear-gradient(135deg, #16a34a, #4ade80)", boxShadow: "0 8px 24px rgba(74,222,128,0.35)" }}>
            {user ? "Start Interview →" : "Get Started Free →"}
          </button>
          {!user && (
            <button onClick={() => navigate("/auth")}
              className="px-8 py-3.5 rounded-full text-base font-semibold border transition cursor-pointer" style={{ color: "#15803d", borderColor: "#86efac", background: "white" }}>
              Sign In
            </button>
          )}
        </div>

        {/* Stats row */}
        <div className="flex flex-wrap justify-center gap-8 mt-14">
          {[
            { value: "10K+", label: "Interviews Done" },
            { value: "95%", label: "Satisfaction Rate" },
            { value: "8+", label: "Career Domains" },
            { value: "3", label: "Languages" },
          ].map((s, i) => (
            <div key={i} className="text-center">
              <p className="text-2xl font-extrabold" style={{ color: "#15803d" }}>{s.value}</p>
              <p className="text-xs text-gray-400 mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Features */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 pb-16 sm:pb-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {features.map((f, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }} viewport={{ once: true }}
              className="bg-white rounded-2xl p-6 border" style={{ borderColor: "#dcfce7", boxShadow: "0 2px 16px rgba(74,222,128,0.07)" }}>
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ background: "#f0fdf4", color: "#16a34a" }}>{f.icon}</div>
              <h3 className="font-semibold text-gray-800 mb-1">{f.title}</h3>
              <p className="text-gray-400 text-sm">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 sm:py-20" style={{ background: "#f0fdf4" }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: "#4ade80" }}>Simple Process</p>
          <h2 className="text-2xl sm:text-3xl font-bold mb-12" style={{ color: "#14532d" }}>How It Works</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {[
              { step: "01", title: "Upload Resume", desc: "Drop your PDF resume and let AI extract your profile", img: resumeImg },
              { step: "02", title: "AI Interview", desc: "Answer personalized questions face-to-face with AI", img: aiImg },
              { step: "03", title: "Get Results", desc: "Receive a detailed score, feedback & improvement tips", img: confiImg },
            ].map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.15 }} viewport={{ once: true }}
                className="relative bg-white rounded-2xl p-8 flex flex-col items-center" style={{ border: "1px solid #dcfce7" }}>
                <span className="absolute -top-4 left-1/2 -translate-x-1/2 text-xs font-bold px-3 py-1 rounded-full text-white" style={{ background: "linear-gradient(135deg, #16a34a, #4ade80)" }}>{s.step}</span>
                <img src={s.img} alt={s.title} className="w-16 h-16 object-contain mb-4 mt-2" />
                <h3 className="font-semibold text-gray-800 mb-1">{s.title}</h3>
                <p className="text-gray-400 text-sm">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Career Selector */}
      <div className="bg-white" style={{ borderTop: "1px solid #dcfce7", borderBottom: "1px solid #dcfce7" }}>
        <CareerSelector onStart={handleCareerStart} />
      </div>

      {/* CTA Banner */}
      <section className="py-16 sm:py-20 text-center px-4">
        <motion.div initial={{ opacity: 0, scale: 0.97 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
          className="max-w-2xl mx-auto rounded-3xl p-10 sm:p-14" style={{ background: "linear-gradient(135deg, #16a34a, #4ade80)", boxShadow: "0 16px 48px rgba(74,222,128,0.3)" }}>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-3">Ready to crack your interview?</h2>
          <p className="text-green-100 mb-8 text-sm sm:text-base">Join thousands of candidates who practice smarter with PrepMate.</p>
          <button onClick={() => navigate(user ? "/upload-resume" : "/auth")}
            className="bg-white font-semibold px-8 py-3.5 rounded-full text-sm cursor-pointer transition hover:shadow-lg" style={{ color: "#15803d" }}>
            {user ? "Start Interview →" : "Get Started Free →"}
          </button>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="bg-white py-12 px-4 sm:px-6" style={{ borderTop: "1px solid #dcfce7" }}>
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="p-2 rounded-xl" style={{ background: "linear-gradient(135deg, #16a34a, #4ade80)" }}>
                  <LogoIcon size={18} />
                </div>
                <span className="font-bold text-lg" style={{ color: "#15803d" }}>PrepMate</span>
              </div>
              <p className="text-sm text-gray-500 mb-4">AI-powered interview practice platform helping candidates ace their dream jobs.</p>
              <div className="flex gap-3">
                <a href="#" className="w-8 h-8 rounded-full flex items-center justify-center transition" style={{ background: "#f0fdf4", color: "#16a34a" }}>
                  <span className="text-sm">𝕏</span>
                </a>
                <a href="#" className="w-8 h-8 rounded-full flex items-center justify-center transition" style={{ background: "#f0fdf4", color: "#16a34a" }}>
                  <span className="text-sm">in</span>
                </a>
                <a href="#" className="w-8 h-8 rounded-full flex items-center justify-center transition" style={{ background: "#f0fdf4", color: "#16a34a" }}>
                  <span className="text-sm">yt</span>
                </a>
              </div>
            </div>

            {/* Product */}
            <div>
              <h4 className="font-semibold text-sm mb-4" style={{ color: "#15803d" }}>Product</h4>
              <ul className="space-y-2 text-sm text-gray-500">
                <li><a href="#" className="hover:text-green-600 transition">Features</a></li>
                <li><a href="#" className="hover:text-green-600 transition">Pricing</a></li>
                <li><a href="#" className="hover:text-green-600 transition">How it Works</a></li>
                <li><a href="#" className="hover:text-green-600 transition">Career Paths</a></li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="font-semibold text-sm mb-4" style={{ color: "#15803d" }}>Company</h4>
              <ul className="space-y-2 text-sm text-gray-500">
                <li><a href="#" className="hover:text-green-600 transition">About Us</a></li>
                <li><a href="#" className="hover:text-green-600 transition">Blog</a></li>
                <li><a href="#" className="hover:text-green-600 transition">Careers</a></li>
                <li><a href="#" className="hover:text-green-600 transition">Contact</a></li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="font-semibold text-sm mb-4" style={{ color: "#15803d" }}>Legal</h4>
              <ul className="space-y-2 text-sm text-gray-500">
                <li><a href="#" className="hover:text-green-600 transition">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-green-600 transition">Terms of Service</a></li>
                <li><a href="#" className="hover:text-green-600 transition">Cookie Policy</a></li>
                <li><a href="#" className="hover:text-green-600 transition">Refund Policy</a></li>
              </ul>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="pt-6 flex justify-center" style={{ borderTop: "1px solid #dcfce7" }}>
            <p className="text-xs text-gray-400">© {new Date().getFullYear()} PrepMate. All rights reserved.</p>
          </div>
        </div>
      </footer>

    </div>
  );
}

export default Home;
