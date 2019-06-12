import React from "react";
import {FlatList, TouchableOpacity, Text, View} from "react-native";
import {MaterialCommunityIcons as Icon} from "@expo/vector-icons";
import Modal from "react-native-modal";

class MyListItem extends React.PureComponent {
    _onPress = () => {
        this.props.onPressItem(this.props.id);
    };

    render() {
        const textColor = this.props.selected ? 'red' : 'black';
        return (
            <TouchableOpacity onPress={this._onPress}>
                <View style={{flexDirection: "row", borderBottomWidth: 1, borderColor:"lightgray", paddingHorizontal: 10, paddingVertical: 10}}>

                    <Text style={{color: textColor, fontSize: 14}}>{this.props.title}</Text>

                    <View style={{alignItems: "flex-end", flex: 1, paddingRight: 10, justifyContent: "center"}}>
                        <Icon name={this.props.selected ? 'check' : null} size={20} color={"green"}/>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
}

export default class MultiSelectList extends React.Component {
    state = {selected: (new Map(): Map<string, boolean>), focus: false};

    _keyExtractor = (item, index) => item.id;

    _onPressItem = (id: string) => {
        // updater functions are preferred for transactional updates
        this.setState((state) => {
            // copy the map rather than modifying state.
            const selected = new Map(state.selected);
            selected.set(id, !selected.get(id)); // toggle
            return {selected};
        });
    };

    _renderItem = ({item}) => (
        <MyListItem
            id={item.id}
            onPressItem={this._onPressItem}
            selected={!!this.state.selected.get(item.id)}
            title={item.title}
        />
    );

    _openFilterList = (flag) => {
        this.setState({
            focus: flag
        });
        console.log("selected---", Array.from(this.state.selected.keys()));
    }

    render() {
        return (
            <>
                <TouchableOpacity
                    style={{
                        justifyContent: 'center', flexDirection: 'row',
                        height: 50,
                        minHeight: 50,
                        alignItems: 'center',
                        borderWidth: 1,
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
                    }}
                    onPress={() => this._openFilterList(true)}>
                    <Text style={{
                        color: "black",
                        fontSize: 18,
                        paddingLeft: 10
                    }}>{"Search"}</Text>
                    <View style={{flex: 1}}/>

                    <Icon name={"chevron-down"} style={{paddingRight: 5, paddingTop: 2}} size={24} color={"black"}/>

                </TouchableOpacity>
                <Modal
                       backdropColor={'rgba(0,0,0,0.1)'}
                       visible={this.state.focus}>

                    <View style={{
                        flex: 0.5,
                        backgroundColor: 'white',
                        alignItems: 'center',
                        shadowColor: "lightgray",
                        shadowOffset: {height: 0, width: 0},
                        shadowOpacity: 0.5,
                        justifyContent: 'center'
                    }}>
                        <View style={{flex: 1, backgroundColor: 'white', width: "100%"}}>
                            <FlatList
                                data={[{title: 'a', id: '1'}, {title: 'b', id: '2'}]}
                                extraData={this.state}
                                keyExtractor={this._keyExtractor}
                                renderItem={this._renderItem}
                            />
                            <TouchableOpacity onPress={() => this._openFilterList(false)} style={{
                                justifyContent: 'center', flexDirection: 'row',
                                height: 50,
                                minHeight: 50,
                                width:"50%",
                                alignItems: 'center',
                                borderWidth: 1,
                                alignSelf:"center",
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
                            }}>
                                <Text style={{
                                    color: "black",
                                    fontSize: 18,
                                    paddingLeft: 10
                                }}>Done</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </>
        );
    }
}
