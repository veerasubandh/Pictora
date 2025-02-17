import { useContext } from "react";
import { assets, plans } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const BuyCredit = () => {
  const { user, backendUrl, loadCreditsData, token, setShowLogin } =
    useContext(AppContext);

  const navigate = useNavigate();

  const initPay = async (order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: "Credits Payment",
      description: "Credits Payment",
      order_id: order.id,
      receipt: order.receipt,
      handler: async (response) => {
        try {
          const { razorpay_payment_id, razorpay_order_id, razorpay_signature } =
            response;

          const { data } = await axios.post(
            backendUrl + "api/user/verify-razor",
            { razorpay_payment_id, razorpay_order_id, razorpay_signature },
            { headers: { token } }
          );

          if (data.success) {
            loadCreditsData();
            navigate("/");
            toast.success("Credits Added");
          } else {
            toast.error(data.message);
          }
        } catch (error) {
          toast.error(error.message);
        }
      },
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const paymentRazorpay = async (plan) => {
    try {
      if (!user) {
        setShowLogin(true);
        return;
      }
      const { data } = await axios.post(
        backendUrl + "api/user/pay-razor",
        { planId: plan.id, userId: user._id },
        { headers: { token } }
      );

      if (data.success) {
        initPay(data.order);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0.2, y: 100 }}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="min-h-[80vh] text-center pt-14 mb-10"
    >
      <button className="font-[Outfit] border border-gray-400 px-10 py-2 rounded-full mb-6">
        OUR PLANS
      </button>
      <h1 className="font-[Outfit] text-center text-3xl font-medium mb-6 sm:mb-10">
        Choose the Plan
      </h1>

      <div className="flex flex-wrap justify-center gap-6 text-left">
        {plans.map((plan, index) => (
          <div
            key={index}
            className="bg-white drop-shadow-sm  rounded-lg py-12 px-8 text-gray-600 hover:scale-105 transition-all duration-500"
          >
            <img width={40} src={assets.logo_icon} alt="" />
            <p className="mt-3 mb-1 font-semibold font-[Outfit]">{plan.id}</p>
            <p className="font-[Outfit] text-sm">{plan.desc}</p>
            <p className="font-[Outfit] mt-6">
              <span className="text-3xl font-medium"> ${plan.price} </span> /{" "}
              {plan.credits} credits
            </p>
            <button
              onClick={() => paymentRazorpay(plan)}
              className="w-full bg-gray-800 text-white mt-8 font-[Outfit] text-sm rounded-md py-2.5 min-w-52"
            >
              {user ? "Purchase" : "Get Started"}
            </button>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default BuyCredit;
