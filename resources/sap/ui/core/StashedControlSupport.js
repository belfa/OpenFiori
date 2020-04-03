/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['sap/ui/core/Element',"sap/base/Log","sap/base/assert"],function(E,L,a){"use strict";var S={},s={},b=E.extend("sap.ui.core._StashedControl",{constructor:function(i,c){E.apply(this,arguments);c.stashed=true;Object.assign(this,c);this._stash(c.sParentId,c.sParentAggregationName);return this;},metadata:{specialSettings:{stashed:{type:'boolean',visibility:'hidden'},sParentId:{type:'string',visibility:'hidden'},sParentAggregationName:{type:'string',visibility:'hidden'},fnCreate:{type:'function',visibility:'hidden'}}}});b.prototype.setParent=function(){L.error("Cannot set parent on a StashedControl",this.getId());};b.prototype.clone=function(){L.error("Cannot clone a StashedControl",this.getId());};b.prototype.destroy=function(){delete s[this.getId()];E.prototype.destroy.apply(this,arguments);};m(b,true);S.mixInto=function(c,d){a(!c.getMetadata().hasProperty("stashed"),"StashedControlSupport: fnClass already has property 'stashed', sideeffects possible",c.getMetadata().getName());a(!c.prototype.setStashed,"StashedControlSupport: fnClass already has method 'setStashed', sideeffects possible",c.getMetadata().getName());m(c,d);};function m(c,d){c.getMetadata().addSpecialSetting("stashed",{type:"boolean",defaultValue:!!d});c.prototype.setStashed=function(e){if(this.stashed===true&&!e){if(this.sParentId){var C=u(this,sap.ui.getCore().byId(this.sParentId));C.stashed=false;return;}}else if(e){L.warning("Cannot re-stash a control",this.getId());}};c.prototype.getStashed=function(){return this.stashed;};var D=c.prototype.destroy;c.prototype.destroy=function(){delete s[this.getId()];D.apply(this,arguments);};c.prototype._stash=function(p,P){this.sParentId=p;this.sParentAggregationName=P;s[this.getId()]=this;};}function u(C,p){if(C instanceof b){var d,e,o,f=C.fnCreate,P=C.sParentAggregationName;C.destroy();e=sap.ui.require("sap/ui/core/Component");o=e&&e.getOwnerComponentFor(p);if(o){d=o.runAsOwner(f);}else{d=f();}d.forEach(function(c){p.getMetadata().getAggregation(P).add(p,c);});}delete s[C.getId()];return C;}function g(A,p){var c=[];for(var i in s){var I=A?s[i]:s[i].getId();if(!p||s[i].sParentId===p){c.push(I);}}return c;}S.getStashedControlIds=function(p){return g(false,p);};S.getStashedControls=function(p){return g(true,p);};S.createStashedControl=function(i,c){if(!c.sParentId){L.error("Cannot create a StashedControl without a parent with stable ID.","sap.ui.core.StashedControlSupport");}else{return new b(i,c);}};return S;});
