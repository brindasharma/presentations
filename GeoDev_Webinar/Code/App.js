
import React, { useRef, useEffect } from "react";
import Portal from "@arcgis/core/portal/Portal"
import Button from 'calcite-react/Button';
// import { CalciteH1 } from 'calcite-react/Elements';
//import Home from './Home';
import SubNav,{SubNavTitle,SubNavList,SubNavLink,SubNavActions} from 'calcite-react/SubNav';
import List,{ListItem,ListHeader} from 'calcite-react/List';
import BasemapGallery from '@arcgis/core/widgets/BasemapGallery';
import Legend from '@arcgis/core/widgets/Legend';
import Search from '@arcgis/core/widgets/Search'
import Expand from '@arcgis/core/widgets/Expand';
import MapView from "@arcgis/core/views/MapView";
import WebMap from "@arcgis/core/WebMap";
import LayerList from '@arcgis/core/widgets/LayerList';
// import Credential from '@arcgis/core/identity/Credential';
import IdentityManager from '@arcgis/core/identity/IdentityManager';
import OAuthInfo from '@arcgis/core/identity/OAuthInfo';
import PortalQueryParams from '@arcgis/core/portal/PortalQueryParams'

import "./App.css"; 
// class App extends Component {
//   render() {
//     return (
//       <div>
//         <CalciteH1>My App uses Calcite headers and buttons!</CalciteH1>
//         <Button>A Calcite Button!</Button>
//       </div>
//     );
//   }

  function App() {
    
    const mapDiv = useRef(null);

    useEffect(() => {
      if (mapDiv.current) {
        /**
         * Initialize application
         */
        const webmap = new WebMap({
          portalItem: {
            id: "1554859afa204fbfbf9ffd15ebe11086"
            //id: "fd01a33a52fe4043ada6698a4fec619d"
            //id: "8c0193562c4844c6a4fbcb8f9118b319"
          },
          zoom:12
        });

        const view = new MapView({
          container: mapDiv.current,
          map: webmap
        });

        const legend = new Legend({
          view:view
        })

        view.ui.add(legend,"bottom-left")

        var searchWidget = new Search({
          view: view

      });

        const basemapgallery = new BasemapGallery({
          view,
          expanded: false
        });

        // // Add the widget to the top-right corner of the view
        // view.ui.add(basemapgallery, "top-right");
        view.ui.add(searchWidget,"top-right")


        const expand = new Expand({
          view,
          content: basemapgallery,
          expanded: false
        });

        // Add the widget to the top-right corner of the view
        view.ui.add(expand, "top-right");

        //implementing Oauth
        const layerlist = new LayerList({
          view : view
        })

        view.ui.add(layerlist, "bottom-right");

        var OauthInfo = new OAuthInfo({
          appId: "9cnVzWU2qVLv17gT",
          portalUrl: "https://www.arcgis.com",
          popup: false,
          // redirectUri: 'http://localhost:3000/auth',
          //popupCallbackUrl: "./oauth-callback.html"
          

          //popupCallbackUrl: "http://localhost:3000"
        

        });
    

        IdentityManager.registerOAuthInfos([OauthInfo]);


        // portal
        const portal = new Portal()
        portal.authMode= "immediate";
        portal.load().then(function(){
          console.log(portal);

          portal.user.fetchItems().then(function(fetchItemResult){
            console.log("next start index:", fetchItemResult.nextStart);
            fetchItemResult.items.forEach(function(item){
              console.log("portal item title:",item.title);
              
              // return <h2>{this.props.item.title}</h2>
            })
          });

          // const queryParams = new PortalQueryParams({
          //   query: "owner:" + portal.user.username,
          //   sortField: "numViews",
          //   sortOrder: "desc",
          //   num: 20
          // });
          // portal.queryItems(queryParams).then(createGallery);

        });


        // bonus - how many bookmarks in the webmap?
        webmap.when(() => {
          if (webmap.bookmarks && webmap.bookmarks.length) {
            console.log("Bookmarks: ", webmap.bookmarks.length);
          } else {
            console.log("No bookmarks in this webmap.");
          }
        });
      }
    }, []);

    
    function signout (){
      IdentityManager.destroyCredentials();
      window.location.reload();
      
    };
      return(
      <>
        <div className="navbar"></div>
          <SubNav>
            <SubNavTitle>Extend Demo Application</SubNavTitle>
            <SubNavList>
              <Button onClick={signout}>Sign Out</Button>
            </SubNavList>
            
          </SubNav>
        <div className="mapDiv" ref={mapDiv}>
        {/* <List>
          <ListHeader>Content in ArcGIS</ListHeader>
        </List> */}
        </div>
        
      </>

      );


    
  }

export default App;

/* <div>
            <div className="header" >
        <TopNav>Extend Demo</TopNav>
        <Button>Log Out</Button>
      </div> */