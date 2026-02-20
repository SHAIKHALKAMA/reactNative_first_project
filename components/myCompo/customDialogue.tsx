import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useRef, useState } from "react";
import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";

import {
  ActivityIndicator,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";


type Props = {
  visible: boolean;
  onClose: () => void;
  onSuccess?: (data: any) => void;
};

const baseURL = "https://app.swimwell.co.in/api";

const CustomDialog = ({ visible, onClose, onSuccess }: Props) => {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);

  const inputRefs = useRef<Array<TextInput | null>>([]);

  // 🔹 Send OTP when phone becomes 10 digits
  useEffect(() => {
    if (phone.length === 10 && !otpSent) {
      sendOtp();
    }
  }, [phone]);

  const sendOtp = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        `${baseURL}/send-otp?phone=${phone}`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            token: "",
          },
        }
      );

      const data = await response.json();
      console.log("Send OTP:", data);

      if (response.ok) {
        setOtpSent(true);
      } else {
        alert("Failed to send OTP");
      }
    } catch (error) {
      console.log("Send OTP Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async () => {
    const finalOtp = otp.join("");

    if (finalOtp.length !== 4) {
      alert("Enter valid OTP");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("phone", phone);
      formData.append("otp", finalOtp);
      formData.append("device_token", "desfismfjkkjsgbfddfgdfgxvbdfg");

      const response = await fetch(
        `${baseURL}/verify-otp`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
          },
          body: formData,
        }
      );

      const data = await response.json();
      console.log("Verify OTP:", data);

      if (data?.status && data?.token) {
        await AsyncStorage.setItem("authToken", data.token);

        console.log("Token Stored:", data.token);

        onSuccess?.(data);
        onClose();
      } else {
        alert(data?.message || "Invalid OTP");
      }
    } catch (error) {
      console.log("Verify OTP Error:", error);
    } finally {
      setLoading(false);
    }
  };


  const handleOtpChange = (value: string, index: number) => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto focus next
    if (value && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <Modal transparent visible={visible} animationType="fade">
      <Pressable style={styles.overlay}>
        <View style={styles.dialogContainer}>
          <Text style={styles.title}>Login</Text>

          <Text style={styles.label}>Mobile No</Text>
          <TextInput
            value={phone}
            onChangeText={setPhone}
            keyboardType="number-pad"
            maxLength={10}
            style={styles.mobileInput}
          />

          {otpSent && (
            <>
              <View style={styles.otpRow}>
                {otp.map((digit, index) => (
                  <TextInput
                    key={index}
                    ref={(ref) => {
                      inputRefs.current[index] = ref;
                    }}
                    value={digit}
                    onChangeText={(val) => handleOtpChange(val, index)}
                    onKeyPress={(e) => handleKeyPress(e, index)}
                    keyboardType="number-pad"
                    maxLength={1}
                    style={styles.otpInput}
                  />
                ))}
              </View>

              <TouchableOpacity onPress={sendOtp}>
                <Text style={styles.resend}>Resend OTP</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.verifyButton}
                onPress={verifyOtp}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={styles.verifyText}>VERIFY OTP</Text>
                )}
              </TouchableOpacity>
            </>
          )}

          {!otpSent && loading && <ActivityIndicator />}
        </View>
      </Pressable>
    </Modal>
  );
};

export default CustomDialog;



const styles = StyleSheet.create({
  otpRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 20,
  },

  otpInput: {
    width: 60,
    height: 60,
    backgroundColor: "#fff",
    textAlign: "center",
    fontSize: 22,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#ddd",
    elevation: 2,
  },

  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  dialogContainer: {
    width: "100%",
    backgroundColor: "#F5F5F5",
    borderRadius: 10,
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    color: "#666",
    marginBottom: 5,
  },
  mobileInput: {
    backgroundColor: "#fff",
    borderRadius: 6,
    padding: 12,
    fontSize: 16,
    marginBottom: 20,
  },
  resend: {
    textAlign: "right",
    color: "#004F9F",
    marginBottom: 20,
  },
  verifyButton: {
    backgroundColor: "#004F9F",
    paddingVertical: 14,
    borderRadius: 6,
    alignItems: "center",
  },
  verifyText: {
    color: "#fff",
    fontWeight: "600",
    letterSpacing: 1,
  },
});
