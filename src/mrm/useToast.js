import { StyleSheet, Text, ToastAndroid, View } from "react-native";
import React from "react";

export default function useToast() {
  const toast = (msg = null) => {
    ToastAndroid.showWithGravity(msg, ToastAndroid.SHORT, 30);
  };
  return { toast };
}

const styles = StyleSheet.create({});
