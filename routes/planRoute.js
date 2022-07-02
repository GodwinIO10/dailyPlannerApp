const express = require ("express")
const router = express.Router()
const { getPlans, postPlans, updatePlans, deletePlans } = require("../controllers/planController")

const { protect } = require("../middlewares/authMiddleware")

router.route("/").get(protect, getPlans).post(protect, postPlans) // getPlans & postPlans routes are protected
// the above line can be written using the two lines below
// router.get("/", getPlans)
// router.post("/", postPlans)


router.route("/:id").put(protect, updatePlans).delete(protect, deletePlans) // updatePlans & deletePlans routes are protected
// the above line can be written using the two lines below
// router.put("/:id", updatePlans)
// router.delete("/:id", deletePlans)


module.exports = router