import React, { useEffect, useState } from "react";
import { Stripe, loadStripe } from "@stripe/stripe-js";
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from "@stripe/react-stripe-js";
import { createCheckoutSession } from "@/actions/stripe";
import { SendOrder } from "@/actions";
import { sendFile } from "./uploads3";
let stripePromise: Promise<Stripe | null>;
if (process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) {
  stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
}

// Pass the appearance object to the Elements instance

interface StripeFormProps {
  selectedOption: number;
  songFile: File;
  songName: string;
  songDescription: string;
  artistName: string;
  email: string;
  optionalStyle: string;
}
export const StripeForm = ({
  selectedOption,
  songDescription,
  songFile,
  songName,
  artistName,
  email,
  optionalStyle,
}: StripeFormProps) => {
  const [clientSecret, setClientSecret] = useState("");
  useEffect(() => {
    setClientSecret("");
    if (selectedOption && email && artistName)
      createCheckoutSession(selectedOption, email, artistName).then((data) => {
        if (data.client_secret) {
          setClientSecret(data.client_secret);
        }
      });
  }, [selectedOption]);
  useEffect(() => {
    if (
      selectedOption &&
      songDescription &&
      songFile &&
      songName &&
      artistName &&
      email
    ) {
      (async () => {
        const name =
          songName + (songFile.type === "audio/mpeg" ? ".mp3" : ".wav");

        const order = await SendOrder({
          songName: name,
          email: email,
          artistName,
          selectedOption,
          songDescription: optionalStyle
            ? songDescription + "- OPTIONAL STYLE: " + optionalStyle
            : songDescription,
          contentType: songFile.type,
        });
        if (!order) {
          sendFile({
            localFile: songFile,
            songName: name,
            contentType: songFile.type,
            customer: {
              email,
              artist: artistName,
            },
            price: selectedOption,
            song_description: optionalStyle
              ? songDescription + "- OPTIONAL STYLE: " + optionalStyle
              : songDescription,
          });
        }
      })();
    } else if (
      !selectedOption ||
      !songDescription ||
      !songFile ||
      !songName ||
      !artistName ||
      !email
    ) {
      console.log("Error: Missing data");
    }
  }, [selectedOption]);
  return (
    <div id="checkout" className="w-full md:w-[70%] mt-8">
      {clientSecret && stripePromise && (
        <EmbeddedCheckoutProvider
          stripe={stripePromise}
          options={{ clientSecret }}
        >
          <EmbeddedCheckout className="night" />
        </EmbeddedCheckoutProvider>
      )}
    </div>
  );
};
