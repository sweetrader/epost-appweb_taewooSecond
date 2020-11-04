import loadScriptOnce from 'load-script-once'

const DAUM_KAKAO_API_JS_KEY = '70971eae03c2959dfc78b01ede169fee'
const DAUM_KAKAO_MAP_LIB_URL = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${DAUM_KAKAO_API_JS_KEY}&libraries=drawing,clusterer,services&autoload=false`

class Map {
  constructor() {
    this.map = null
    Map.initialize()
  }

  async mount(elementId) {
    await Map.initialize()

    // re-use map
    if (Map.cachedMaps[elementId]) {
      this.map = Map.cachedMaps[elementId]
      const oldElement = this.map.getNode()
      const newElement = document.getElementById(elementId)
      newElement.parentNode.replaceChild(oldElement, newElement)

      // create map
    } else {
      this.map = new Map.daum.maps.Map(
        document.getElementById(elementId),
        {
        /* center: new Map.daum.maps.LatLng(35.65919598808177, 127.73894402702498),*/
          center: new Map.daum.maps.LatLng(37.4979278, 127.0275833),
          level: 7
        },
      )
      this.map.setCopyrightPosition(Map.daum.maps.CopyrightPosition.BOTTOMRIGHT, true)
      this.map.clusters = {}
      this.map.markersWithoutCluster = []
      Map.cachedMaps[elementId] = this.map
    }
    return this
  }

  addMarkerClusters(clusterSpecs = []) {
    clusterSpecs.forEach(({ key, color, zIndex = 0, singleIconURL = null }) => {
      if (this.map.clusters[key]) return

      const cluster = this.map.clusters[key] = new Map.daum.maps.MarkerClusterer({
        map: this.map,
        averageCenter: true,
        gridSize: 30,
        minClusterSize: 2,
        minLevel: 10,
        disableClickZoom: false,
        calculator: [10, 20], // 0~9, 10~19, 20~
        styles: [
          {
            width: '30px',
            height: '30px',
            background: color,
            opacity: 0.95,
            border: '2px solid white',
            borderRadius: '100%',
            color: 'white',
            textAlign: 'center',
            lineHeight: '27px',
            fontSize: '20px',
            fontWeight: 'bold'
          },
          {
            width: '36px',
            height: '36px',
            background: color,
            opacity: 0.95,
            border: '2px solid white',
            borderRadius: '100%',
            color: 'white',
            textAlign: 'center',
            lineHeight: '33px',
            fontSize: '22px',
            fontWeight: 'bold'
          },
          {
            width: '48px',
            height: '48px',
            background: color,
            opacity: 0.95,
            border: '2px solid white',
            borderRadius: '100%',
            color: 'white',
            textAlign: 'center',
            lineHeight: '44px',
            fontSize: '25px',
            fontWeight: 'bold'
          }
        ]
      })

      cluster._icon = new Map.daum.maps.MarkerImage(
        singleIconURL,
        new Map.daum.maps.Size(15, 15),
      )

      cluster._zIndex = zIndex
    })
    return this
  }

  addMarkers(markerSpecs = []) {
    const markerMap = this.map
    const markerSpecsWithoutClusterKey = []
    const overlays = []
    const markerSpecsByClusterKey = markerSpecs.reduce((result, spec) => {
      if (!spec.clusterKey) {
        markerSpecsWithoutClusterKey.push(spec)
        return result
      }
      if (!result[spec.clusterKey]) {
        result[spec.clusterKey] = []
      }
      result[spec.clusterKey].push(spec)
      return result
    }, {})

    markerSpecsWithoutClusterKey.forEach(function({ lat, lng, title = null, onClick = null, iwContents }, index) {
      const marker = new Map.daum.maps.Marker({
        map: markerMap,
        position: new Map.daum.maps.LatLng(lat, lng),
        title
      })
      const iwContent = iwContents[index]
      if (iwContents.length > 0) {
        const overlay = new Map.daum.maps.CustomOverlay({
          content: iwContent,
          position: new Map.daum.maps.LatLng(lat, lng)
        })
        overlays.push(overlay)
        Map.daum.maps.event.addListener(marker, 'click', function() {
          for (var idx = 0; idx < overlays.length; idx++) {
            overlays[idx].setMap(null)
          }
          overlay.setMap(markerMap)
        })
        Map.daum.maps.event.addListener(markerMap, 'click', function() {
          for (var idx = 0; idx < overlays.length; idx++) {
            overlays[idx].setMap(null)
          }
        })
      }
      markerMap.markersWithoutCluster.push(marker)
    })

    /*
    const infowindows = []
    markerSpecsWithoutClusterKey.forEach(function({ lat, lng, title = null, onClick = null, iwContents }, index) {
      const marker = new Map.daum.maps.Marker({
        map: markerMap,
        position: new Map.daum.maps.LatLng(lat, lng),
        title
      })
      const iwContent = iwContents[index]
      if (iwContents.length > 0) {
        const marker2 = new Map.daum.maps.Marker({
          position: new Map.daum.maps.LatLng(lat, lng)
        })
        const iwRemoveable = true
        const infowindow = new Map.daum.maps.InfoWindow({
          content: iwContent,
          removable: iwRemoveable
        })
        infowindows.push(infowindow)
        Map.daum.maps.event.addListener(marker, 'click', function() {
          for (var idx = 0; idx < infowindows.length; idx++) {
            infowindows[idx].close()
          }
          infowindow.open(markerMap, marker2)
        })
      }

      markerMap.markersWithoutCluster.push(marker)
    })
    */

    for (const clusterKey in markerSpecsByClusterKey) {
      const cluster = markerMap.clusters[clusterKey]
      cluster.addMarkers(
        markerSpecsByClusterKey[clusterKey].map(({ lat, lng, title = null, onClick = null }) => {
          const marker = new Map.daum.maps.Marker({
            title,
            position: new Map.daum.maps.LatLng(lat, lng),
            image: cluster._icon,
            zIndex: cluster._zIndex
          })
          if (onClick) {
            Map.daum.maps.event.addListener(marker, 'click', onClick)
          }
          return marker
        })
      )
    }
  }

  clearMarkers() {
    // remove cluster markers
    for (const k in this.map.clusters) {
      const cluster = this.map.clusters[k]
      cluster.clear()
    }

    this.map.markersWithoutCluster.forEach(marker => {
      marker.setMap(null)
    })

    this.map.markersWithoutCluster = []
  }

  setCenter({ lat, lng, maxLevel = 8 }) {
    if (this.map.getLevel() > maxLevel) {
      this.map.setLevel(maxLevel)
    }
    this.map.panTo(
      new Map.daum.maps.LatLng(lat, lng)
    )
  }

  getLatLng(address) {
    var geocoder = new Map.daum.maps.services.Geocoder()
    var coord = {}
    var loc = {}
    geocoder.addressSearch(address, function(result, status) {
      if (status === Map.daum.maps.services.Status.OK) { // 정상적으로 검색이 완료됐으면
        const latLng = new Map.daum.maps.LatLng(result[0].y, result[0].x)
        loc.lat = latLng.Ha
        loc.lng = latLng.Ga
        coord.location = loc
        coord.name = result[0].address.address_name
        coord.type = null
      }
    })
    return coord
  }
}

Map.cachedMaps = {}
Map.daum = null
Map.initialize = function() {
  return new Promise((resolve, reject) => {
    loadScriptOnce(DAUM_KAKAO_MAP_LIB_URL, (err) => {
      if (err) return reject(err)
      Map.daum = window.daum
      Map.daum.maps.load(() => resolve())
    })
  })
}

export default Map
