import { y as attr, z as attr_class, F as stringify, G as ensure_array_like, J as head } from "../../chunks/index.js";
import { e as escape_html } from "../../chunks/context.js";
import "clsx";
const itineraryData = {
  cruise: {
    title: "Cruise Itinerary",
    subtitle: "Ancient Wonders of the Nile",
    bookingNumber: "XXXXXX",
    passengers: "Travelers",
    stateroom: "XXX",
    dates: {
      start: "2025-01-17",
      end: "2025-01-26",
      totalDays: 10
    }
  },
  dailySchedule: [
    {
      dayNumber: 1,
      date: "2025-01-17",
      dayName: "Wednesday",
      location: "Cairo",
      timeSlots: [
        {
          startTime: "7:00",
          endTime: "8:30",
          activity: "Wake Up & Breakfast",
          description: "Continental breakfast aboard ship",
          type: "meals",
          color: "meals",
          icon: "☕"
        },
        {
          startTime: "8:30",
          endTime: "12:00",
          activity: "Free Time Aboard Ship",
          description: "Relax on deck, explore ship amenities",
          type: "free",
          color: "free",
          icon: "⚓"
        },
        {
          startTime: "12:00",
          endTime: "13:30",
          activity: "Lunch Aboard Ship",
          description: "Buffet lunch with Egyptian specialties",
          type: "meals",
          color: "meals",
          icon: "🍽️"
        },
        {
          startTime: "13:30",
          endTime: "17:30",
          activity: "Rest & Preparation",
          description: "Afternoon rest, dress for evening excursion",
          type: "preparation",
          color: "free",
          icon: "🎒"
        },
        {
          startTime: "18:00",
          endTime: "22:00",
          activity: "Khan el-Khalili Market & Dinner",
          description: "Famous Cairo bazaar with traditional Egyptian dinner",
          location: "Cairo Bazaar District",
          type: "excursion",
          color: "dining",
          icon: "🏺",
          cost: "$139.00",
          notes: "Wear comfortable walking shoes"
        }
      ]
    },
    {
      dayNumber: 2,
      date: "2025-01-18",
      dayName: "Thursday",
      location: "Giza",
      timeSlots: [
        {
          startTime: "7:00",
          endTime: "8:30",
          activity: "Early Breakfast",
          description: "Quick breakfast before excursion",
          type: "meals",
          color: "meals",
          icon: "☕"
        },
        {
          startTime: "9:00",
          endTime: "13:00",
          activity: "Giza Pyramids & Sphinx Tour",
          description: "Marvel at the Great Pyramid and iconic Sphinx",
          location: "Giza Plateau",
          type: "excursion",
          color: "excursion",
          icon: "🏛️",
          cost: "Included",
          notes: "Bring sun hat and water"
        },
        {
          startTime: "13:00",
          endTime: "14:00",
          activity: "Lunch Break",
          description: "Local restaurant lunch",
          type: "meals",
          color: "meals",
          icon: "🍽️"
        },
        {
          startTime: "14:00",
          endTime: "17:00",
          activity: "Grand Egyptian Museum",
          description: "World's largest archaeological museum",
          location: "Near Giza Pyramids",
          type: "excursion",
          color: "cultural",
          icon: "🏺",
          cost: "Included"
        },
        {
          startTime: "17:30",
          endTime: "19:00",
          activity: "Return to Ship",
          description: "Bus transfer back to ship",
          type: "travel",
          color: "travel",
          icon: "🚌"
        },
        {
          startTime: "19:00",
          endTime: "21:00",
          activity: "Dinner Aboard Ship",
          description: "Relax after full day of sightseeing",
          type: "meals",
          color: "meals",
          icon: "🍽️"
        }
      ]
    },
    {
      dayNumber: 3,
      date: "2025-01-19",
      dayName: "Friday",
      location: "Luxor",
      timeSlots: [
        {
          startTime: "7:00",
          endTime: "8:30",
          activity: "Breakfast Aboard Ship",
          description: "Continental breakfast while sailing",
          type: "meals",
          color: "meals",
          icon: "☕"
        },
        {
          startTime: "8:30",
          endTime: "12:00",
          activity: "Sailing to Luxor",
          description: "Scenic Nile cruise, deck time",
          type: "free",
          color: "nature",
          icon: "🌊"
        },
        {
          startTime: "12:00",
          endTime: "13:30",
          activity: "Lunch Aboard Ship",
          description: "Buffet lunch with Nile views",
          type: "meals",
          color: "meals",
          icon: "🍽️"
        },
        {
          startTime: "13:30",
          endTime: "17:30",
          activity: "Continue Sailing & Ship Activities",
          description: "Pool, spa, lectures, Nile scenery",
          type: "free",
          color: "free",
          icon: "⚓"
        },
        {
          startTime: "17:30",
          endTime: "19:00",
          activity: "Luxor Temple",
          description: "Ancient temple complex beautifully lit at sunset",
          location: "Luxor East Bank",
          type: "excursion",
          color: "excursion",
          icon: "🏛️",
          cost: "Included"
        },
        {
          startTime: "19:30",
          endTime: "21:00",
          activity: "Dinner & Evening Entertainment",
          description: "Traditional Egyptian music aboard ship",
          type: "meals",
          color: "meals",
          icon: "🎭"
        }
      ]
    },
    {
      dayNumber: 4,
      date: "2025-01-20",
      dayName: "Saturday",
      location: "Luxor",
      timeSlots: [
        {
          startTime: "6:00",
          endTime: "7:30",
          activity: "Early Breakfast",
          description: "Light breakfast before early temple visit",
          type: "meals",
          color: "meals",
          icon: "☕"
        },
        {
          startTime: "8:00",
          endTime: "12:00",
          activity: "Valley of the Kings",
          description: "Explore tombs of ancient pharaohs including Tutankhamun",
          location: "Luxor West Bank",
          type: "excursion",
          color: "excursion",
          icon: "🏺",
          cost: "Included",
          notes: "Bring camera, no flash allowed in tombs"
        },
        {
          startTime: "12:00",
          endTime: "13:30",
          activity: "Lunch at Local Restaurant",
          description: "Traditional Egyptian cuisine with Nile views",
          type: "meals",
          color: "meals",
          icon: "🍽️"
        },
        {
          startTime: "13:30",
          endTime: "16:30",
          activity: "Temple of Hatshepsut",
          description: "Stunning mortuary temple of Egypt's female pharaoh",
          location: "Deir el-Bahari",
          type: "excursion",
          color: "cultural",
          icon: "🏛️",
          cost: "Included"
        },
        {
          startTime: "16:30",
          endTime: "17:30",
          activity: "Return to Ship",
          description: "Coach transfer back to Viking ship",
          type: "travel",
          color: "travel",
          icon: "🚌"
        },
        {
          startTime: "17:30",
          endTime: "19:00",
          activity: "Rest & Refresh",
          description: "Time to rest and prepare for dinner",
          type: "free",
          color: "free",
          icon: "🛏️"
        },
        {
          startTime: "19:00",
          endTime: "21:30",
          activity: "Captain's Welcome Dinner",
          description: "Formal dinner with Egyptian specialties",
          type: "meals",
          color: "dining",
          icon: "🥂",
          notes: "Dress code: Smart casual"
        }
      ]
    },
    {
      dayNumber: 5,
      date: "2025-01-21",
      dayName: "Sunday",
      location: "Luxor",
      timeSlots: [
        {
          startTime: "7:00",
          endTime: "8:30",
          activity: "Breakfast Aboard Ship",
          description: "Full breakfast with fresh Egyptian breads",
          type: "meals",
          color: "meals",
          icon: "☕"
        },
        {
          startTime: "9:00",
          endTime: "13:00",
          activity: "Karnak Temple Complex",
          description: "World's largest ancient religious site with towering columns",
          location: "Luxor East Bank",
          type: "excursion",
          color: "excursion",
          icon: "🏛️",
          cost: "Included",
          notes: "Wear comfortable shoes, lots of walking"
        },
        {
          startTime: "13:00",
          endTime: "14:30",
          activity: "Lunch Aboard Ship",
          description: "International buffet with local dishes",
          type: "meals",
          color: "meals",
          icon: "🍽️"
        },
        {
          startTime: "14:30",
          endTime: "17:00",
          activity: "Sailing to Aswan",
          description: "Scenic Nile cruise, pool time and ship activities",
          type: "free",
          color: "nature",
          icon: "🌊"
        },
        {
          startTime: "17:00",
          endTime: "18:30",
          activity: "Egyptian Cooking Class",
          description: "Learn to make traditional bread and falafel",
          type: "cultural",
          color: "cultural",
          icon: "👨‍🍳",
          cost: "$65.00"
        },
        {
          startTime: "19:00",
          endTime: "21:00",
          activity: "Dinner & Folk Show",
          description: "Traditional Egyptian dance and music performance",
          type: "meals",
          color: "dining",
          icon: "💃"
        }
      ]
    },
    {
      dayNumber: 6,
      date: "2025-01-22",
      dayName: "Monday",
      location: "Aswan",
      timeSlots: [
        {
          startTime: "7:00",
          endTime: "8:30",
          activity: "Breakfast Aboard Ship",
          description: "Continental breakfast as we arrive in Aswan",
          type: "meals",
          color: "meals",
          icon: "☕"
        },
        {
          startTime: "9:00",
          endTime: "12:30",
          activity: "Philae Temple",
          description: "Beautiful island temple dedicated to goddess Isis",
          location: "Agilkia Island",
          type: "excursion",
          color: "excursion",
          icon: "🏛️",
          cost: "Included",
          notes: "Boat transfer to island included"
        },
        {
          startTime: "12:30",
          endTime: "14:00",
          activity: "Lunch Aboard Ship",
          description: "Light lunch with Aswan specialties",
          type: "meals",
          color: "meals",
          icon: "🍽️"
        },
        {
          startTime: "14:00",
          endTime: "17:30",
          activity: "Aswan High Dam & Unfinished Obelisk",
          description: "Modern engineering marvel and ancient quarry site",
          location: "Aswan",
          type: "excursion",
          color: "cultural",
          icon: "🏗️",
          cost: "Included"
        },
        {
          startTime: "17:30",
          endTime: "19:00",
          activity: "Nubian Village Visit",
          description: "Experience colorful Nubian culture and hospitality",
          location: "West Bank Aswan",
          type: "cultural",
          color: "cultural",
          icon: "🏘️",
          cost: "$89.00",
          notes: "Optional excursion, includes tea ceremony"
        },
        {
          startTime: "19:30",
          endTime: "21:30",
          activity: "Farewell Dinner",
          description: "Special dinner celebrating Egyptian journey",
          type: "meals",
          color: "dining",
          icon: "🍽️"
        }
      ]
    },
    {
      dayNumber: 7,
      date: "2025-01-23",
      dayName: "Tuesday",
      location: "Aswan",
      timeSlots: [
        {
          startTime: "6:30",
          endTime: "8:00",
          activity: "Early Breakfast",
          description: "Quick breakfast for early departure",
          type: "meals",
          color: "meals",
          icon: "☕"
        },
        {
          startTime: "8:00",
          endTime: "13:00",
          activity: "Abu Simbel Temples",
          description: "UNESCO World Heritage site with colossal statues of Ramesses II",
          location: "Abu Simbel (3-hour drive)",
          type: "excursion",
          color: "excursion",
          icon: "🗿",
          cost: "$199.00",
          notes: "Long day trip, pack snacks and water"
        },
        {
          startTime: "13:00",
          endTime: "14:00",
          activity: "Lunch at Abu Simbel",
          description: "Lunch at visitor center restaurant",
          type: "meals",
          color: "meals",
          icon: "🍽️"
        },
        {
          startTime: "14:00",
          endTime: "17:00",
          activity: "Return Journey to Aswan",
          description: "Scenic drive through Nubian desert",
          type: "travel",
          color: "travel",
          icon: "🚌"
        },
        {
          startTime: "17:00",
          endTime: "18:30",
          activity: "Rest & Relaxation",
          description: "Free time aboard ship, spa treatments available",
          type: "free",
          color: "free",
          icon: "🧘‍♀️"
        },
        {
          startTime: "19:00",
          endTime: "21:00",
          activity: "Dinner Aboard Ship",
          description: "Casual dinner after long excursion day",
          type: "meals",
          color: "meals",
          icon: "🍽️"
        }
      ]
    },
    {
      dayNumber: 8,
      date: "2025-01-24",
      dayName: "Wednesday",
      location: "Sailing North",
      timeSlots: [
        {
          startTime: "7:30",
          endTime: "9:00",
          activity: "Breakfast Aboard Ship",
          description: "Leisurely breakfast while sailing north",
          type: "meals",
          color: "meals",
          icon: "☕"
        },
        {
          startTime: "9:00",
          endTime: "12:00",
          activity: "Sailing & Ship Activities",
          description: "Enjoy deck views, pool, library, and spa",
          type: "free",
          color: "nature",
          icon: "🌊"
        },
        {
          startTime: "10:30",
          endTime: "11:30",
          activity: "Egyptology Lecture",
          description: "'Mysteries of Ancient Egypt' by ship historian",
          type: "cultural",
          color: "cultural",
          icon: "📚"
        },
        {
          startTime: "12:00",
          endTime: "13:30",
          activity: "Lunch Aboard Ship",
          description: "International buffet with panoramic Nile views",
          type: "meals",
          color: "meals",
          icon: "🍽️"
        },
        {
          startTime: "13:30",
          endTime: "17:30",
          activity: "Afternoon at Leisure",
          description: "Sunbathing, reading, or afternoon nap",
          type: "free",
          color: "free",
          icon: "☀️"
        },
        {
          startTime: "15:00",
          endTime: "16:00",
          activity: "Afternoon Tea",
          description: "Traditional afternoon tea service on deck",
          type: "meals",
          color: "meals",
          icon: "🫖"
        },
        {
          startTime: "18:00",
          endTime: "19:00",
          activity: "Captain's Cocktail Hour",
          description: "Farewell drinks with captain and crew",
          type: "cultural",
          color: "dining",
          icon: "🍸"
        },
        {
          startTime: "19:30",
          endTime: "21:30",
          activity: "Gala Dinner",
          description: "Formal farewell dinner with Egyptian delicacies",
          type: "meals",
          color: "dining",
          icon: "🥂",
          notes: "Formal attire requested"
        }
      ]
    },
    {
      dayNumber: 9,
      date: "2025-01-25",
      dayName: "Thursday",
      location: "Cairo",
      timeSlots: [
        {
          startTime: "7:00",
          endTime: "8:30",
          activity: "Final Breakfast Aboard Ship",
          description: "Last breakfast on Viking ship",
          type: "meals",
          color: "meals",
          icon: "☕"
        },
        {
          startTime: "8:30",
          endTime: "10:00",
          activity: "Disembark & Transfer",
          description: "Check out and transfer to Cairo hotel",
          type: "travel",
          color: "travel",
          icon: "🧳"
        },
        {
          startTime: "10:00",
          endTime: "12:30",
          activity: "Egyptian Museum",
          description: "World's finest collection of ancient Egyptian artifacts",
          location: "Tahrir Square, Cairo",
          type: "excursion",
          color: "cultural",
          icon: "🏺",
          cost: "Included",
          notes: "King Tut's treasures on display"
        },
        {
          startTime: "12:30",
          endTime: "14:00",
          activity: "Lunch in Cairo",
          description: "Traditional Egyptian lunch at local restaurant",
          type: "meals",
          color: "meals",
          icon: "🍽️"
        },
        {
          startTime: "14:00",
          endTime: "17:00",
          activity: "Old Cairo & Coptic Quarter",
          description: "Explore Christian Cairo and historic churches",
          location: "Old Cairo",
          type: "excursion",
          color: "cultural",
          icon: "⛪",
          cost: "Included"
        },
        {
          startTime: "17:00",
          endTime: "18:30",
          activity: "Hotel Check-in & Rest",
          description: "Check into Cairo hotel, freshen up",
          location: "Cairo Hotel",
          type: "free",
          color: "free",
          icon: "🏨"
        },
        {
          startTime: "19:00",
          endTime: "22:00",
          activity: "Farewell Dinner with Entertainment",
          description: "Traditional Egyptian dinner with belly dancing show",
          location: "Cairo Restaurant",
          type: "meals",
          color: "dining",
          icon: "💃",
          cost: "Included"
        }
      ]
    },
    {
      dayNumber: 10,
      date: "2025-01-26",
      dayName: "Friday",
      location: "Cairo - Departure",
      timeSlots: [
        {
          startTime: "7:00",
          endTime: "9:00",
          activity: "Hotel Breakfast",
          description: "Final breakfast in Egypt at hotel",
          type: "meals",
          color: "meals",
          icon: "☕"
        },
        {
          startTime: "9:00",
          endTime: "11:00",
          activity: "Last-Minute Shopping",
          description: "Free time for souvenir shopping or hotel relaxation",
          type: "free",
          color: "free",
          icon: "🛍️",
          notes: "Hotel lobby shops and nearby stores"
        },
        {
          startTime: "11:00",
          endTime: "12:00",
          activity: "Hotel Check-out",
          description: "Check out of hotel, luggage storage available",
          type: "preparation",
          color: "travel",
          icon: "🧳"
        },
        {
          startTime: "12:00",
          endTime: "13:30",
          activity: "Farewell Lunch",
          description: "Final Egyptian meal at hotel restaurant",
          type: "meals",
          color: "meals",
          icon: "🍽️"
        },
        {
          startTime: "14:00",
          endTime: "15:30",
          activity: "Transfer to Airport",
          description: "Private transfer to Cairo International Airport",
          type: "travel",
          color: "travel",
          icon: "✈️",
          notes: "Allow extra time for international departure"
        },
        {
          startTime: "15:30",
          endTime: "18:00",
          activity: "Airport Procedures",
          description: "Check-in, security, and departure preparations",
          location: "Cairo International Airport",
          type: "departure",
          color: "travel",
          icon: "🛂"
        },
        {
          startTime: "18:00",
          endTime: "19:00",
          activity: "Departure",
          description: "Flight departure - Safe travels home!",
          location: "Cairo International Airport",
          type: "departure",
          color: "travel",
          icon: "🛫",
          notes: "End of Viking Egypt Cruise adventure"
        }
      ]
    }
  ]
};
function CruiseHeader($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { cruiseInfo } = $$props;
    $$renderer2.push(`<header class="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-emerald-600 no-print"><div class="absolute inset-0 opacity-10"><div class="absolute top-10 left-10 text-6xl">🏺</div> <div class="absolute top-20 right-20 text-4xl">🐪</div> <div class="absolute bottom-10 left-1/4 text-5xl">🏛️</div> <div class="absolute bottom-20 right-1/3 text-3xl">🌅</div></div> <div class="relative container mx-auto px-6 py-8 text-center"><div class="mb-6"><div class="inline-flex items-center gap-4 mb-4"><div class="w-16 h-0.5 bg-gradient-to-r from-transparent to-amber-500"></div> <span class="text-4xl">🚢</span> <div class="w-16 h-0.5 bg-gradient-to-l from-transparent to-amber-500"></div></div> <h1 class="text-3xl md:text-4xl font-bold text-white drop-shadow-lg mb-3">${escape_html(cruiseInfo.title)}</h1> <p class="text-lg md:text-xl text-blue-100 font-medium mb-6">${escape_html(cruiseInfo.subtitle)}</p></div> <div class="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto"><div class="bg-white/20 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-white/30"><div class="text-2xl mb-2">📋</div> <div class="text-sm text-blue-100 font-medium">Booking Number</div> <div class="text-lg font-bold text-white">${escape_html(cruiseInfo.bookingNumber)}</div></div> <div class="bg-white/20 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-white/30"><div class="text-2xl mb-2">👥</div> <div class="text-sm text-blue-100 font-medium">Travelers</div> <div class="text-lg font-bold text-white">${escape_html(cruiseInfo.passengers)}</div></div> <div class="bg-white/20 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-white/30"><div class="text-2xl mb-2">🏠</div> <div class="text-sm text-blue-100 font-medium">Stateroom</div> <div class="text-lg font-bold text-white">${escape_html(cruiseInfo.stateroom)}</div></div></div></div></header>`);
  });
}
const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric"
  });
};
const formatTime = (time) => {
  const [hours, minutes] = time.split(":");
  const hour = parseInt(hours);
  const ampm = hour >= 12 ? "PM" : "AM";
  const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
  return `${displayHour}:${minutes} ${ampm}`;
};
const calculateDuration = (startTime, endTime) => {
  const start = /* @__PURE__ */ new Date(`2000-01-01T${startTime}:00`);
  const end = /* @__PURE__ */ new Date(`2000-01-01T${endTime}:00`);
  const diffMs = end.getTime() - start.getTime();
  const diffHours = Math.floor(diffMs / (1e3 * 60 * 60));
  const diffMinutes = Math.floor(
    diffMs % (1e3 * 60 * 60) / (1e3 * 60)
  );
  if (diffHours === 0) {
    return `${diffMinutes}min`;
  } else if (diffMinutes === 0) {
    return `${diffHours}hr`;
  } else {
    return `${diffHours}hr ${diffMinutes}min`;
  }
};
function Navigation($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      currentDay,
      currentDayIndex,
      totalDays
    } = $$props;
    $$renderer2.push(`<nav class="bg-white/95 backdrop-blur-md border-b border-blue-400/50 py-3 no-print sticky top-0 z-50 shadow-lg"><div class="container mx-auto px-6"><div class="flex items-center justify-between gap-4"><button${attr("disabled", currentDayIndex === 0, true)} class="group px-3 py-2 rounded-full bg-gradient-to-r from-blue-700 to-blue-800 text-white font-medium disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed transition-all duration-300 hover:shadow-lg hover:scale-105 flex items-center gap-2"><span class="group-hover:-translate-x-1 transition-transform">←</span> <span>Previous</span></button> <div class="text-center flex-1 bg-blue-100/80 backdrop-blur-sm rounded-xl py-2 px-4 border border-blue-400/50"><div class="text-base font-bold bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent">Day ${escape_html(currentDayIndex + 1)} of ${escape_html(totalDays)}</div> <div class="text-sm text-gray-700 font-medium">${escape_html(currentDay.dayName)} • ${escape_html(currentDay.location)}</div> <div class="text-xs text-gray-600">${escape_html(formatDate(currentDay.date))}</div></div> <div class="flex items-center gap-2"><button${attr_class(`px-3 py-1.5 text-xs rounded-full font-medium transition-all duration-300 ${stringify(
      "bg-gradient-to-r from-blue-700 to-blue-800 text-white shadow-md"
    )}`)}>📅 Day</button> <button${attr_class(`px-3 py-1.5 text-xs rounded-full font-medium transition-all duration-300 ${stringify("bg-blue-200 text-blue-800 hover:bg-blue-300")}`)}>🕐 Timeline</button> <button${attr_class(`px-3 py-1.5 text-xs rounded-full font-medium transition-all duration-300 ${stringify("bg-blue-200 text-blue-800 hover:bg-blue-300")}`)}>📊 Overview</button> <button class="px-3 py-1.5 text-xs rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-medium hover:shadow-md hover:scale-105 transition-all duration-300">🖨️ Print</button></div> <button${attr("disabled", currentDayIndex === totalDays - 1, true)} class="group px-3 py-2 rounded-full bg-gradient-to-r from-blue-700 to-blue-800 text-white font-medium disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed transition-all duration-300 hover:shadow-lg hover:scale-105 flex items-center gap-2"><span>Next</span> <span class="group-hover:translate-x-1 transition-transform">→</span></button></div></div></nav>`);
  });
}
const getColorClass = (slot) => {
  const colorClasses = {
    excursion: "bg-gradient-to-br from-blue-100 to-blue-200 border-blue-400 text-blue-900 shadow-blue-200/50",
    dining: "bg-gradient-to-br from-orange-100 to-orange-200 border-orange-400 text-orange-900 shadow-orange-200/50",
    cultural: "bg-gradient-to-br from-purple-100 to-purple-200 border-purple-400 text-purple-900 shadow-purple-200/50",
    nature: "bg-gradient-to-br from-green-100 to-green-200 border-green-400 text-green-900 shadow-green-200/50",
    free: "bg-gradient-to-br from-gray-100 to-gray-200 border-gray-400 text-gray-700 shadow-gray-200/50",
    travel: "bg-gradient-to-br from-yellow-100 to-yellow-200 border-yellow-400 text-yellow-900 shadow-yellow-200/50",
    meals: "bg-gradient-to-br from-red-100 to-red-200 border-red-400 text-red-900 shadow-red-200/50"
  };
  return colorClasses[slot.color] || colorClasses.free;
};
function ActivityCard($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { slot, showConnector = false } = $$props;
    $$renderer2.push(`<div class="relative">`);
    if (showConnector) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="absolute left-20 top-full w-0.5 h-4 bg-gradient-to-b from-amber-300 to-orange-300 z-0"></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> <div${attr_class(`flex items-start gap-6 ${stringify(getColorClass(slot))} rounded-2xl p-6 border shadow-lg relative z-10 hover:shadow-xl transition-all duration-300 hover:scale-[1.02]`)}><div class="text-center min-w-28 bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-white/40 shadow-sm"><div class="text-base font-bold">${escape_html(formatTime(slot.startTime))}</div> <div class="text-xs opacity-70 my-1">to</div> <div class="text-base font-bold">${escape_html(formatTime(slot.endTime))}</div> <div class="text-xs mt-2 bg-white/50 rounded-full px-2 py-1 font-medium">${escape_html(calculateDuration(slot.startTime, slot.endTime))}</div></div> <div class="flex-1"><div class="flex items-start gap-4 mb-4"><span class="text-3xl drop-shadow-sm">${escape_html(slot.icon)}</span> <div class="flex-1"><h3 class="text-xl font-bold leading-tight mb-2">${escape_html(slot.activity)}</h3> <p class="text-base leading-relaxed opacity-90">${escape_html(slot.description)}</p></div></div> `);
    if (slot.location || slot.cost || slot.notes) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 pt-4 border-t border-white/40">`);
      if (slot.location) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<button class="bg-blue-100/60 backdrop-blur-sm rounded-xl p-3 border-2 border-blue-300 hover:bg-blue-200/80 hover:border-blue-500 transition-all duration-300 cursor-pointer text-left w-full transform hover:scale-105 shadow-md hover:shadow-lg"><div class="text-xs font-bold text-blue-800 mb-1">📍 Location</div> <div class="text-sm font-semibold flex items-center gap-1 text-blue-900">${escape_html(slot.location)} <span class="text-xs font-bold bg-blue-200 px-1 py-0.5 rounded text-blue-800 flex items-center gap-1">View Map <span class="text-xs">↗</span></span></div></button>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--> `);
      if (slot.cost) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<div class="bg-white/40 backdrop-blur-sm rounded-xl p-3 border border-white/30"><div class="text-xs font-bold opacity-80 mb-1">💰 Cost</div> <div class="text-sm font-semibold">${escape_html(slot.cost)}</div></div>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--> `);
      if (slot.notes) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<div class="bg-white/40 backdrop-blur-sm rounded-xl p-3 border border-white/30"><div class="text-xs font-bold opacity-80 mb-1">📝 Notes</div> <div class="text-sm font-semibold">${escape_html(slot.notes)}</div></div>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></div></div></div>`);
  });
}
function SingleDayView($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { currentDay } = $$props;
    $$renderer2.push(`<div class="bg-white/80 backdrop-blur-sm border border-blue-400/50 rounded-3xl p-8 mb-8 shadow-xl shadow-blue-400/40"><div class="text-center mb-8 pb-6 border-b border-blue-400/50"><div class="inline-flex items-center gap-6 mb-4"><div class="w-12 h-0.5 bg-gradient-to-r from-transparent to-blue-600"></div> <span class="text-4xl">🏺</span> <div class="text-center"><h2 class="text-3xl font-bold bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent mb-2">Day ${escape_html(currentDay.dayNumber)}</h2> <p class="text-lg text-gray-700 font-medium">${escape_html(formatDate(currentDay.date))}</p></div> <span class="text-4xl">🏺</span> <div class="w-12 h-0.5 bg-gradient-to-l from-transparent to-blue-600"></div></div> <button class="inline-flex items-center gap-3 bg-blue-100 hover:bg-blue-200 rounded-full px-8 py-4 border-2 border-blue-400 hover:border-blue-600 transition-all duration-300 cursor-pointer shadow-lg hover:shadow-xl transform hover:scale-105"><span class="text-2xl">📍</span> <span class="text-xl font-bold text-blue-900">${escape_html(currentDay.location)}</span> <span class="text-sm font-bold text-blue-700 bg-blue-200 px-2 py-1 rounded-full flex items-center gap-1">View Map <span class="text-xs">↗</span></span></button> <div class="mt-6 flex flex-wrap justify-center gap-3 text-xs"><div class="flex items-center gap-1"><div class="w-4 h-4 bg-gradient-to-br from-blue-100 to-blue-200 border border-blue-400 rounded"></div> <span>Excursions</span></div> <div class="flex items-center gap-1"><div class="w-4 h-4 bg-gradient-to-br from-orange-100 to-orange-200 border border-orange-400 rounded"></div> <span>Dining</span></div> <div class="flex items-center gap-1"><div class="w-4 h-4 bg-gradient-to-br from-purple-100 to-purple-200 border border-purple-400 rounded"></div> <span>Cultural</span></div> <div class="flex items-center gap-1"><div class="w-4 h-4 bg-gradient-to-br from-green-100 to-green-200 border border-green-400 rounded"></div> <span>Nature</span></div> <div class="flex items-center gap-1"><div class="w-4 h-4 bg-gradient-to-br from-yellow-100 to-yellow-200 border border-yellow-400 rounded"></div> <span>Travel</span></div> <div class="flex items-center gap-1"><div class="w-4 h-4 bg-gradient-to-br from-red-100 to-red-200 border border-red-400 rounded"></div> <span>Meals</span></div> <div class="flex items-center gap-1"><div class="w-4 h-4 bg-gradient-to-br from-gray-100 to-gray-200 border border-gray-400 rounded"></div> <span>Free Time</span></div></div></div> <div class="space-y-4"><!--[-->`);
    const each_array = ensure_array_like(currentDay.timeSlots);
    for (let index = 0, $$length = each_array.length; index < $$length; index++) {
      let slot = each_array[index];
      ActivityCard($$renderer2, { slot, showConnector: index < currentDay.timeSlots.length - 1 });
    }
    $$renderer2.push(`<!--]--></div></div>`);
  });
}
function CruiseFooter($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { cruiseInfo } = $$props;
    $$renderer2.push(`<footer class="text-center py-8 bg-gradient-to-r from-blue-600 via-blue-700 to-emerald-600 border-t border-blue-500/50"><div class="container mx-auto px-6"><div class="inline-flex items-center gap-4 mb-4"><div class="w-16 h-0.5 bg-gradient-to-r from-transparent to-white/60"></div> <span class="text-2xl">🏺</span> <div class="w-16 h-0.5 bg-gradient-to-l from-transparent to-white/60"></div></div> <p class="text-lg font-semibold text-white drop-shadow-sm mb-2">Viking Egypt Cruise Itinerary</p> <p class="text-blue-100 font-medium">Generated for ${escape_html(cruiseInfo.passengers)}</p> <p class="text-blue-100 text-sm">Booking #${escape_html(cruiseInfo.bookingNumber)} • Stateroom ${escape_html(cruiseInfo.stateroom)}</p> <p class="text-blue-100 text-sm mt-2">🚢 ${escape_html(formatDate(cruiseInfo.dates.start))} to ${escape_html(formatDate(cruiseInfo.dates.end))} 🚢</p></div></footer>`);
  });
}
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let currentDayIndex = 0;
    const currentDay = itineraryData.dailySchedule[currentDayIndex];
    head($$renderer2, ($$renderer3) => {
      $$renderer3.title(($$renderer4) => {
        $$renderer4.push(`<title>Viking Egypt Cruise Itinerary - ${escape_html(itineraryData.cruise.passengers)}</title>`);
      });
    });
    $$renderer2.push(`<div class="min-h-screen">`);
    CruiseHeader($$renderer2, { cruiseInfo: itineraryData.cruise });
    $$renderer2.push(`<!----> `);
    Navigation($$renderer2, {
      currentDay,
      currentDayIndex,
      totalDays: itineraryData.dailySchedule.length
    });
    $$renderer2.push(`<!----> <main class="container mx-auto px-6 py-8">`);
    if (currentDay) {
      $$renderer2.push("<!--[-->");
      SingleDayView($$renderer2, { currentDay });
    } else {
      $$renderer2.push("<!--[!-->");
      {
        $$renderer2.push("<!--[!-->");
        {
          $$renderer2.push("<!--[!-->");
        }
        $$renderer2.push(`<!--]-->`);
      }
      $$renderer2.push(`<!--]-->`);
    }
    $$renderer2.push(`<!--]--></main> `);
    CruiseFooter($$renderer2, { cruiseInfo: itineraryData.cruise });
    $$renderer2.push(`<!----></div>`);
  });
}
export {
  _page as default
};
