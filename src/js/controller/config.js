export default [
  {
    state: 'home',
    conf: {
      url: "/",
      views: {
        "header": { 
          template: require("html!./../controller/header/templates/header.html"),
          controller: require('./header/headerController.js')
        },
        // "footer": { 
        //   template: require("html!./../controller/footer/templates/layout.html"),
        //   controller: require('./footer/footerController.js')
        // },
        "content@": { 
          template: require("html!./../controller/home/templates/home.html"),
          controller: require('./home/homeController.js')
        },
      }
    }
  },
  {
    state: "home.config",
    conf: {
      url: 'config',
      views: {
        "content@": {
          template: require("html!./../controller/config/templates/config.html"),
          controller: require('./config/configController.js')
        }
      }
    }
  },
  {
    state: "home.browse",
    conf: {
      url: 'browse/:url/:result',
      views: {
        "content@": {
          template: require("html!./../controller/browse/templates/layout.html"),
          controller: require('./browse/browseController.js')
        }
      }
    }
  }
]