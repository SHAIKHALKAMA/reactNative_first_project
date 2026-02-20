import Appbar from '@/components/myCompo/appbar';
import CheckboxGroup from '@/components/myCompo/checkBox';
import CustomTextField from '@/components/myCompo/custom_textfield';
import Drawer from '@/components/myCompo/drawer';
import RadioGroup from '@/components/myCompo/radio';
import RadioGroup2 from '@/components/myCompo/radio2';
import { addNewPool } from '@/services/newPoolService';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';


const NewPoolDevelopment = () => {
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState('yes');
    const [selectFeature, setSelectFeature] = useState('yes');
    const [size, setSize] = useState('');
    const [budget, setBudget] = useState('');
    const [compDate, setCompDate] = useState('');
    const [features, setFeatures] = useState<string[]>([]);
    const [isSubmit, setIsSubmit] = useState(false);


    const onSubmit = async () => {
        try {
            const response = await addNewPool({
                type: selected,
                size: size,
                finish: selectFeature,
                features: features,
                budget: budget,
                timeline: compDate,
            });

            console.log(response);

            if (response.status) {
                alert('Pool submitted successfully');
                router.push('/(tabs)/home');
            } else {
                alert(response.message);
            }

        } catch (error: any) {
            console.log(error?.response?.data || error);
            alert('Something went wrong');
        }
    };




    return (
        <View style={{ backgroundColor: '#fff', flex: 1, paddingHorizontal: 20, paddingTop: 20 }}>
            <Appbar title="New Pool" showBack={true} showLeading={false} showSearchbar={false} showMenu={true} onMenuPress={() => setOpen(true)} />
            <Drawer visible={open} onClose={() => setOpen(false)} />
            <View>
                <RadioGroup
                    options={[
                        { label: 'Residential', value: 'residential' },
                        { label: 'Commercial', value: 'commercial' },
                        { label: 'Sports', value: 'sports' },
                    ]}
                    value={selected}
                    onChange={setSelected}
                />
            </View>
            <CustomTextField label="Size" value={size} onChangeText={setSize} />
            <Text style={styles.text}>Size</Text>
            <View style={styles.radioWrapper}>
                <RadioGroup2
                    options={[
                        { label: 'Tiles', value: 'Tiles' },
                        { label: 'Vinyl', value: 'Vinyl' },
                        { label: 'Fiberglass', value: 'Fiberglass' },
                        { label: 'Other', value: 'Other' },
                    ]}
                    value={selectFeature}
                    onChange={setSelectFeature}
                    columns={2}
                />
            </View>
            <Text style={styles.text}>Features</Text>
            <CheckboxGroup
                options={[
                    { label: 'Lighting', value: 'Lighting' },
                    { label: 'Heating', value: 'Heating' },
                    { label: 'Waterfall', value: 'Waterfall' },
                    { label: 'Jacuzzi', value: 'Jacuzzi' },
                    { label: 'Deck', value: 'Deck' },
                    { label: 'Other', value: 'Other' },
                ]}
                selectedValues={features}
                onChange={setFeatures}
                columns={2}
            />
            <Text style={styles.text}>Budget & Timeline</Text>
            <CustomTextField label="Budget" value={budget} onChangeText={setBudget} />
            <CustomTextField label="Completion Date" value={compDate} onChangeText={setCompDate} />
            <View style={{ marginTop: 20 }}></View>
            <View style={styles.buttonSubmit}>
                <View style={styles.buttonSubmit}>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => {
                            setIsSubmit(true);
                            onSubmit();
                        }}>
                        <Text style={styles.buttonText}>SUBMIT</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View >
    );
};

export default NewPoolDevelopment;

const styles = StyleSheet.create({
    text: {
        marginTop: 10,
        fontSize: 18,
        fontWeight: '500',
        color: '#000',
    },
    radioWrapper: {
        marginTop: 16,
    },
    buttonSubmit: {
        width: '100%',
        height: 48,
        backgroundColor: '#004F9F',
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
        letterSpacing: 1,
    },
});