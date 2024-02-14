const log = require("debug")("catneed:controllers:postalController");
const Postal = require("../../models/postal");
const User = require("../../models/user");
const oneMap = require("../../config/oneMap");
const Donate = require("../../models/donate");
const haversine = require("haversine");

async function create(req, res) {
  const userId = req.user._id;

  // log("req.body %o", req.body);
  // log("req.body.postal %o", req.body.postal);

  const geoCode = await oneMap.getLatLong(req.body.postal);
  // log("latLong %o", geoCode);

  try {
    const postal = await Postal.create({
      ...req.body,
      user: userId,
      lat: geoCode.LATITUDE,
      long: geoCode.LONGITUDE,
    });
    log("postal %o", postal);

    await User.findByIdAndUpdate(userId, { postal: postal._id }).populate(
      "postal"
    );

    res.json(postal);
  } catch (error) {
    res.status(500).json({ msg: "posting postal code failed" });
  }
}

async function getPostal(req, res) {
  log("req.body %o", req.body);
  log("req.body.postal %o", req.body.postal);

  if (!req.user) {
    return res
      .status(404)
      .json({ msg: "User does not have a postal code set" });
  }

  try {
    const postal = await Postal.findOne({ user: req.user._id });
    log("postal %o", postal);

    if (!postal) {
      return res
        .status(404)
        .json({ msg: "Postal code not found for this user" });
    }

    res.json(postal);
  } catch (error) {
    res.status(500).json({ msg: "unable to retrieve postal code" });
  }
}

async function index(req, res) {
  try {
    const postal = await Postal.find({}).populate("user");
    log("postal %o", postal);

    if (!postal) {
      return res
        .status(404)
        .json({ msg: "Postal code not found for this user" });
    }

    res.json(postal);
  } catch (error) {
    res.status(500).json({ msg: "unable to retrieve postal code" });
  }
}

/*
async function getDist(req, res) {
  const myPostal = await Postal.findOne({ user: req.user._id });

  const myPostalCoords = {
    latitude: myPostal.lat,
    longitude: myPostal.long,
  };

  const donors = await Donate.find({})
    .populate({
      path: "user",
      populate: { path: "postal" },
    })
    .lean();
  // log("donors %o", donors);

  const addField = donors.map((donor) => {
    const donorCoords = {
      latitude: donor.user.postal.lat,
      longitude: donor.user.postal.long,
    };
    // log("donorCoords %o", donorCoords);

    donor["distance"] = haversine(myPostalCoords, donorCoords, { unit: "km" });
    return donor;
  });

  log("addField %o", addField);
  res.json(addField);
}
*/

async function sort(req, res) {
  const myPostal = await Postal.findOne({ user: req.user._id });

  // log("myPostal %o", myPostal);
  // log("myPostal lat %o", myPostal.lat);
  // log("myPostal long %o", myPostal.long);

  const myPostalCoords = {
    latitude: myPostal.lat,
    longitude: myPostal.long,
  };

  const donors = await Donate.find({})
    .populate({
      path: "user",
      populate: { path: "postal" },
    })
    .lean();
  log("donors %o", donors);

  const addField = donors.map((donor) => {
    const donorCoords = {
      latitude: donor.user.postal.lat,
      longitude: donor.user.postal.long,
    };

    log("donorCoords %o", donorCoords);

    donor["distance"] = haversine(myPostalCoords, donorCoords, { unit: "km" });
    return donor;
  });

  addField.sort((a, b) => a.distance - b.distance);

  res.json(addField);

  // try {
  //   const sortedByDist = await Donate.aggregate([
  //     {
  //       $lookup: {
  //         from: "users",
  //         localField: "user",
  //         foreignField: "_id",
  //         as: "donor",
  //       },
  //     },
  //     { $unwind: "$donor" },
  //     {
  //       $lookup: {
  //         from: "postals",
  //         localField: "donor.postal",
  //         foreignField: "_id",
  //         as: "donorPostal",
  //       },
  //     },
  //     {
  //       $unwind: "$donorPostal",
  //     },
  //     {
  //       $addFields: {
  //         distance: {
  //           $function: {
  //             body: function (start, end) {
  //               const haversine = require("haversine");
  //               return haversine(start, end, { unit: "km" });
  //             },
  //             args: [
  //               {
  //                 latitude: myPostal.lat,
  //                 longitude: myPostal.long,
  //               },
  //               {
  //                 latitude: "$donorPostal.lat",
  //                 longitude: "$donorPostal.long",
  //               },
  //             ],
  //             lang: "js",
  //           },
  //         },
  //       },
  //     },
  //     { $sort: { distance: 1 } },
  //   ]);
  //   log("sortedByDist %o", sortedByDist);
  //   //   res.json(sortedByDist);
  // } catch (error) {
  //   res.status(500).json({ msg: "unable to calculate distances" });
  // }
}

module.exports = { create, getPostal, index, sort };
