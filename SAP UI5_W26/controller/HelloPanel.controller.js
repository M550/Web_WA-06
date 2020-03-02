sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/ui/core/Fragment"
],
function (Controller, MessageToast, Fragment) {
    "use strict";
    return Controller.extend("sap.ui.demo.walkthrough.controller.HelloPanel", {
/*onInit: function(){
    var oBox = this.getView().byId("text");
    var oText = new Text({text: "Text example.4 - Item"});
    oBox.addItem(oText);
     // set data model on view
     var oData = {
        recipient : {
           name : "World"
        }
     };
     var oModel = new JSONModel(oData);
     this.getView().setModel(oModel);
  // set i18n model on view
 },*/
onShowHello : function () {
 // read msg from i18n model
 var oBundle = this.getView().getModel("i18n").getResourceBundle();
 var sRecipient = this.getView().getModel().getProperty("/recipient/name");
 var sMsg = oBundle.getText("helloMsg", [sRecipient]);
 // show message
 MessageToast.show(sMsg);
},
onOpenDialog : function () {
   this.getOwnerComponent().openHelloDialog();
  }
    });
});