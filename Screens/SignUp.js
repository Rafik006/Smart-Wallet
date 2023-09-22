import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Image,
  TextInput,
  Modal,
  FlatList,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from "react-native";

import { COLORS, SIZES, icons, images, FONTS } from "../constants";
import { LinearGradient } from "expo-linear-gradient";

const SignUp = ({ navigation }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [areas, setAreas] = useState([]);
  const [selectedArea, setSelectedArea] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((res) => res.json())
      .then((data) => {
        const areasData = data.map((item) => ({
          code: item.cca2,
          name: item.name.common,
          callingCode: item.idd.suffixes
            ? `${item.idd.root}${item.idd.suffixes[0]}`
            : null,
          flag: item.flags.png,
        }));

        areasData.sort((a, b) => a.name.localeCompare(b.name));

        setAreas(areasData);
        if (areasData.length > 0) {
          let defaultData = areasData.filter((a) => a.code === "US");
          setSelectedArea(defaultData[0]);
          console.log("default area", defaultData);
        }
      })
      .catch((err) => console.log("err", err));
  }, []);
  const header = () => (
    <TouchableOpacity
      style={{
        flexDirection: "row",
        alignItems: "center",
        marginTop: SIZES.padding * 6,
        paddingHorizontal: SIZES.padding * 2,
      }}
      onPress={() => console.log("clicked")}
    >
      <Image
        source={icons.back}
        resizeMode="contain"
        style={{
          width: 20,
          height: 20,
          tintColor: COLORS.white,
        }}
      />
      <Text
        style={{
          marginLeft: SIZES.padding * 1.5,
          color: COLORS.white,
        }}
      >
        Sign Up
      </Text>
    </TouchableOpacity>
  );

  const form = () => (
    <View
      style={{
        marginTop: SIZES.padding * 3,
        marginHorizontal: SIZES.padding * 3,
      }}
    >
      {/* fullName */}
      <View
        style={{
          marginTop: SIZES.padding * 3,
        }}
      >
        <Text style={{ color: COLORS.lightGreen }}>Full Name</Text>
        <TextInput
          style={{
            marginVertical: 10,
            borderBottomColor: "white",
            borderBottomWidth: 1,
            height: 40,
            color: "white",
          }}
          placeholder="Enter full Name"
          placeholderTextColor="white"
          selectionColor="white"
        ></TextInput>
        {/* phone Number */}
        <View
          style={{
            marginTop: SIZES.padding * 2,
          }}
        >
          <Text style={{ color: COLORS.lightGreen }}>Phone Number</Text>
          <View
            style={{
              flexDirection: "row",
            }}
          >
            {/* countryCode */}
            <TouchableOpacity
              style={{
                width: 100,
                height: 50,
                marginHorizontal: 5,
                borderBottomColor: "white",
                borderBottomWidth: 1,
                flexDirection: "row",
              }}
              onPress={() => setModalVisible(true)}
            >
              <View style={{ justifyContent: "center" }}>
                <Image
                  source={icons.down}
                  style={{ width: 10, height: 10, tintColor: "white" }}
                />
              </View>
              <View style={{ justifyContent: "center", marginLeft: 5 }}>
                <Image
                  source={{
                    uri: selectedArea.flag ? selectedArea.flag : "null",
                  }}
                  style={{ width: 30, height: 30, marginTop: 10 }}
                  resizeMode="contain"
                />
              </View>
              <View style={{ justifyContent: "center", marginLeft: 5 }}>
                <Text
                  style={{
                    color: "white",
                    marginTop: 10,
                  }}
                >
                  {selectedArea.callingCode}
                </Text>
              </View>
            </TouchableOpacity>
            {/* phone Number Input */}
            <TextInput
              style={{
                flex: 1,
                marginVertical: 10,
                borderBottomColor: "white",
                borderBottomWidth: 1,
                height: 40,
                color: "white",
              }}
              placeholder="Enter Phone Number"
              placeholderTextColor="white"
              selectionColor="white"
            />
          </View>
        </View>
        {/* PASSWORD INPUT */}

        <View style={{ marginTop: 20 }}>
          <Text style={{ color: COLORS.lightGreen }}>Password</Text>
          <TextInput
            style={{
              marginVertical: 10,
              borderBottomColor: "white",
              borderBottomWidth: 1,
              height: 40,
              color: "white",
            }}
            placeholder="Enter Password"
            placeholderTextColor="white"
            selectionColor="white"
            secureTextEntry={showPassword}
          />
          <TouchableOpacity
            style={{
              position: "absolute",
              right: 0,
              bottom: 10,
              height: 30,
              width: 30,
            }}
            onPress={() => setShowPassword(!showPassword)}
          >
            <Image
              source={showPassword ? icons.disable_eye : icons.eye}
              style={{ height: 20, width: 20, tintColor: "white" }}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
  const button = () => (
    <View style={{ margin: 30 }}>
      <TouchableOpacity
        style={{
          height: 60,
          backgroundColor: "black",
          borderRadius: 20,
          alignItems: "center",
          justifyContent: "center",
        }}
        onPress={() => navigation.navigate("Tabs")}
      >
        <Text style={{ color: "white" }}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
  const logo = () => (
    <View
      style={{
        marginTop: SIZES.padding * 5,
        height: 100,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Image
        source={images.wallieLogo}
        resizeMode="contain"
        style={{ width: "60%" }}
      />
    </View>
  );
  const renderAreasCodeModal = () => (
    <Modal animationType="slide" transparent={true} visible={modalVisible}>
      <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <View
            style={{
              height: 400,
              width: SIZES.width * 0.8,
              backgroundColor: COLORS.lightGreen,
              borderRadius: SIZES.radius,
            }}
          >
            <FlatList
              data={areas}
              renderItem={renderItem}
              keyExtractor={(item) => item.code}
              showsVerticalScrollIndicator={false}
              style={{
                padding: SIZES.padding * 2,
                margin: SIZES.padding * 2,
              }}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={{ padding: SIZES.padding, flexDirection: "row" }}
      onPress={() => {
        setSelectedArea(item);
        setModalVisible(false);
      }}
    >
      <Image
        source={{ uri: item.flag }}
        style={{
          width: 30,
          height: 30,
          marginRight: 10,
        }}
      />
      <Text>{item.name}</Text>
    </TouchableOpacity>
  );
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <LinearGradient
        colors={[COLORS.lime, COLORS.emerald]}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          {header()}
          {logo()}
          {form()}
          {button()}
        </ScrollView>
      </LinearGradient>
      {renderAreasCodeModal()}
    </KeyboardAvoidingView>
  );
};

export default SignUp;
