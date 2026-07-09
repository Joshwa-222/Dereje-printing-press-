import React, { useState, FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Link } from "react-router-dom";
import {
  Phone,
  Mail,
  MapPin,
  Send,
  Clock,
  CheckCircle2,
  AlertCircle,
  MessageCircle,
  Printer,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";
import { api } from "../services/api";

export default function Contact() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const [loading, setLoading] = useState<boolean>(false);
  const [submitStatus, setSubmitStatus] = useState<
    "success" | "error" | null
  >(null);

  const [statusMessage, setStatusMessage] = useState<string>("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name || !email || !message) {
      setSubmitStatus("error");
      setStatusMessage("Please complete all required fields.");
      return;
    }

    try {
      setLoading(true);
      setSubmitStatus(null);

      await api.sendContactMessage({
        name,
        email,
        phone,
        message,
      });

      setSubmitStatus("success");
      setStatusMessage(
        "Your message has been sent successfully. Our team will contact you soon."
      );

      setName("");
      setEmail("");
      setPhone("");
      setMessage("");
    } catch (error: any) {
      setSubmitStatus("error");
      setStatusMessage(
        error.message || "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: "Our Location",
      value: "Richi, Meskerem Mazoria, Addis Ababa, Ethiopia",
    },

    {
      icon: Phone,
      title: "Phone Number",
      value: "+251 902 393 280",
    },

    {
      icon: Mail,
      title: "Email Address",
      value: "2dpress@gmail.com",
    },

    {
      icon: Clock,
      title: "Working Hours",
      value: "Monday - Saturday | 8:00 AM - 5:00 PM",
    },
  ];

  const handleScrollToForm = () => {
    const element = document.getElementById("contact-form-section");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative overflow-hidden bg-black text-white min-h-screen py-24 px-5">
      {/* BACKGROUND */}
      <div className="absolute top-0 left-0 w-[450px] h-[450px] bg-red-600/10 blur-[120px]" />
      <div className="absolute bottom-0 right-0 w-[450px] h-[450px] bg-purple-600/10 blur-[120px]" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* PAGE HEADER */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <div className="flex justify-center mb-6">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-bold px-4 py-2 rounded-full border border-white/10 bg-white/5 hover:bg-[#C41E3A]/10 hover:border-[#C41E3A]/30 text-white/80 hover:text-white transition-all duration-200"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-[#C41E3A]" />
              Return to Home
            </Link>
          </div>

          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tight mb-4">
            Get In <span className="text-[#C41E3A]">Touch</span>
          </h1>
          <p className="text-white/60 text-base md:text-lg font-light leading-relaxed">
            Have a project in mind or need a custom quote? Reach out to our professional printing 
            and advertising team in Addis Ababa. We are here to help you make an impact.
          </p>
        </motion.div>

        {/* MAIN GRID */}
        <div id="contact-form-section" className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* LEFT SIDE */}
          <div className="lg:col-span-5 space-y-6">
            {/* INFO CARD */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="rounded-[32px] border border-white/10 bg-white/5 backdrop-blur-xl p-8"
            >
              <div className="flex items-center gap-3 mb-8">
                <div className="w-14 h-14 rounded-2xl bg-red-600/20 flex items-center justify-center">
                  <Printer className="w-7 h-7 text-red-500" />
                </div>

                <div>
                  <h2 className="text-2xl font-black">
                    Contact Information
                  </h2>

                  <p className="text-white/50 text-sm mt-1">
                    Reach our printing and advertising team.
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                {contactInfo.map((item, index) => {
                  const Icon = item.icon;

                  return (
                    <motion.div
                      key={item.title}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.08 }}
                      viewport={{ once: true }}
                      className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/5 p-5"
                    >
                      <div className="w-12 h-12 rounded-xl bg-red-600/20 flex items-center justify-center shrink-0">
                        <Icon className="w-5 h-5 text-red-500" />
                      </div>

                      <div>
                        <h3 className="font-bold text-lg">
                          {item.title}
                        </h3>

                        <p className="text-white/60 text-sm mt-1 leading-relaxed">
                          {item.value}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* WHATSAPP BUTTON */}
              <a
                href="https://wa.me/251902393280"
                target="_blank"
                rel="noreferrer"
                className="mt-8 w-full flex items-center justify-center gap-3 rounded-2xl bg-green-600 hover:bg-green-700 transition-all duration-300 py-4 font-bold"
              >
                <MessageCircle className="w-5 h-5" />
                Chat on WhatsApp
              </a>
            </motion.div>

            {/* MAP */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative overflow-hidden rounded-[32px] border border-white/10 bg-white/5 backdrop-blur-xl h-[300px]"
            >
              <iframe
                title="Dereje Printing Location"
                src="https://maps.google.com/maps?q=Meskerem%20Mazoria%20Addis%20Ababa&t=&z=15&ie=UTF8&iwloc=&output=embed"
                className="w-full h-full border-0"
                loading="lazy"
              />

              <div className="absolute top-5 left-5 bg-black/60 backdrop-blur-md border border-white/10 rounded-2xl px-4 py-3">
                <p className="text-sm font-semibold">
                  Dereje Printing Press
                </p>

                <p className="text-white/60 text-xs mt-1">
                  Addis Ababa, Ethiopia
                </p>
              </div>
            </motion.div>
          </div>

          {/* RIGHT SIDE - FORM */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-7 rounded-[32px] border border-white/10 bg-white/5 backdrop-blur-xl p-8 md:p-10"
          >
            <div className="mb-10">
              <h2 className="text-4xl font-black mb-3">
                Send a Message
              </h2>

              <p className="text-white/60 leading-relaxed">
                Fill out the form below and our team will contact you quickly.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* NAME & EMAIL */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold mb-3 text-white/70">
                    Full Name *
                  </label>

                  <input
                    type="text"
                    placeholder="Your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full rounded-2xl border border-white/10 bg-black/40 px-5 py-4 text-white placeholder:text-white/30 outline-none focus:border-red-500 transition"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-3 text-white/70">
                    Email Address *
                  </label>

                  <input
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-2xl border border-white/10 bg-black/40 px-5 py-4 text-white placeholder:text-white/30 outline-none focus:border-red-500 transition"
                  />
                </div>
              </div>

              {/* PHONE */}
              <div>
                <label className="block text-sm font-semibold mb-3 text-white/70">
                  Phone Number
                </label>

                <input
                  type="text"
                  placeholder="+251..."
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full rounded-2xl border border-white/10 bg-black/40 px-5 py-4 text-white placeholder:text-white/30 outline-none focus:border-red-500 transition"
                />
              </div>

              {/* MESSAGE */}
              <div>
                <label className="block text-sm font-semibold mb-3 text-white/70">
                  Message *
                </label>

                <textarea
                  rows={6}
                  placeholder="Tell us about your printing project..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full rounded-2xl border border-white/10 bg-black/40 px-5 py-4 text-white placeholder:text-white/30 outline-none focus:border-red-500 transition resize-none"
                />
              </div>

              {/* STATUS */}
              <AnimatePresence>
                {submitStatus && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className={`rounded-2xl border p-5 flex items-start gap-3 ${
                      submitStatus === "success"
                        ? "bg-green-500/10 border-green-500/20 text-green-400"
                        : "bg-red-500/10 border-red-500/20 text-red-400"
                    }`}
                  >
                    {submitStatus === "success" ? (
                      <CheckCircle2 className="w-5 h-5 shrink-0" />
                    ) : (
                      <AlertCircle className="w-5 h-5 shrink-0" />
                    )}

                    <p className="text-sm leading-relaxed">
                      {statusMessage}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* BUTTON */}
              <motion.button
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={loading}
                className="w-full rounded-2xl bg-red-600 hover:bg-red-700 transition-all duration-300 py-5 font-bold text-lg flex items-center justify-center gap-3 disabled:opacity-50"
              >
                {loading ? "Sending Message..." : "Send Message"}

                <Send className="w-5 h-5" />
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
