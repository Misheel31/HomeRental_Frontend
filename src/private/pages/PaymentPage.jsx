import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const PaymentPage = () => {
  const { bookingId } = useParams();
  const navigate = useNavigate();

  const handleFakePayment = async () => {
    try {
      await axios.post(
        `http://localhost:3000/api/payment/success/${bookingId}`
      );
      alert("Payment successful!");
      navigate("/home");
    } catch (error) {
      alert("Payment failed. Try again.");
    }
  };

  return (
    <div className="container mx-auto p-4 text-center">
      <h2 className="text-2xl font-bold">Simulated eSewa Payment</h2>
      <p>Click the button below to "pay" for your booking.</p>
      <button
        onClick={handleFakePayment}
        className="bg-green-500 text-white px-4 py-2 rounded-md mt-4"
      >
        Pay with eSewa
      </button>
    </div>
  );
};

export default PaymentPage;
