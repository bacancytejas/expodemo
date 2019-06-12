import React from "react";
import {FlatList, TouchableOpacity, Text, View, StyleSheet} from "react-native";
import {MaterialCommunityIcons as Icon} from "@expo/vector-icons";

class MyListItem extends React.PureComponent {
    _onPress = () => {
        this.props.onPressItem(this.props.id);
    };

    render() {
        const textColor = this.props.selected ? {color: "black", fontWeight:'400'} : {color: "gray"};
        return (
            <TouchableOpacity onPress={this._onPress}>
                <View style={styles.listItemRow}>
                    <Text style={[styles.listItemText,textColor]}>{this.props.title}</Text>
                    <View style={styles.listIconRow}>
                        <Icon name={this.props.selected ? 'check' : null} size={20} color={"green"}/>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
}

export default class MultiSelectList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: (new Map(): Map<string>), focus: false
        }
    }

    _keyExtractor = (item, index) => item;

    _onPressItem = (item:string) => {
        // updater functions are preferred for transactional updates
        this.setState((state) => {
            // copy the map rather than modifying state.
            const selected = new Map(state.selected);
            if(!selected.get(item)) {
                selected.set(item, !selected.get(item)); // toggle
            } else {
                selected.delete(item)
            }
            return {selected};
        },() => {
            this.props.onPressFilterDone(this.props.filterType, Array.from(this.state.selected.keys()))
        });
    };

    _renderItem = ({item}) => (
        <MyListItem
            id={item}
            onPressItem={this._onPressItem}
            selected={!!this.state.selected.get(item)}
            title={item}
        />
    );

    openFilterList = async () => {
        await this.setState({focus: !this.state.focus});
    }

    render() {
        const {placeholder} =this.props;
        return (
            <>
                <TouchableOpacity
                    style={styles.filterInputRow}
                    onPress={this.openFilterList}
                >
                    <Text style={styles.filterInputText}>{placeholder}</Text>
                    <View style={{flex: 1}}/>
                    <Icon
                        name={this.state.focus?"chevron-up":"chevron-down"}
                        style={styles.iconArrow}
                        size={24}
                        color={"black"}
                    />
                </TouchableOpacity>
                {this.state.focus ? <View style={styles.listMainRow}>
                    <View style={styles.listRow}>
                        <FlatList
                            data={this.props.data}
                            extraData={this.state}
                            keyExtractor={this._keyExtractor}
                            renderItem={this._renderItem}
                        />
                    </View>
                </View> : null }
            </>
        );
    }
}

const styles = StyleSheet.create({
    filterInputRow: {
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
    },
    filterInputText: {
        color: "black",
        fontSize: 18,
        paddingLeft: 10
    },
    iconArrow: {
        paddingRight: 5,
        paddingTop: 2
    },
    listMainRow: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        shadowColor: "lightgray",
        shadowOffset: {height: 0, width: 0},
        shadowOpacity: 0.5,
        justifyContent: 'center'
    },
    listRow: {
        flex: 1,
        backgroundColor: 'white',
        width: "100%"
    },
    listItemRow: {
        flexDirection: "row",
        borderBottomWidth: 1,
        borderColor:"lightgray",
        paddingHorizontal: 10,
        paddingVertical: 10
    },
    listItemText: {
        fontSize: 18,
    },
    listIconRow: {
        alignItems: "flex-end",
        flex: 1,
        paddingRight: 10,
        justifyContent: "center"
    }
});
