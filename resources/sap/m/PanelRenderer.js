/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/m/library","sap/ui/Device"],function(l,D){"use strict";var T=l.ToolbarDesign;var P={apiVersion:2};P.render=function(r,c){this.startPanel(r,c);this.renderHeader(r,c);this.renderContent(r,c);this.endPanel(r);};P.startPanel=function(r,c){r.openStart("div",c);r.class("sapMPanel");r.style("width",c.getWidth());r.style("height",c.getHeight());r.accessibilityState(c,{role:c.getAccessibleRole().toLowerCase(),labelledby:c._getLabellingElementId()});r.openEnd();};P.renderHeader=function(r,c){var i=c.getExpandable(),I=c.getExpanded(),h=c.getHeaderToolbar(),H;if(i){r.openStart("header");if(h){H="sapMPanelWrappingDivTb";}else{H="sapMPanelWrappingDiv";}r.class(H);if(I){r.class(H+"Expanded");}r.openEnd();var b=c._getButton();c._toggleButtonIcon(I);r.renderControl(b);}var s=c.getHeaderText();if(h){h.setDesign(T.Transparent,true);h.addStyleClass("sapMPanelHeaderTB");r.renderControl(h);}else if(s||i){r.openStart("h2",c.getId()+"-header");r.class("sapMPanelHdr");r.openEnd();r.text(s);r.close("h2");}if(i){r.close("header");}var o=c.getInfoToolbar();if(o){o.setDesign(T.Info,true);o.addStyleClass("sapMPanelInfoTB");if(i){r.openStart("div");r.class("sapMPanelExpandablePart");r.openEnd();r.renderControl(o);r.close("div");}else{r.renderControl(o);}}};P.renderContent=function(r,c){this.startContent(r,c);this.renderChildren(r,c.getContent());this.endContent(r);};P.startContent=function(r,c){r.openStart("div",c.getId()+"-content");r.class("sapMPanelContent");r.class("sapMPanelBG"+c.getBackgroundDesign());if(c.getExpandable()){r.class("sapMPanelExpandablePart");}if(D.browser.firefox){r.attr('tabindex','-1');}r.openEnd();};P.renderChildren=function(r,c){c.forEach(r.renderControl,r);};P.endContent=function(r){r.close("div");};P.endPanel=function(r){r.close("div");};return P;},true);
