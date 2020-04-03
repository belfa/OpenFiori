/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['sap/ui/thirdparty/jquery','./Core','./Component','sap/base/Log','sap/base/util/ObjectPath',"sap/base/util/isEmptyObject"],function(q,C,a,L,O,i){"use strict";var b="sap.ui.viewReplacements",c="sap.ui.viewExtensions",d="sap.ui.viewModifications",e="sap.ui.controllerExtensions",f="sap.ui.controllerReplacements";var m={};function g(t,o,j){var s=o&&typeof o==="string"?o:(o&&a.getOwnerIdFor(o));if(s){var k=a.get(s);var l=k&&k.getMetadata().getComponentName();var n=m[l+"::"+s];if(n&&n[t]&&j(n[t])){return false;}else{n=m[l];if(n&&n[t]&&j(n[t])){return false;}}}else{q.each(m,function(l,n){if(n&&n[t]&&j(n[t])){return false;}});}}var h={log:function(){if(window.console){window.console.log(m);}},activateForComponent:function(s){L.info("CustomizingConfiguration: activateForComponent('"+s+"')");var F=s+".Component";sap.ui.requireSync(F.replace(/\./g,"/"));var o=O.get(F).getMetadata().getCustomizing();m[s]=o;L.debug("CustomizingConfiguration: customizing configuration for component '"+s+"' loaded: "+JSON.stringify(o));},deactivateForComponent:function(s){if(m[s]){L.info("CustomizingConfiguration: deactivateForComponent('"+s+"')");delete m[s];}},activateForComponentInstance:function(o){L.info("CustomizingConfiguration: activateForComponentInstance('"+o.getId()+"')");var s=o.getMetadata().getComponentName(),k=s+"::"+o.getId(),j=o.getManifest()["sap.ui5"]&&o.getManifest()["sap.ui5"]["extends"]&&o.getManifest()["sap.ui5"]["extends"]["extensions"];m[k]=j;L.debug("CustomizingConfiguration: customizing configuration for component '"+k+"' loaded: "+JSON.stringify(j));},deactivateForComponentInstance:function(o){var s=o.getMetadata().getComponentName(),k=s+"::"+o.getId();if(m[k]){L.info("CustomizingConfiguration: deactivateForComponent('"+k+"')");delete m[k];}},getViewReplacement:function(v,o){var r;g(b,o,function(j){r=j[v];return!!r;});return r;},getViewExtension:function(v,E,o){var r;g(c,o,function(j){r=j[v]&&j[v][E];return!!r;});return r;},getControllerExtension:function(s,o){var r;g(e,o,function(j){r=j[s];return!!r;});return r;},getControllerReplacement:function(s,o){var r;g(f,o,function(j){r=j[s];return!!r;});return r;},getCustomProperties:function(v,s,o){var S;g(d,o,function(j){var k=j[v]&&j[v][s];var u={};var V=false;if(k){q.each(k,function(n,l){if(n==="visible"){V=true;u[n]=l;L.info("Customizing: custom value for property '"+n+"' of control '"+s+"' in View '"+v+"' applied: "+l);}else{L.warning("Customizing: custom value for property '"+n+"' of control '"+s+"' in View '"+v+"' ignored: only the 'visible' property can be customized.");}});if(V){S=S||{};q.extend(S,u);}}});return S;},hasCustomProperties:function(v,o){var s={};g(d,o,function(j){if(!!j[v]){s=j[v];}});return!i(s);}};if(sap.ui.getCore().getConfiguration().getDisableCustomizing()){L.info("CustomizingConfiguration: disabling Customizing now");q.each(h,function(n,A){if(typeof A==="function"){h[n]=function(){};}});}return h;},true);
