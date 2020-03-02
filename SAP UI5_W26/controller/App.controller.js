sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/Text",
	"sap/m/MessageToast",
	"sap/ui/model/json/JSONModel",
	"sap/ui/model/resource/ResourceModel"
], function (Controller, Text, MessageToast, JSONModel) {
	"use strict";

	return Controller.extend("sap.ui.demo.walkthrough.controller.App", {
		onOpenDialog : function () {
			this.getOwnerComponent().openHelloDialog();
		}
	});

});