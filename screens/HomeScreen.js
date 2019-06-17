// @flow
'use-strict'

import React, { Component } from 'react'
import {
    Text,
    View,
    Image,
    StyleSheet,
    SafeAreaView,
    TouchableOpacity,
} from 'react-native'
import MapView, {Polyline, PROVIDER_GOOGLE, Marker, Callout } from 'react-native-maps'
import ClusteredMapView from 'react-native-maps-super-cluster'
import { generateRandomPoints, generateRandomPoint } from './generator'


const italyCenterLatitude = 41.8962667,
    italyCenterLongitude = 11.3340056,
    radius = 600000
export default class App extends Component {

    constructor(props) {
        super(props)

        this.state = {
            pins: []
        }

        this.reload = this.reload.bind(this)
        this.loadMore = this.loadMore.bind(this)
        this.renderMarker = this.renderMarker.bind(this)
        this.renderCluster = this.renderCluster.bind(this)
        this.onRegionChangeComplete = this.onRegionChangeComplete.bind(this);
    }

    componentDidMount() {
        this.reload()
    }

    reload = () => {
        const pins = generateRandomPoints({latitude: italyCenterLatitude, longitude: italyCenterLongitude}, radius, 50, this.state.pins.length)
        this.setState({ pins: pins})
    }

    loadMore = () => {
        const pins = generateRandomPoints({latitude: italyCenterLatitude, longitude: italyCenterLongitude}, radius, 50, this.state.pins.length)
        this.setState({ pins: this.state.pins.concat(pins) })
    }

    renderCluster = (cluster, onPress) => {
        const pointCount = cluster.pointCount,
            coordinate = cluster.coordinate,
            clusterId = cluster.clusterId

        return (
            <Marker identifier={`cluster-${clusterId}`} coordinate={coordinate} onPress={onPress}>
                <View style={styles.clusterContainer}>
                    <Text style={styles.clusterText}>
                        {pointCount}
                    </Text>
                </View>
            </Marker>
        )
    }

    onRegionChangeComplete = (test) => {
        console.log("TEST--",test);
    }

    renderMarker = (pin) => {
        return (
            <Marker identifier={`pin-${pin.id}`} key={pin.id} coordinate={pin.location} />
        )
    }

    render() {
        return (
            <MapView
                style = {{flex: 1}}
                region = { {
                    latitude: -37.8025259,
                    longitude: -122.4351431,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                } }
                showsUserLocation={ true }
                followUserLocation={ true }
                onRegionChangeComplete = { this.onRegionChangeComplete }>
                <MapView.Polygon
                    coordinates={[
                        { latitude: 37.8025259, longitude: -122.4351431 },
                        { latitude: 37.7896386, longitude: -122.421646 },
                        { latitude: 37.7665248, longitude: -122.4161628 },
                        { latitude: 37.7734153, longitude: -122.4577787 },
                        { latitude: 37.7948605, longitude: -122.4596065 },
                        { latitude: 37.8025259, longitude: -122.4351431 }
                    ]}
                    strokeColor="#000" // fallback for when `strokeColors` is not supported by the map-provider
                    strokeColors={[
                        '#7F0000',
                        '#00000000', // no color, creates a "long" gradient between the previous and next coordinate
                        '#B24112',
                        '#E5845C',
                        '#238C23',
                        '#7F0000'
                    ]}
                    strokeWidth={6}
                />
            </MapView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F5FCFF',
    },
    clusterContainer: {
        width: 30,
        height: 30,
        padding: 6,
        borderWidth: 1,
        borderRadius: 15,
        alignItems: 'center',
        borderColor: '#65bc46',
        justifyContent: 'center',
        backgroundColor: 'white',
    },
    clusterText: {
        fontSize: 13,
        color: '#65bc46',
        fontWeight: '500',
        textAlign: 'center',
    },
    controlBar: {
        top: 48,
        left: 25,
        right: 25,
        height: 40,
        borderRadius: 20,
        position: 'absolute',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        backgroundColor: 'white',
        justifyContent: 'space-between',
    },
    button: {
        paddingVertical: 8,
        paddingHorizontal: 20,
    },
    novaLabLogo: {
        right: 8,
        bottom: 8,
        width: 64,
        height: 64,
        position: 'absolute',
    },
    text: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    // clusterContainer: {
    //     width: 24,
    //     height: 24,
    //     borderWidth: 1,
    //     borderRadius: 12,
    //     alignItems: 'center',
    //     borderColor: '#65bc46',
    //     justifyContent: 'center',
    //     backgroundColor: '#fff'
    // },
    counterText: {
        fontSize: 14,
        color: '#65bc46',
        fontWeight: '400'
    },
    calloutStyle: {
        width: 64,
        height: 64,
        padding: 8,
        borderRadius: 8,
        borderColor: '#65bc46',
        backgroundColor: 'white',
    },
})
