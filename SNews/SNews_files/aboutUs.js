var AboutUsModel=Backbone.Model.extend({_INFO_ALIAS:"info",_SHOWMORE_ALIAS:"more",initialize:function(){this.set({info_alias:this.get("info_alias")||this._INFO_ALIAS,more_alias:this.get("more_alias")||this._SHOWMORE_ALIAS});var d=this.get("buttons")||{};d.info=true;this.set({buttons:d});var b=this.get("about")||"";this.set({about:b});var e=this.get("title")||"";this.set({title:e});var c=this.get("description")||"";this.set({description:c});var a=this.get("name")||"";this.set({aboutUsName:a});this.set({descriptionTitle:_T("HtmlTextAboutUsDescriptionTitle")});this.set({readMoreTitle:_T("HtmlTextAboutUsReadMore")});this._handleDataList()},getItemForAlias:function(c){switch(c){case this.get("info_alias"):return this;case this.get("more_alias"):return this;default:var b=this.get("list")||[];for(var a=0;a<b.length;a++){var d=b[a];if(d.alias===c){return new Backbone.Model({title:d.title||"",text:d.text||"",icon:d.icon||"",iconBlack:d.iconBlack||""})}}}return null},_handleDataList:function(){var p=this.get("list")||[];for(var l=0;l<p.length;l++){var f=p[l];f.alias=f.alias||(""+(l+1));if(f.title){f.title=Utils.String.translateIfNeed(f.title)}f.data=f.data||{};if(f.dataType==="text"){f.text=f.data.text}else{if(f.dataType==="html"){f.description=f.data.html}else{if(f.dataType==="hours"){var a=f.data.hours;if(f.data.alwaysOpen){f.text=_T("HtmlTextAboutUsItemHoursAlwaysOpen")}else{if(a&&a.length){var g=[_T("_day1s"),_T("_day2s"),_T("_day3s"),_T("_day4s"),_T("_day5s"),_T("_day6s"),_T("_day7s")];var b=_T("_firstDayOfWeek");for(var h=0;h<a.length;h++){var q=$.map(a[h].days,function(k,j){k=(k%7);if(k<b){k+=7}return k});q=q.sort();var c="";for(var e=0;e<q.length;e++){c+=g[(q[e]%7)];for(var o=e+1;(o<q.length)&&(q[o-1]+1===q[o]);o++){}if(o>e+2){c+="-";e=o-2}else{if(e+1<q.length){c+=", "}}}a[h].daysStr=c;var d=(new Date(Utils.TimeDate.toUTCTime(Utils.TimeDate.timeToSeconds(a[h].startHour)))).format("shortTime");var n=(new Date(Utils.TimeDate.toUTCTime(Utils.TimeDate.timeToSeconds(a[h].endHour)))).format("shortTime");a[h].hoursStr=d+" - "+n}}else{f.text=_T("HtmlTextAboutUsItemHoursNoHours")}}}else{if(f.dataType==="list"){var m=f.data.list;if(m&&m.length){f.text=m[0];for(var h=1;h<m.length;h++){f.text=f.text+"\n"+m[h]}}}}}}}this.set({list:p})}}); var aboutUsTemplates={};aboutUsTemplates.aboutUsTemplate=function(obj){var __t,__p="",__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,"")};with(obj||{}){__p+='<div class="scroll_wrapper"><div class="scroller"><div class="ipad_screen_center">';if(typeof(imgUrl)!="undefined"&&imgUrl){__p+='<img class="aboutUs-img" src="'+((__t=(imgUrl))==null?"":__t)+'" />'}__p+='<div class="header"><div class="header-text">';if(aboutUsName){__p+='<div class="size_title_4 name clr_contTypeB_hdlTxt">'+((__t=(aboutUsName))==null?"":__t)+"</div>"}__p+="";if(title){__p+='<div class="size_title_1 title clr_contTypeB_subTxt">'+((__t=(title))==null?"":__t)+"</div>"}__p+="</div></div>";if(about){__p+='<div class="size_1 about descriptionText clr_contTypeB_txt"></div>'}__p+="";if(description){__p+='<div class="size_title_1 descriptionTitle clr_contTypeB_subTxt">'+((__t=(descriptionTitle))==null?"":__t)+'</div><div class="size_1 description descriptionText clr_contTypeB_txt"></div>'}__p+='<div class="size_title_1 read_more_button clr_contTypeB_lnkTxt">'+((__t=(readMoreTitle))==null?"":__t)+'</div><div class="share-icons-container"></div><ul class="dataList"></ul></div></div></div>'}return __p};aboutUsTemplates.aboutUsMoreTemplate=function(obj){var __t,__p="",__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,"")};with(obj||{}){__p+='<div class="scroll_wrapper"><div class="scroller"><div class="ipad_screen_center">';if(typeof(imgUrl)!="undefined"&&imgUrl){__p+='<img class="aboutUs-img" src="'+((__t=(imgUrl))==null?"":__t)+'" />'}__p+='<div class="header"><div class="header-text">';if(aboutUsName){__p+='<div class="size_title_4 name clr_contTypeA_hdlTxt">'+((__t=(aboutUsName))==null?"":__t)+"</div>"}__p+="";if(title){__p+='<div class="size_title_1 title clr_contTypeA_subTxt">'+((__t=(title))==null?"":__t)+"</div>"}__p+="</div></div>";if(about){__p+='<div class="size_1 about descriptionText clr_contTypeA_txt"></div>'}__p+="";if(description){__p+='<div class="size_title_1 descriptionTitle clr_contTypeA_subTxt">'+((__t=(descriptionTitle))==null?"":__t)+'</div><div class="size_1 description descriptionText clr_contTypeA_txt"></div>'}__p+="</div></div></div>"}return __p};aboutUsTemplates.aboutUsItemMoreTemplate=function(obj){var __t,__p="",__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,"")};with(obj||{}){__p+='<div class="scroll_wrapper"><div class="scroller"><div class="ipad_screen_center"><div class="header">';if(typeof(icon)!="undefined"&&icon&&typeof(iconBlack)!="undefined"&&iconBlack){__p+='<div class="dataItemImage sliced_image clr_contTypeA_hdlIcn_black_icon" style="background-image:url(\''+((__t=(iconBlack))==null?"":__t)+'\')"></div><div class="dataItemImage sliced_image clr_contTypeA_hdlIcn_white_icon" style="background-image:url(\''+((__t=(icon))==null?"":__t)+'\')"></div><div class="dataItemImage sliced_mask clr_contTypeA_hdlIcn_mask_icon" style="-webkit-mask-image:url(\''+((__t=(icon))==null?"":__t)+"')\"></div>"}__p+='<div class="header-text">';if(title){__p+='<div class="size_title_1 title clr_contTypeA_subTxt">'+((__t=(title))==null?"":__t)+"</div>"}__p+="</div></div>";if(text){__p+='<div class="size_1 description descriptionText clr_contTypeA_txt"></div>'}__p+="</div></div></div>"}return __p};aboutUsTemplates.listItemTemplate=function(obj){var __t,__p="",__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,"")};with(obj||{}){__p+='<li class="dataItem clr_contTypeB_sep_brdr clearfix"><div class="titleContainer">';if(typeof(icon)!="undefined"&&icon&&typeof(iconBlack)!="undefined"&&iconBlack){__p+='<div class="dataItemImage inList sliced_image clr_contTypeB_hdlIcn_black_icon" style="background-image:url(\''+((__t=(iconBlack))==null?"":__t)+'\')"></div><div class="dataItemImage inList sliced_image clr_contTypeB_hdlIcn_white_icon" style="background-image:url(\''+((__t=(icon))==null?"":__t)+'\')"></div><div class="dataItemImage inList sliced_mask clr_contTypeB_hdlIcn_mask_icon" style="-webkit-mask-image:url(\''+((__t=(icon))==null?"":__t)+"')\"></div>"}__p+="";if(typeof(title)!="undefined"&&title){__p+='<div class="size_title_0 dataItemTitle clr_contTypeB_hdlTxt">'+((__t=(title))==null?"":__t)+"</div>"}__p+="</div>";if(typeof(description)!="undefined"&&description){__p+='<div class="size_1 dataItemText descrContainer"></div>'}__p+="";if(typeof(text)!="undefined"&&text){__p+='<div class="size_1 dataItemText listTextContainer clr_contTypeB_txt" data-alias="'+((__t=(alias))==null?"":__t)+'" data-text="'+((__t=(text))==null?"":__t)+'"></div>'}__p+="</li>"}return __p};aboutUsTemplates.readMoreTemplate=function(obj){var __t,__p="",__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,"")};with(obj||{}){__p+='<span class="size_title_1 read_more_text clr_contTypeB_lnkTxt">'+((__t=(staticTitle))==null?"":__t)+"</span>"}return __p};aboutUsTemplates.hoursTemplate=function(obj){var __t,__p="",__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,"")};with(obj||{}){__p+='<div class="hours_block"><div class="days_section">'+((__t=(days))==null?"":__t)+'</div><div class="hours_section" dir="ltr">'+((__t=(hours))==null?"":__t)+"</div></div>"}return __p};aboutUsTemplates.infoPageTemplate=function(obj){var __t,__p="",__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,"")};with(obj||{}){__p+='<div class="scroll_wrapper"><div class="scroller"><div class="info-page-place-holder  '+((__t=(cardColor))==null?"":__t)+'"><img class="applogoimg" src="'+((__t=(appLogoImgUrl))==null?"":__t)+'" /><div class="size_title_4 _1_line ellipsis app-label clr_contTypeB_hdlTxt center">'+((__t=(appLabel))==null?"":__t)+'</div><div class="size_title_1 app-version clr_contTypeB_subTxt center">'+((__t=(appVersion))==null?"":__t)+'</div><div class="share-button-container center"></div>';if(privacyPolicy){__p+='<div class="privacyPolicy center"></div>'}__p+="</div></div></div>"}return __p};aboutUsTemplates.infoBannerTemplate=function(obj){var __t,__p="",__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,"")};with(obj||{}){__p+='<div class="infoFooter '+((__t=(pageColor))==null?"":__t)+'">';if(banner&&banner.imageUrl){__p+='<img class="banner" src="'+((__t=(banner.imageUrl))==null?"":__t)+'" />'}__p+="</div>"}return __p}; var AboutUsTemplateView=TemplateView.extend({_renderTab:function(c,e){var g=this.model.get("meta");var f=g.items[c];if(f){var b=new AboutUsModel(f)}else{var b=new AboutUsModel()}var h=Utils.Helpers.generateGUID();var d=new AboutUsView({model:b,id:h});this.$el.append(d.render().el);this.addTabsToView(d,c);var a=function(){UN.onPageReady(h,e,1)};UN.registerChange(this._navToInner.hitch(this),2,{data:{model:b},cbSelectDefault:a,navRequest:e})},_navToInner:function(d,b){var c=d.navRequest;var a=d.model.getItemForAlias(b);if(!a){this.itemNotFound(c,2,null);return}var f=Utils.Helpers.generateGUID();switch(b){case a.get("info_alias"):var e=new AboutUsInfoView({model:a,id:f});break;case a.get("more_alias"):var e=new AboutUsMoreView({model:a,id:f});break;default:var e=new AboutUsItemMoreView({model:a,id:f})}this.$el.append(e.render().el);UN.onPageReady(f,c,2,true)}}); var AboutUsInfoView=Backbone.View.extend({className:"info_page",attributes:{"data-role":"page"},initialize:function(){var h=(LAYOUT===layoutFormat.wide)?"clr_punch_wideBg":"clr_contTypeB_fullPage2_bg";this.$el.addClass(h);var d=AppSettingsManager.getSettings();var f=d.get("brand").info||{};var a=f.banner||null;if(a){var e=$("#app_footer .infoFooter");if(e.length==0){var g={pageColor:h,banner:a};e=$(aboutUsTemplates.infoBannerTemplate(g));if(a&&a.redirectUrl){e.find(".banner").tap(function(i){appDriver.openLink(null,null,{url:a.redirectUrl,title:a.redirectUrl})})}e.hide();var b=$("#app_footer");b.append(e)}var c=$("#app_footer .mainFooter");this.$el.bind("pageshow",function(){c.hide();e.show()});this.$el.bind("pagebeforehide",function(){e.hide();c.show()})}},render:function(){var c=this.model.toJSON();c.appLabel=AppManager.app().get("appLabel");c.appLogoImgUrl=AppManager.app().get("appIcon");c.appVersion=_T("HtmlTextAboutUsInfoVersion",{versionName:APP_VERSION});c.cardColor=(LAYOUT===layoutFormat.wide)?"clr_contTypeB_fullPage2_bg":"";var e=AppSettingsManager.getSettings();var g=e.get("brand").info||{};var a=g.privacyPolicy||null;c.privacyPolicy=a;this.$el.html(aboutUsTemplates.infoPageTemplate(c));if(a&&a.text&&a.type==="html"){var b=new HtmlContainerControl();var d=Utils.String.translateIfNeed(a.text);b.renderHtml(this.$(".privacyPolicy"),d,{zoomOnWide:false,changeColors:true,color:{text:"clr_contTypeB_subTxt",title:"clr_contTypeB_hdlTxt",link:"clr_contTypeB_lnkTxt"}})}var h=this.$(".scroll_wrapper");var f=this.$(".share-button-container");this.model.set({getShareInfo:this._getShareInfo});this.model.getShareInfo=this._getShareInfo;ShareControlHelper.addShareControlButton(f,this.model);this.$el.find("IMG").load(function(){Scrolling.onContentChanged(h)}).error(function(){$(this).remove()});Scrolling.init(h);return this},_getShareInfo:function(){var a=Utils.ShareInfo.shareAppInfo();if(PLATFORM==platformEnum.simulator){return a}a.shareButtonText=_T("HtmlTextShareAppButtonText");return a}}); var AboutUsView=Backbone.View.extend({className:"main-page clr_contTypeB_bg t3d",attributes:{"data-role":"page"},initialize:function(){$(window).bind("throttledresize",this.onResize.hitch(this));this.$el.bind("pageshow",this.onPageShow.hitch(this));this.$el.bind("pagehide",this.onPageHide.hitch(this))},_createItemView:function(e){var g=e.data.hours;if(g&&g.length){e.description="";for(var b=0;b<g.length;b++){var d={days:g[b].daysStr,hours:g[b].hoursStr};var f=aboutUsTemplates.hoursTemplate(d);e.description=e.description+f}}var c=$(aboutUsTemplates.listItemTemplate(e));if(e.description){e.text=Utils.String.sanitizeText(e.text,true);var a=new HtmlContainerControl();a.renderHtml(c.find(".descrContainer"),e.description,{zoomOnWide:false,changeColors:true})}return c},render:function(){var f=this.model.toJSON();this.$el.html(aboutUsTemplates.aboutUsTemplate(f));var g=this.$(".scroll_wrapper");this.$("IMG").load(function(){Scrolling.onContentChanged(g)}).error(function(){$(this).remove()});var e=this.model.get("list");if(e.length){var a=this.$(".dataList");for(var d=0;d<e.length;d++){var f=e[d];var c=this._createItemView(f);a.append(c)}}var b=new ShareIconsView({model:this.model});this.$(".share-icons-container").append(b.render().el);this.$(".read_more_button").tap(this._onReadMoreClick.hitch(this));Scrolling.init(g);return this},_onReadMoreClick:function(b){b.preventDefault();var a=this.model.get("more_alias");UN.navTo(a)},onPageShow:function(){this.isPageShow=true;this.updateDescriptions()},onPageHide:function(){this.isPageShow=false},onResize:function(){if(this.isPageShow){this.updateDescriptions()}},updateDescriptions:function(){var g=Math.max(300,this.$el.width());var c=false;var b={staticTitle:_T("HtmlTextAboutUsListItemReadMore")};var a=aboutUsTemplates.readMoreTemplate(b);var h=this.model.get("description");if(h){var f=Math.floor(g/1.5);var j=this.$(".description");if(f<h.length){h=Utils.String.trailString(h,f,{charStop:[{charStop:".",threshold:"50"}]});c=true}j.html(Utils.String.sanitizeText(h))}var d=this.model.get("about");if(d){var i=Math.floor(g/1.5);var j=this.$(".about");if(i<d.length){d=Utils.String.trailString(d,i,{charStop:[{charStop:".",threshold:"50"}]});c=true}j.html(Utils.String.sanitizeText(d))}if(c){this.$(".read_more_button").show()}else{this.$(".read_more_button").hide()}var e=Math.floor((g-40)/2);this.$(".listTextContainer").each(function(k){var o=$(this);var n=o.attr("data-text");if(e<n.length){var m=Utils.String.trailString(n,e);m=Utils.String.sanitizeText(m,true);o.html(m+"<br >");var l=$(a);o.append(l);l.tap(function(q){q.preventDefault();var p=o.attr("data-alias");UN.navTo(p)})}else{var m=Utils.String.sanitizeText(n,true);o.html(m)}})},addTabsView:function(a){this.$el.find(".scroller").prepend(a)}}); var AboutUsMoreView=Backbone.View.extend({className:"main-page clr_contTypeA_bg",attributes:{"data-role":"page"},render:function(){var b=this.model.toJSON();this.$el.html(aboutUsTemplates.aboutUsMoreTemplate(b));var c=this.$(".scroll_wrapper");if(b.about){var a=new LinksTextControl();a.renderText(this.$(".about"),b.about)}if(b.description){var a=new LinksTextControl();a.renderText(this.$(".description"),b.description)}this.$("IMG").load(function(){Scrolling.onContentChanged(c)}).error(function(){$(this).remove()});Scrolling.init(c);return this}}); var AboutUsItemMoreView=Backbone.View.extend({className:"main-page clr_contTypeA_bg",attributes:{"data-role":"page"},render:function(){var b=this.model.toJSON();this.$el.html(aboutUsTemplates.aboutUsItemMoreTemplate(b));var a=new LinksTextControl();a.renderText(this.$(".description"),b.text);var c=this.$(".scroll_wrapper");Scrolling.init(c);return this}}); 