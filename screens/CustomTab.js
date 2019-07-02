import React, {Component} from 'react'
import {
    StyleSheet,
    View,
    Text,
    Dimensions,
    TouchableOpacity, Platform,
} from 'react-native';

const {width, height} = Dimensions.get('window');

class CustomTab extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const {tabName, tabItem, selected, onPressTab} = this.props;
        return (
            <>
                {tabItem.length && tabItem.map((tab, idx) =>
                    <TouchableOpacity
                        onPress={() => onPressTab(tab)}
                        key={idx}
                        style={[styles.container, tab == selected ? {backgroundColor: "lightgray"} : {backgroundColor: "dodgerblue"}]}>
                        <Text style={styles.tabNameText}>{tabName}</Text>
                    </TouchableOpacity>
                )}
            </>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        borderTopWidth: 0.5,
        borderLeftWidth: 0.5,
        borderRightWidth: 0.5,
        borderBottomWidth: 0,
        borderColor: "gray",
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        backgroundColor: "dodgerblue",
        shadowColor: "gray",
        shadowRadius: 15,
        shadowOpacity: 0.2,
        elevation: Platform === 'ios' ? 0 : 3,
        shadowOffset: {
            height: 0,
            width: 0
        },
        marginHorizontal: 2,
        alignItems: "center",
        justifyContent: "center",
    },
    tabNameText: {
        color: "white",
        fontSize: 17,
        paddingVertical: 10,
        // paddingHorizontal:40,
        fontWeight: "600"
    }
})

export default CustomTab;
