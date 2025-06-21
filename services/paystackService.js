import axios from "axios";
import crypto from "crypto";
import { paystackConfig } from "../config/paystackConfig.js";

class PaystackService {
  constructor() {
    this.secretKey = paystackConfig.secretKey;
    this.publicKey = paystackConfig.publicKey;
    this.baseUrl = paystackConfig.baseUrl;
    this.currency = paystackConfig.currency;
  }

  // Initialize payment transaction
  async initializePayment(paymentData) {
    try {
      const {
        email,
        amount,
        reference,
        callbackUrl,
        metadata = {},
        channels = paystackConfig.channels,
      } = paymentData;

      const payload = {
        email,
        amount: Math.round(amount * 100), // Convert to kobo (smallest currency unit)
        reference,
        callback_url: callbackUrl || paystackConfig.callbackUrl,
        currency: this.currency,
        channels,
        metadata: {
          ...metadata,
          custom_fields: paystackConfig.metadata.custom_fields,
        },
      };

      const response = await axios.post(
        `${this.baseUrl}/transaction/initialize`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${this.secretKey}`,
            "Content-Type": "application/json",
          },
        }
      );

      return {
        success: true,
        data: response.data.data,
        authorizationUrl: response.data.data.authorization_url,
        accessCode: response.data.data.access_code,
        reference: response.data.data.reference,
      };
    } catch (error) {
      console.error(
        "Paystack initialization error:",
        error.response?.data || error.message
      );
      throw new Error(
        error.response?.data?.message || "Payment initialization failed"
      );
    }
  }

  // Verify payment transaction
  async verifyPayment(reference) {
    try {
      const response = await axios.get(
        `${this.baseUrl}/transaction/verify/${reference}`,
        {
          headers: {
            Authorization: `Bearer ${this.secretKey}`,
            "Content-Type": "application/json",
          },
        }
      );

      const transaction = response.data.data;

      return {
        success: true,
        data: transaction,
        status: transaction.status,
        amount: transaction.amount / 100, // Convert from kobo to naira
        reference: transaction.reference,
        gateway_response: transaction.gateway_response,
        channel: transaction.channel,
        paid_at: transaction.paid_at,
        customer: transaction.customer,
        metadata: transaction.metadata,
      };
    } catch (error) {
      console.error(
        "Paystack verification error:",
        error.response?.data || error.message
      );
      throw new Error(
        error.response?.data?.message || "Payment verification failed"
      );
    }
  }

  // Charge card directly (for saved cards)
  async chargeCard(chargeData) {
    try {
      const {
        email,
        amount,
        reference,
        authorization_code,
        metadata = {},
      } = chargeData;

      const payload = {
        email,
        amount: Math.round(amount * 100),
        reference,
        authorization_code,
        currency: this.currency,
        metadata,
      };

      const response = await axios.post(
        `${this.baseUrl}/transaction/charge_authorization`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${this.secretKey}`,
            "Content-Type": "application/json",
          },
        }
      );

      return {
        success: true,
        data: response.data.data,
      };
    } catch (error) {
      console.error(
        "Paystack charge error:",
        error.response?.data || error.message
      );
      throw new Error(error.response?.data?.message || "Card charge failed");
    }
  }

  // Get transaction details
  async getTransaction(transactionId) {
    try {
      const response = await axios.get(
        `${this.baseUrl}/transaction/${transactionId}`,
        {
          headers: {
            Authorization: `Bearer ${this.secretKey}`,
            "Content-Type": "application/json",
          },
        }
      );

      return {
        success: true,
        data: response.data.data,
      };
    } catch (error) {
      console.error(
        "Paystack get transaction error:",
        error.response?.data || error.message
      );
      throw new Error(
        error.response?.data?.message || "Failed to get transaction"
      );
    }
  }

  // List transactions
  async listTransactions(params = {}) {
    try {
      const queryParams = new URLSearchParams(params).toString();
      const response = await axios.get(
        `${this.baseUrl}/transaction?${queryParams}`,
        {
          headers: {
            Authorization: `Bearer ${this.secretKey}`,
            "Content-Type": "application/json",
          },
        }
      );

      return {
        success: true,
        data: response.data.data,
        meta: response.data.meta,
      };
    } catch (error) {
      console.error(
        "Paystack list transactions error:",
        error.response?.data || error.message
      );
      throw new Error(
        error.response?.data?.message || "Failed to list transactions"
      );
    }
  }

  // Generate unique reference
  generateReference() {
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2, 15);
    return `FL_${timestamp}_${random}`.toUpperCase();
  }

  // Validate webhook signature
  validateWebhookSignature(signature, requestBody) {
    const hash = crypto
      .createHmac("sha512", this.secretKey)
      .update(JSON.stringify(requestBody))
      .digest("hex");

    return hash === signature;
  }
}

export default new PaystackService();
