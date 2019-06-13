import React from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import Modal from "react-native-modal";
import MultiSelectList from "../components/MultiSelectList/MultiSelectList";

const FILTER_DATA1 = ["tejas","chirag"];
const FILTER_DATA2 = ["test","chirag"];
const FILTER_DATA3 = ["rajdeep","binit"];

export default class HomeScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            openFilterModal: false,
            filters: {
                "test1": [],
                "test2": [],
                "test3": []
            }
        }
    }

    openFilterModal = () => {
        console.log("ccc");
        this.setState({openFilterModal: !this.state.openFilterModal});
    }

    onPressFilterDone = async (filterType, filters) => {
        let filterArray = this.state.filters;
        switch (filterType) {
            case "test1" :
                filterArray[filterType] = filters;
                await this.setState({filters:filterArray})
            case "test2" :
                filterArray[filterType] = filters;
                await this.setState({filters:filterArray})
            case "test3" :
                filterArray[filterType] = filters;
                await this.setState({filters:filterArray})

        }
    }

    onApplyFilters = async () => {
        console.log("filters---", this.state.filters);
        await this.openFilterModal();
    }

    render() {

        const {filters} = this.state;
        console.log("render3---",filters.test1, filters);
        return (
            <View style={styles.container}>
                <ScrollView
                    style={styles.container}
                    contentContainerStyle={styles.contentContainer}>
                    <View style={styles.getStartedContainer}>
                        <TouchableOpacity style={{marginTop: 30, padding: 20}} onPress={this.openFilterModal}>
                            <Text>{"Test"}</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>

                <Modal
                    backdropColor={'#0098D7'}
                    backdropOpacity={0.70}
                    transparent={true}
                    onBackdropPress={() => this.setState({openFilterModal: !this.state.openFilterModal})}
                    isVisible={this.state.openFilterModal}>
                    <View style={styles.filterMainRow}>
                        <View style={styles.blueRow}/>
                        <View style={styles.filterInputRow}>
                            <View style={styles.filterTitleRow}>
                                <Text style={styles.filterHeaderText}>{"Filters By Data"}</Text>
                            </View>
                            <MultiSelectList
                                defaultValue={filters.test1}
                                filterType={"test1"}
                                placeholder={"Search 1"}
                                data={FILTER_DATA1}
                                onPressFilterDone={this.onPressFilterDone}
                            />
                            <MultiSelectList
                                defaultValue={filters["test2"]}
                                filterType={"test2"}
                                placeholder={"Search 2"}
                                data={FILTER_DATA2}
                                onPressFilterDone={this.onPressFilterDone}
                            />
                            <MultiSelectList
                                defaultValue={filters["test3"]}
                                filterType={"test3"}
                                placeholder={"Search 3"}
                                data={FILTER_DATA3}
                                onPressFilterDone={this.onPressFilterDone}
                            />
                        </View>
                        <View style={styles.actionRow}>
                            <TouchableOpacity onPress={this.openFilterModal} style={styles.cancelButtonRow}>
                                <Text style={styles.cancelButtonText}>{"Cancel"}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={this.onApplyFilters} style={styles.filterButtonRow}>
                                <Text style={styles.filterButtonText}>{"Apply Filters"}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </View>
        );
    }
}

HomeScreen.navigationOptions = {
    header: null,
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    contentContainer: {
        paddingTop: 30,
    },
    getStartedContainer: {
        alignItems: 'center',
        marginHorizontal: 50,
    },
    containerModal: {
        backgroundColor: "pink",
        paddingHorizontal: 20,
        alignItems: 'center'
    },
    blueRow:{
        borderColor: "blue",
        borderWidth: 2,
        alignItems:"flex-start",
        alignSelf: "flex-start",
        marginTop: 5,
        width:"20%",
        marginLeft:20
    },
    filterMainRow:{
        flex: 0.6,
        backgroundColor: 'white',
        alignItems: 'center',
        shadowColor: "gray",
        shadowOffset: {height: 0, width: 0},
        shadowOpacity: 0.5,
        justifyContent: 'center'
    },
    filterInputRow: {
        flex: 1,
        backgroundColor: 'white',
        width:"90%"
    },
    filterTitleRow:{
        marginVertical: 8,
    },
    filterHeaderText:{
        fontSize: 18,
        paddingLeft: 5,
        paddingTop: 5,
        justifyContent: 'center',
        alignSelf: "flex-start",
    },
    actionRow: {
        flexDirection: "row",
        alignItems: "flex-start",
        justifyContent: 'center'
    },
    cancelButtonRow:{
        justifyContent: 'center',
        flexDirection: 'row',
        height: 50,
        minHeight: 50,
        width: "40%",
        marginRight:5,
        alignItems: "center",
        marginVertical: 8
    },
    cancelButtonText:{
        color: "black",
        fontSize: 18,
    },
    filterButtonRow:{
        justifyContent: 'center',
        flexDirection: 'row',
        height: 50,
        minHeight: 50,
        width: "40%",
        borderWidth: 1,
        alignSelf: "flex-end",
        alignItems: "center",
        borderColor: "lightgray",
        borderRadius: 10,
        marginVertical: 8,
        backgroundColor: "white",
        shadowColor: "lightgray",
        shadowOpacity: 0.5,
        elevation: 3,
        shadowOffset: {
            height: 0,
            width: 0
        }
    },
    filterButtonText: {
        color: "black",
        fontSize: 18,
        paddingLeft: 10
    }
});
