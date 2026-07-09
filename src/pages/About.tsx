import React from "react";
import { motion } from "motion/react";
import {
  Building2,
  Rocket,
  ShieldCheck,
  Printer,
  Award,
  Sparkles,
  CheckCircle2,
  Users,
  Palette,
} from "lucide-react";

type Machine = {
  name: string;
  image: string;
  description: string;
  usage: string;
};

type ValueCard = {
  title: string;
  description: string;
  icon: React.ElementType;
};

export default function About() {
  const machines: Machine[] = [
    {
      name: "Industrial Offset Printing",
      image:
        "https://images.unsplash.com/photo-1562564055-71e051d33c19?q=80&w=1200&auto=format&fit=crop",
      description:
        "High-speed offset printing with premium color accuracy and sharp finishing.",
      usage: "Books, magazines, brochures, business cards",
    },

    {
      name: "Large Format Banner Printing",
      image:
        "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?q=80&w=1200&auto=format&fit=crop",
      description:
        "Professional outdoor and indoor banner printing for advertising campaigns.",
      usage: "Billboards, roll-up banners, event branding",
    },

    {
      name: "Packaging & Label Solutions",
      image:
        "https://images.unsplash.com/photo-1586880244406-556ebe35f282?q=80&w=1200&auto=format&fit=crop",
      description:
        "Creative packaging and label production for modern businesses and brands.",
      usage: "Product boxes, labels, custom packaging",
    },
  ];

  const values: ValueCard[] = [
    {
      title: "Our Mission",
      description:
        "To provide high-quality printing and branding solutions with creativity, speed, and professional customer service.",
      icon: Rocket,
    },

    {
      title: "Our Vision",
      description:
        "To become one of the leading printing and advertising companies in Ethiopia through innovation and modern technology.",
      icon: Building2,
    },
  ];

  return (
    <section className="relative overflow-hidden bg-black text-white min-h-screen py-24 px-5">
      {/* BACKGROUND EFFECTS */}
      <div className="absolute top-0 left-0 w-[450px] h-[450px] bg-red-600/10 blur-[120px]" />
      <div className="absolute bottom-0 right-0 w-[450px] h-[450px] bg-purple-600/10 blur-[120px]" />

      {/* HERO */}
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center max-w-4xl mx-auto mb-24">
          <motion.div
            initial={{ opacity: 0, y: -25 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-red-500/20 bg-red-500/10 text-red-400 text-sm font-semibold mb-6"
          >
            <Sparkles className="w-4 h-4" />
            About Dereje Printing Press
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-5xl md:text-7xl font-black leading-tight"
          >
            Creative Printing & <br />
            <span className="text-red-500">Advertising Solutions</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-white/60 text-lg leading-relaxed mt-8"
          >
            Dereje Printing Press & Advertising delivers premium printing,
            branding, packaging, and promotional solutions for businesses,
            organizations, and events across Ethiopia.
          </motion.p>
        </div>

        {/* MISSION & VISION */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-28">
          {values.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="relative overflow-hidden rounded-[32px] border border-white/10 bg-white/5 backdrop-blur-xl p-10"
              >
                <div className="absolute top-0 right-0 w-40 h-40 bg-red-600/10 rounded-full blur-3xl" />

                <div className="w-16 h-16 rounded-2xl bg-red-600/20 flex items-center justify-center mb-6">
                  <Icon className="w-8 h-8 text-red-500" />
                </div>

                <h3 className="text-3xl font-black mb-5">{item.title}</h3>

                <p className="text-white/60 leading-relaxed text-lg">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* MACHINES / SERVICES */}
        <div className="mb-28">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-red-500 uppercase tracking-[0.3em] text-xs font-bold">
              Our Expertise
            </span>

            <h2 className="text-4xl md:text-5xl font-black mt-5">
              Professional Printing Technology
            </h2>

            <p className="text-white/60 mt-5 leading-relaxed">
              We use advanced printing equipment and modern design techniques to
              deliver premium quality results.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {machines.map((machine, index) => (
              <motion.div
                key={machine.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08 }}
                viewport={{ once: true }}
                whileHover={{ y: -12 }}
                className="group overflow-hidden rounded-[32px] border border-white/10 bg-white/5 backdrop-blur-xl"
              >
                {/* IMAGE */}
                <div className="relative h-72 overflow-hidden">
                  <motion.img
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                    src={machine.image}
                    alt={machine.name}
                    className="w-full h-full object-cover"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

                  <div className="absolute top-5 left-5 w-14 h-14 rounded-2xl bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center">
                    <Printer className="w-7 h-7 text-red-500" />
                  </div>
                </div>

                {/* CONTENT */}
                <div className="p-8">
                  <h3 className="text-2xl font-black mb-4 group-hover:text-red-500 transition">
                    {machine.name}
                  </h3>

                  <p className="text-white/60 text-sm leading-relaxed mb-6">
                    {machine.description}
                  </p>

                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />

                    <p className="text-white/80 text-sm">
                      {machine.usage}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* COMPANY STATS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-28">
          {[
            {
              icon: Award,
              value: "10+",
              label: "Years Experience",
            },

            {
              icon: Users,
              value: "5K+",
              label: "Happy Clients",
            },

            {
              icon: Printer,
              value: "15K+",
              label: "Completed Prints",
            },

            {
              icon: Palette,
              value: "100%",
              label: "Creative Designs",
            },
          ].map((stat, index) => {
            const Icon = stat.icon;

            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                className="rounded-[28px] border border-white/10 bg-white/5 backdrop-blur-xl p-8 text-center"
              >
                <div className="w-16 h-16 rounded-2xl bg-red-600/20 flex items-center justify-center mx-auto mb-5">
                  <Icon className="w-8 h-8 text-red-500" />
                </div>

                <h3 className="text-4xl font-black mb-2">
                  {stat.value}
                </h3>

                <p className="text-white/60 text-sm">
                  {stat.label}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* WHY CHOOSE US */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-[40px] border border-white/10 bg-gradient-to-r from-red-600/10 to-transparent backdrop-blur-xl p-10 md:p-16"
        >
          <div className="max-w-4xl">
            <div className="flex items-center gap-3 mb-6">
              <ShieldCheck className="w-8 h-8 text-red-500" />

              <h2 className="text-4xl font-black">
                Why Choose Us
              </h2>
            </div>

            <p className="text-white/60 text-lg leading-relaxed mb-10">
              We combine modern printing technology, creative design,
              professional customer support, and fast production to help brands
              stand out with premium quality printing solutions.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {[
                "Premium Print Quality",
                "Fast Delivery Service",
                "Modern Printing Equipment",
                "Professional Design Team",
                "Affordable Pricing",
                "Reliable Customer Support",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-5 py-4"
                >
                  <CheckCircle2 className="w-5 h-5 text-red-500 shrink-0" />

                  <span className="text-white/80">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}