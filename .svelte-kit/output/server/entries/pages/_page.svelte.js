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
      start: "2025-01-15",
      end: "2025-01-27",
      totalDays: 13
    }
  },
  dailySchedule: [
    // Day 0: Nov 18 - Arrival
    {
      dayNumber: 0,
      date: "2025-01-15",
      dayName: "Monday",
      location: "Cairo",
      timeSlots: [
        {
          startTime: "9:00",
          endTime: "12:00",
          activity: "Arrival in Cairo",
          description: "Arrive at Cairo International Airport",
          type: "arrival",
          color: "travel",
          icon: "✈️"
        },
        {
          startTime: "12:00",
          endTime: "15:00",
          activity: "Check-in at Hotel",
          description: "Rest and recover from travel",
          type: "free",
          color: "free",
          icon: "🏨"
        },
        {
          startTime: "19:00",
          endTime: "21:00",
          activity: "Free Time at Hotel",
          description: "Dinner at hotel and rest",
          type: "free",
          color: "free",
          icon: "🍽️"
        }
      ]
    },
    // Day 1: Nov 19 - Cairo Egypt
    {
      dayNumber: 1,
      date: "2025-01-16",
      dayName: "Tuesday",
      location: "Cairo",
      timeSlots: [
        {
          startTime: "7:00",
          endTime: "9:00",
          activity: "Breakfast at Hotel",
          description: "Breakfast at Hotel",
          type: "meals",
          color: "meals",
          icon: "🥐"
        },
        {
          startTime: "9:00",
          endTime: "18:00",
          activity: "Free Time in Cairo",
          description: "Explore Cairo or rest at hotel",
          type: "free",
          color: "free",
          icon: "🚶"
        },
        {
          startTime: "19:00",
          endTime: "21:00",
          activity: "Dinner at Hotel",
          description: "Evening meal and rest",
          type: "meals",
          color: "meals",
          icon: "🍽️"
        }
      ]
    },
    // Day 2: Nov 20 - Cairo Egypt - 6pm Khan el-Khalili Market and Dinner
    {
      dayNumber: 2,
      date: "2025-01-17",
      dayName: "Wednesday",
      location: "Cairo",
      timeSlots: [
        {
          startTime: "7:00",
          endTime: "9:00",
          activity: "Breakfast at Hotel",
          description: "Breakfast at Hotel",
          type: "meals",
          color: "meals",
          icon: "☕"
        },
        {
          startTime: "9:00",
          endTime: "18:00",
          activity: "Free Time in Cairo",
          description: "Explore Cairo or rest at hotel",
          type: "free",
          color: "free",
          icon: "🚶"
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
    // Day 3: Nov 21 - Cairo Egypt - 9am Giza Pyramid and Grand Egyptian Museum
    {
      dayNumber: 3,
      date: "2025-01-18",
      dayName: "Thursday",
      location: "Cairo/Giza",
      timeSlots: [
        {
          startTime: "7:00",
          endTime: "9:00",
          activity: "Breakfast at Hotel & Flight to Luxor",
          description: "Check out of Hotel, fly to Luxor",
          type: "travel",
          color: "travel",
          icon: "✈️"
        },
        {
          startTime: "9:00",
          endTime: "13:00",
          activity: "Giza Pyramids & Grand Egyptian Museum (Part 1)",
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
          endTime: "17:00",
          activity: "Grand Egyptian Museum (Part 2)",
          description: "World's largest archaeological museum with King Tut collection",
          location: "Near Giza Pyramids",
          type: "excursion",
          color: "excursion",
          icon: "🏺",
          cost: "Included"
        },
        {
          startTime: "17:00",
          endTime: "21:00",
          activity: "Return to Hotel",
          description: "Return to Hotel",
          type: "free",
          color: "free",
          icon: "🏨"
        }
      ]
    },
    // Day 4: Nov 22 - Luxor Egypt - 5:30pm Luxor Temple
    {
      dayNumber: 4,
      date: "2025-01-19",
      dayName: "Friday",
      location: "Cairo to Luxor",
      timeSlots: [
        {
          startTime: "7:00",
          endTime: "10:00",
          activity: "Breakfast at Hotel & Flight to Luxor",
          description: "Check out of Hotel, fly to Luxor",
          type: "travel",
          color: "travel",
          icon: "✈️"
        },
        {
          startTime: "10:00",
          endTime: "15:00",
          activity: "Board Ship in Luxor",
          description: "Finally board Viking ship after arriving in Luxor",
          type: "embarkation",
          color: "travel",
          icon: "🚢"
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
          activity: "First Dinner Aboard Ship",
          description: "Welcome dinner aboard Viking ship",
          type: "meals",
          color: "meals",
          icon: "🍽️"
        }
      ]
    },
    // Day 5: Nov 23 - Luxor Egypt - 1pm Dendera Temple Exploration
    {
      dayNumber: 5,
      date: "2025-01-20",
      dayName: "Saturday",
      location: "Luxor/Qena",
      timeSlots: [
        {
          startTime: "7:00",
          endTime: "12:00",
          activity: "Free Time Aboard Ship",
          description: "Relax and enjoy ship amenities",
          type: "free",
          color: "free",
          icon: "⚓"
        },
        {
          startTime: "13:00",
          endTime: "15:30",
          activity: "Dendera Temple Exploration",
          description: "Temple of Hathor with stunning ceiling paintings and Dendera zodiac",
          location: "Dendera Temple Complex",
          type: "excursion",
          color: "excursion",
          icon: "🏛️",
          cost: "Included"
        },
        {
          startTime: "15:30",
          endTime: "19:00",
          activity: "Free Time & Dinner",
          description: "Return to ship for evening meal and rest",
          type: "free",
          color: "free",
          icon: "🍽️"
        }
      ]
    },
    // Day 6: Nov 24 - Qena Egypt - 8am Valley of the Kings, Hatshepsut and Queen Nefertiti Tomb
    {
      dayNumber: 6,
      date: "2025-01-21",
      dayName: "Sunday",
      location: "Valley of the Kings",
      timeSlots: [
        {
          startTime: "8:00",
          endTime: "13:30",
          activity: "Valley of the Kings, Hatshepsut & Queen Nefertari Tomb",
          description: "Ancient royal tombs, mortuary temple, and Queen Nefertari's tomb",
          location: "West Bank, Luxor",
          type: "excursion",
          color: "excursion",
          icon: "👑",
          cost: "Included",
          notes: "Demanding day - bring water and comfortable shoes"
        },
        {
          startTime: "13:30",
          endTime: "19:00",
          activity: "Return to Ship & Rest",
          description: "Long excursion day - time to relax",
          type: "free",
          color: "free",
          icon: "😴"
        },
        {
          startTime: "19:00",
          endTime: "21:00",
          activity: "Dinner Aboard Ship",
          description: "Rest after demanding day of exploration",
          type: "meals",
          color: "meals",
          icon: "🍽️"
        }
      ]
    },
    // Day 7: Nov 25 - Esna Egypt - 8:15am Village of Esna by Foot
    {
      dayNumber: 7,
      date: "2025-01-22",
      dayName: "Monday",
      location: "Esna",
      timeSlots: [
        {
          startTime: "8:15",
          endTime: "9:45",
          activity: "Village of Esna by Foot",
          description: "Traditional Egyptian village walking tour with market and temple",
          location: "Esna Village",
          type: "excursion",
          color: "cultural",
          icon: "🚶",
          cost: "Included"
        },
        {
          startTime: "9:45",
          endTime: "18:00",
          activity: "Free Time & Sailing",
          description: "Ship continues south toward Aswan",
          type: "free",
          color: "nature",
          icon: "⛵"
        },
        {
          startTime: "18:00",
          endTime: "21:00",
          activity: "Sail to Aswan at Night",
          description: "Enjoy ship amenities as we sail south",
          type: "free",
          color: "free",
          icon: "🌙"
        }
      ]
    },
    // Day 8: Nov 26 - Aswan Egypt - 7:30am The Temples of Abu Simbel
    {
      dayNumber: 8,
      date: "2025-01-23",
      dayName: "Tuesday",
      location: "Abu Simbel",
      timeSlots: [
        {
          startTime: "7:30",
          endTime: "14:30",
          activity: "The Temples at Abu Simbel",
          description: "Ramesses II's magnificent relocated temples with round-trip flights",
          location: "Abu Simbel (by flight from Aswan)",
          type: "excursion",
          color: "excursion",
          icon: "🏛️",
          cost: "$509.00",
          notes: "Round-trip flights included, long day"
        },
        {
          startTime: "14:30",
          endTime: "19:00",
          activity: "Return to Aswan & Rest",
          description: "Long day - time to recover on ship",
          type: "free",
          color: "free",
          icon: "😴"
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
    // Day 9: Nov 27 - Aswan Egypt - 8am Nubian Village, Philae Temple, and the Papyrus Institute
    {
      dayNumber: 9,
      date: "2025-01-24",
      dayName: "Wednesday",
      location: "Aswan",
      timeSlots: [
        {
          startTime: "8:00",
          endTime: "12:30",
          activity: "Philae Temple, Nubian Village & Papyrus Institute",
          description: "Island temple, traditional village visit, and papyrus making demonstration",
          location: "Aswan",
          type: "excursion",
          color: "cultural",
          icon: "🏛️",
          cost: "Included",
          notes: "Boat transfer to temple included"
        },
        {
          startTime: "12:30",
          endTime: "19:00",
          activity: "Free Time in Aswan",
          description: "Explore Aswan or relax on ship",
          type: "free",
          color: "free",
          icon: "🌴"
        },
        {
          startTime: "19:00",
          endTime: "21:00",
          activity: "Evening Aboard Ship",
          description: "Enjoy Aswan views from ship",
          type: "meals",
          color: "meals",
          icon: "🍽️"
        }
      ]
    },
    // Day 10: Nov 28 - Edfu Egypt - 8:30am Edfu Temple
    {
      dayNumber: 10,
      date: "2025-01-25",
      dayName: "Thursday",
      location: "Edfu",
      timeSlots: [
        {
          startTime: "8:30",
          endTime: "10:30",
          activity: "Edfu Temple",
          description: "Best-preserved temple in Egypt dedicated to Horus",
          location: "Edfu",
          type: "excursion",
          color: "excursion",
          icon: "🦅",
          cost: "Included"
        },
        {
          startTime: "10:30",
          endTime: "18:00",
          activity: "Sailing North",
          description: "Continue sailing northward",
          type: "free",
          color: "nature",
          icon: "⛵"
        },
        {
          startTime: "19:00",
          endTime: "21:00",
          activity: "Evening Aboard Ship",
          description: "Relaxing evening on the Nile",
          type: "meals",
          color: "meals",
          icon: "🥂"
        }
      ]
    },
    // Day 11: Nov 29 - Cairo Egypt - 2pm Old Cairo and its Coptic Quarters
    {
      dayNumber: 11,
      date: "2025-01-26",
      dayName: "Friday",
      location: "Cairo",
      timeSlots: [
        {
          startTime: "9:00",
          endTime: "12:00",
          activity: "Return to Cairo",
          description: "Travel back to Cairo",
          type: "travel",
          color: "travel",
          icon: "✈️"
        },
        {
          startTime: "14:00",
          endTime: "17:30",
          activity: "Old Cairo & Coptic Quarter",
          description: "Historic Christian Cairo, Coptic Museum, and ancient sites",
          location: "Old Cairo",
          type: "excursion",
          color: "cultural",
          icon: "⛪",
          cost: "$109.00"
        },
        {
          startTime: "17:30",
          endTime: "21:00",
          activity: "Free Time in Cairo",
          description: "Final evening in Egypt",
          type: "free",
          color: "free",
          icon: "🌃"
        }
      ]
    },
    // Day 12: Nov 30 - Cairo Egypt - Departure
    {
      dayNumber: 12,
      date: "2025-01-27",
      dayName: "Saturday",
      location: "Cairo",
      timeSlots: [
        {
          startTime: "7:00",
          endTime: "11:00",
          activity: "Departure Preparation",
          description: "Pack and prepare for departure",
          type: "departure",
          color: "travel",
          icon: "🧳"
        },
        {
          startTime: "12:00",
          endTime: "18:00",
          activity: "Departure",
          description: "Depart Cairo for home",
          type: "departure",
          color: "travel",
          icon: "✈️"
        },
        {
          startTime: "18:00",
          endTime: "21:00",
          activity: "Travel Home",
          description: "End of wonderful Egyptian adventure",
          type: "departure",
          color: "travel",
          icon: "🏠"
        }
      ]
    }
  ]
};
const DATE_FORMAT_OPTIONS = {
  LONG_DATE: {
    weekday: "long",
    month: "long",
    day: "numeric"
  },
  LOCALE: "en-US"
};
const devLog = (message, data) => {
};
function CruiseHeader($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { cruiseInfo } = $$props;
    $$renderer2.push(`<header class="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-emerald-600"><div class="absolute inset-0 opacity-10"><div class="absolute top-10 left-10 text-6xl">🏺</div> <div class="absolute top-20 right-20 text-4xl">🐪</div> <div class="absolute bottom-10 left-1/4 text-5xl">🏛️</div> <div class="absolute bottom-20 right-1/3 text-3xl">🌅</div></div> <div class="relative container mx-auto px-6 py-8 text-center"><div class="mb-6"><div class="inline-flex items-center gap-4 mb-4"><div class="w-16 h-0.5 bg-gradient-to-r from-transparent to-amber-500"></div> <span class="text-4xl">🚢</span> <div class="w-16 h-0.5 bg-gradient-to-l from-transparent to-amber-500"></div></div> <h1 class="text-3xl md:text-4xl font-bold text-white drop-shadow-lg mb-3">${escape_html(cruiseInfo.title)}</h1> <p class="text-lg md:text-xl text-blue-100 font-medium mb-6">${escape_html(cruiseInfo.subtitle)}</p></div> <div class="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto"><div class="bg-white/20 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-white/30"><div class="text-2xl mb-2">📋</div> <div class="text-sm text-blue-100 font-medium">Booking Number</div> <div class="text-lg font-bold text-white">${escape_html(cruiseInfo.bookingNumber)}</div></div> <div class="bg-white/20 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-white/30"><div class="text-2xl mb-2">👥</div> <div class="text-sm text-blue-100 font-medium">Travelers</div> <div class="text-lg font-bold text-white">${escape_html(cruiseInfo.passengers)}</div></div> <div class="bg-white/20 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-white/30"><div class="text-2xl mb-2">🏠</div> <div class="text-sm text-blue-100 font-medium">Stateroom</div> <div class="text-lg font-bold text-white">${escape_html(cruiseInfo.stateroom)}</div></div></div></div></header>`);
  });
}
const formatDate = (dateStr) => {
  try {
    if (!dateStr || dateStr.trim().length === 0) {
      throw new Error("Empty date string provided");
    }
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) {
      throw new Error(`Invalid date string: ${dateStr}`);
    }
    const formatted = date.toLocaleDateString(
      DATE_FORMAT_OPTIONS.LOCALE,
      DATE_FORMAT_OPTIONS.LONG_DATE
    );
    devLog("Formatted date", { input: dateStr, output: formatted });
    return formatted;
  } catch (error) {
    console.error("Failed to format date:", error);
    return "Invalid Date";
  }
};
const formatTime = (time) => {
  try {
    if (!time || !time.includes(":")) {
      throw new Error(`Invalid time format: ${time}`);
    }
    const [hours, minutes] = time.split(":");
    const hour = parseInt(hours, 10);
    if (isNaN(hour) || hour < 0 || hour > 23) {
      throw new Error(`Invalid hour: ${hours}`);
    }
    const ampm = hour >= 12 ? "PM" : "AM";
    const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
    const formatted = `${displayHour}:${minutes} ${ampm}`;
    devLog("Formatted time", { input: time, output: formatted });
    return formatted;
  } catch (error) {
    console.error("Failed to format time:", error);
    return "Invalid Time";
  }
};
const normalizeTimeFormat = (time) => {
  if (!time || !time.includes(":")) {
    throw new Error(`Invalid time format for normalization: ${time}`);
  }
  const [hours, minutes] = time.split(":");
  if (!hours || !minutes) {
    throw new Error(`Invalid time components: ${time}`);
  }
  const paddedHours = hours.padStart(2, "0");
  const paddedMinutes = minutes.padStart(2, "0");
  return `${paddedHours}:${paddedMinutes}`;
};
const calculateDuration = (startTime, endTime) => {
  try {
    if (!startTime || !endTime) {
      throw new Error("Start time and end time are required");
    }
    const normalizedStart = normalizeTimeFormat(startTime);
    const normalizedEnd = normalizeTimeFormat(endTime);
    const start = /* @__PURE__ */ new Date(`2000-01-01T${normalizedStart}:00`);
    const end = /* @__PURE__ */ new Date(`2000-01-01T${normalizedEnd}:00`);
    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      throw new Error(
        `Invalid time format: ${startTime} - ${endTime} (normalized: ${normalizedStart} - ${normalizedEnd})`
      );
    }
    const diffMs = end.getTime() - start.getTime();
    if (diffMs < 0) {
      devLog("Warning: Negative duration detected", {
        startTime,
        endTime
      });
      return "0min";
    }
    const diffHours = Math.floor(diffMs / (1e3 * 60 * 60));
    const diffMinutes = Math.floor(
      diffMs % (1e3 * 60 * 60) / (1e3 * 60)
    );
    let formatted;
    if (diffHours === 0) {
      formatted = `${diffMinutes}min`;
    } else if (diffMinutes === 0) {
      formatted = `${diffHours}hr`;
    } else {
      formatted = `${diffHours}hr ${diffMinutes}min`;
    }
    devLog("Calculated duration", { startTime, endTime, formatted });
    return formatted;
  } catch (error) {
    console.error("Failed to calculate duration:", error);
    return "0min";
  }
};
function Navigation($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { currentDay, currentDayIndex, totalDays } = $$props;
    $$renderer2.push(`<nav class="bg-white/95 backdrop-blur-md border-b border-blue-400/50 py-3 sticky top-0 z-50 shadow-lg"><div class="container mx-auto px-6"><div class="hidden md:flex items-center justify-between gap-4"><button type="button"${attr("disabled", currentDayIndex === 0, true)} class="group px-3 py-2 rounded-full bg-gradient-to-r from-blue-700 to-blue-800 text-white font-medium disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed transition-all duration-300 hover:shadow-lg hover:scale-105 flex items-center gap-2"><span class="group-hover:-translate-x-1 transition-transform">←</span> <span>Previous</span></button> <div class="text-center flex-1 bg-blue-100/80 backdrop-blur-sm rounded-xl py-2 px-4 border border-blue-400/50"><div class="text-base font-bold bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent">Day ${escape_html(currentDay.dayNumber)} of ${escape_html(totalDays)}</div> <div class="text-sm text-gray-700 font-medium">${escape_html(currentDay.dayName)} • ${escape_html(currentDay.location)}</div> <div class="text-xs text-gray-600">${escape_html(formatDate(currentDay.date))}</div></div> <div class="flex items-center gap-2"><button type="button"${attr_class(`px-3 py-1.5 text-xs rounded-full font-medium transition-all duration-300 ${stringify(
      "bg-gradient-to-r from-blue-700 to-blue-800 text-white shadow-md"
    )}`)}>📅 Day</button> <button type="button"${attr_class(`px-3 py-1.5 text-xs rounded-full font-medium transition-all duration-300 ${stringify("bg-blue-200 text-blue-800 hover:bg-blue-300")}`)}>🕐 Timeline</button> <button type="button"${attr_class(`px-3 py-1.5 text-xs rounded-full font-medium transition-all duration-300 ${stringify("bg-blue-200 text-blue-800 hover:bg-blue-300")}`)}>📊 Overview</button></div> <button type="button"${attr("disabled", currentDayIndex >= totalDays - 1, true)} class="group px-3 py-2 rounded-full bg-gradient-to-r from-blue-700 to-blue-800 text-white font-medium disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed transition-all duration-300 hover:shadow-lg hover:scale-105 flex items-center gap-2"><span>Next</span> <span class="group-hover:translate-x-1 transition-transform">→</span></button></div> <div class="md:hidden space-y-2"><div class="items-center justify-between gap-2 flex-nowrap"><div class="justify-between flex"><button${attr("disabled", currentDayIndex === 0, true)} class="group px-3 py-2 rounded-full bg-gradient-to-r from-blue-700 to-blue-800 text-white font-medium disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed transition-all duration-300 hover:shadow-lg hover:scale-105 flex items-center gap-2 flex-shrink-0"><span class="group-hover:-translate-x-1 transition-transform">←</span> <span class="hidden sm:inline">Previous</span> <span class="sm:hidden">Prev</span></button> <div class="text-center flex-1 bg-blue-100/80 backdrop-blur-sm rounded-xl py-2 px-3 mx-3 border border-blue-400/50"><div class="text-sm font-bold bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent">Day ${escape_html(currentDay.dayNumber)} of ${escape_html(totalDays)}</div> <div class="text-xs text-gray-700 font-medium">${escape_html(currentDay.dayName)} • ${escape_html(currentDay.location)}</div></div> <button${attr("disabled", currentDayIndex >= totalDays - 1, true)} class="group px-3 py-2 rounded-full bg-gradient-to-r from-blue-700 to-blue-800 text-white font-medium disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed transition-all duration-300 hover:shadow-lg hover:scale-105 flex items-center gap-2 flex-shrink-0"><span class="hidden sm:inline">Next</span> <span class="sm:hidden">Next</span> <span class="group-hover:translate-x-1 transition-transform">→</span></button></div></div> <div class="flex items-center justify-between gap-2"><div class="flex items-center gap-1"><button${attr_class(`px-2 py-1 text-xs rounded-full font-medium transition-all duration-300 ${stringify(
      "bg-gradient-to-r from-blue-700 to-blue-800 text-white shadow-md"
    )}`)}>📅</button> <button${attr_class(`px-2 py-1 text-xs rounded-full font-medium transition-all duration-300 ${stringify("bg-blue-200 text-blue-800 hover:bg-blue-300")}`)}>🕐</button> <button${attr_class(`px-2 py-1 text-xs rounded-full font-medium transition-all duration-300 ${stringify("bg-blue-200 text-blue-800 hover:bg-blue-300")}`)}>📊</button></div></div></div></div></nav>`);
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
    $$renderer2.push(`<footer class="text-center py-8 bg-gradient-to-r from-blue-600 via-blue-700 to-emerald-600 border-t border-blue-500/50"><div class="container mx-auto px-6"><div class="inline-flex items-center gap-4 mb-4"><div class="w-16 h-0.5 bg-gradient-to-r from-transparent to-white/60"></div> <span class="text-2xl">🏺</span> <div class="w-16 h-0.5 bg-gradient-to-l from-transparent to-white/60"></div></div> <p class="text-lg font-semibold text-white drop-shadow-sm mb-2">Viking Egypt Cruise Itinerary</p> <p class="text-blue-100 font-medium">Generated for ${escape_html(cruiseInfo.passengers)}</p> <p class="text-blue-100 text-sm">Booking #${escape_html(cruiseInfo.bookingNumber)} • Stateroom ${escape_html(cruiseInfo.stateroom)}</p> <p class="text-blue-100 text-sm mt-2">🚢 ${escape_html(formatDate(cruiseInfo.dates.start))} to ${escape_html(formatDate(cruiseInfo.dates.end))} 🚢</p> <p class="text-blue-200/70 text-xs mt-1">Made by <a href="https://github.com/madrclouddev" target="_blank" rel="noopener noreferrer" class="hover:text-white transition-colors underline decoration-dotted">MaDrCloudDev</a></p></div></footer>`);
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
