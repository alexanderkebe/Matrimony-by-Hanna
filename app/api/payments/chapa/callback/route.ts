import { NextRequest, NextResponse } from "next/server"

// Chapa webhook handler for payment verification
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Verify the transaction
    // In production, you should verify the signature from Chapa
    const { tx_ref, status, transaction_id } = body

    if (status === "success") {
      // Update user payment status in database
      // TODO: Update user account status in your database
      console.log("Payment successful:", { tx_ref, transaction_id })

      // You can also verify the transaction with Chapa API
      // const verifyResponse = await fetch(`https://api.chapa.co/v1/transaction/verify/${transaction_id}`, {
      //   headers: { Authorization: `Bearer ${process.env.CHAPA_SECRET_KEY}` },
      // })
    }

    return NextResponse.json({ message: "Webhook received" })
  } catch (error) {
    console.error("Chapa webhook error:", error)
    return NextResponse.json({ message: "Webhook error" }, { status: 500 })
  }
}

