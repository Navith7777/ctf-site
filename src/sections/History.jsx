import { useEffect, useState, useRef } from "react";
import { auth, database } from "../lib/firebase";
import { onValue, ref } from "firebase/database";
import html2pdf from "html2pdf.js";

const History = () => {
  const [history, setHistory] = useState([]);
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState("");
  const [userLoggedIn, setUserLoggedIn] = useState(null);
  const receiptRef = useRef(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUserLoggedIn(true);
        fetchData(user.uid);
      } else {
        setUserLoggedIn(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const fetchData = (uid) => {
    const paymentRef = ref(database, `payment_history/${uid}`);
    onValue(paymentRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const list = Object.entries(data).map(([id, item]) => ({
          id,
          ...item,
        }));
        list.sort((a, b) => new Date(b.date) - new Date(a.date));
        setHistory(list);
      } else {
        setHistory([]);
      }
    });
  };

  const formatDate = (rawDate) =>
    new Date(rawDate).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  const handleDownload = () => {
    if (receiptRef.current) {
      html2pdf()
        .from(receiptRef.current)
        .set({
          margin: 0.5,
          filename: `receipt_${selected?.id}.pdf`,
          image: { type: "jpeg", quality: 0.98 },
          html2canvas: { scale: 2 },
          jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
        })
        .save();
    }
  };

  const filteredHistory = history.filter((item) => {
    const target = `${item.name} ${item.id} ${item.status}`.toLowerCase();
    return target.includes(search.toLowerCase());
  });

  return (
    <div className="min-h-screen bg-black text-white px-4 sm:px-6 lg:px-8 pt-[50px]">
      <h1 className="text-3xl font-bold text-green-400 text-center mb-4">
        Payment History
      </h1>

      {userLoggedIn === null ? (
        <p className="text-center text-gray-400">Loading...</p>
      ) : userLoggedIn === false ? (
        <p className="text-center text-red-500 text-lg font-semibold">
          Please log in or sign up to view your payment history.
        </p>
      ) : (
        <>
          <div className="flex justify-center">
            <input
              type="text"
              placeholder="Search by name, ID or status"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="sm:w-1 md:w-1/5 px-4 py-2 rounded mb-6 text-black outline-none"
            />
          </div>

          <ul className="space-y-4 max-w-4xl mx-auto">
            {filteredHistory.length > 0 ? (
              filteredHistory.map((item) => (
                <li
                  key={item.id}
                  className="bg-gray-800 p-4 rounded-lg shadow flex flex-wrap justify-between items-center"
                >
                  <div className="w-full sm:w-1/4 font-medium">{item.name}</div>
                  <div className="w-full sm:w-1/4">{formatDate(item.date)}</div>
                  <div className="w-full sm:w-1/4">{item.amount}</div>
                  <div
                    className={`px-4 py-1 rounded-full text-sm font-semibold text-white text-center inline-block min-w-[100px]
                      ${item.status === "Success" ? "bg-green-500" : "bg-red-500"}`}
                  >
                    {item.status}
                  </div>
                  <div className="mt-2 w-full sm:w-auto">
                    <button
                      onClick={() => setSelected(item)}
                      className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded mt-2"
                    >
                      View Receipt
                    </button>
                  </div>
                </li>
              ))
            ) : (
              <li className="text-center text-gray-400 mt-10">
                No transactions found.
              </li>
            )}
          </ul>

          {selected && (
            <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
              <div className="bg-white text-black rounded-lg p-6 max-w-md w-full relative">
                <button
                  onClick={() => setSelected(null)}
                  className="absolute top-2 right-3 text-2xl text-gray-600"
                >
                  ×
                </button>

                <div ref={receiptRef}>
                  <h2 className="text-xl font-bold mb-4 text-center">
                    Payment Receipt
                  </h2>
                  <p>
                    <strong>Transaction ID:</strong> {selected.id}
                  </p>
                  <p>
                    <strong>Name:</strong> {selected.name}
                  </p>
                  <p>
                    <strong>Date:</strong> {formatDate(selected.date)}
                  </p>
                  <p>
                    <strong>Amount:</strong> {selected.amount}
                  </p>
                  <p>
                    <strong>Status:</strong>{" "}
                    <span
                      className={
                        selected.status === "Success"
                          ? "text-green-500"
                          : "text-red-500"
                      }
                    >
                      {selected.status}
                    </span>
                  </p>
                </div>

                <button
                  onClick={handleDownload}
                  className="mt-4 bg-green-600 text-white py-2 px-4 rounded w-full hover:bg-green-700"
                >
                  Download Receipt (PDF)
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default History;
