!function(){function c(){if("http://localhost:3000"!=a&&"https://localhost:3000"!=a&&"http://10.0.2.2:3000"!=a&&"http://localhost:8888"!=a&&"samoanhighlandretreat.com"!=location.host)return!1;for(var b=0;b<arguments.length;b++)console.log(arguments[b])}function d(a,b,c){a.addEventListener?a.addEventListener(b,c,!1):a.attachEvent&&a.attachEvent("on"+b,c)}function e(a,b,d,e,f,g){var h=a;c("Match:",a);var i=h.match(/powr-[^\s\]]*/i),j=h.match(/id="[^"]*"/i);null==j&&(j=h.match(/id='[^']*'/i)),null==j&&(j=h.match(/id=[^\]]*/i),null!=j&&(j=j[0].replace("id=",'id="')+'"')),null==j&&(j=h.match(/label="[^"]*"/i)),null==j&&(j=h.match(/label='[^']*'/i)),null==j&&(j="");var k='<div class="'+i+'" '+j+"></div>";return c("Result is:"+k),k}function f(a){var b={},c=a.search("\\?");a=a.substr(c+1);for(var d=a.split("&"),e=0;e<d.length;e++){var f=d[e].split("=");if("undefined"==typeof b[f[0]])b[f[0]]=f[1];else if("string"==typeof b[f[0]]){var g=[b[f[0]],f[1]];b[f[0]]=g}else b[f[0]].push(f[1])}return b}function g(){var a=navigator.userAgent.toLowerCase();return a.indexOf("msie")!=-1&&parseInt(a.split("msie")[1])}function h(a){for(var b=!1,c=a;c&&c!==document;c=c.parentNode)if(void 0!=c.classList&&c.classList.contains("powr-ignore")){b=!0;break}return b}function i(){try{return window.top.location.href}catch(a){return c("Couldn't get page url:",a),""}}function j(a,b,d){function e(){var e={message:"loaded",data:{iframe_index:b,parent_window_width:window.innerWidth||document.documentElement.clientWidth||document.getElementsByTagName("body")[0].clientWidth,parent_window_height:window.innerHeight||document.documentElement.clientHeight||document.getElementsByTagName("body")[0].clientHeight}};c("POWr.js sending load message to url"+d+"; iframe:",a),a.contentWindow.postMessage(JSON.stringify(e),d)}a.addEventListener?a.addEventListener("load",e):a.attachEvent("onload",e)}function k(a,b){var d=new XMLHttpRequest;d.open("GET",b,!0),d.withCredentials=!0,d.onreadystatechange=function(){if(c("Async ready state change!",d),d.readyState==XMLHttpRequest.DONE||4==d.readyState)if(200==d.status){c("POWr App Data:",d.responseText);var b=JSON.parse(d.responseText);b.iframe_index=a,POWR_RECEIVERS[a].data=b;var e=setInterval(function(){POWR_RECEIVERS[a].loaded&&(POWR_RECEIVERS[a].receiver.postMessage(JSON.stringify({message:"loadView",data:b}),POWR_RECEIVERS[a].url),clearInterval(e))},10)}else c("Error receiving POWr App Data")},d.send()}function l(a){try{var b=JSON.parse(a.data);if("viewLoaded"==b.message){c("Settings received view loaded");var d=b.data.iframe_index;POWR_RECEIVERS[d].loaded=!0}else if("updateSize"==b.message)if("undefined"!=typeof gadgets&&"undefined"!=typeof gadgets.window&&"undefined"!=typeof gadgets.window.adjustHeight)gadgets.window.adjustHeight(b.data.height);else{var d=b.data.iframe_index,e=document.querySelectorAll('[powrindex="'+d+'"]')[0];if(e.height=b.data.height+"px",e.style.height=b.data.height+"px",void 0!=b.data.postCss)for(var f in b.data.postCss)e.style[f]=b.data.postCss[f];c("Updating size of el",e)}else if("loadMe"==b.message){c("Settings received loadMe request");var d=b.data.iframe_index;void 0!=POWR_RECEIVERS[d]&&void 0!=POWR_RECEIVERS[d].data&&POWR_RECEIVERS[d].receiver.postMessage(JSON.stringify({message:"loadView",data:POWR_RECEIVERS[d].data}),POWR_RECEIVERS[d].url)}}catch(a){}}function p(a){if(80==a.keyCode&&(o=!0,setTimeout(function(){o=!1},2e3)),38==a.keyCode&&o){for(var b=0;b<POWR_RECEIVERS.length;b++)POWR_RECEIVERS[b].receiver.postMessage(JSON.stringify({message:"showEdit"}),POWR_RECEIVERS[b].url);return a.preventDefault(),!1}if(40==a.keyCode&&o){for(var b=0;b<POWR_RECEIVERS.length;b++)POWR_RECEIVERS[b].receiver.postMessage(JSON.stringify({message:"hideEdit"}),POWR_RECEIVERS[b].url);return a.preventDefault(),!1}}var a="https://www.powr.io",b="https://www.powr.io";if("undefined"!=typeof loadPowr)return void c("Powr already loaded");window.addEventListener?window.addEventListener("message",l):window.attachEvent("onmessage",l);var m=0;POWR_RECEIVERS=[],loadPowr=function(){for(var n=null,o=null,p=null,q=!1,r=document.querySelectorAll("script"),s=0;s<r.length;s++){var t=r[s],u=t.getAttribute("src");if(void 0!=u){var v=t.getAttribute("powr-token"),w=t.getAttribute("external-type"),x=t.getAttribute("template-powr-token"),y=t.getAttribute("powr-load");if(void 0==y&&(y="async"),g()&&g()<=9&&(y="sync"),q=t.getAttribute("demo-mode"),void 0!=v?n=v:u.search("powr-token")>-1&&(p=f(u),void 0!==p["powr-token"]&&p["powr-token"].length>0&&(n=p["powr-token"])),void 0!=w?o=w:u.search("external-type")>-1&&(p=f(u),void 0!=p["external-type"]&&p["external-type"].length>0&&(o=p["external-type"])),void 0!=n||void 0!=o)break}}if(null==n||0==n.length)try{n=window.top.location.host}catch(a){n=""}var z=!0;if(z){for(var A=/\[powr-[^\]]*\]/gi,B=/\[powr-[^\s\]]*/gi,C=document.querySelectorAll("a"),s=0;s<C.length;s++){var D=C[s];if(!h(D)){var E=D.previousSibling,F=D.nextSibling;if(E&&F&&D.getAttribute("href")&&D.getAttribute("href").search("tel")>-1&&3==E.nodeType&&3==F.nodeType&&E.nodeValue.match(B)&&F.nodeValue.search("]")>-1){var G=D.innerHTML,H=E.nodeValue.match(/powr-[^\s\]]*/gi)[0],I=document.createElement("div");I.innerHTML='<div class="'+H+'" label="'+G+'"></div>',E.parentNode.removeChild(E),F.parentNode.removeChild(F),D.parentNode.replaceChild(I,D)}}}for(var C=document.querySelectorAll("body, body *"),s=0;s<C.length;s++){var D=C[s],J=D.childNodes;if(!h(D))for(var K=0;K<J.length;K++){var L=J[K];if(3==L.nodeType){var M=L.nodeValue,N=M.replace(A,e);if(N!=M){var I=document.createElement("div");I.innerHTML=N,D.replaceChild(I,L)}}}}}if(0==document.querySelectorAll("#powrIframeLoader").length){var O=document.createElement("div"),P=document.getElementsByTagName("base")[0]||document.getElementsByTagName("script")[0];O.id="powrIframeLoader",O.innerHTML="&shy;<style> .powrLoaded iframe { visibility: hidden; } </style>",P.parentNode.insertBefore(O,P)}for(var Q=document.querySelectorAll("[class*=powr-]"),R=!1,s=0;s<Q.length;s++){var S=Q[s];if(!(h(S)||S.className.search("powrLoaded")>-1)){S.className+=" powrLoaded";for(var T=S.className.split(/\s+/),s=0;s<T.length;s++)if(0===T[s].toLowerCase().search("powr-")){var U=T[s].toLowerCase().replace("powr-","");break}if("undefined"==typeof U)return;"popup"==U&&(R=!0);var V=S.getAttribute("label");void 0==V&&(V=""),void 0==x&&(x="");var W=S.getAttribute("id");void 0==W&&(W="");var X=S.getAttribute("view-mode");c("Unique label is "+W);var Y="true"==q||"true"==S.getAttribute("demo-mode"),Z=a+"/plugins/"+U+"/cached_view?load="+y+"&index="+m+"&unique_label="+W+"&powr_token="+n+"&user_label="+encodeURIComponent(V)+"&demo_mode="+Y,$=b+"/plugins/"+U+"/view.json?unique_label="+W+"&powr_token="+n+"&user_label="+encodeURIComponent(V)+"&demo_mode="+Y;void 0!=o&&($+="&external_type="+o,Z+="&external_type="+o),void 0!=x&&($+="&template_powr_token="+x,Z+="&template_powr_token="+x),void 0!=X&&($+="&view_mode="+X,Z+="&view_mode="+X),c("page url IS "+i()),i()&&($+="&url="+encodeURIComponent(i())),$+="&request_url="+encodeURIComponent(document.location.protocol+"//"+document.location.host);var _=document.createElement("iframe");_.src=Z,_.setAttribute("powrindex",m),_.width="100%",_.height="100%",_.frameBorder="0",_.style.visibility="visible",_.setAttribute("webkitallowfullscreen",""),_.setAttribute("mozallowfullscreen",""),_.setAttribute("allowfullscreen","");try{/iPhone|iPod|iPad/.test(navigator.userAgent)&&(_.style.minWidth="100%",_.style.width="1px",_.setAttribute("scrolling","no"))}catch(a){console.log("Err: "+a)}j(_,m,Z),S.appendChild(_);var aa=_.contentWindow;POWR_RECEIVERS.push({receiver:aa,url:Z}),"async"==y&&k(m,$),m++}}R&&(d(document,"click",function(a){var a=a?a:window.event,b=a.relatedTarget||a.toElement||a.target;if(b&&b.classList.contains("trigger-popup"))for(var c=0;c<POWR_RECEIVERS.length;c++)POWR_RECEIVERS[c].receiver.postMessage(JSON.stringify({message:"triggerPowrPopupClick"}),POWR_RECEIVERS[c].url)}),d(document,"mouseout",function(a){var a=a?a:window.event;if(a.clientY<5)for(var b=0;b<POWR_RECEIVERS.length;b++)POWR_RECEIVERS[b].receiver.postMessage(JSON.stringify({message:"exitDocument"}),POWR_RECEIVERS[b].url)}))};for(var n=0;n<10;n++)setTimeout(function(){loadPowr()},2e3*n);d(window,"load",loadPowr);var o=!1;d(window,"keydown",p)}();
