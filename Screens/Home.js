import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { COLORS, FONTS, SIZES, icons, images } from "../constants";

const featuresData = [
  {
    id: 1,
    icon: icons.reload,
    color: COLORS.purple,
    backgroundColor: COLORS.lightpurple,
    description: "Top Up",
  },
  {
    id: 2,
    icon: icons.send,
    color: COLORS.yellow,
    backgroundColor: COLORS.lightyellow,
    description: "Transfer",
  },
  {
    id: 3,
    icon: icons.internet,
    color: COLORS.primary,
    backgroundColor: COLORS.lightGreen,
    description: "Internet",
  },
  {
    id: 4,
    icon: icons.wallet,
    color: COLORS.red,
    backgroundColor: COLORS.lightRed,
    description: "Wallet",
  },
  {
    id: 5,
    icon: icons.bill,
    color: COLORS.yellow,
    backgroundColor: COLORS.lightyellow,
    description: "Bill",
  },
  {
    id: 6,
    icon: icons.game,
    color: COLORS.primary,
    backgroundColor: COLORS.lightGreen,
    description: "Games",
  },
  {
    id: 7,
    icon: icons.phone,
    color: COLORS.red,
    backgroundColor: COLORS.lightRed,
    description: "Mobile Prepaid",
  },
  {
    id: 8,
    icon: icons.more,
    color: COLORS.purple,
    backgroundColor: COLORS.lightpurple,
    description: "More",
  },
];

const specialPromoData = [
  {
    id: 1,
    img: images.promoBanner,
    title: "Bonus Cashback1",
    description: "Don't miss it. Grab it now!",
  },
  {
    id: 2,
    img: images.promoBanner,
    title: "Bonus Cashback2",
    description: "Don't miss it. Grab it now!",
  },
  {
    id: 3,
    img: images.promoBanner,
    title: "Bonus Cashback3",
    description: "Don't miss it. Grab it now!",
  },
  {
    id: 4,
    img: images.promoBanner,
    title: "Bonus Cashback4",
    description: "Don't miss it. Grab it now!",
  },
];
const Home = () => {
  const [features, setFeatures] = useState(featuresData);
  const [specialPromo, setSpecialPromp] = useState(specialPromoData);
  const renderHeader = () => {
    return (
      <View style={{ flexDirection: "row", marginVertical: 20 }}>
        <View style={{ flex: 1 }}>
          <Text
            style={{
              fontSize: 30,
              lineHeight: 36,
            }}
          >
            Hello
          </Text>
          <Text
            style={{
              fontSize: 20,
              lineHeight: 30,
              color: COLORS.gray,
            }}
          >
            Rafik
          </Text>
        </View>
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <TouchableOpacity
            style={{
              height: 40,
              width: 40,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: COLORS.lightGray,
            }}
          >
            <Image
              source={icons.bell}
              style={{
                width: 20,
                height: 20,
                tintColor: COLORS.secondary,
              }}
            />
            <View
              style={{
                position: "absolute",
                top: -5,
                right: -5,
                height: 10,
                width: 10,
                backgroundColor: "red",
                borderRadius: 5,
              }}
            ></View>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  const renderBanner = () => {
    return (
      <View
        style={{
          height: 120,
          borderRadius: 20,
        }}
      >
        <Image
          source={images.banner}
          resizeMode="cover"
          style={{
            width: "100%",
            height: "100%",
            borderRadius: 20,
          }}
        />
      </View>
    );
  };
  const renderFeatures = () => {
    const Header = () => {
      return (
        <View style={{ marginBottom: 20 }}>
          <Text
            style={{
              fontSize: 20,
            }}
          >
            Features
          </Text>
        </View>
      );
    };
    const renderItem = ({ item }) => {
      return (
        <TouchableOpacity
          style={{ marginBottom: 20, width: 60, alignItems: "center" }}
          onPress={() => console.log(item.description)}
        >
          <View
            style={{
              height: 50,
              width: 50,
              marginBottom: 5,
              borderRadius: 20,
              backgroundColor: item.backgroundColor,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Image
              source={item.icon}
              style={{ width: 20, height: 20, tintColor: item.color }}
              resizeMode="contain"
            />
          </View>
          <View>
            <Text
              style={{
                fontSize: 10,
              }}
            >
              {item.description}
            </Text>
          </View>
        </TouchableOpacity>
      );
    };
    return (
      <FlatList
        ListHeaderComponent={Header}
        data={features}
        numColumns={4}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        keyExtractor={(item) => `${item.id}`}
        renderItem={renderItem}
        style={{
          marginTop: 20,
        }}
      />
    );
  };
  const renderPromo = () => {
    const HeaderComponent = () => {
      return (
        <View>
          {renderHeader()}
          {renderBanner()}
          {renderFeatures()}
          {renderPromoHeader()}
        </View>
      );
    };
    const renderPromoHeader = () => {
      return (
        <View
          style={{
            flexDirection: "row",
            marginBottom: 10,
          }}
        >
          <View
            style={{
              flex: 1,
            }}
          >
            <Text
              style={{
                fontSize: 20,
              }}
            >
              Special Promos
            </Text>
          </View>
          <TouchableOpacity onPress={() => console.log("view All")}>
            <View>
              <Text
                style={{
                  color: "gray",
                  fontSize: 14,
                }}
              >
                View All
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      );
    };
    const renderItem = ({ item }) => (
      <TouchableOpacity
        style={{
          marginVertical: 8,
          width: SIZES.width / 2.5,
        }}
        onPress={() => console.log(item.title)}
      >
        <View
          style={{
            height: 80,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            backgroundColor: COLORS.primary,
          }}
        >
          <Image
            source={item.img}
            // resizeMode="cover"
            style={{
              width: "100%",
              height: "100%",
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
            }}
          />
        </View>
        <View
          style={{
            padding: 10,
            backgroundColor: COLORS.lightGray,
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 20,
          }}
        >
          <Text
            style={{
              fontSize: 16,
              fontWeight: "bold",
            }}
          >
            {item.title}
          </Text>
          <Text
            style={{
              fontSize: 14,
            }}
          >
            {item.description}
          </Text>
        </View>
      </TouchableOpacity>
    );
    return (
      <FlatList
        ListHeaderComponent={HeaderComponent}
        contentContainerStyle={{
          paddingHorizontal: 30,
        }}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        data={specialPromo}
        keyExtractor={(item) => `${item.id}`}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={
          <View
            style={{
              marginBottom: 80,
            }}
          ></View>
        }
      />
    );
  };
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: COLORS.white,
      }}
    >
      {renderPromo()}
    </SafeAreaView>
  );
};

export default Home;
