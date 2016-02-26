'use strict';System.register([],function(_export,_context){return {setters:[],execute:function(){const main=require('./main');const $=main.$;const _=main._;const Backbone=main.Backbone;const config=main.config;const connSM=main.connSM;const etc=main.etc;const state=main.state;const options=main.options;let discoFavicon='',xhr=new XMLHttpRequest();xhr.open('GET','/ass/css/ui/disconnected.ico');xhr.responseType='blob';xhr.onload=function(){if(this.status===200)discoFavicon=window.URL.createObjectURL(this.response);};xhr.send();let NotifyModel=Backbone.Model.extend({initialize(){this.$favicon=$('#favicon');this.check(this);this.listenTo(this,'change',this.check);main.reply('post:inserted',model => {if(model.get('mine'))return;if(document.hidden)this.set('unreadCount',this.get('unreadCount')+1);});main.reply('notify:title',title => this.set('title',title));document.addEventListener('visibilitychange',e => {const hidden=e.target.hidden;this.set({hidden:hidden,unreadCount:0,reply:!hidden});},false);let dropped=() => this.set('alert',true);connSM.on('dropped',dropped);connSM.on('desynced',dropped);connSM.on('synced',() => notify.set('alert',false));},check(model){var _model$attributes=model.attributes;const hidden=_model$attributes.hidden;const unreadCount=_model$attributes.unreadCount;const reply=_model$attributes.reply;const alert=_model$attributes.alert;let icon='/ass/favicon.ico';if(alert)return this.render(discoFavicon,'--- ');else if(!hidden)return this.render(icon,'');let prefix='';if(unreadCount){prefix+=`(${ unreadCount }) `;icon='/ass/css/ui/unreadFavicon.ico';}if(reply){prefix='>> '+prefix;icon='/ass/css/ui/replyFavicon.ico';}this.render(icon,prefix);},render(icon,prefix){document.title=prefix+this.get('title');this.$favicon.attr('href',icon);}});let notify=new NotifyModel({unreadCount:0,title:document.title});let replies=new main.Memory('replies',3);main.reply('repliedToMe',function(num){let post=state.posts.get(num);if(!post)return;post=post.attributes;if(num in replies.readAll())return;if(options.get('notification')&&document.hidden&&!main.isMobile){let n=new Notification(main.lang.quoted,{icon:post.image&&options.get('thumbs')!=='hide'&&!main.oneeSama.workMode?main.oneeSama.thumbPath(post.image):'/ass/css/ui/favbig.png',body:post.body});n.onclick=function(){window.focus();location.hash='#p'+num;};}notify.set({reply:true});replies.write(num);});main.reply('time:syncwatch',function(){if(!options.get('notification')||!document.hidden)return;new Notification(main.lang.syncwatchStarting).onclick=() => window.focus();});}};});
//# sourceMappingURL=../maps/client/notify.js.map