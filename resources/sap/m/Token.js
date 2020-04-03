/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['./library','sap/ui/core/Control','./Tokenizer','sap/ui/core/library','sap/ui/core/Icon','./TokenRenderer','sap/ui/core/InvisibleText','sap/ui/events/KeyCodes','sap/ui/core/theming/Parameters','sap/ui/core/Core'],function(l,C,T,c,I,a,b,K,P,d){"use strict";var e=c.TextDirection;var f=C.extend("sap.m.Token",{metadata:{library:"sap.m",properties:{selected:{type:"boolean",group:"Misc",defaultValue:false},key:{type:"string",group:"Misc",defaultValue:""},text:{type:"string",group:"Misc",defaultValue:""},editable:{type:"boolean",group:"Misc",defaultValue:true},textDirection:{type:"sap.ui.core.TextDirection",group:"Appearance",defaultValue:e.Inherit},editableParent:{type:"boolean",group:"Behavior",defaultValue:true,visibility:"hidden"}},aggregations:{deleteIcon:{type:"sap.ui.core.Icon",multiple:false,visibility:"hidden"}},associations:{ariaDescribedBy:{type:"sap.ui.core.Control",multiple:true,singularName:"ariaDescribedBy"},ariaLabelledBy:{type:"sap.ui.core.Control",multiple:true,singularName:"ariaLabelledBy"}},events:{"delete":{},press:{},select:{},deselect:{}}}});f.prototype.init=function(){var t=this,s=P.get("_sap_m_Token_Sys_Cancel_Icon")==="true",S=s?"sap-icon://sys-cancel":"sap-icon://decline";this._deleteIcon=new I({id:t.getId()+"-icon",src:S,noTabStop:true,press:this._tokenIconPress.bind(this)});this._deleteIcon.addStyleClass("sapMTokenIcon");this.setAggregation("deleteIcon",this._deleteIcon);this._deleteIcon.setUseIconTooltip(false);};f.prototype.ontouchstart=function(E){if(E.target.id===this.getId()+"-icon"){E.preventDefault();}};f.prototype._getTooltip=function(o,E){var t=o.getTooltip_AsString(),D=d.getLibraryResourceBundle("sap.m").getText("TOKEN_ARIA_DELETABLE");if(E&&!t){return D;}return t;};f.prototype._onTokenPress=function(E){var s=this.getSelected(),g=E.ctrlKey||E.metaKey,S=E.shiftKey,n=true,p;if(g||(E.which===K.SPACE)){n=!s;}this.setSelected(n);this.firePress();if(s!=n){if(n){this.fireSelect();}else{this.fireDeselect();}}p=this.getParent();if(p instanceof T){p._onTokenSelect(this,g,S);}if(this.getSelected()){this.focus();}};f.prototype._tokenIconPress=function(E){var p=this.getParent();if(!p.getEnabled()){return;}this.fireDelete({token:this});if(p.isA("sap.m.Tokenizer")){p._onTokenDelete(this);}E.preventDefault();};f.prototype._changeSelection=function(s){if(this.getSelected()==s){return;}this.setSelected(s);if(s){this.fireSelect();}else{this.fireDeselect();}};f.prototype.ontap=function(E){if(E.target.id==this._deleteIcon.getId()){E.setMark("tokenDeletePress",true);return;}this._onTokenPress(E);};f.prototype.onsapfocusleave=function(E){if(this.getParent()instanceof T){return;}this.setSelected(false);};f.prototype.onsapbackspace=function(E){this._deleteToken(E);};f.prototype.onsapdelete=function(E){this._deleteToken(E);};f.prototype._deleteToken=function(E){if(this.getParent()instanceof T){return;}if(this.getEditable()){this.fireDelete({token:this});}E.preventDefault();};f.prototype.onsapspace=function(E){this._onTokenPress(E);if(E){E.preventDefault();E.stopPropagation();}};f.prototype.onkeydown=function(E){if((E.ctrlKey||E.metaKey)&&E.which===K.SPACE){this.onsapspace(E);E.preventDefault();}};return f;});
