import Appbar from "@/components/myCompo/appbar";
import { getSubscriptions } from "@/services/subscription";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
    ActivityIndicator,
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

const BuySubscription = () => {
    const { amc_pool_id } = useLocalSearchParams();
    const [loading, setLoading] = useState(false);
    const [subscriptionCards, setSubscriptionCards] = useState<any[]>([]);

    useEffect(() => {
        fetchSubscriptionCards();
    }, []);

    const fetchSubscriptionCards = async () => {
        try {
            setLoading(true);
            const res = await getSubscriptions(Number(amc_pool_id));
            if (res?.status) {
                setSubscriptionCards(res.data);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const extractListItems = (htmlString: string) => {
        if (!htmlString) return [];

        const matches = htmlString.match(/<li[^>]*>(.*?)<\/li>/g);

        if (!matches) return [];

        return matches.map((item) =>
            item
                .replace(/<[^>]+>/g, "")
                .replace(/&nbsp;/g, " ")
                .trim()
        );
    };

    const renderItem = ({ item }: any) => (
        <View style={styles.card}>
            <View style={styles.header}>
                <View>
                    <Text style={styles.planTitle}>
                        {item.name}
                    </Text>
                    <Text style={styles.subtitle}>
                        {item.description}
                    </Text>
                </View>
                <View style={{ flexDirection: "column", alignItems: "center", gap: 2 }} >
                    <View style={styles.priceBadge}>
                        <Text style={styles.priceText}>
                            {item.duration}
                        </Text>
                    </View>
                    <Text style={styles.monthText}>
                        MONTHS
                    </Text>
                </View>

            </View>

            {/* Feature List */}
            <View style={styles.featureContainer}>
                {extractListItems(item.features).map(
                    (feature: string, index: number) => (
                        <View key={index} style={styles.featureRow}>
                            <Ionicons
                                name="checkmark"
                                size={22}
                                color="#c2c2c2ff"
                            />
                            <Text style={styles.featureText}>{feature}</Text>
                        </View>
                    )
                )}
            </View>

            {/* Buy Button */}
            <TouchableOpacity style={styles.buyButton}>
                <Text style={styles.buyText}>Buy Now ₹ {item.price}</Text>
            </TouchableOpacity>


        </View>
    );

    return (
        <View style={styles.mainContainer}>
            <Appbar
                title="SUBSCRIPTION"
                showBack={true}
                showLeading={false}
                showSearchbar={false}
                showMenu={true}
            />

            {loading ? (
                <ActivityIndicator size="large" style={{ marginTop: 40 }} />
            ) : (
                <FlatList
                    data={subscriptionCards}
                    keyExtractor={(item, index) =>
                        item?.id ? item.id.toString() : index.toString()
                    }
                    renderItem={renderItem}
                    contentContainerStyle={{ paddingBottom: 40 }}
                    showsVerticalScrollIndicator={false}
                />
            )}
        </View>
    );
};

export default BuySubscription;

const styles = StyleSheet.create({

    mainContainer: {
        flex: 1,
        backgroundColor: "#f5f5f5",
        paddingHorizontal: 20,
        paddingTop: 10,
    },


    card: {
        backgroundColor: "#fff",
        borderRadius: 4,
        marginTop: 20,
        overflow: "hidden",
        borderColor: "#d1d1d1ff",
        borderWidth: 1
    },


    header: {
        backgroundColor: "#3F7CF7",
        padding: 16,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },


    planTitle: {
        color: "#fff",
        fontSize: 24,
        fontWeight: "600",
    },


    subtitle: {
        color: "#E0E7FF",
        fontSize: 14,
        marginTop: 4,
    },


    priceBadge: {
        backgroundColor: "#5A8BFF",
        height: 48,
        width: 48,
        borderRadius: 24,
        justifyContent: "center",
        alignItems: "center",
    },


    priceText: {
        color: "#fff",
        fontWeight: "700",
        fontSize: 14,
    },
    monthText: {
        color: "#fff",
        fontWeight: "400",
        fontSize: 12,
    },


    featureContainer: {
        padding: 30,
    },


    featureRow: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 8,
    },


    featureText: {
        marginLeft: 8,
        fontSize: 14,
        color: "#333",
    },


    buyButton: {
        backgroundColor: "#00D959",
        marginHorizontal: 16,
        marginBottom: 12,
        paddingVertical: 12,
        borderRadius: 4,
        alignItems: "center",
    },


    buyText: {
        color: "#fff",
        fontWeight: "600",
        fontSize: 16,
    },


    footerNote: {
        fontSize: 12,
        color: "#777",
        paddingHorizontal: 16,
        paddingBottom: 16,
    },
});
