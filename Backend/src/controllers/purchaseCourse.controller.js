import { asyncHandler } from "../utils/asyncHandler.js";
import { Course } from "../models/Course.model.js";
import { Lecture } from "../models/lecture.model.js";
import { User } from "../models/user.model.js";
import { purchaseCourse } from "../models/purchaseCourse.model.js";
import { ApiError } from "../utils/ApiError.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const createCheckoutSession = async (req, res) => {
  try {
    const userId = req.user._id.toString();
    const { courseId } = req.body;
    // console.log(userId, courseId);

    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ message: "Course not found!" });

    const purchaseExisted = await purchaseCourse.findOne({
      courseId: courseId,
      userId: userId,
    });
    if (purchaseExisted) {
      await purchaseCourse.deleteOne({ courseId: courseId, userId: userId }); // Delete all records matching courseId
    }
    // console.log("purchase", purchaseExisted);

    // Create a new course purchase record
    const newPurchase = new purchaseCourse({
      courseId: courseId,
      userId: userId,
      amount: course.price,
      status: "Pending",
    });

    // Create a Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "inr",
            product_data: {
              name: course.title,
              images: [course.thumbnail],
            },
            unit_amount: course.price * 100, // Amount in paise (lowest denomination)
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${process.env.FRONTEND_URL}/progress/${courseId}`, // once payment successful redirect to course progress page
      cancel_url: `${process.env.FRONTEND_URL}/details/${courseId}`,
      metadata: {
        courseId: courseId,
        userId: userId,
      },
      shipping_address_collection: {
        allowed_countries: ["IN"], // Optionally restrict allowed countries
      },
    });

    // console.log("url", process.env.FRONTEND_URL);

    if (!session.url) {
      return res
        .status(400)
        .json({ success: false, message: "Error while creating session" });
    }

    // Save the purchase record
    newPurchase.PaymentId = session.id;
    await newPurchase.save();

    return res.status(200).json({
      success: true,
      url: session.url, // Return the Stripe checkout URL
    });
  } catch (error) {
    console.log(error);
  }
};

export const stripeWebhook = async (req, res) => {
  let event;

  try {
    const payloadString = JSON.stringify(req.body, null, 2);
    const secret = process.env.WEBHOOK_ENDPOINT_SECRET;

    const header = stripe.webhooks.generateTestHeaderString({
      payload: payloadString,
      secret,
    });

    event = stripe.webhooks.constructEvent(payloadString, header, secret);
  } catch (error) {
    console.error("Webhook error:", error.message);
    return res.status(400).send(`Webhook error: ${error.message}`);
  }

  // Handle the checkout session completed event
  if (event.type === "checkout.session.completed") {
    console.log("check session complete is called");

    try {
      const session = event.data.object;
      console.log("session", session);

      const purchase = await purchaseCourse
        .findOne({
          PaymentId: session.id,
        })
        .populate({ path: "courseId" });
      console.log("purchase", purchase);

      if (!purchase) {
        return res.status(404).json({ message: "Purchase not found" });
      }

      if (session.amount_total) {
        purchase.amount = session.amount_total / 100;
      }
      purchase.status = "Completed";

      // Make all lectures visible by setting `isPreviewFree` to true
      if (purchase.courseId && purchase.courseId.lectures.length > 0) {
        await Lecture.updateMany(
          { _id: { $in: purchase.courseId.lectures } },
          { $set: { isPreviewFree: true } }
        );
      }

      await purchase.save();
      console.log(purchase, "purchaseWebhook");

      // Update user's enrolledCourses
      await User.findByIdAndUpdate(
        purchase.userId,
        { $addToSet: { enrolledCourses: purchase.courseId._id } }, // Add course ID to enrolledCourses
        { new: true }
      );

      // Update course to add user ID to enrolledStudents
      await Course.findByIdAndUpdate(
        purchase.courseId._id,
        { $addToSet: { enrolledStudents: purchase.userId } }, // Add user ID to enrolledStudents
        { new: true }
      );
    } catch (error) {
      console.error("Error handling event:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
  res.status(200).send();
};

export const getCourseDetailWithPurchaseStatus = async (req, res) => {
  try {
    const { courseId } = req.params;
    const userId = req.user._id;
    console.log("userid", req.user._id);
    console.log("courseid", courseId);

    const course = await Course.findById(courseId)
      .populate({ path: "creator" })
      .populate({ path: "lectures" });
    if (!course) {
      return res.status(404).json({ message: "course not found!" });
    }

    const purchased = await purchaseCourse.findOne({
      userId: userId,
      courseId: courseId,
    });
    console.log("purchased", purchased);

    return res.status(200).json({
      course,
      purchased: purchased?.status || "", // true if purchased, false otherwise
    });
  } catch (error) {
    console.log(error);
  }
};

export const getAllPurchasedCourse = async (_, res) => {
  try {
    const purchasedCourse = await purchaseCourse.find({
      status: "Completed",
    }).populate("courseId");

    if (!purchasedCourse) {
      return res.status(404).json({
        purchasedCourse: [],
      });
    }

    return res.status(200).json({
      purchasedCourse,
    });
  } catch (error) {
    console.log(error);
  }
};

// Paypal Code

// paypal.configure({
//   mode: "sandbox", // live
//   client_id: process.env.PAYPAL_CLIENT_KEY,
//   client_secret: process.env.PAYPAL_SECRET_KEY,
// });

// const createCheckOutSession = asyncHandler(async (req, res) => {
//   const { userId } = req.user._id;
//   const { courseId } = req.body;
//   console.log(req.body);

//   const course = await Course.findById(courseId);
//   if (!course) {
//     throw new ApiError(404, "Course not found");
//   }

//   // Create a new course purchase record
//   const newPurchase = await purchaseCourse({
//     courseId: courseId,
//     userId: userId,
//     amount: course.price,
//     status: "Pending",
//   });

//   // Define the payment details
//   const create_payment_json = {
//     intent: "sale",
//     payer: {
//       payment_method: "paypal",
//     },
//     redirect_urls: {
//       return_url: `http://localhost:5173/progress/${courseId}`, // Redirect here after success
//       cancel_url: `http://localhost:5173/details/${courseId}`, // Redirect here if canceled
//     },
//     transactions: [
//       {
//         item_list: {
//           items: [
//             {
//               name: course.title,
//               sku: course._id,
//               price: course.price,
//               // images: [course?.thumbnail],
//               currency: "USD",
//               quantity: 1,
//             },
//           ],
//         },
//         amount: {
//           currency: "USD",
//           total: course.price, // Total price
//         },
//         description: `Purchase of course: ${course.title}`, // Description
//       },
//     ],
//   };
//   paypal.payment.create(create_payment_json, (error, payment) => {
//     if (error) {
//       console.error("PayPal Error:", error);
//       if (error.response && error.response.details) {
//         console.error("PayPal Error Details:", error.response.details);
//       }
//       throw new ApiError(500, "PayPal Checkout Session Creation Failed");
//     } else {
//       // Handle success
//       const approvalUrl = payment.links.find(
//         (link) => link.rel === "approval_url"
//       )?.href;

