"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Info, CheckCircle2, X, Mail, Phone, Building2, User, Briefcase } from "lucide-react";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import StickyHeader from "@/components/StickyHeader";

// ————————————————————————————
// Helper: simple validators
// ————————————————————————————
const validateEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
const validatePhone = (v) => /^[0-9+()\-\s]{7,}$/.test(v);

// ————————————————————————————
// Enhanced Quote carousel content with more inspiring quotes
// ————————————————————————————
const QUOTES = [
  {
    text: "Great teams aren’t found — they’re built with intent.",
    author: "Demand Recruitment Services",
  },
  {
    text: "The right hire turns projects into momentum.",
    author: "DRS Get Started",
  },
  {
    text: "Every role deserves a perfect match.",
    author: "Talent Philosophy",
  },
  {
    text: "Innovation starts with the right people in the right roles.",
    author: "Steve Jobs",
  },
  {
    text: "Hire character. Train skill.",
    author: "Peter Schutz",
  },
  {
    text: "The secret of my success is that we have gone to exceptional lengths to hire the best people in the world.",
    author: "Steve Jobs",
  },
];

export default function RequestEmployeePage() {
  const router = useRouter();

  // form state
  const [form, setForm] = useState({
    jobTitle: "",
    duties: "",
    location: "",
    hearAbout: "",
    comments: "",
    firstName: "",
    lastName: "",
    company: "",
    phone: "",
    email: "",
    respondBy: "email",
    jobType: "Permanent",
    workMode: "Onsite", // Onsite | Remote | Hybrid
    salaryRange: "",
    hourlyRate: "",
    contractLength: "",
    tempDuration: "",
    stipend: "",
  });

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // quote carousel index
  const [qIndex, setQIndex] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setQIndex((i) => (i + 1) % QUOTES.length), 4000); // Slightly slower for better readability
    return () => clearInterval(id);
  }, []);

  // derived flags for conditional fields
  const isPermanent = form.jobType === "Permanent";
  const isContract = form.jobType === "Contract";
  const isTemporary = form.jobType === "Temporary";
  const isIntern = form.jobType === "Internship";

  // general change handler with debounced validation
  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    // Validate on change for better UX
    validateField(name, value);
  };

  // field-level validation
  const validateField = (name, value) => {
    let msg = "";
    if (["jobTitle", "duties", "location", "firstName", "lastName", "company", "phone", "email"].includes(name) && !value.trim()) {
      msg = "This field is required.";
    }
    if (name === "email" && value && !validateEmail(value)) msg = "Enter a valid email.";
    if (name === "phone" && value && !validatePhone(value)) msg = "Enter a valid phone number.";

    // conditional requirements
    if (isPermanent && name === "salaryRange" && !value.trim()) msg = "Provide a salary range.";
    if (isContract) {
      if (name === "contractLength" && !value.trim()) msg = "Contract length required.";
      if (name === "hourlyRate" && !value.trim()) msg = "Hourly rate required.";
    }
    if (isTemporary && name === "tempDuration" && !value.trim()) msg = "Duration required.";
    if (isIntern && name === "stipend" && !value.trim()) msg = "Stipend amount required.";

    setErrors((e) => ({ ...e, [name]: msg }));
    return msg;
  };

  const validateAll = () => {
    const fields = [
      "jobTitle",
      "duties",
      "location",
      "firstName",
      "lastName",
      "company",
      "phone",
      "email",
    ];
    if (isPermanent) fields.push("salaryRange");
    if (isContract) fields.push("contractLength", "hourlyRate");
    if (isTemporary) fields.push("tempDuration");
    if (isIntern) fields.push("stipend");

    const newErrors = {};
    let isValid = true;
    fields.forEach((key) => {
      const msg = validateField(key, form[key] ?? "");
      if (msg) {
        newErrors[key] = msg;
        isValid = false;
      }
    });
    setErrors(newErrors);
    return isValid;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!validateAll()) return;
    try {
      setSubmitting(true);
      // TODO: integrate with your API endpoint here
      await new Promise((r) => setTimeout(r, 900));
      setShowModal(true);
      setSubmitting(false);
      // Auto redirect after a brief success moment
      setTimeout(() => router.push("/thank-you?source=request-employee"), 2500);
    } catch (err) {
      setSubmitting(false);
      alert("Something went wrong. Please try again.");
    }
  };

  // ————————————————————————————
  // UI building blocks with improved design
  // ————————————————————————————
  const Field = ({
    label,
    name,
    required,
    tooltip,
    children,
  }) => (
    <motion.div 
      className="space-y-2"
      whileHover={{ scale: 1.01 }}
      transition={{ duration: 0.2 }}
    >
      <label htmlFor={name} className="flex items-center gap-2 font-medium text-gray-800">
        <span>
          {label} {required && <span className="text-teal-600">*</span>}
        </span>
        {tooltip && (
          <motion.span 
            className="group relative inline-flex cursor-help" 
            aria-label={tooltip} 
            title={tooltip}
            whileHover={{ scale: 1.1 }}
          >
            <Info className="h-4 w-4 text-teal-600" />
          </motion.span>
        )}
      </label>
      {children}
      {errors[name] && (
        <motion.p 
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-sm text-rose-600"
        >
          {errors[name]}
        </motion.p>
      )}
    </motion.div>
  );

  const inputBase =
    "w-full rounded-xl border border-gray-200 bg-white px-4 py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition duration-200";

  return (
    <div className="bg-gray-50 min-h-screen"> {/* Light background for modern feel */}
      <Navbar />
      <StickyHeader />

      {/* ——— Enhanced Hero Banner with hover effects and parallax-inspired animation ——— */}
      <section className="relative overflow-hidden h-[60vh] min-h-[400px]">
        <motion.div 
          className="absolute inset-0"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.5 }}
        >
          <Image
            src="/singleJob.jpg"
            alt="Build your dream team"
            fill
            className="object-cover transition-transform duration-500"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-teal-900/70 via-teal-800/50 to-teal-700/40" /> {/* Enhanced teal gradient */}
        </motion.div>

        <div className="relative z-10 max-w-7xl mx-auto px-8 py-20 md:py-32 flex flex-col justify-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-5xl md:text-7xl font-extrabold text-white tracking-tight drop-shadow-lg"
          >
            Request Top Talent
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
            className="mt-6 max-w-xl text-xl text-white/90 leading-relaxed"
          >
            Unlock exceptional candidates tailored to your needs. Fast, reliable, and perfectly matched.
          </motion.p>

          {/* Enhanced rotating quotes with smoother animation and styling */}
          <div className="mt-12">
            <AnimatePresence mode="wait">
              <motion.blockquote
                key={qIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="inline-flex flex-col gap-2 rounded-2xl bg-white/10 px-6 py-4 backdrop-blur-lg text-white shadow-xl max-w-lg"
              >
                <span className="text-2xl italic font-light leading-tight">“{QUOTES[qIndex].text}”</span>
                <span className="text-white/70 text-right">— {QUOTES[qIndex].author}</span>
              </motion.blockquote>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* ——— Intro with better spacing and typography ——— */}
      <section className="text-center py-20 px-8 max-w-4xl mx-auto text-gray-700">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl font-bold text-gray-900 tracking-tight"
        >
          Build Your Dream Team Today
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="mt-6 text-lg leading-relaxed max-w-2xl mx-auto"
        >
          Share your requirements, and let our experts curate the ideal candidates. Seamless, efficient, and designed for success.
        </motion.p>
      </section>

      {/* ——— Content Grid: Form + Enhanced Inspiration Card ——— */}
      <section className="max-w-7xl mx-auto px-8 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left: Form with improved grouping, spacing, and interactions */}
          <motion.div 
            className="lg:col-span-2 bg-white rounded-3xl shadow-lg p-8"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <form onSubmit={onSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Job Basics */}
              <div className="md:col-span-2 space-y-6">
                <h3 className="text-2xl font-semibold text-gray-900 flex items-center gap-3"><Briefcase className="h-6 w-6 text-teal-600"/> Position Details</h3>
                <p className="text-gray-500">Provide details for the best match.</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Field label="Job Title" name="jobTitle" required tooltip="e.g., Senior React Developer">
                    <input id="jobTitle" name="jobTitle" className={inputBase} value={form.jobTitle} onChange={onChange} placeholder="e.g., Product Designer" />
                  </Field>
                  <Field label="Location" name="location" required tooltip="City, country, or remote">
                    <input id="location" name="location" className={inputBase} value={form.location} onChange={onChange} placeholder="Dhaka, BD / Remote" />
                  </Field>
                  <Field label="Job Type" name="jobType" tooltip="Switching this reveals role-specific fields">
                    <select id="jobType" name="jobType" className={inputBase} value={form.jobType} onChange={onChange}>
                      <option>Permanent</option>
                      <option>Contract</option>
                      <option>Temporary</option>
                      <option>Internship</option>
                    </select>
                  </Field>
                  <Field label="Work Mode" name="workMode" tooltip="Onsite, Remote, or Hybrid">
                    <select id="workMode" name="workMode" className={inputBase} value={form.workMode} onChange={onChange}>
                      <option>Onsite</option>
                      <option>Remote</option>
                      <option>Hybrid</option>
                    </select>
                  </Field>
                </div>
              </div>

              <div className="md:col-span-2 space-y-6">
                <Field label="Duties & Responsibilities" name="duties" required tooltip="Key responsibilities, must-have skills">
                  <textarea id="duties" name="duties" rows={5} className={inputBase} value={form.duties} onChange={onChange} placeholder="Outline scope, stack, and outcomes" />
                </Field>
              </div>

              {/* Conditional Fields with animations */}
              <AnimatePresence>
                {isPermanent && (
                  <motion.div 
                    className="md:col-span-2"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                  >
                    <Field label="Salary Range" name="salaryRange" required tooltip="Monthly or yearly range">
                      <input id="salaryRange" name="salaryRange" className={inputBase} value={form.salaryRange} onChange={onChange} placeholder="e.g., $70k–$90k" />
                    </Field>
                  </motion.div>
                )}
                {isContract && (
                  <motion.div 
                    className="grid grid-cols-1 md:grid-cols-2 gap-6 md:col-span-2"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                  >
                    <Field label="Contract Length" name="contractLength" required tooltip="Duration in months">
                      <input id="contractLength" name="contractLength" className={inputBase} value={form.contractLength} onChange={onChange} placeholder="e.g., 6 months" />
                    </Field>
                    <Field label="Hourly Rate" name="hourlyRate" required tooltip="Local currency or USD">
                      <input id="hourlyRate" name="hourlyRate" className={inputBase} value={form.hourlyRate} onChange={onChange} placeholder="e.g., $45/hr" />
                    </Field>
                  </motion.div>
                )}
                {isTemporary && (
                  <motion.div 
                    className="md:col-span-2"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                  >
                    <Field label="Temporary Duration" name="tempDuration" required tooltip="e.g., 4 weeks, seasonal">
                      <input id="tempDuration" name="tempDuration" className={inputBase} value={form.tempDuration} onChange={onChange} placeholder="e.g., 8 weeks" />
                    </Field>
                  </motion.div>
                )}
                {isIntern && (
                  <motion.div 
                    className="md:col-span-2"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                  >
                    <Field label="Stipend" name="stipend" required tooltip="Monthly stipend amount">
                      <input id="stipend" name="stipend" className={inputBase} value={form.stipend} onChange={onChange} placeholder="e.g., ৳15,000 / $200" />
                    </Field>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Discoverability */}
              <div className="md:col-span-2 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Field label="How did you hear about us?" name="hearAbout" tooltip="Optional — helps us improve">
                    <input id="hearAbout" name="hearAbout" className={inputBase} value={form.hearAbout} onChange={onChange} placeholder="Google, LinkedIn, Referral…" />
                  </Field>
                  <Field label="Additional Comments" name="comments" tooltip="Role context, timelines, team size">
                    <textarea id="comments" name="comments" rows={4} className={inputBase} value={form.comments} onChange={onChange} placeholder="Anything else we should know?" />
                  </Field>
                </div>
              </div>

              {/* Contact Section */}
              <div className="md:col-span-2 space-y-6">
                <h3 className="text-2xl font-semibold text-gray-900 flex items-center gap-3"><User className="h-6 w-6 text-teal-600"/> Your Contact Information</h3>
              </div>

              <Field label="First Name" name="firstName" required tooltip="Your given name">
                <input id="firstName" name="firstName" className={inputBase} value={form.firstName} onChange={onChange} placeholder="Jane" />
              </Field>
              <Field label="Last Name" name="lastName" required tooltip="Your family name">
                <input id="lastName" name="lastName" className={inputBase} value={form.lastName} onChange={onChange} placeholder="Doe" />
              </Field>

              <Field label="Company" name="company" required tooltip="Legal or trading name">
                <div className="relative">
                  <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400"/>
                  <input id="company" name="company" className={`${inputBase} pl-10`} value={form.company} onChange={onChange} placeholder="Acme Inc." />
                </div>
              </Field>

              <Field label="Phone" name="phone" required tooltip="Include country code if outside BD">
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400"/>
                  <input id="phone" name="phone" className={`${inputBase} pl-10`} value={form.phone} onChange={onChange} placeholder="+8801XXXXXXXXX" />
                </div>
              </Field>

              <Field label="Email" name="email" required tooltip="We’ll send confirmation here">
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400"/>
                  <input id="email" name="email" type="email" className={`${inputBase} pl-10`} value={form.email} onChange={onChange} placeholder="you@company.com" />
                </div>
              </Field>

              {/* Preferred Contact Method with better styling */}
              <div className="md:col-span-2">
                <label className="block mb-4 font-medium text-gray-800">Preferred Response Method:</label>
                <div className="flex flex-wrap items-center gap-4">
                  {[
                    { key: "phone", label: "Phone" },
                    { key: "email", label: "Email" },
                  ].map((opt) => (
                    <motion.label 
                      key={opt.key} 
                      className={`inline-flex items-center gap-2 rounded-full border border-gray-200 px-5 py-3 cursor-pointer transition duration-200 ${form.respondBy === opt.key ? 'bg-teal-100 border-teal-500' : 'hover:border-teal-400'}`}
                      whileHover={{ scale: 1.05 }}
                    >
                      <input
                        type="radio"
                        name="respondBy"
                        value={opt.key}
                        checked={form.respondBy === opt.key}
                        onChange={onChange}
                        className="hidden"
                      />
                      <span className="font-medium">{opt.label}</span>
                    </motion.label>
                  ))}
                </div>
              </div>

              <div className="md:col-span-2">
                <motion.button
                  type="submit"
                  disabled={submitting}
                  className="w-full md:w-auto inline-flex items-center justify-center gap-2 bg-teal-600 hover:bg-teal-700 disabled:opacity-60 text-white font-semibold py-4 px-8 rounded-xl shadow-lg shadow-teal-600/30 transition-transform duration-200"
                  whileHover={{ scale: 1.05, boxShadow: "0 10px 20px rgba(13, 148, 136, 0.3)" }}
                  whileTap={{ scale: 0.95 }}
                >
                  {submitting ? "Submitting…" : "Submit Request"}
                </motion.button>
              </div>
            </form>
          </motion.div>

          {/* Right: Enhanced Inspiration / Trust Card with image, animations, and Dribbble-inspired design */}
          <motion.aside
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="group relative overflow-hidden rounded-3xl shadow-2xl ring-1 ring-gray-200 bg-white">
              <motion.div 
                className="relative h-64"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.4 }}
              >
                <Image src="/hb2.jpg" alt="Top talent, delivered" fill className="object-cover rounded-t-3xl" />
              </motion.div>
              <div className="p-8 space-y-4">
                <h3 className="text-2xl font-semibold text-gray-900">Why Choose DRS?</h3>
                <ul className="space-y-3 text-gray-700">
                  <motion.li className="flex items-center gap-2" whileHover={{ x: 5 }}><CheckCircle2 className="h-5 w-5 text-teal-600" /> 48–72h candidate shortlists</motion.li>
                  <motion.li className="flex items-center gap-2" whileHover={{ x: 5 }}><CheckCircle2 className="h-5 w-5 text-teal-600" /> Role-specific vetting & references</motion.li>
                  <motion.li className="flex items-center gap-2" whileHover={{ x: 5 }}><CheckCircle2 className="h-5 w-5 text-teal-600" /> Compliance-first onboarding</motion.li>
                </ul>
                <div className="pt-4 text-sm italic text-gray-500">
                  "Hiring is hard. Matching shouldn’t be."
                </div>
              </div>
              <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-teal-50 to-transparent pointer-events-none"/>
            </div>
          </motion.aside>
        </div>
      </section>

      <Footer />

      {/* ——— Enhanced Success Modal with better UX ——— */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/60 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="w-full max-w-lg rounded-3xl bg-white p-8 shadow-2xl relative"
            >
              <button onClick={() => setShowModal(false)} className="absolute top-4 right-4 rounded-full p-1 text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition">
                <X className="h-6 w-6"/>
              </button>
              <div className="flex flex-col items-center text-center gap-4">
                <CheckCircle2 className="h-16 w-16 text-teal-600" />
                <h4 className="text-3xl font-semibold text-gray-900">Request Submitted!</h4>
                <p className="text-gray-600 max-w-md">We’ve received your details. A specialist will reach out shortly. Redirecting to thank you page…</p>
              </div>
              <div className="mt-8 flex justify-center gap-4">
                <motion.button 
                  onClick={() => router.push("/thank-you?source=request-employee")} 
                  className="inline-flex items-center justify-center rounded-xl bg-teal-600 px-6 py-3 font-semibold text-white hover:bg-teal-700 transition"
                  whileHover={{ scale: 1.05 }}
                >
                  Continue
                </motion.button>
                <motion.button 
                  onClick={() => setShowModal(false)} 
                  className="inline-flex items-center justify-center rounded-xl border border-gray-200 px-6 py-3 font-semibold text-gray-700 hover:bg-gray-50 transition"
                  whileHover={{ scale: 1.05 }}
                >
                  Close
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ——— Page-level styles with enhanced teal theme and typography ——— */}
      <style jsx global>{`
        :root {
          --brand: #0d9488; /* teal-600 for vibrancy */
          --brand-dark: #0f766e; /* teal-700 */
        }
        ::selection { background: rgba(13, 148, 136, 0.3); }
        input::placeholder, textarea::placeholder { color: #9CA3AF; opacity: 0.8; }
        body { font-family: 'Inter', sans-serif; } /* Assuming modern font */
      `}</style>
    </div>
  );
}