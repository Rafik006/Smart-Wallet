import React, { useEffect, useState } from "react";
import { Text, View, Image, TouchableOpacity } from "react-native";
import { COLORS, SIZES, icons, images } from "../constants";
import { Camera, CameraType } from "expo-camera";
import * as Linking from "expo-linking";

const Scan = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [data, setData] = useState("");

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  function toggleCameraType() {
    setType(
      type === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back
    );
  }

  const renderHeader = () => {
    return (
      <View
        style={{
          flexDirection: "row",
          marginTop: 40,
          paddingHorizontal: 30,
        }}
      >
        <TouchableOpacity
          style={{
            width: 45,
            alignItems: "center",
            justifyContent: "center",
          }}
          onPress={() => navigation.navigate("Home")}
        >
          <Image
            source={icons.close}
            style={{ width: 20, height: 20, tintColor: "white" }}
          />
        </TouchableOpacity>
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              color: COLORS.white,
              fontSize: 20,
            }}
          >
            {" "}
            Scan For payment
          </Text>
        </View>
        <TouchableOpacity
          style={{
            height: 45,
            width: 45,
            backgroundColor: "green",
            borderRadius: 10,
            alignItems: "center",
            justifyContent: "center",
          }}
          onPress={() => console.log("info")}
        >
          <Image
            source={icons.info}
            style={{ height: 25, width: 25, tintColor: COLORS.green }}
          />
        </TouchableOpacity>
      </View>
    );
  };
  const renderScanFocus = () => {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {data !== "" ? <Text>{data}</Text> : null}
        <Image
          source={images.focus}
          resizeMode="stretch"
          style={{
            width: 200,
            height: 300,
            marginTop: "-55%",
          }}
        />
      </View>
    );
  };
  const renderPaymentMethod = () => {
    return (
      <View
        style={{
          position: "absolute",
          bottom: 0,
          right: 0,
          left: 0,
          height: 220,
          padding: 30,
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          backgroundColor: "white",
        }}
      >
        <Text style={{ fontSize: 18, fontWeight: "700" }}>
          Another Payment methods
        </Text>
        <View
          style={{
            flexDirection: "row",
            flex: 1,
            alignItems: "flex-start",
            marginTop: 30,
          }}
        >
          <TouchableOpacity
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
            onPress={() => console.log("phone number ")}
          >
            <View
              style={{
                width: 40,
                height: 40,
                backgroundColor: COLORS.lightpurple,
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 10,
              }}
            >
              <Image
                source={icons.phone}
                resizeMode="cover"
                style={{ height: 25, width: 25, tintColor: COLORS.purple }}
              />
            </View>
            <Text style={{ marginLeft: 10, fontSize: 18, fontWeight: "600" }}>
              Phone Number
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginLeft: 30,
            }}
            onPress={() => console.log("Bar code")}
          >
            <View
              style={{
                width: 40,
                height: 40,
                backgroundColor: COLORS.lightpurple,
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 10,
              }}
            >
              <Image
                source={icons.barcode}
                resizeMode="cover"
                style={{ height: 25, width: 25, tintColor: COLORS.primary }}
              />
            </View>
            <Text style={{ marginLeft: 10, fontSize: 18, fontWeight: "600" }}>
              Bar Code{" "}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  const onBarCodeScanned = (result) => {
    console.log(typeof result.data);
    // if (result.data.contains("http")) {
    //   Linking.openURL(result.data);
    // } else {
    //   setData(result.data);
    // }
  };
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "transparent",
      }}
    >
      <Camera
        type={type}
        style={{ flex: 1 }}
        onBarCodeScanned={onBarCodeScanned}
      >
        {renderHeader()}

        {renderPaymentMethod()}
        {renderScanFocus()}
      </Camera>
    </View>
  );
};

export default Scan;