//       if (!approvalUrl) {
//         throw new ApiError(500, "Approval URL not found in PayPal response");
//       }
//       console.log("PayPal Payment Response:", payment);
// console.log(payment.transactions);

//       return res.status(200).json({
//         status: "success",
//         approvalUrl,
//       });
//     }
//   });
// });

// // Define your webhook handler
// const webhook = asyncHandler(async (req, res) => {
//   const webhookEvent = req.body; // PayPal webhook payload
//   const transmissionId = req.header("paypal-transmission-id");
//   const transmissionTime = req.header("paypal-transmission-time");
//   const certUrl = req.header("paypal-cert-url");
//   const authAlgo = req.header("paypal-auth-algo");
//   const transmissionSig = req.header("paypal-transmission-sig");
//   const webhookId = process.env.PAYPAL_WEBHOOK_ID; // PayPal Webhook ID

//   // Verify the webhook signature
//   paypal.notification.webhookEvent.verify(
//     {
//       transmission_id: transmissionId,
//       transmission_time: transmissionTime,
//       cert_url: certUrl,
//       auth_algo: authAlgo,
//       transmission_sig: transmissionSig,
//       webhook_id: webhookId,
//       webhook_event: webhookEvent,
//     },
//     async (error, response) => {
//       if (error) {
//         console.error("Webhook verification failed:", error);
//         return res
//           .status(400)
//           .send(`Webhook verification failed: ${error.message}`);
//       }

