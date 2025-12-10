import { NextRequest, NextResponse } from "next/server"

// Chapa API configuration
const CHAPA_SECRET_KEY = process.env.CHAPA_SECRET_KEY || ""
const CHAPA_PUBLIC_KEY = process.env.CHAPA_PUBLIC_KEY || ""
const CHAPA_BASE_URL = "https://api.chapa.co/v1"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { amount, currency, email, first_name, last_name, phone_number, tx_ref, callback_url, return_url } = body

    // Validate required fields
    if (!amount || !email || !first_name || !tx_ref) {
      return NextResponse.json(
        { status: "error", message: "Missing required fields" },
        { status: 400 }
      )
    }

    // Initialize Chapa payment
    const chapaResponse = await fetch(`${CHAPA_BASE_URL}/transaction/initialize`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${CHAPA_SECRET_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: amount.toString(),
        currency: currency || "ETB",
        email,
        first_name,
        last_name: last_name || "",
        phone_number: phone_number || "",
        tx_ref,
        callback_url: callback_url || `${process.env.NEXT_PUBLIC_APP_URL}/api/payments/chapa/callback`,
        return_url: return_url || `${process.env.NEXT_PUBLIC_APP_URL}/register/payment-success`,
        customization: {
          title: "Matrimony by Hana",
          description: "Monthly subscription payment",
        },
      }),
    })

    const data = await chapaResponse.json()

    if (!chapaResponse.ok) {
      return NextResponse.json(
        { status: "error", message: data.message || "Payment initialization failed" },
        { status: chapaResponse.status }
      )
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error("Chapa payment initialization error:", error)
    return NextResponse.json(
      { status: "error", message: "Internal server error" },
      { status: 500 }
    )
  }
}

