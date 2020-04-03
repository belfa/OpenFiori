/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/thirdparty/jquery","sap/ui/base/ManagedObject","sap/ui/fl/Layer","sap/ui/fl/Utils","sap/ui/fl/LayerUtils","sap/ui/fl/registry/Settings","sap/base/Log","sap/ui/fl/descriptorRelated/api/DescriptorInlineChangeFactory","sap/base/util/includes"],function(q,M,L,U,a,S,b,D,i){"use strict";var C=M.extend("sap.ui.fl.Change",{constructor:function(f){M.apply(this);if(!q.isPlainObject(f)){b.error("Constructor : sap.ui.fl.Change : oFile is not defined");}this._oDefinition=f;this._sRequest='';this._bUserDependent=(f.layer===L.USER);this._vRevertData=null;this._aUndoOperations=null;this.setState(C.states.NEW);this.setModuleName(f.moduleName);this.setInitialApplyState();this._oChangeProcessingPromises={};},metadata:{properties:{state:{type:"string"},moduleName:{type:"string"},applyState:{type:"int"}}}});C.states={NEW:"NEW",PERSISTED:"NONE",DELETED:"DELETE",DIRTY:"UPDATE"};C.applyState={INITIAL:0,APPLYING:1,APPLY_FINISHED:2,REVERTING:3,REVERT_FINISHED:4};C.operations={APPLY:0,REVERT:1};C.prototype.setState=function(s){if(this._isValidState(s)){this.setProperty("state",s);}return this;};C.prototype.setQueuedForRevert=function(){this._aQueuedProcesses.unshift(C.operations.REVERT);};C.prototype.isQueuedForRevert=function(){return this._aQueuedProcesses.indexOf(C.operations.REVERT)>-1;};C.prototype.setQueuedForApply=function(){this._aQueuedProcesses.unshift(C.operations.APPLY);};C.prototype.isQueuedForApply=function(){return this._aQueuedProcesses.indexOf(C.operations.APPLY)>-1;};C.prototype.setInitialApplyState=function(){this._aQueuedProcesses=[];delete this._ignoreOnce;this.setApplyState(C.applyState.INITIAL);};C.prototype.startApplying=function(){this.setApplyState(C.applyState.APPLYING);};C.prototype.markFinished=function(r){this._aQueuedProcesses.pop();this._resolveChangeProcessingPromiseWithError(C.operations.APPLY,r);this.setApplyState(C.applyState.APPLY_FINISHED);};C.prototype.startReverting=function(){this.setApplyState(C.applyState.REVERTING);};C.prototype.markRevertFinished=function(r){this._aQueuedProcesses.pop();this._resolveChangeProcessingPromiseWithError(C.operations.REVERT,r);this.setApplyState(C.applyState.REVERT_FINISHED);};C.prototype.hasApplyProcessStarted=function(){return this.getApplyState()===C.applyState.APPLYING;};C.prototype.isApplyProcessFinished=function(){return this.getApplyState()===C.applyState.APPLY_FINISHED;};C.prototype.hasRevertProcessStarted=function(){return this.getApplyState()===C.applyState.REVERTING;};C.prototype.isRevertProcessFinished=function(){return this.getApplyState()===C.applyState.REVERT_FINISHED;};C.prototype.isCurrentProcessFinished=function(){return this._aQueuedProcesses.length===0;};C.prototype.addChangeProcessingPromise=function(k){if(!this._oChangeProcessingPromises[k]){this._oChangeProcessingPromises[k]={};this._oChangeProcessingPromises[k].promise=new Promise(function(r){this._oChangeProcessingPromises[k].resolveFunction={resolve:r};}.bind(this));}return this._oChangeProcessingPromises[k].promise;};C.prototype.addChangeProcessingPromises=function(){var r=[];this._aQueuedProcesses.forEach(function(p){r.push(this.addChangeProcessingPromise(p));},this);return r;};C.prototype.addPromiseForApplyProcessing=function(){return this.addChangeProcessingPromise(C.operations.APPLY);};C.prototype._resolveChangeProcessingPromiseWithError=function(k,r){if(this._oChangeProcessingPromises[k]){this._oChangeProcessingPromises[k].resolveFunction.resolve(r);delete this._oChangeProcessingPromises[k];}};C.prototype._isValidState=function(s){var c=false;Object.keys(C.states).some(function(k){if(C.states[k]===s){c=true;}return c;});if(!c){return false;}if((this.getState()===C.states.NEW)&&(s===C.states.DIRTY)){return false;}return true;};C.prototype.isValid=function(){var I=true;if(typeof(this._oDefinition)!=="object"){I=false;}if(!this._oDefinition.fileType){I=false;}if(!this._oDefinition.fileName){I=false;}if(!this._oDefinition.changeType){I=false;}if(!this._oDefinition.layer){I=false;}if(!this._oDefinition.originalLanguage){I=false;}return I;};C.prototype.isVariant=function(){return this._oDefinition.fileType==="variant";};C.prototype.getChangeType=function(){if(this._oDefinition){return this._oDefinition.changeType;}};C.prototype.getFileName=function(){if(this._oDefinition){return this._oDefinition.fileName;}};C.prototype.getFileType=function(){if(this._oDefinition){return this._oDefinition.fileType;}};C.prototype.getOriginalLanguage=function(){if(this._oDefinition&&this._oDefinition.originalLanguage){return this._oDefinition.originalLanguage;}return"";};C.prototype.getPackage=function(){return this._oDefinition.packageName;};C.prototype.getNamespace=function(){return this._oDefinition.namespace;};C.prototype.setNamespace=function(n){this._oDefinition.namespace=n;};C.prototype.getProjectId=function(){return this._oDefinition.projectId;};C.prototype.setProjectId=function(p){this._oDefinition.projectId=p;};C.prototype.getId=function(){return this._oDefinition.fileName;};C.prototype.getContent=function(){return this._oDefinition.content;};C.prototype.setContent=function(c){this._oDefinition.content=c;this.setState(C.states.DIRTY);};C.prototype.getVariantReference=function(){return this._oDefinition.variantReference||"";};C.prototype.setVariantReference=function(v){this._oDefinition.variantReference=v;this.setState(C.states.DIRTY);};C.prototype.getSelector=function(){return this._oDefinition.selector;};C.prototype.getSourceSystem=function(){return this._oDefinition.sourceSystem;};C.prototype.getSourceClient=function(){return this._oDefinition.sourceClient;};C.prototype.getOwnerId=function(){return this._oDefinition.support?this._oDefinition.support.user:"";};C.prototype.getText=function(t){if(typeof(t)!=="string"){b.error("sap.ui.fl.Change.getTexts : sTextId is not defined");}if(this._oDefinition.texts){if(this._oDefinition.texts[t]){return this._oDefinition.texts[t].value;}}return"";};C.prototype.setText=function(t,n){if(typeof(t)!=="string"){b.error("sap.ui.fl.Change.setTexts : sTextId is not defined");return;}if(this._oDefinition.texts){if(this._oDefinition.texts[t]){this._oDefinition.texts[t].value=n;this.setState(C.states.DIRTY);}}};C.prototype.isReadOnly=function(){return this._isReadOnlyDueToLayer()||this._isReadOnlyWhenNotKeyUser()||this.isChangeFromOtherSystem();};C.prototype._isReadOnlyWhenNotKeyUser=function(){if(this.isUserDependent()){return false;}var r=this.getDefinition().reference;if(!r){return true;}var s=S.getInstanceOrUndef();if(!s){return true;}return!s.isKeyUser();};C.prototype.isLabelReadOnly=function(){if(this._isReadOnlyDueToLayer()){return true;}return this._isReadOnlyDueToOriginalLanguage();};C.prototype._isReadOnlyDueToLayer=function(){var c;c=a.getCurrentLayer(this._bUserDependent);return(this._oDefinition.layer!==c);};C.prototype.isChangeFromOtherSystem=function(){var s=this.getSourceSystem();var c=this.getSourceClient();if(!s||!c){return false;}var o=S.getInstanceOrUndef();if(!o){return true;}var d=o.getSystem();var e=o.getClient();if(!d||!e){return false;}return(s!==d||c!==e);};C.prototype._isReadOnlyDueToOriginalLanguage=function(){var c;var o;o=this.getOriginalLanguage();if(!o){return false;}c=U.getCurrentLanguage();return(c!==o);};C.prototype.markForDeletion=function(){this.setState(C.states.DELETED);};C.prototype.setRequest=function(r){if(typeof(r)!=="string"){b.error("sap.ui.fl.Change.setRequest : sRequest is not defined");}this._sRequest=r;};C.prototype.getRequest=function(){return this._sRequest;};C.prototype.getLayer=function(){return this._oDefinition.layer;};C.prototype.getComponent=function(){return this._oDefinition.reference;};C.prototype.setComponent=function(c){this._oDefinition.reference=c;};C.prototype.setValidAppVersions=function(v){this._oDefinition.validAppVersions=v;};C.prototype.getCreation=function(){return this._oDefinition.creation;};C.prototype.isUserDependent=function(){return(this._bUserDependent);};C.prototype.getPendingAction=function(){return this.getState();};C.prototype.getDefinition=function(){return this._oDefinition;};C.prototype.setResponse=function(r){var R=JSON.stringify(r);if(R){this._oDefinition=JSON.parse(R);this.setState(C.states.PERSISTED);}};C.prototype.getFullFileIdentifier=function(){var l=this.getLayer();var n=this.getNamespace();var f=this.getDefinition().fileName;var F=this.getDefinition().fileType;return l+"/"+n+"/"+f+"."+F;};C.prototype.addDependentControl=function(c,A,p,m){if(!c){throw new Error("Parameter vControl is mandatory");}if(!A){throw new Error("Parameter sAlias is mandatory");}if(!p){throw new Error("Parameter mPropertyBag is mandatory");}if(!this._oDefinition.dependentSelector){this._oDefinition.dependentSelector={};}if(this._oDefinition.dependentSelector[A]){throw new Error("Alias '"+A+"' already exists in the change.");}var o=p.modifier;var d=p.appComponent;if(Array.isArray(c)){var s=[];c.forEach(function(e){s.push(o.getSelector(e,d,m));});this._oDefinition.dependentSelector[A]=s;}else{this._oDefinition.dependentSelector[A]=o.getSelector(c,d,m);}delete this._aDependentSelectorList;};C.prototype.getDependentControl=function(A,p){var d=[];var o;if(!A){throw new Error("Parameter sAlias is mandatory");}if(!p){throw new Error("Parameter mPropertyBag is mandatory");}var m=p.modifier;var c=p.appComponent;if(!this._oDefinition.dependentSelector){return undefined;}o=this._oDefinition.dependentSelector[A];if(Array.isArray(o)){o.forEach(function(s){d.push(m.bySelector(s,c,p.view));});return d;}return m.bySelector(o,c,p.view);};C.prototype.getDependentSelectorList=function(){var t=this;var d=[this.getSelector()];if(!this._aDependentSelectorList){if(this._oDefinition.dependentSelector){Object.keys(this._oDefinition.dependentSelector).forEach(function(A){var c=t._oDefinition.dependentSelector[A];if(!Array.isArray(c)){c=[c];}c.forEach(function(o){if(o&&U.indexOfObject(d,o)===-1){d.push(o);}});});}this._aDependentSelectorList=d;}return this._aDependentSelectorList;};C.prototype.getDependentControlSelectorList=function(){var d=this.getDependentSelectorList().concat();if(d.length>0){var s=this.getSelector();var I=U.indexOfObject(d,s);if(I>-1){d.splice(I,1);}}return d;};C.prototype.getRevertData=function(){return this._vRevertData;};C.prototype.hasRevertData=function(){return this._vRevertData!==null;};C.prototype.setRevertData=function(d){this._vRevertData=d;};C.prototype.resetRevertData=function(){this.setRevertData(null);};C.prototype.getUndoOperations=function(){return this._aUndoOperations;};C.prototype.setUndoOperations=function(d){this._aUndoOperations=d;};C.prototype.resetUndoOperations=function(){this.setUndoOperations(null);};C.createInitialFileContent=function(p){if(!p){p={};}var f;if(p.fileType){f=p.fileType;}else{f=p.isVariant?"variant":"change";}var n={fileName:p.id||U.createDefaultFileName(p.changeType),fileType:f,changeType:p.changeType||"",moduleName:p.moduleName||"",reference:p.reference||"",packageName:p.packageName||"",content:p.content||{},selector:p.selector||{id:""},layer:p.layer||a.getCurrentLayer(p.isUserDependent),texts:p.texts||{},namespace:p.namespace||U.createNamespace(p,"changes"),projectId:p.projectId||(p.reference&&p.reference.replace(".Component",""))||"",creation:"",originalLanguage:U.getCurrentLanguage(),support:{generator:p.generator||"Change.createInitialFileContent",service:p.service||"",user:"",sapui5Version:sap.ui.version,sourceChangeFileName:p.support&&p.support.sourceChangeFileName||"",compositeCommand:p.support&&p.support.compositeCommand||""},oDataInformation:p.oDataInformation||{},dependentSelector:p.dependentSelector||{},validAppVersions:p.validAppVersions||{},jsOnly:p.jsOnly||false,variantReference:p.variantReference||"",appDescriptorChange:i(D.getDescriptorChangeTypes(),p.changeType)};return n;};return C;},true);
