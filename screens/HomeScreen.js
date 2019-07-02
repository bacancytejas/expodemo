// @flow
import CustomTab from "./CustomTab";

'use-strict'

import React, { Component } from 'react'
import {
    StyleSheet,
    View,
    Text,
    Dimensions,
    TouchableOpacity,
    Platform
} from 'react-native';
import InputField from "../components/InputField";
import {reduxForm} from "redux-form";
const { width, height } = Dimensions.get('window');

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedTab:"Tab1"
        };
    }

    handleTabClick = (selectedTab) => {
        this.setState({selectedTab:selectedTab});
    }

    render() {
        const {selectedTab} = this.state;
        return (
            <View style={styles.container}>
                <View style={styles.detailRow}>
                    <View style={styles.tabRow}>
                        <CustomTab
                            tabName={"Test1"}
                            selected={selectedTab}
                            onPressTab={this.handleTabClick}
                            tabItem={["Tab1","Tab2","Tab3"]}
                        />
                    </View>
                    <View style={styles.cardDetailBody}>
                        {
                            selectedTab === "Tab1" && <View>
                                <View style={{marginVertical:10, marginHorizontal:5}}>
                                    <InputField
                                        multiline={true}
                                        numberOfLines={4}
                                        name='Name'
                                        label='Full Name'
                                        returnKeyType='next'
                                        placeholder='Enter Full Name'
                                        keyboardType='default'
                                        refField={ref => this.name = ref}
                                        autoCapitalize={'none'}
                                        editable={true}
                                        onSubmitEditing={() => {

                                        }}
                                    />
                                </View>
                                <View style={{marginVertical:10, marginHorizontal:5}}>
                                    <InputField
                                        multiline={true}
                                        numberOfLines={4}
                                        name='Name'
                                        label='Full Name'
                                        returnKeyType='next'
                                        placeholder='Enter Full Name'
                                        keyboardType='default'
                                        refField={ref => this.name = ref}
                                        autoCapitalize={'none'}
                                        editable={true}
                                        onSubmitEditing={() => {

                                        }}
                                    />
                                </View>
                                <View style={{marginVertical:10, marginHorizontal:5}}>
                                    <InputField
                                        multiline={true}
                                        numberOfLines={4}
                                        name='Name'
                                        label='Full Name'
                                        returnKeyType='next'
                                        placeholder='Enter Full Name'
                                        keyboardType='default'
                                        refField={ref => this.name = ref}
                                        autoCapitalize={'none'}
                                        editable={true}
                                        onSubmitEditing={() => {

                                        }}
                                    />
                                </View>
                            </View>
                        }
                    </View>
                </View>
            </View>
        );
    }

}

const initialValues = {
    name: '',
};

const withForm = reduxForm({
    form: 'TestForm',
    initialValues
});

export default withForm(App);

const styles = StyleSheet.create({
    container: {
       flex:1,
    },
    cardRow:{
        marginHorizontal:10,
        marginVertical:10
    },
    cardStyle:{
        borderTopWidth:0.5,
        borderLeftWidth:0.5,
        borderRightWidth:0.5,
        borderBottomWidth:0,
        borderColor:"gray",
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        backgroundColor: "dodgerblue",
        shadowColor: "gray",
        shadowRadius: 10,
        shadowOpacity: 0.2,
        elevation: Platform === 'ios' ? 0 : 3,
        shadowOffset: {
            height: 0,
            width: 0
        }
    },
    cardHeader:{
        flexDirection:"row",
        padding:10
    },
    cardHeaderMainRow:{flex:1, flexDirection:"row", paddingVertical:4, justifyContent:"space-between"},
    cardHeaderTitleRow: {marginLeft:10, backgroundColor: "deeppink", borderWidth:1, borderColor:"deeppink", borderRadius:4, justifyContent:"center"},
    cardTitleText:{color:"white", fontWeight: "600"},
    cardHeaderIconRow:{alignSelf:"flex-end", color:"white", fontWeight: "600"},
    cardBody:{
        backgroundColor:"white",
    },
    detailRow:{
        marginTop:10,
        marginHorizontal:10
    },
    tabRow: {
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"space-around",

    },
    cardDetailBody:{
        backgroundColor:"lightgray",
        justifyContent:"center",
        marginHorizontal:2
    },
    label: {
        fontSize:15,
        color: "gray",
        marginVertical: 4
    },
})
