require("dotenv").config();
require("./config/database");

const User = require("./models/user");
const Request = require("./models/request");
const Donate = require("./models/donate");
const Postal = require("./models/postal");

const findUsers = async () => {
  const user1 = await User.findOne({ username: "joey" }); // Adjust the query according to your user schema
  const user2 = await User.findOne({ username: "meow" });
  const user3 = await User.findOne({ username: "woof" });
  const user4 = await User.findOne({ username: "quack" });

  return [user1, user2, user3, user4];
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
      user: user2._id,
      name: "3-tier cage",
      category: "Safety and Enclosures",
      image: "NA",
      description: "Running a shelter",
      location: "Toa Payoh",
    },
    {
      user: user2._id,
      name: "Castle",
      category: "Toys and Enrichment",
      image: "NA",
      description: "Rescue cats deserve to live like royalty",
      location: "Tampines",
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

const seedLaterDonations = async (user1, user2, user3, user4) => {
  await findUsers();

  const items = await Donate.create([
    {
      user: user3._id,
      name: "Fancy Feast",
      category: "Food and Treats",
      image: "NA",
      description: "My cats don't like anymore",
      expiry: "2024-09-28",
      condition: "New",
      location: "Sengkang",
      status: "Available",
    },
    {
      user: user3._id,
      name: "Whiskas",
      category: "Food and Treats",
      image: "NA",
      description: "Cat has upgraded its SES",
      expiry: "2024-09-28",
      condition: "New",
      location: "Bedok",
      status: "Available",
    },
    {
      user: user4._id,
      name: "Watermelon Bed",
      category: "Bedding and Furniture",
      image: "NA",
      description: "I love watermelon",
      expiry: "",
      condition: "Used",
      location: "Bishan",
      status: "Available",
    },
    {
      user: user4._id,
      name: "Watermelon Scratchboard",
      category: "Toys and Enrichment",
      image: "NA",
      description: "I love watermelon",
      expiry: "",
      condition: "New",
      location: "Jurong",
      status: "Available",
    },
  ]);
};

const updateUsers = async () => {
  try {
    const users = await User.find();

    for (const user of users) {
      // Assuming oldPostal is the old postal string in each user document
      const oldPostal = user.postal;

      // Find the corresponding Postal document based on oldPostal
      const postalDocument = await Postal.findOne({ user: user._id }).populate(
        "postal"
      );

      if (user.postal === null) {
        console.log("user has not updated postal");
        continue;
      }

      // Update the user's postal field to use ObjectId reference
      user.postal = postalDocument._id;

      // Save the updated user document
      await user.save();
    }

    console.log("Data migration completed.");
  } catch (error) {
    console.error("Error updating users:", error);
  }
};

const main = async () => {
  const [user1, user2, user3, user4] = await findUsers();
  // seedRequests(user1, user2);
  // seedDonations(user1, user2);
  seedLaterDonations(user1, user2, user3, user4);
  // updateUsers();
  // await Donate.deleteMany({});
};

main();
