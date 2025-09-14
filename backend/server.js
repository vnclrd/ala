import express from "express";
import cors from "cors";
import axios from "axios"; // ✅ Correct import under ESM

const app = express();
app.use(cors());
app.use(express.json());

const XENDIT_API_KEY = "xnd_development_omNmxlBp1Vs2HmRko6Q8rxhkL8mVH0BogrAqD4RDVTsB9mFYZnabw2fNQkr"; // replace with your secret

// Create invoice endpoint
app.post("/create-invoice", async (req, res) => {
  try {
    const { plan } = req.body;

    const amount = plan === "standard" ? 1000 : 2000;

    const response = await axios.post(
      "https://api.xendit.co/v2/invoices",
      {
        external_id: "invoice-" + Date.now(),
        amount,
        description: `${plan} plan purchase`,
        currency: "PHP",
      },
      {
        auth: {
          username: XENDIT_API_KEY,
          password: "", // password must be empty
        },
      }
    );

    console.log("✅ Invoice created:", response.data);
    res.json(response.data);
  } catch (err) {
    console.error("❌ Xendit Error Response:", err.response?.data || err.message);
    res.status(500).json({ error: "Failed to create invoice" });
  }
});

// Get invoice status
app.get("/invoice/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const response = await axios.get(
      `https://api.xendit.co/v2/invoices/${id}`,
      {
        auth: {
          username: XENDIT_API_KEY,
          password: "",
        },
      }
    );

    res.json(response.data);
  } catch (err) {
    console.error("❌ Invoice fetch error:", err.response?.data || err.message);
    res.status(500).json({ error: "Failed to fetch invoice" });
  }
});

const PORT = 4000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