//       if (response.verification_status === "SUCCESS") {
//         console.log("Webhook verified successfully:", webhookEvent);

//         // Handle specific webhook events
//         if (webhookEvent.event_type === "PAYMENT.SALE.COMPLETED") {
//           try {
//             const saleId = webhookEvent.resource.id; // PayPal transaction ID
//             const amount = webhookEvent.resource.amount.total; // Payment amount
//             const custom = webhookEvent.resource.custom; // Custom field data (e.g., course/user)

//             console.log(
//               `Payment completed. Sale ID: ${saleId}, Amount: ${amount}, Custom: ${custom}`
//             );

//             // Fetch course purchase using custom data (e.g., userId and courseId)
//             const purchase = await CoursePurchase.findOne({
//               paymentId: saleId,
//             }).populate("courseId");
//             if (!purchase) {
//               return res.status(404).json({ message: "Purchase not found" });
//             }

//             // Update purchase status
//             purchase.amount = amount;
//             purchase.status = "completed";

//             // Make all lectures visible for the purchased course
//             if (purchase.courseId && purchase.courseId.lectures.length > 0) {
//               await Lecture.updateMany(
//                 { _id: { $in: purchase.courseId.lectures } },
//                 { $set: { isPreviewFree: true } }
//               );
//             }

//             await purchase.save();

//             // Add the course to the user's enrolled courses
//             await User.findByIdAndUpdate(
//               purchase.userId,
//               { $addToSet: { enrolledCourses: purchase.courseId._id } },
//               { new: true }
//             );

//             // Add the user to the course's enrolled students
//             await Course.findByIdAndUpdate(
//               purchase.courseId._id,
//               { $addToSet: { enrolledStudents: purchase.userId } },
//               { new: true }
//             );

//             console.log("Purchase updated successfully for user and course.");
//           } catch (error) {
//             console.error("Error processing payment completion:", error);
//             return res.status(500).json({ message: "Internal Server Error" });
//           }
//         } else {
//           console.log("Unhandled webhook event type:", webhookEvent.event_type);
//         }

//         // Acknowledge receipt of the webhook
//         return res.status(200).send("Webhook received successfully");
//       } else {
//         console.error("Webhook verification failed");
//         return res.status(400).send("Webhook verification failed");
//       }
//     }
//   );
// });

// const getAllpurchaseCourse = asyncHandler(async (req, res) => {});

// export { createCheckOutSession, webhook, getAllpurchaseCourse };

// // app.get("/success", (req, res) => {
// //   const payerId = req.query.PayerID;
// //   const paymentId = req.query.paymentId;

// //   const execute_payment_json = {
// //     payer_id: payerId,
// //     transactions: [
// //       {
// //         amount: {
// //           currency: "USD",
// //           total: "25.00",
// //         },
// //       },
// //     ],
// //   };

// //   paypal.payment.execute(
// //     paymentId,
// //     execute_payment_json,
// //     function (error, payment) {
// //       if (error) {
// //         console.log(error.response);
// //         throw error;
// //       } else {
// //         console.log(JSON.stringify(payment));
// //         res.send("Success");
// //       }
// //     }
// //   );
// // });
