import {
  onCurrentUserSubscriptionUpdate,
  Subscription,
} from "@stripe/firestore-stripe-payments";
import { User } from "firebase/auth";
import React from "react";
import { useState, useEffect } from "react";
import payments from "../library/stripe";

const useSubscription = (user: User | null) => {
  const [subscription, setSubscription] = useState<Subscription | null>(null);

  useEffect(() => {
    if (!user) return;
    //filter through subscriptions array and only set to be true if sub status is active or trailling
    onCurrentUserSubscriptionUpdate(payments, (snapshot) => {
      setSubscription(
        snapshot.subscriptions.filter(
          (subscription) => subscription.status === "active" || "trialing"
        )[0]
      );
    });
  }, [user]);

  return subscription;
};

export default useSubscription;
