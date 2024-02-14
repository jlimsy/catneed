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
      image:
        "https://static-shop.vivapets.com/media/catalog/product/cache/11fc96e7318a291175a0004e054be56e/v/h/vhn-vital-support-renal-cat-dry-packshot.png",
      description: "Requesting sample before committing to 2kg bags",
      location: "Toa Payoh",
    },
    {
      user: user1._id,
      name: "Hills' K/D Dry",
      image:
        "https://www.hillspet.com.sg/content/dam/pim/hills/en_sg/pd/dry/pd-kd-feline-dry-productShot_zoom.jpg",
      category: "Food and Treats",
      description: "Requesting sample before committing to 2kg bags",
      location: "Toa Payoh",
    },
    {
      user: user1._id,
      name: "Large Carrier",
      image:
        "https://cdn.shopify.com/s/files/1/1511/7434/files/blog-BestLargeCatCarriers-SportPet_1024x1024.jpg?v=1690490579",
      category: "Safety and Enclosures",
      description: "To bring Chonkity Chonk to the vet",
      location: "Toa Payoh",
    },
    {
      user: user1._id,
      name: "Needles",
      image:
        "https://www.nipro-group.com/sites/default/files/styles/vrije_dimensie/public/2019-11/Hypodermic%20Needles.png?itok=RbZKjO-F",
      category: "Medical Supplies",
      description: "For rescue cats with CKD ",
      location: "Toa Payoh",
    },
    {
      user: user2._id,
      name: "3-tier cage",
      image:
        "https://www.petsstation.com.sg/cdn/shop/products/312077_Pink_2000x.jpg?v=1643853159",
      category: "Safety and Enclosures",
      description: "Running a shelter",
      location: "Toa Payoh",
    },
    {
      user: user2._id,
      name: "Castle",
      image:
        "https://nibbles.sg/cdn/shop/products/O1CN01QWXE681uM7nV1y10z__1918356022_1080x.jpg?v=1653528559",
      category: "Toys and Enrichment",
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
      description: "For the non-dingleberries",
      image:
        "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcQnEjyMo7b0uOCrP6kloX8_JX-L788_PY6D7eyVBaQrhIadY85IByJ3muCKILMzAMoGZ-DI7ZKBn4y35ySpgf4uLbfGmQHB-zOVTQ1cgNNe&usqp=CAE",
      expiry: "",
      condition: "Used",
      location: "Toa Payoh",
      status: "Available",
    },
    {
      user: user1._id,
      name: "Revolution",
      category: "Medical Supplies",
      description: "For flea and tick prevention",
      image:
        "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRViHLRRWqXAeycS0nekfbxbUi5OM1ExigtVAvjcwKyoBmxoEmlvv30OG76jWifLBn_E3x4TuMvCMoOeQQ6-rHTOltVzlcFEebNBTryxWWyE4X2WNff-6lg&usqp=CAE",
      expiry: "2024-09-28",
      condition: "New",
      location: "Bedok",
      status: "Available",
    },
    {
      user: user1._id,
      name: "Old Carrier",
      category: "Safety and Enclosures",
      description: "Donated by uncle feeder",
      image:
        "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcSUy24UoVbMU45G0uurgkvl9FahSjT4wSLZJJ1_5azYdF1EC3FmlwBWwQE7tbwBcVg5657tCx3aDbbs5ZATH6uWuXxvYyzBjW-EHJ2w_jLTfQI3kF-YSwjw&usqp=CAE",
      expiry: "",
      condition: "Used",
      location: "Bishan",
      status: "Available",
    },
    {
      user: user1._id,
      name: "Pee pads",
      category: "Medical Supplies",
      description: "No longer needed",
      image:
        "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcTxWgiTEyIT-GBc2wKLhjom3-Us6IYh2HzXGFS-RzrEV49Vfxdsv3PfxEd-yIW0-SjqKjU-a90Xba_OXuok4ZtSMNaGN2CuYmohVkjd0RRPUYf1E4MctVhq_W0&usqp=CAE",
      expiry: "",
      condition: "New",
      location: "Jurong",
      status: "Available",
    },
    {
      user: user1._id,
      name: "Mesh",
      category: "Safety and Enclosures",
      description: "Fortify your home",
      image:
        "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcSxEHKLdTe8frM61Gf1s8cyxNmCMzYe6RdsJX5ZUePHkiYzASTQqCPjf-Nngx03RHemiUYYVrYeJYdgg8tAmYhtWIA729P1TjVMrwesRSsy&usqp=CAE",
      expiry: "",
      condition: "Used",
      location: "Bishan",
      status: "Available",
    },
    {
      user: user1._id,
      name: "Nail Clipper",
      category: "Grooming and Hygiene",
      description:
        "The irony of being cut by it before you cut it. Good luck using it though",
      image:
        "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcRfI4UBk0VOVLMgOG_shNONvOlx5T3-UX4ypz1PK9J-3QBxjpkuJLpQxy5qzDWtwzgEStTgaZJa9g6YKGyVnAaZmmi15X5aKaebRZSTsaqS&usqp=CAE",
      expiry: "",
      condition: "Used",
      location: "Bishan",
      status: "Available",
    },
    {
      user: user2._id,
      name: "Tofu litter - green tea",
      category: "Grooming and Hygiene",
      description: "For your fur baby to smell like green tea",
      image:
        "https://nibbles.sg/cdn/shop/products/GREENTEAWOSHADOW_1296x.png?v=1636131737",
      expiry: "",
      condition: "New",
      location: "Ang Mo Kio",
      status: "Available",
    },
    {
      user: user2._id,
      name: "Tofu litter - coffee",
      category: "Grooming and Hygiene",
      description: "That daily dose of coffee for you and your fur baby",
      image:
        "https://nibbles.sg/cdn/shop/products/COFFEEWOSHADOW_1296x.png?v=1636131738",
      expiry: "",
      condition: "New",
      location: "Serangoon",
      status: "Available",
    },
    {
      user: user2._id,
      name: "Tofu litter - charcoal",
      category: "Grooming and Hygiene",
      image:
        "https://nibbles.sg/cdn/shop/products/CHARCOALWOSHADOW_1080x.png?v=1636131737",
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
      description: "Injeolmi Pooperoni",
      image:
        "https://nibbles.sg/cdn/shop/products/ORIGINALWOSHADOW_1296x.png?v=1636131739",
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
      image:
        "https://www.purina.com.sg/sites/default/files/2021-11/FF-TenderOcean-Kitten_1.jpg",
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
      image:
        "https://www.whiskas.in/cdn-cgi/image/format=auto,q=90/sites/g/files/fnmzdf2051/files/2022-09/18853301006320-product-image-1.png",
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
      image:
        "https://www.kohepets.com.sg/cdn/shop/products/cattyman-watermelon-cool-feel-cat-bed.jpg?crop=center&height=522&v=1620837972&width=522",
      description: "Watermelon season is over.",
      expiry: "",
      condition: "Used",
      location: "Bishan",
      status: "Available",
    },
    {
      user: user4._id,
      name: "Watermelon Scratchboard",
      category: "Toys and Enrichment",
      description: "I love durian more.",
      image:
        "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcSX2s6UrY-YXURKNBNcqgHtMWuzvBKfd2VxD7FTScyMDX0HPk49_FBqaX26lvizJJG7taIHlKKpQpUUYa7rcx1T1zz29vdWRC2Zy9OtAIeQmzfIDPxXgIipAw&usqp=CAE",
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
  seedRequests(user1, user2);
  // seedDonations(user1, user2);
  // seedLaterDonations(user1, user2, user3, user4);
  // updateUsers();
  // await Donate.deleteMany({});
};

main();
