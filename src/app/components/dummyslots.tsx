const slots = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  status: Math.random() > 0.3 ? "available" : "occupied",
  nextAvailable: new Date(
    Date.now() + Math.random() * 12 * 60 * 60 * 1000
  ).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
}));

export default slots;
