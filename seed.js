require("dotenv").config();
require("./config/database");

const User = require("./models/user");
const Request = require("./models/request");
const Donate = require("./models/donate");

const findUsers = async () => {
  const user1 = await User.findOne({ username: "joey" }); // Adjust the query according to your user schema
  const user2 = await User.findOne({ username: "meow" });
  return [user1, user2];
};

const seedRequests = async (user1, user2) => {
  await Request.deleteMany({});
  await findUsers();

  const items = await Request.create([
    {
      user: user1._id,
      name: "Royal Canin Renal Dry",
      category: "Food and Treats",
      image: "NA",
      description: "Requesting sample before committing to 2kg bags",
      location: "Toa Payoh",
    },
    {
      user: user1._id,
      name: "Hills' K/D Dry",
      category: "Food and Treats",
      image: "NA",
      description: "Requesting sample before committing to 2kg bags",
      location: "Toa Payoh",
    },
    {
      user: user1._id,
      name: "Large Carrier",
      category: "Safety and Enclosures",
      image: "NA",
      description: "To bring Chonkity Chonk to the vet",
      location: "Toa Payoh",
    },
    {
      user: user1._id,
      name: "Needles",
      category: "Medical Supplies",
      image: "NA",
      description: "For rescue cats with CKD ",
      location: "Toa Payoh",
    },
    {
      user: user1._id,
      name: "Subcut Fluids",
      category: "Medical Supplies",
      image: "NA",
      description: "For rescue cats with CKD ",
      location: "Toa Payoh",
    },
  ]);
};

const seedDonations = async (user1, user2) => {
  await Donate.deleteMany({});
  await findUsers();

  const items = await Donate.create([
    {
      user: user1._id,
      name: "Poop Scooper",
      category: "Grooming and Hygiene",
      image: "NA",
      description: "For the non-dingleberries",
      expiry: "",
      condition: "Used",
      location: "Toa Payoh",
      status: "Available",
    },
    {
      user: user1._id,
      name: "Revolution",
      category: "Medical Supplies",
      image: "NA",
      description: "Dingleberries",
      expiry: "2024-09-28",
      condition: "New",
      location: "Bedok",
      status: "Available",
    },
    {
      user: user1._id,
      name: "Old Carrier",
      category: "Safety and Enclosures",
      image: "NA",
      description: "Donated by uncle feeder",
      expiry: "",
      condition: "Used",
      location: "Bishan",
      status: "Available",
    },
    {
      user: user1._id,
      name: "Pee pads",
      category: "Medical Supplies",
      image: "NA",
      description: "No longer needed",
      expiry: "",
      condition: "New",
      location: "Jurong",
      status: "Available",
    },
    {
      user: user1._id,
      name: "Mesh",
      category: "Safety and Enclosures",
      image: "NA",
      description: "Fortify your home",
      expiry: "",
      condition: "Used",
      location: "Bishan",
      status: "Available",
    },
    {
      user: user1._id,
      name: "Nail Clipper",
      category: "Grooming and Hygiene",
      image: "NA",
      description:
        "The irony of being cut by it before you cut it. Good luck using it though",
      expiry: "",
      condition: "Used",
      location: "Bishan",
      status: "Available",
    },
    {
      user: user2._id,
      name: "Tofu litter - green tea",
      category: "Grooming and Hygiene",
      image: "NA",
      description: "For your fur baby to smell like green tea",
      expiry: "",
      condition: "New",
      location: "Ang Mo Kio",
      status: "Available",
    },
    {
      user: user2._id,
      name: "Tofu litter - coffee",
      category: "Grooming and Hygiene",
      image: "NA",
      description: "That daily dose of coffee for you and your fur baby",
      expiry: "",
      condition: "New",
      location: "Serangoon",
      status: "Available",
    },
    {
      user: user2._id,
      name: "Tofu litter - charcoal",
      category: "Grooming and Hygiene",
      image: "NA",
      description: "Black litter, black glitter for your void",
      expiry: "",
      condition: "New",
      location: "Orchard",
      status: "Available",
    },
    {
      user: user2._id,
      name: "Tofu litter - orginal",
      category: "Grooming and Hygiene",
      image: "NA",
      description: "Injeolmi Pooperoni",
      expiry: "",
      condition: "New",
      location: "Orchard",
      status: "Available",
    },
  ]);
};

const main = async () => {
  const [user1, user2] = await findUsers();
  seedRequests(user1, user2);
  seedDonations(user1, user2);
};

main();
