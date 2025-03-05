"use client";
import { useState } from "react";
import { Input, Textarea, Button, Card, Image } from "@heroui/react";
import { motion } from "framer-motion";
import { FaEnvelope, FaPhone, FaUser } from "react-icons/fa";

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log("Form Submitted", formData);
  };

  return (
    <div className="relative flex justify-between  max-sm:flex-col items-center min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-100/95 via-slate-300/40 to-slate-300/40 p-6 overflow-hidden">
      {/* Animated Background SVG */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2 }}
        className=" inset-0 z-0 rounded-lg overflow-hidden   shadow-lg flex justify-center items-center"
      >
        <Image
          src="/Contactus.svg"
          alt="Parking Background"
          height={450}
          className=" shadow-2xl rounded-md"
        />
      </motion.div>

      {/* Contact Form Card */}
      <Card className="relative z-10 w-[55%] max-w-2xl p-6 shadow-xl bg-white rounded-lg">
        <h1 className="text-3xl font-bold text-secondary-600 text-center mb-4">
          Contact Us
        </h1>
        <p className="text-center text-gray-500 mb-6">
          Have questions about NextPark? Reach out to us!
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="relative"
          >
            <FaUser className="absolute left-3 top-3 text-gray-400" />
            <Input
              name="name"
              value={formData.name}
              onChange={handleChange}
              label="Name"
              placeholder="Enter your name"
              className="pl-10"
              required
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="relative"
          >
            <FaEnvelope className="absolute left-3 top-3 text-gray-400" />
            <Input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              label="Email"
              placeholder="Enter your email"
              className="pl-10"
              required
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="relative"
          >
            <Textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              label="Message"
              placeholder="Write your message here"
              required
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8 }}
          >
            <Button
              type="submit"
              className="w-full bg-secondary-600 text-white font-bold hover:bg-secondary-700 transition-all"
            >
              Send Message
            </Button>
          </motion.div>
        </form>
      </Card>
    </div>
  );
}
