/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global'],function(q){'use strict';var _=false;function g(v){if(v){if(q.isArray(v)){return q.sap.escapeHTML(v.join(', '));}else{return q.sap.escapeHTML(v);}}else{return'';}}function r(f,h,j,l){var m='';var n='';var o=1;var t=0;for(var p in h){var s=h[p];t+=s.length;var u=s[0];n+='<tr id="'+j+'_rule_'+o+'" >';n+='<td>';n+='<div class="expandable-control collapsed-content" data-expandableElement="'+j+'_rule_'+o+'_content">';n+='<div class="expandable-title">'+o+'. '+g(u.name)+' <span class="rule-issue-number">('+s.length+' issues)</span></div></div>';n+='<div class="sapUiIssueGroupContent" id="'+j+'_rule_'+o+'_content">';n+='<div><span class="sapUiSupportLabel">Description: </span>'+g(u.description)+'</div>';n+='<div><span class="sapUiSupportLabel">Min version: </span>'+g(u.minVersion)+'</div>';n+='<div><span class="sapUiSupportLabel">Async: </span>'+g(u.async.toString())+'</div>';n+='<div><span class="sapUiSupportLabel">Resolution: </span>'+g(u.resolution)+'</div>';n+='<div>';if(u.resolutionUrls){for(var k=0;k<u.resolutionUrls.length;k++){n+='<div><a href="'+g(u.resolutionUrls[k].href)+'" target="_blank">'+g(u.resolutionUrls[k].text)+'</a></div>';}}n+='</div>';n+='<table class="sapUiTable"><tr><th></th><th>Element Id</th><th>Class</th><th>Status</th><th>Details</th></tr>';for(var i=0;i<s.length;i++){n+='<tr class="filterable" data-severity="'+g(s[i].severity)+'"><td>'+(i+1)+'</td><td>'+g(s[i].context.id)+'</td>';n+='<td>'+g(s[i].context.className)+'</td>';n+='<td class="'+g(s[i].severity)+'">'+g(s[i].severity)+'</td>';n+='<td>'+g(s[i].details)+'</td></tr>';}n+='</table>';n+='</div></td>';n+='<td>'+g(u.categories)+'</td>';n+='<td>'+g(u.audiences)+'</td>';n+='</tr>';o++;}var v='collapsed-content';if(l===1){v='expanded-content';}m+='<tr>';m+='<td colspan="100" class="expandable-control '+v+'" data-expandableElement="'+j+'" data-groupName="'+f+'" data-groupNumber="'+l+'">';m+='<span class="sapUiSupportLabel expandable-title">'+l+'. '+f+' ('+(o-1)+' rules, '+t+' issues)</span>';m+='</td></tr><tbody id="'+j+'">';m+=n;m+='</tbody>';return m;}function a(f){var h='';var i=1;if(!f){return h;}try{h+='<table class="sapUiTable"><tr><th>Name</th><th>Categories</th><th>Audiences</th></tr>';for(var j in f){h+=r(j,f[j],'group'+i,i);i++;}h+='</table>';}catch(k){q.sap.log.warning('There was a problem extracting issues info.');h='';}return h;}function b(s,f,i){if(!f){return'';}var h=i?'filter-active':'';return'<div data-severity="'+s+'" class="filter '+h+' '+s+'">'+s+'('+f+')</div>'+' | ';}function c(f){var h='',s={},j,i,t=0,k=[],l={},m={},n={};if(!f){return h;}try{for(n in f){l=f[n];for(m in l){k=l[m];for(i=0;i<k.length;i++){j=k[i].severity;if(s[j]){s[j]++;}else{s[j]=1;}t++;}}}h+=b('Total',t,true);h+=b('High',s['High'],false);h+=b('Medium',s['Medium'],false);h+=b('Low',s['Low'],false);}catch(o){q.sap.log.warning('There was a problem creating severity filters.');h='';}return h;}function d(i,f){var h='';if(f){h+='<div class="filters">'+c(i)+'<div>\n';}h+='<div>'+a(i)+'</div>';return'<div>'+h+'</div>';}function e(i){if(!q("#qunit")||!i){return;}var f=q(this.render(i));q("#qunit").append(f);if(!_){var s=[q.sap.getResourcePath('sap/ui/support/supportRules/report/resources/styles.css'),q.sap.getResourcePath('sap/ui/support/supportRules/report/resources/collapseExpand.css'),q.sap.getResourcePath('sap/ui/support/supportRules/report/resources/filter.css')];var h=q.sap.getResourcePath('sap/ui/support/supportRules/report/resources/collapseExpand.js');var j=q.sap.getResourcePath('sap/ui/support/supportRules/report/resources/filter.js');q.each(s,function(k,v){q('<link>').appendTo('head').attr({type:'text/css',rel:'stylesheet',href:v});});q.getScript(h,function(){window.sapUiSupportReport.collapseExpand.init();});q.getScript(j,function(){window.sapUiSupportReport.filter.init();});_=true;}else{window.sapUiSupportReport.collapseExpand.init();window.sapUiSupportReport.filter.init();}}return{render:d,renderIssuesForOPA:e};},true);