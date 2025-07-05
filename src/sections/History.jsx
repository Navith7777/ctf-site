import React from "react";

const paymentData = [
  {
    id: "TXN001",
    date: "2025-07-01",
    method: "Razorpay",
    amount: "$100",
    status: "Completed",
  },
  {
    id: "TXN002",
    date: "2025-06-28",
    method: "Stripe",
    amount: "$50",
    status: "Pending",
  },
  {
    id: "TXN003",
    date: "2025-06-20",
    method: "PayPal",
    amount: "$75",
    status: "Failed",
  },
];

const statusColor = {
  Completed: "text-green-600",
  Pending: "text-yellow-500",
  Failed: "text-red-600",
};

const PaymentHistory = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-10 px-5 md:px-16">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Payment History</h1>

      <div className="overflow-x-auto bg-white shadow rounded-lg">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-200 text-gray-600 uppercase text-xs">
            <tr>
              <th className="px-6 py-4">Transaction ID</th>
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4">Payment Method</th>
              <th className="px-6 py-4">Amount</th>
              <th className="px-6 py-4">Status</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {paymentData.map((payment) => (
              <tr
                key={payment.id}
                className="border-t border-gray-200 hover:bg-gray-50 transition"
              >
                <td className="px-6 py-4 font-medium">{payment.id}</td>
                <td className="px-6 py-4">{payment.date}</td>
                <td className="px-6 py-4">{payment.method}</td>
                <td className="px-6 py-4">{payment.amount}</td>
                <td className={`px-6 py-4 font-semibold ${statusColor[payment.status]}`}>
                  {payment.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentHistory;
